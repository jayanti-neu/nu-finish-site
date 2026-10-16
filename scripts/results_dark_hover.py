#!/usr/bin/env python3
"""Dark-mode details in #results + header fit at 768/1024. Usage: python3 results_dark_hover.py http://localhost:4173
PASS: hovered 'Call' link colour contrast >= 4.5 vs section bg in dark; image divider not light in dark; header height <= 72 and nav not wrapping at 768/1024."""
import sys, json
from playwright.sync_api import sync_playwright
BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4173"
def L(c):
    f = lambda v: (v/255)/12.92 if v/255 <= 0.03928 else ((v/255+0.055)/1.055)**2.4
    return 0.2126*f(c[0])+0.7152*f(c[1])+0.0722*f(c[2])
o = {}
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1440, "height": 900}, color_scheme="dark"); pg.goto(BASE, wait_until="networkidle")
    a = pg.locator("#results > div > p a"); a.scroll_into_view_if_needed(); a.hover(); pg.wait_for_timeout(400)
    rgb = pg.evaluate("e=>{const c=document.createElement('canvas').getContext('2d');c.fillStyle=getComputedStyle(e).color;c.fillRect(0,0,1,1);return [...c.getImageData(0,0,1,1).data].slice(0,3)}", a.element_handle())
    bg = [15, 23, 42]
    o["dark_hover_link"] = {"color": rgb, "contrast_vs_#0f172a": round((max(L(rgb), L(bg))+.05)/(min(L(rgb), L(bg))+.05), 2)}
    o["dark_divider_bg"] = pg.evaluate("getComputedStyle(document.querySelector('#results article > div.grid')).backgroundColor")
    o["dark_article_border"] = pg.evaluate("getComputedStyle(document.querySelector('#results article')).borderTopColor")
    for w in [768, 900, 1024]:
        pg2 = b.new_page(viewport={"width": w, "height": 800}); pg2.goto(BASE, wait_until="networkidle")
        o[f"header_{w}"] = pg2.evaluate("(()=>{const h=document.querySelector('header'),n=document.querySelector('header nav');const links=[...n.querySelectorAll('a')].map(a=>a.getBoundingClientRect().top);return {headerH:Math.round(h.getBoundingClientRect().height),navRows:new Set(links.map(Math.round)).size,navRight:Math.round(n.getBoundingClientRect().right),navScrollW:n.scrollWidth,navClientW:n.clientWidth,logoRight:Math.round(h.querySelector('img').getBoundingClientRect().right),navLeft:Math.round(n.getBoundingClientRect().left)}})()")
        pg2.close()
    b.close()
print(json.dumps(o, indent=1))
