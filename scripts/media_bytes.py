#!/usr/bin/env python3
"""Initial-load and full-scroll transfer at 375 (mobile, DPR2) and 1440 (desktop), via CDP encodedDataLength.
Usage: python3 media_bytes.py http://localhost:4173
Reports hidden-variant leakage: MP4 requests on mobile, mobile-webp downloads on desktop, eager brand PNGs.
NOTE: test Chromium lacks H.264, so MP4 *body* bytes are unreliable; count MP4 *requests* instead.
PASS targets: mobile 375 issues 0 MP4 requests; desktop 1440 downloads 0 mobile-webp files; /nufinish-logo.png not requested (or < 50 KB)."""
import sys, json
from playwright.sync_api import sync_playwright
BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4173"
def run(w, h, m):
    with sync_playwright() as p:
        b = p.chromium.launch(); ctx = b.new_context(viewport={"width": w, "height": h}, is_mobile=m, has_touch=m, device_scale_factor=2 if m else 1)
        pg = ctx.new_page(); cdp = ctx.new_cdp_session(pg); cdp.send("Network.enable"); cdp.send("Network.setCacheDisabled", {"cacheDisabled": True})
        urls, enc = {}, {}
        cdp.on("Network.requestWillBeSent", lambda e: urls.__setitem__(e["requestId"], e["request"]["url"]))
        cdp.on("Network.loadingFinished", lambda e: enc.__setitem__(e["requestId"], e["encodedDataLength"]))
        pg.goto(BASE, wait_until="networkidle"); pg.wait_for_timeout(2500)
        def snap():
            files = [(urls[k].split("/")[-1], enc.get(k, 0)) for k in urls if urls[k].startswith(BASE)]
            nomp4 = sum(v for f, v in files if not f.endswith(".mp4"))
            return {"requests": len(files), "KiB_excl_mp4": round(nomp4/1024),
                    "mp4_requests": sorted({f for f, _ in files if f.endswith(".mp4")}),
                    "mobile_webp": sorted({f for k, f in ((k, urls[k]) for k in urls) if "mobile-webp" in f for f in [f.split('/')[-1]]}),
                    "brand_png": sorted({(f, v) for f, v in files if f.endswith(".png")}),
                    "before_after": len([f for f, _ in files if "-before-" in f or "-after-" in f])}
        r = {"initial": snap()}
        for y in range(0, 30000, 500):
            pg.evaluate(f"scrollTo(0,{y})"); pg.wait_for_timeout(100)
        pg.wait_for_timeout(2500); r["full_scroll"] = snap()
        r["lazy_imgs"] = pg.evaluate("[...document.images].filter(i=>i.loading!=='lazy').map(i=>i.getAttribute('src')).filter(Boolean)")
        r["hero_img"] = pg.evaluate("(()=>{const i=document.querySelector('#top img');return i?{src:i.getAttribute('src'),fetchpriority:i.getAttribute('fetchpriority'),loading:i.loading}:'css background'})()")
        b.close(); return r
print(json.dumps({"375": run(375, 812, True), "1440": run(1440, 900, False)}, indent=1))
