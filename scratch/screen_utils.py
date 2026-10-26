"""Helpers for turning raw screen captures into clean deck screenshots.

Captures often arrive as RGBA with transparent rounded corners, or as phone
mockups with a bezel baked in. Flattening those to RGB naively turns the
transparent corners black — instead, fill each corner from the pixels
beside it so the screen reads edge to edge inside our own device frames.
"""
from PIL import Image


def flatten_corners(img: Image.Image) -> Image.Image:
    """RGBA -> RGB. Transparent pixels at the ends of each row (the rounded
    corners) take the colour of that row's nearest opaque pixel; the capture
    is then composited on top so anti-aliased edges blend cleanly."""
    img = img.convert("RGBA")
    w, h = img.size
    px = img.load()
    fill = img.copy()
    fp = fill.load()
    spans = {}
    for y in range(h):
        if px[0, y][3] == 255 and px[w - 1, y][3] == 255:
            continue
        x0 = next((x for x in range(w) if px[x, y][3] == 255), None)
        if x0 is None:
            spans[y] = None
            continue
        x1 = next(x for x in range(w - 1, -1, -1) if px[x, y][3] == 255)
        spans[y] = (x0, x1)
        lc, rc = px[x0, y][:3] + (255,), px[x1, y][:3] + (255,)
        for x in range(x0):
            fp[x, y] = lc
        for x in range(x1 + 1, w):
            fp[x, y] = rc
    # Fully transparent rows: copy the nearest row that has content.
    solid = [y for y in range(h) if spans.get(y, 0) is not None]
    for y, span in spans.items():
        if span is None:
            near = min(solid, key=lambda k: abs(k - y))
            fill.paste(fill.crop((0, near, w, near + 1)), (0, y))
    out = fill.copy()
    out.putalpha(255)
    return Image.alpha_composite(out, img).convert("RGB")


def crop_opaque(img: Image.Image, threshold: int = 250) -> Image.Image:
    """Crop to the bounding box of (nearly) opaque pixels — drops drop shadows."""
    alpha = img.convert("RGBA").getchannel("A").point(lambda a: 255 if a >= threshold else 0)
    return img.crop(alpha.getbbox())


def phone_screen(img: Image.Image) -> Image.Image:
    """Cut the screen out of a phone mockup (dark bezel, light screen) and
    fill the rounded screen corners with the screen's own colour.

    Mockups usually sit on transparency whose hidden RGB can be light grey,
    so scans look for the opaque dark bezel first, then the screen inside."""
    img = img.convert("RGBA")
    w, h = img.size
    px = img.load()
    bezel = lambda p: p[3] == 255 and sum(p[:3]) < 150
    screen_px = lambda p: p[3] == 255 and sum(p[:3]) > 600

    def inner_edge(points):
        seen_bezel = False
        for i, p in enumerate(points):
            if bezel(p):
                seen_bezel = True
            elif seen_bezel and screen_px(p):
                return i
        raise ValueError("no bezel/screen edge found")

    mid = h // 2
    left = inner_edge([px[x, mid] for x in range(w)])
    right = w - 1 - inner_edge([px[x, mid] for x in range(w - 1, -1, -1)])
    col = left + (right - left) // 6          # clear of the notch
    top = inner_edge([px[col, y] for y in range(h)])
    bottom = h - 1 - inner_edge([px[col, y] for y in range(h - 1, -1, -1)])

    screen = img.crop((left, top, right + 1, bottom + 1)).convert("RGB")
    sw, sh = screen.size
    sp = screen.load()
    light = lambda p: sum(p) > 600

    # Corner radius from the diagonal: a circular corner of radius r meets
    # the diagonal at d = r(1 - 1/sqrt 2). (Row scans get fooled by the
    # bezel's light rim.)
    d = next(i for i in range(min(sw, sh)) if light(sp[i, i]) and light(sp[i + 2, i + 2]))
    r = round(d / 0.2929) + 3
    for cx, cy, dx, dy in ((r, r, -1, -1), (sw - 1 - r, r, 1, -1), (r, sh - 1 - r, -1, 1), (sw - 1 - r, sh - 1 - r, 1, 1)):
        colour = sp[cx + dx * int(r * 0.5), cy + dy * int(r * 0.5)]
        for y in range(r + 1):
            for x in range(r + 1):
                X, Y = cx + dx * x, cy + dy * y
                if 0 <= X < sw and 0 <= Y < sh and (x * x + y * y) > (r - 1) ** 2:
                    sp[X, Y] = colour
    return screen


def save_jpeg(img: Image.Image, path: str, width: int) -> None:
    if img.width > width:
        img = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
    img.save(path, "JPEG", quality=86, optimize=True, progressive=True)
