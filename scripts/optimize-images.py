#!/usr/bin/env python3
"""Re-encode source images to web-optimized WebP for WiCare.

Usage:
  python3 scripts/optimize-images.py SRC.png public/dest.webp [--width 1000] [--quality 62]

Or run with no args to re-encode the standard set from the uniform-photo folder
(~/Documents/Claude/WiCare) into public/. Keeps hero heavier (LCP) and cards lighter.

Requires: pillow  (pip install pillow --break-system-packages)
"""
import sys, os
from PIL import Image

def enc(src, dst, width=None, quality=62, keep_top=None):
    im = Image.open(src).convert("RGB")
    if keep_top:  # keep only the top fraction of the photo (e.g. crop out something at the bottom)
        im = im.crop((0, 0, im.size[0], round(im.size[1] * keep_top)))
    if width and im.size[0] > width:
        h = round(im.size[1] * width / im.size[0])
        im = im.resize((width, h), Image.LANCZOS)
    os.makedirs(os.path.dirname(dst) or ".", exist_ok=True)
    im.save(dst, "WEBP", quality=quality, method=6)
    print(f"{dst}  {im.size[0]}x{im.size[1]}  {os.path.getsize(dst)//1024} KB")

# Standard set: (source filename in PHOTO_DIR, dest under public/, width, quality[, keep_top])
STANDARD = [
    ("hero2.png",     "public/hero-bg.webp",              1280, 50),  # desktop LCP hero
    ("hero2.png",     "public/hero-bg-sm.webp",            768, 55),  # mobile hero (srcset)
    ("cleaning.png",  "public/services/home.webp",         900, 58),
    ("chef.png",      "public/services/dining.webp",       900, 58),
    ("garden3.png",   "public/services/garden.webp",       900, 58),
    ("cleaning2.png", "public/services/home-detail.webp",  1100, 64),
    ("cleaning3.png", "public/services/home-detail2.webp", 1100, 64),
    ("chef2.png",     "public/services/dining-detail.webp",1100, 64),
    ("dining-event.jpg",  "public/services/dining-event.webp",  1000, 60),  # the-table gallery (real event photos)
    ("dining-spread.jpg", "public/services/dining-spread.webp", 1200, 62),
    ("dining-seafood.jpg","public/services/dining-seafood.webp",1000, 62),
    ("dining-team.jpg",   "public/services/dining-team.webp",   1000, 60),
    ("Garden.png",    "public/services/garden-detail-v2.webp",1100, 64, 0.635),  # top only: hides the dog (dog walking is not offered)
    ("car.png",       "public/services/van.webp",          1200, 66),
    ("customer_service.png", "public/careers.webp",        1200, 66),
]
PHOTO_DIR = os.path.expanduser("~/Documents/Claude/WiCare")

if __name__ == "__main__":
    args = sys.argv[1:]
    if len(args) >= 2 and not args[0].startswith("--"):
        width = quality = None
        if "--width" in args:   width = int(args[args.index("--width") + 1])
        if "--quality" in args: quality = int(args[args.index("--quality") + 1])
        enc(args[0], args[1], width, quality or 62)
    else:
        for name, dst, w, q, *rest in STANDARD:
            src = os.path.join(PHOTO_DIR, name)
            if os.path.exists(src):
                enc(src, dst, w, q, rest[0] if rest else None)
            else:
                print(f"skip (missing): {src}")
