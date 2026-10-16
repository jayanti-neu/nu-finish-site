#!/usr/bin/env python3
"""Horizontal overflow check. Usage: python3 overflow.py http://localhost:4173
PASS condition: documentElement.scrollWidth === configured viewport width (and innerWidth === viewport width under mobile emulation) at every width, before and after scrolling.
Note: with is_mobile emulation Chromium widens innerWidth to match overflowing content, so compare against the configured width."""
import json, sys
from playwright.sync_api import sync_playwright
BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4173"
INJECT = "--inject-fix" in sys.argv  # simulate .theme-shell{overflow-x:clip}
OFF = """(()=>{const W=document.documentElement.clientWidth;const r=[];document.querySelectorAll('body *').forEach(e=>{const b=e.getBoundingClientRect();if(b.width>0&&(b.right>W+1||b.left<-1)){let clipped=false;for(let p=e.parentElement;p;p=p.parentElement){const s=getComputedStyle(p);if(s.overflowX!=='visible'){clipped=true;break}}if(!clipped){const sec=e.closest('section');r.push({tag:e.tagName,section:sec?(sec.id||sec.className.slice(0,30)):'',cls:(typeof e.className==='string'?e.className:'').slice(0,60),reveal:e.getAttribute('data-reveal'),right:Math.round(b.right)})}}});return {scrollWidth:document.documentElement.scrollWidth,innerWidth:innerWidth,offenders:r.slice(0,8)}})()"""
res = {}
with sync_playwright() as p:
    b = p.chromium.launch()
    for w, mobile in [(320,1),(360,1),(375,1),(414,1),(768,0),(1024,0),(1440,0)]:
        ctx = b.new_context(viewport={"width": w, "height": 800}, is_mobile=bool(mobile), has_touch=bool(mobile))
        pg = ctx.new_page(); pg.goto(BASE, wait_until="networkidle")
        if INJECT: pg.add_style_tag(content=".theme-shell{overflow-x:clip}")
        before = pg.evaluate(OFF)
        h = pg.evaluate("document.body.scrollHeight")
        for y in range(0, h, 500):
            pg.evaluate(f"scrollTo(0,{y})"); pg.wait_for_timeout(40)
        pg.wait_for_timeout(1000)
        after = pg.evaluate(OFF)
        # results section only
        rs = pg.evaluate("(()=>{const s=document.getElementById('results');if(!s)return null;const W=document.documentElement.clientWidth;let m=0;s.querySelectorAll('*').forEach(e=>{const r=e.getBoundingClientRect();if(r.width>0)m=Math.max(m,r.right)});return {maxRight:Math.round(m),clientWidth:W}})()")
        res[w] = {"initial": {k: before[k] for k in ("scrollWidth","innerWidth")}, "after_scroll": after, "results_section": rs,
                  "viewport": w, "PASS": before["scrollWidth"] <= w and after["scrollWidth"] <= w}
        ctx.close()
    b.close()
print(json.dumps(res, indent=1))
