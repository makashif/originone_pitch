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
from screen_utils import crop_opaque, flatten_corners, phone_ratio_crop, remove_notch, save_jpeg  # noqa: E402

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

# Phone screens exported from the design file (rounded screen + drop shadow
# on transparency), saved to ~/Downloads. (source, output name)
DOWNLOADS = os.path.expanduser("~/Downloads")
MOBILE_JOBS = [
    ("Splash (6).png", "wallet-mobile-welcome.jpg"),
    ("Home (30).png", "wallet-mobile-home.jpg"),
    ("Splash (8).png", "chat-mobile-splash.jpg"),
    ("Chat.png", "chat-mobile-list.jpg"),
    # Supplied straight into public/ (2x captures, ~4 MB each).
    (os.path.join(OUT, "vpn-mobile-splash.png"), "vpn-mobile-splash.jpg"),
    (os.path.join(OUT, "vpn-mobile-connected.png"), "vpn-mobile-connected.jpg"),
]

PHONES = {"trade-mobile.jpg", "id-mobile.jpg"}

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for src, name, width in JOBS:
        img = flatten_corners(Image.open(os.path.join(SRC, src)))
        if name in PHONES:
            img = remove_notch(img)
        path = os.path.join(OUT, name)
        save_jpeg(img, path, width)
        print(f"{name}: {os.path.getsize(path) // 1024} KB")

    for src, name in MOBILE_JOBS:
        img = phone_ratio_crop(flatten_corners(crop_opaque(Image.open(os.path.join(DOWNLOADS, src)))))
        path = os.path.join(OUT, name)
        save_jpeg(img, path, 786)
        w, h = Image.open(path).size
        print(f"{name}: {w}x{h}, {os.path.getsize(path) // 1024} KB")
