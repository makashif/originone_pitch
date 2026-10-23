"""Generate light-mode slide backgrounds from the original dark renders.

The deck's backgrounds are monochrome renders authored for the old dark
theme. html2canvas (PDF export) ignores CSS `filter`, so instead of
inverting at runtime we bake light copies into public/light/: grayscale →
invert → tint into the brand Ink→Ivory range.

Usage: python3 scratch/make_light_bgs.py
"""
import os
import sys
from PIL import Image, ImageOps

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public")
OUT = os.path.join(ROOT, "light")
INK, IVORY = "#0b0c10", "#f6f5f0"
MAX_W = 2400

SOURCES = [
    "hero_corporate_bg.png",
    "Extremely_professional_corporate_background_for_202606181541.jpeg",
    "solutions_bg.png",
    "tech_bg.png",
    "sleek_dark_bg.png",
    "A_sleek,_dark_background_featuring_202606181541.jpeg",
    "Epic_minimalist_title_slide_background._202606181548.jpeg",
    "fwallet_premium_bg.png",
    "ftrade_premium_bg.png",
    "fextension_premium_bg.png",
    "fkyc_premium_bg.png",
    "fchat_premium_bg.jpg",
    "fvpn_premium_bg.jpg",
    "fhrms_premium_bg.png",
    "digital24_premium_bg.png",
    "intelizzz_premium_bg.png",
    "toybox_premium_bg.png",
    "health_premium_bg.jpg",
    "saap_premium_bg.jpg",
    "marketplace_premium_bg.jpg",
    "logistics_premium_bg.jpg",
    "community_premium_bg.jpg",
    "fintech_premium_bg.jpg",
    "ads_payment_premium_bg.jpg",
    "ecommerce_premium_bg.jpg",
    "crm_premium_bg.jpg",
]


def light_name(src: str) -> str:
    return os.path.splitext(src)[0] + ".jpg"


def convert(src: str) -> None:
    img = Image.open(os.path.join(ROOT, src)).convert("L")
    if img.width > MAX_W:
        img = img.resize((MAX_W, round(img.height * MAX_W / img.width)), Image.LANCZOS)
    img = ImageOps.invert(img)
    img = ImageOps.colorize(img, black=INK, white=IVORY)
    img.save(os.path.join(OUT, light_name(src)), "JPEG", quality=82, optimize=True, progressive=True)


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    only = sys.argv[1:] or SOURCES
    for s in only:
        convert(s)
        print("ok", light_name(s))
