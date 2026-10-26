"""Import client product screens supplied as mockup images.

  python3 scratch/import_client_screens.py <dir with the supplied images>

Digital Health Platform — 1 web dashboard (shadowed card, transparent
corners) + 3 phone mockups (bezel baked in; the screen is cut out so it can
sit in the deck's own silver phone frame). Vape Local — 1 web screenshot.
"""
import os
import sys
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from screen_utils import crop_opaque, flatten_corners, phone_screen, save_jpeg  # noqa: E402

PUBLIC = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "screens")

# (source file, output path under public/screens, kind, width)
JOBS = [
    ("1.webp", "health/web-dashboard.jpg", "web-card", 1600),
    ("3.webp", "health/mobile-today.jpg", "phone", 786),
    ("4.webp", "health/mobile-score.jpg", "phone", 786),
    ("2.webp", "health/mobile-breakdown.jpg", "phone", 786),
    ("5.webp", "vapelocal/web-home.jpg", "web", 1600),
]

if __name__ == "__main__":
    src_dir = sys.argv[1]
    for src, out, kind, width in JOBS:
        img = Image.open(os.path.join(src_dir, src))
        if kind == "web-card":
            img = flatten_corners(crop_opaque(img))
        elif kind == "phone":
            img = phone_screen(img)
        else:
            img = img.convert("RGB")
        path = os.path.join(PUBLIC, out)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        save_jpeg(img, path, width)
        w, h = Image.open(path).size
        print(f"{out}: {w}x{h}, {os.path.getsize(path) // 1024} KB")
