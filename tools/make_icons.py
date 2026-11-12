"""Generuje ikony aplikacji (PWA + Android) z jednego rysunku.
Uruchomienie: python3 tools/make_icons.py   (wymaga: pip install pillow)"""
import os
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLUE, INDIGO = (29, 78, 216), (79, 70, 229)


def gradient(size):
    img = Image.new("RGB", (size, size))
    px = img.load()
    for y in range(size):
        for x in range(size):
            t = (x + (size - y)) / (2 * size)
            px[x, y] = tuple(round(BLUE[i] + (INDIGO[i] - BLUE[i]) * t) for i in range(3))
    return img


def building(size, scale):
    """Biały budynek urzędu (fronton, kolumny, podstawa) na przezroczystym tle."""
    s = size * 4
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    w = s * scale
    x0, y0 = (s - w) / 2, (s - w) / 2
    P = lambda fx, fy: (x0 + fx * w, y0 + fy * w)
    white = (255, 255, 255, 255)
    d.polygon([P(0.5, 0.04), P(0.98, 0.32), P(0.02, 0.32)], fill=white)
    d.rounded_rectangle([P(0.06, 0.36), P(0.94, 0.44)], radius=w * 0.02, fill=white)
    for cx in (0.2, 0.4, 0.6, 0.8):
        d.rounded_rectangle([P(cx - 0.055, 0.48), P(cx + 0.055, 0.78)], radius=w * 0.02, fill=white)
    d.rounded_rectangle([P(0.06, 0.82), P(0.94, 0.90)], radius=w * 0.02, fill=white)
    d.rounded_rectangle([P(0.0, 0.92), P(1.0, 1.0)], radius=w * 0.02, fill=white)
    return img.resize((size, size), Image.LANCZOS)


def full_icon(size, scale=0.52, rounded=False):
    img = gradient(size).convert("RGBA")
    img.alpha_composite(building(size, scale))
    if rounded:
        mask = Image.new("L", (size * 4, size * 4), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, size * 4, size * 4], radius=size * 4 * 0.22, fill=255)
        img.putalpha(mask.resize((size, size), Image.LANCZOS))
    return img


def circle_icon(size):
    img = full_icon(size, 0.48)
    mask = Image.new("L", (size * 4, size * 4), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, size * 4, size * 4], fill=255)
    img.putalpha(mask.resize((size, size), Image.LANCZOS))
    return img


def save(img, *parts):
    path = os.path.join(ROOT, *parts)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path)
    print("zapisano", os.path.relpath(path, ROOT))


# PWA
save(full_icon(192, rounded=True), "www", "icons", "icon-192.png")
save(full_icon(512, rounded=True), "www", "icons", "icon-512.png")
save(full_icon(512, 0.44), "www", "icons", "icon-maskable-512.png")
save(full_icon(180).convert("RGB"), "www", "icons", "apple-touch-icon.png")
save(full_icon(1024).convert("RGB"), "assets", "icon.png")

# Android (tylko gdy istnieje folder android/)
res = os.path.join(ROOT, "android", "app", "src", "main", "res")
if os.path.isdir(res):
    for name, px in {"mdpi": 48, "hdpi": 72, "xhdpi": 96, "xxhdpi": 144, "xxxhdpi": 192}.items():
        fg = round(px * 108 / 48)
        save(full_icon(px, rounded=True), res, f"mipmap-{name}", "ic_launcher.png")
        save(circle_icon(px), res, f"mipmap-{name}", "ic_launcher_round.png")
        save(building(fg, 0.36), res, f"mipmap-{name}", "ic_launcher_foreground.png")
        save(gradient(fg), res, f"mipmap-{name}", "ic_launcher_background.png")

    # Ekran startowy Androida: podmieniamy domyślne grafiki Capacitora
    import glob
    for path in glob.glob(os.path.join(res, "drawable*", "splash.png")):
        w, h = Image.open(path).size
        side = max(w, h)
        splash = full_icon(side, 0.2).convert("RGB").crop(((side - w) // 2, (side - h) // 2, (side + w) // 2, (side + h) // 2))
        splash.save(path)
        print("zapisano", os.path.relpath(path, ROOT))

# iOS (tylko gdy istnieje folder ios/)
xc = os.path.join(ROOT, "ios", "App", "App", "Assets.xcassets")
if os.path.isdir(xc):
    save(full_icon(1024).convert("RGB"), xc, "AppIcon.appiconset", "AppIcon-512@2x.png")
    import glob
    for path in glob.glob(os.path.join(xc, "Splash.imageset", "*.png")):
        side = Image.open(path).size[0]
        full_icon(side, 0.2).convert("RGB").save(path)
        print("zapisano", os.path.relpath(path, ROOT))
