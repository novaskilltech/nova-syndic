-- ==============================================================================
-- NOVA SYNDIC - ARCHITECTURE DATABASE SUPABASE (POSTGRESQL)
-- Schéma multi-tenant sécurisé avec RLS pour le SaaS de Copropriété au Maroc
-- ==============================================================================

-- 1. Table Profil Syndic / Administrateur
CREATE TABLE IF NOT EXISTS public.syndic_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'syndic' CHECK (role IN ('syndic', 'coproprietaire', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table Abonnements Stripe (SaaS)
CREATE TABLE IF NOT EXISTS public.syndic_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.syndic_profiles(id) ON DELETE CASCADE,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT UNIQUE,
    stripe_price_id TEXT,
    plan_interval TEXT CHECK (plan_interval IN ('month', 'year')),
    status TEXT NOT NULL DEFAULT 'incomplete' CHECK (status IN ('active', 'trialing', 'past_due', 'canceled', 'incomplete', 'unpaid')),
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_user_subscription UNIQUE (user_id)
);

-- 3. Table Immuable d'Audit / Ledger Stripe Webhooks
CREATE TABLE IF NOT EXISTS public.syndic_subscription_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.syndic_profiles(id) ON DELETE SET NULL,
    stripe_event_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    amount_total INTEGER, -- en centimes MAD
    currency TEXT DEFAULT 'mad',
    payload JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Table Résidences / Immeubles
CREATE TABLE IF NOT EXISTS public.syndic_properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.syndic_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT DEFAULT 'Casablanca',
    total_units INTEGER DEFAULT 16,
    bank_rib TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Table Copropriétaires & Lots
CREATE TABLE IF NOT EXISTS public.syndic_owners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.syndic_properties(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    lot_number TEXT NOT NULL, -- ex: "Appt 101"
    floor INTEGER,
    shares_quota INTEGER DEFAULT 100, -- tantièmes / quotes-parts
    phone TEXT,
    email TEXT,
    balance NUMERIC(10,2) DEFAULT 0.00, -- solde en MAD (négatif = impayé)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Table Transactions Financières (Dépenses & Cotisations Wajibati)
CREATE TABLE IF NOT EXISTS public.syndic_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.syndic_properties(id) ON DELETE CASCADE,
    owner_id UUID REFERENCES public.syndic_owners(id) ON DELETE SET NULL,
    type TEXT NOT NULL CHECK (type IN ('INCOME', 'EXPENSE')),
    category TEXT NOT NULL, -- 'Charges', 'Maintenance', 'Nettoyage', 'Assurance', 'Eau/Électricité'
    amount NUMERIC(10,2) NOT NULL, -- Montant en MAD
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    description TEXT NOT NULL,
    payment_method TEXT CHECK (payment_method IN ('VIREMENT', 'CHEQUE', 'ESPECES', 'AUTRE')),
    status TEXT DEFAULT 'COMPLETED' CHECK (status IN ('COMPLETED', 'PENDING', 'CANCELLED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Table Tickets de Maintenance & Réclamations
CREATE TABLE IF NOT EXISTS public.syndic_maintenance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.syndic_properties(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'IN_PROGRESS', 'CLOSED')),
    priority TEXT DEFAULT 'MEDIUM' CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH', 'URGENT')),
    assigned_vendor TEXT,
    cost_estimate NUMERIC(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) - ÉTANCHÉITÉ TOTALE ENTRE SYNDICS
-- ==============================================================================

ALTER TABLE public.syndic_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.syndic_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.syndic_subscription_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.syndic_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.syndic_owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.syndic_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.syndic_maintenance ENABLE ROW LEVEL SECURITY;

-- Profils : lecture/écriture uniquement pour l'utilisateur connecté
CREATE POLICY "syndic_profiles_policy" ON public.syndic_profiles
    FOR ALL USING (auth.uid() = id);

-- Subscriptions : lecture uniquement par le propriétaire du compte
CREATE POLICY "syndic_subscriptions_policy" ON public.syndic_subscriptions
    FOR SELECT USING (auth.uid() = user_id);

-- Résidences : accessible uniquement par le syndic propriétaire
CREATE POLICY "syndic_properties_policy" ON public.syndic_properties
    FOR ALL USING (auth.uid() = user_id);

-- Copropriétaires : accessible si le syndic possède la résidence
CREATE POLICY "syndic_owners_policy" ON public.syndic_owners
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.syndic_properties p
            WHERE p.id = syndic_owners.property_id AND p.user_id = auth.uid()
        )
    );

-- Transactions : accessible si le syndic possède la résidence
CREATE POLICY "syndic_transactions_policy" ON public.syndic_transactions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.syndic_properties p
            WHERE p.id = syndic_transactions.property_id AND p.user_id = auth.uid()
        )
    );

-- Maintenance : accessible si le syndic possède la résidence
CREATE POLICY "syndic_maintenance_policy" ON public.syndic_maintenance
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.syndic_properties p
            WHERE p.id = syndic_maintenance.property_id AND p.user_id = auth.uid()
        )
    );
