import sys
from PIL import Image, ImageDraw, ImageFont
import os

width = 1200
height = 675

img = Image.new('RGB', (width, height), color='#0b0f19')
draw = ImageDraw.Draw(img)

# 1. Subtle Background Gradients / Glows
for r in range(300, 0, -10):
    alpha = int(35 * (1 - r / 300))
    color = (37, 99, 235)  # Royal Blue
    draw.ellipse([(-50 - r), (-50 - r), (450 + r), (450 + r)], fill=None, outline=color)

for r in range(260, 0, -10):
    color = (99, 102, 241)  # Indigo
    draw.ellipse([(800 - r), (200 - r), (1200 + r), (600 + r)], fill=None, outline=color)

# Fonts
try:
    font_brand = ImageFont.truetype('segoeui.ttf', 32)
    font_badge = ImageFont.truetype('segoeui.ttf', 16)
    font_title_bold = ImageFont.truetype('segoeuib.ttf', 54)
    font_subtitle = ImageFont.truetype('segoeui.ttf', 24)
    font_card_title = ImageFont.truetype('segoeuib.ttf', 20)
    font_card_metric = ImageFont.truetype('segoeuib.ttf', 44)
    font_card_sub = ImageFont.truetype('segoeui.ttf', 16)
    font_footer = ImageFont.truetype('segoeuib.ttf', 22)
    font_footer_sub = ImageFont.truetype('segoeui.ttf', 18)
except:
    font_brand = font_badge = font_title_bold = font_subtitle = font_card_title = font_card_metric = font_card_sub = font_footer = font_footer_sub = ImageFont.load_default()

# 2. Brand Capsule (Top Left)
draw.rounded_rectangle([80, 70, 320, 126], radius=16, fill='#1e293b', outline='#3b82f6', width=2)
draw.text((105, 80), "Nova", fill="#ffffff", font=font_brand)
draw.text((185, 80), "Syndic", fill="#3b82f6", font=font_brand)

# Tag Badge (Loi 18-00)
draw.rounded_rectangle([340, 78, 540, 118], radius=12, fill='#172554', outline='#3b82f6', width=1)
draw.text((360, 88), "MAROC • LOI 18-00", fill="#38bdf8", font=font_badge)

# 3. Hero Headlines (100% correct spelling, ultra clean)
draw.text((80, 160), "Gestion Intelligente de", fill="#ffffff", font=font_title_bold)
draw.text((80, 230), "Copropriété au Maroc", fill="#38bdf8", font=font_title_bold)

draw.text((80, 310), "Plateforme tout-en-un conforme à la Loi 18-00", fill="#94a3b8", font=font_subtitle)
draw.text((80, 345), "pour syndics professionnels, bénévoles et copropriétaires.", fill="#64748b", font=font_subtitle)

# 4. Feature Pills
features = [
    "✓ Recouvrement Wajibati",
    "✓ Rappels WhatsApp 1-Clic",
    "✓ Assistant Juridique IA 24/7"
]
x_pill = 80
for feat in features:
    draw.rounded_rectangle([x_pill, 400, x_pill + 260, 450], radius=14, fill='#0f172a', outline='#334155', width=1)
    draw.text((x_pill + 20, 414), feat, fill="#f8fafc", font=font_card_sub)
    x_pill += 280

# 5. Right Dashboard Showcase Card (Glassmorphism)
draw.rounded_rectangle([720, 140, 1120, 370], radius=24, fill='#1e293b', outline='#4f46e5', width=2)

draw.text((750, 165), "RÉSIDENCE AL PALMIER", fill="#38bdf8", font=font_card_sub)
draw.text((750, 195), "Taux de Recouvrement", fill="#94a3b8", font=font_card_sub)
draw.text((750, 220), "95%", fill="#10b981", font=font_card_metric)
draw.text((860, 238), "+18% ce mois", fill="#34d399", font=font_card_sub)

# Progress Bar
draw.rounded_rectangle([750, 290, 1080, 302], radius=6, fill='#334155')
draw.rounded_rectangle([750, 290, 1060, 302], radius=6, fill='#10b981')

draw.text((750, 320), "Cotisations à jour : 19/20 appartements", fill="#cbd5e1", font=font_card_sub)
draw.text((750, 342), "✓ Conforme Loi 18-00 • PV d'AG validé", fill="#38bdf8", font=font_card_sub)

# 6. Bottom Banner / Domain Call To Action
draw.rounded_rectangle([80, 490, 1120, 580], radius=20, fill='#0f172a', outline='#2563eb', width=2)
draw.text((115, 518), "syndic.novaskill.tech", fill="#ffffff", font=font_footer)
draw.text((680, 522), "Démo en ligne • Sans engagement • Web & Mobile", fill="#38bdf8", font=font_footer_sub)

img.save('d:/Projects/NOVA SYNDIC/src_app/public/og-image.jpg', 'JPEG', quality=95)
print('OG image generated successfully via Python PIL')
