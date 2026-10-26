"""Re-export the deck's existing web-app screenshots for the browser-window
showcase (previously shown in a laptop mockup).

Flattens transparent edges/corners into the neighbouring colour (never
black), and downsizes the 2x–4x captures to a deck-friendly width.

Usage: python3 scratch/import_web_screens.py
"""
import os
import sys
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from screen_utils import flatten_corners, save_jpeg  # noqa: E402

PUBLIC = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public")

JOBS = [
    # Updated HRMS admin dashboard (employees, attendance, leave, payroll).
    (os.path.expanduser("~/Downloads/Dashboard.png"), "hrms.jpg"),
    ("D24.png", "digital24.jpg"),
    ("new screens/IMG_8589.png", "clinic.jpg"),
    ("new screens/IMG_8591.png", "manufacturing.jpg"),
    ("new screens/IMG_8600.png", "social-commerce.jpg"),
    ("new screens/IMG_8593.png", "logistics.jpg"),
    ("new screens/IMG_8594.png", "creative-community.jpg"),
    ("new screens/IMG_8602.png", "payment-credit.jpg"),
    ("new screens/IMG_8603.png", "ads-payment.jpg"),
    ("new screens/IMG_8599.png", "ecommerce-retail.jpg"),
    ("new screens/image.png", "real-estate.jpg"),
]

if __name__ == "__main__":
    out_dir = os.path.join(PUBLIC, "screens", "web")
    os.makedirs(out_dir, exist_ok=True)
    for src, name in JOBS:
        img = flatten_corners(Image.open(os.path.join(PUBLIC, src)))
        path = os.path.join(out_dir, name)
        save_jpeg(img, path, 1600)
        w, h = Image.open(path).size
        print(f"{name}: {w}x{h} (h/w {h / w:.2f}), {os.path.getsize(path) // 1024} KB")
