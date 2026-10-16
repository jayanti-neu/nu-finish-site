#!/usr/bin/env python3
"""Rendered-pixel text contrast. Usage: python3 contrast.py http://localhost:4173
Hides the element's text, screenshots it, and computes WCAG contrast of the computed text colour
against every (downsampled) background pixel. Reports min / p10 / median.
PASS: p10 >= 4.5 for normal text (>= 3.0 for large text >= 24px or >= 18.66px bold)."""
import io, json, sys
from PIL import Image
from playwright.sync_api import sync_playwright
BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4173"
def lum(c):
    f = lambda v: (v/255)/12.92 if v/255 <= 0.03928 else ((v/255+0.055)/1.055)**2.4
    return 0.2126*f(c[0]) + 0.7152*f(c[1]) + 0.0722*f(c[2])
def cr(a, b):
    la, lb = lum(a), lum(b); return (max(la, lb)+0.05)/(min(la, lb)+0.05)
T = [
 ("#services > div > div > p.text-brand", "Services kicker"),
 ("#results > div > div > p.text-brand", "Results (Before & After) kicker"),
 ("#gallery > div > div > p.text-brand", "Gallery kicker"),
 ("#owner > div > div > p.text-brand", "Owner kicker"),
 ("#contact p.text-brand", "Contact kicker"),
 ("#results h3", "Results card h3"),
 ("#results article p.text-slate-600", "Results card repair line"),
 ("#results > div > p.text-slate-600", "Results footer line"),
 ("#results figcaption >> nth=0", "Results 'Before' badge"),
 ("#results figcaption >> nth=1", "Results 'After' badge"),
 ("#results [role=group] button[aria-pressed=false]", "Results toggle inactive (mobile only)"),
 ("#results [role=group] button[aria-pressed=true]", "Results toggle active (mobile only)"),
 ("#process .absolute.inset-0.flex p", "Process video caption"),
 ("#owner .absolute.inset-x-0 p.text-brand", "Owner video kicker"),
 ("#owner .absolute.inset-x-0 p.text-white\\/90", "Owner video body"),
 ("section:has(.facility-card) .absolute.inset-0.flex p", "Facility video caption"),
]
def run(scheme, w):
    out = []
    with sync_playwright() as p:
        b = p.chromium.launch()
        mobile = w < 768
        pg = b.new_page(viewport={"width": w, "height": 900}, color_scheme=scheme, is_mobile=mobile, has_touch=mobile)
        pg.goto(BASE, wait_until="networkidle"); pg.wait_for_timeout(800)
        pg.evaluate("document.querySelectorAll('[data-reveal]').forEach(e=>e.classList.add('in-view'))")
        pg.wait_for_timeout(1000)
        for sel, label in T:
            loc = pg.locator(sel).first
            if loc.count() == 0 or not loc.is_visible():
                out.append({"label": label, "result": "not visible"}); continue
            loc.scroll_into_view_if_needed(); pg.wait_for_timeout(700)
            h = loc.element_handle()
            info = pg.evaluate("e=>{const c=document.createElement('canvas');c.width=c.height=1;const x=c.getContext('2d');x.fillStyle=getComputedStyle(e).color;x.fillRect(0,0,1,1);const s=getComputedStyle(e);return {rgba:[...x.getImageData(0,0,1,1).data],fs:parseFloat(s.fontSize),fw:+s.fontWeight}}", h)
            col = info["rgba"][:3]; a = info["rgba"][3]/255
            pg.evaluate("e=>{for(const k of [e,...e.querySelectorAll('*')]){k.dataset.oc=k.style.cssText;k.style.setProperty('color','transparent','important');k.style.setProperty('-webkit-text-fill-color','transparent','important')}}", h)
            png = loc.screenshot()
            pg.evaluate("e=>{for(const k of [e,...e.querySelectorAll('*')]){k.style.cssText=k.dataset.oc||''}}", h)
            im = Image.open(io.BytesIO(png)).convert("RGB"); im = im.resize((max(1, im.width//4), max(1, im.height//4)))
            rs = sorted(cr(tuple(int(col[i]*a + px[i]*(1-a)) for i in range(3)), px) for px in im.getdata())
            large = info["fs"] >= 24 or (info["fs"] >= 18.66 and info["fw"] >= 700)
            need = 3.0 if large else 4.5
            p10 = rs[len(rs)//10]
            out.append({"label": label, "text_rgb": col, "font_px": info["fs"], "min": round(rs[0], 2), "p10": round(p10, 2), "median": round(rs[len(rs)//2], 2), "need": need, "PASS": p10 >= need})
        b.close()
    return out
res = {}
for scheme, w in [("light", 1440), ("light", 375), ("dark", 1440), ("dark", 375)]:
    res[f"{scheme}_{w}"] = run(scheme, w)
print(json.dumps(res, indent=1))
