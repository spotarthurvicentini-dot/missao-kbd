from pathlib import Path

from PIL import Image, ImageChops, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"

base = Image.open(ASSETS / "mission-hero-v2.webp").convert("RGB")
logo_source = Image.open(ASSETS / "logo-lockup.png").convert("RGB")

# Remove o fragmento do robô que existe na extrema direita do recorte antigo.
logo_crop = logo_source.crop((0, 18, 850, 316))
# O arquivo termina rente ao slogan; a margem inferior desloca o feather para
# fora das letras e evita que "Execução de Elite" desapareça na composição.
logo_padded = Image.new("RGB", (850, 358), (1, 5, 20))
logo_padded.paste(logo_crop, (0, 0))
logo_crop = logo_padded
target_width = 780
target_height = round(logo_crop.height * target_width / logo_crop.width)
logo_crop = logo_crop.resize((target_width, target_height), Image.Resampling.LANCZOS)

# Área segura para o corte 390x210 usado no login: logo à esquerda e robô à direita.
x, y = 195, 180
base_region = base.crop((x, y, x + target_width, y + target_height))

# Screen elimina a chapa quase preta do recorte sem redesenhar a marca.
screened = ImageChops.screen(base_region, logo_crop)

# Feather nas quatro bordas impede qualquer emenda retangular perceptível.
mask = Image.new("L", (target_width, target_height), 255)
px = mask.load()
fade_x, fade_y = 74, 44
for yy in range(target_height):
    for xx in range(target_width):
        edge_x = min(1.0, xx / fade_x, (target_width - 1 - xx) / fade_x)
        edge_y = min(1.0, yy / fade_y, (target_height - 1 - yy) / fade_y)
        px[xx, yy] = round(255 * max(0.0, min(edge_x, edge_y)))
mask = mask.filter(ImageFilter.GaussianBlur(5))

merged_region = Image.composite(screened, base_region, mask)
base.paste(merged_region, (x, y))

output = ASSETS / "login-hero-final.webp"
base.save(output, "WEBP", quality=92, method=6)
print(output)
