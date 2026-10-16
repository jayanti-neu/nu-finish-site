#!/usr/bin/env python3
"""Before & After (#results) checks: keyboard toggle, image bytes per viewport/DPR, dark mode, screenshots.
Usage: python3 results_section.py http://localhost:4173 [screenshot_dir]
Image-size PASS: at 375 CSS px no before-after file > 480w is fetched at DPR1; at 1440/DPR1 non-featured cards fetch the 480w file;
hidden (inactive) stage on mobile is not fetched until toggled, or is fetched lazily without layout shift.
Keyboard PASS: each toggle button reachable by Tab, activates with Enter and Space, aria-pressed updates, visible focus ring present."""
import json, sys, os
from playwright.sync_api import sync_playwright
BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4173"
SS = sys.argv[2] if len(sys.argv) > 2 else os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "shots")
os.makedirs(SS, exist_ok=True)
out = {}
def ba_requests(reqs):
    return sorted({r.split("/")[-1] for r in reqs if "/before-after/" in r})
with sync_playwright() as p:
    b = p.chromium.launch()
    # 1. bytes downloaded per viewport / DPR (scroll through whole section)
    for w, dpr, mobile in [(375, 1, True), (375, 2, True), (375, 3, True), (768, 1, False), (1024, 1, False), (1440, 1, False), (1440, 2, False)]:
        ctx = b.new_context(viewport={"width": w, "height": 800}, device_scale_factor=dpr, is_mobile=mobile, has_touch=mobile)
        pg = ctx.new_page(); sizes = {}
        pg.on("response", lambda r: sizes.__setitem__(r.url.split("/")[-1], int(r.headers.get("content-length", 0) or 0)) if "/before-after/" in r.url else None)
        pg.goto(BASE, wait_until="networkidle")
        pg.evaluate("document.getElementById('results').scrollIntoView()")
        top = pg.evaluate("document.getElementById('results').offsetTop"); h = pg.evaluate("document.getElementById('results').offsetHeight")
        for y in range(top - 800, top + h + 800, 300):
            pg.evaluate(f"scrollTo(0,{y})"); pg.wait_for_timeout(120)
        pg.wait_for_timeout(800)
        rendered = pg.evaluate("[...document.querySelectorAll('#results img')].map(i=>({file:(i.currentSrc||'').split('/').pop(),cssW:Math.round(i.getBoundingClientRect().width),visible:i.offsetParent!==null,complete:i.complete}))")
        out[f"bytes_{w}_dpr{dpr}"] = {"files": sizes, "count": len(sizes), "total_KiB": round(sum(sizes.values())/1024, 1), "imgs": rendered}
        ctx.close()
    # 2. mobile toggle: keyboard + hidden-stage fetch + CLS
    ctx = b.new_context(viewport={"width": 375, "height": 800}, device_scale_factor=2, is_mobile=True, has_touch=True)
    pg = ctx.new_page(); reqs = []
    pg.on("request", lambda r: reqs.append(r.url))
    pg.goto(BASE, wait_until="networkidle")
    pg.evaluate("document.getElementById('results').scrollIntoView()"); pg.wait_for_timeout(1500)
    before_toggle = ba_requests(reqs)
    k = {}
    k["groups"] = pg.evaluate("[...document.querySelectorAll('#results [role=group]')].map(g=>({label:g.getAttribute('aria-label'),buttons:[...g.querySelectorAll('button')].map(b=>[b.textContent,b.getAttribute('aria-pressed'),Math.round(b.getBoundingClientRect().width),Math.round(b.getBoundingClientRect().height)])}))")
    # focus the first toggle via Tab from the section heading link context
    pg.evaluate("document.querySelector('#results h2').setAttribute('tabindex','-1'); document.querySelector('#results h2').focus()")
    tabs = []
    for i in range(4):
        pg.keyboard.press("Tab"); pg.wait_for_timeout(100)
        tabs.append(pg.evaluate("(()=>{const a=document.activeElement;const s=getComputedStyle(a);return {txt:a.textContent.trim().slice(0,20),pressed:a.getAttribute('aria-pressed'),boxShadow:s.boxShadow.slice(0,60),outline:s.outlineStyle+' '+s.outlineWidth}})()"))
    k["tab_sequence"] = tabs
    # Tab lands on Before (1st), then After
    pg.evaluate("document.querySelector('#results h2').focus()")
    pg.keyboard.press("Tab"); pg.keyboard.press("Tab")
    k["focused"] = pg.evaluate("document.activeElement.textContent")
    pg.screenshot(path=os.path.join(SS, "results-375-focus-after.png"), clip=pg.evaluate("(()=>{const r=document.activeElement.closest('article').getBoundingClientRect();return {x:0,y:Math.max(0,r.top),width:375,height:Math.min(800,r.height)}})()"))
    y0 = pg.evaluate("document.querySelector('#results article').getBoundingClientRect().height")
    pg.keyboard.press("Enter"); pg.wait_for_timeout(600)
    k["after_enter"] = pg.evaluate("[...document.querySelectorAll('#results article')[0].querySelectorAll('[role=group] button')].map(b=>b.textContent+'='+b.getAttribute('aria-pressed'))")
    k["visible_img_alt_after_enter"] = pg.evaluate("[...document.querySelectorAll('#results article')[0].querySelectorAll('img')].filter(i=>i.offsetParent).map(i=>i.alt.slice(0,40)+' complete='+i.complete)")
    k["card_height_change_px"] = round(pg.evaluate("document.querySelector('#results article').getBoundingClientRect().height") - y0, 1)
    pg.keyboard.press("Shift+Tab"); pg.keyboard.press("Space"); pg.wait_for_timeout(300)
    k["after_space_on_before"] = pg.evaluate("[...document.querySelectorAll('#results article')[0].querySelectorAll('[role=group] button')].map(b=>b.textContent+'='+b.getAttribute('aria-pressed'))")
    k["live_region_or_announcement"] = pg.evaluate("document.querySelectorAll('#results [aria-live]').length")
    out["mobile_toggle"] = k
    out["mobile_before_after_requests_before_toggle"] = before_toggle
    out["mobile_before_after_requests_after_toggle"] = ba_requests(reqs)
    ctx.close()
    # 3. screenshots light/dark at 375 and 1440 + dark computed colours
    for scheme in ["light", "dark"]:
        for w in [375, 1440]:
            mobile = w < 768
            ctx = b.new_context(viewport={"width": w, "height": 900}, color_scheme=scheme, is_mobile=mobile, has_touch=mobile)
            pg = ctx.new_page(); pg.goto(BASE, wait_until="networkidle")
            pg.evaluate("document.querySelectorAll('[data-reveal]').forEach(e=>e.classList.add('in-view'))")
            pg.evaluate("document.getElementById('results').scrollIntoView()"); pg.wait_for_timeout(1500)
            pg.locator("#results").screenshot(path=os.path.join(SS, f"results-{scheme}-{w}.png"))
            if scheme == "dark":
                out[f"dark_{w}_computed"] = pg.evaluate("""(()=>{const g=s=>{const e=document.querySelector(s);if(!e)return null;const c=getComputedStyle(e);return {bg:c.backgroundColor,color:c.color,border:c.borderTopColor}};return {section:getComputedStyle(document.getElementById('results')).backgroundImage.slice(0,80),article:g('#results article'),gridDivider:g('#results article > div.grid'),figure:g('#results figure'),toggleGroup:g('#results [role=group]'),activeBtn:g('#results [role=group] button[aria-pressed=true]'),inactiveBtn:g('#results [role=group] button[aria-pressed=false]'),cardFooterBorder:g('#results article > div.border-t')}})()""")
            ctx.close()
    b.close()
print(json.dumps(out, indent=1))
