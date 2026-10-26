"""Import the latest (light, re-branded) Fuutura product screens into the deck.

Source: the fuutura_pitch project's public/images/screens (2x PNG captures).
Web screens keep their full page length so the browser frame can scroll
through them; everything is re-encoded as JPEG to keep the deck light.
The captures have transparent rounded corners — flatten_corners fills them
from the neighbouring pixels instead of letting them turn black.

Usage: python3 scratch/import_fuutura_screens.py
"""
import os
import sys
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from screen_utils import flatten_corners, save_jpeg  # noqa: E402

SRC = "/Users/macbookpro/Claude test/fuutura_pitch/public/images/screens"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "screens", "fuutura")

# (source, output name, target width)
JOBS = [
    ("wallet/wallet_s1.png", "wallet-web-dashboard.jpg", 1600),
    ("wallet/wallet_s2.png", "wallet-web-transactions.jpg", 1600),
    ("trade/trade_s3.png", "trade-web-terminal.jpg", 1600),
    ("trade/trade_m_s3.png", "trade-mobile.jpg", 786),
    ("id/id_s1.png", "id-web-dashboard.jpg", 1600),
    ("id/id_m_s3.png", "id-mobile.jpg", 786),
    ("extension/extension_s1.png", "extension-tokens.jpg", 900),
    ("extension/extension_s3.png", "extension-account.jpg", 900),
]

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for src, name, width in JOBS:
        img = flatten_corners(Image.open(os.path.join(SRC, src)))
        path = os.path.join(OUT, name)
        save_jpeg(img, path, width)
        print(f"{name}: {os.path.getsize(path) // 1024} KB")
