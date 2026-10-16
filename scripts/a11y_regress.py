#!/usr/bin/env python3
"""Re-verification of prior a11y / layout / content findings. Usage: python3 a11y_regress.py http://localhost:4173
Prints JSON; every key maps to a row in verified_issues.md."""
import json, sys, re
from playwright.sync_api import sync_playwright
BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4173"
o = {}
GUARD = r"\b[a-z]+(-[a-z]+)+ clip\b|presented on the public site|Featuring this part of John|provide personal background on the owner"
with sync_playwright() as p:
    b = p.chromium.launch()
    # ---------- desktop 1440 ----------
    ctx = b.new_context(viewport={"width": 1440, "height": 900}); pg = ctx.new_page()
    pg.goto(BASE, wait_until="networkidle"); pg.wait_for_timeout(1500)
    txt = pg.evaluate("document.body.innerText")
    o["content_guard_matches"] = sorted({m.group(0) for m in re.finditer(GUARD, txt, re.I)})
    o["text_present"] = {s: (s in txt) for s in ["Satisfied customer", "Evelyn S.", "Production schedule", "Shop Specs", "WG Motorsports", "Partner Ops", "Blueprint & Estimate", "Final QC", "9:00 AM"]}
    hero = pg.evaluate("document.getElementById('top').innerText")
    o["hero_has_hours"] = bool(re.search(r"\d\s?(AM|PM)", hero)); o["hero_has_place"] = ("Oakland" in hero or "Garrett" in hero)
    o["landmarks"] = pg.evaluate("({main:document.querySelectorAll('main').length,skip:[...document.querySelectorAll('a[href^=\"#\"]')].filter(a=>/skip/i.test(a.textContent)).length,navLabel:document.querySelector('header nav')?.getAttribute('aria-label')})")
    o["ids"] = pg.evaluate("[...document.querySelectorAll('section')].map(s=>s.id||'(no id) '+s.querySelector('h2')?.textContent.slice(0,30))")
    o["scroll_padding_top"] = pg.evaluate("getComputedStyle(document.documentElement).scrollPaddingTop")
    hdr = pg.evaluate("document.querySelector('header').getBoundingClientRect().height")
    pg.click("header nav a[href='#results']"); pg.wait_for_timeout(1500)
    o["results_anchor"] = {"header_h": hdr, "kicker_top": pg.evaluate("document.querySelector('#results p').getBoundingClientRect().top")}
    pg.evaluate("scrollTo(0,0)"); pg.wait_for_timeout(300)
    # focus ring on CTA
    seq = []
    for i in range(12):
        pg.keyboard.press("Tab")
        seq.append(pg.evaluate("(()=>{const a=document.activeElement,s=getComputedStyle(a);return [a.textContent.trim().slice(0,18),s.outlineStyle,s.outlineWidth,s.outlineColor,s.backgroundColor]})()"))
    o["focus_seq"] = seq
    o["global_focus_visible_rule"] = pg.evaluate("[...document.styleSheets].flatMap(s=>{try{return [...s.cssRules]}catch(e){return []}}).some(r=>r.selectorText&&/^(\\*|:focus-visible|\\*:focus-visible|a:focus-visible)/.test(r.selectorText.trim()))")
    # lightbox
    pg.evaluate("document.querySelector('#gallery').scrollIntoView()"); pg.wait_for_timeout(800)
    btn = pg.locator("#gallery button[aria-label^='Open']").nth(1); opener = btn.get_attribute("aria-label")
    btn.focus(); pg.keyboard.press("Enter"); pg.wait_for_timeout(500)
    lb = {"focus_in_dialog_after_open": pg.evaluate("!!document.activeElement.closest('[role=dialog]')")}
    inside = 0
    for i in range(6):
        pg.keyboard.press("Tab"); inside += pg.evaluate("!!document.activeElement.closest('[role=dialog]')")
    lb["tabs_inside_dialog_of_6"] = inside
    pg.keyboard.press("Escape"); pg.wait_for_timeout(500)
    lb["opener"] = opener; lb["focus_after_close"] = pg.evaluate("document.activeElement.getAttribute('aria-label')||document.activeElement.tagName")
    o["lightbox"] = lb
    o["marquee"] = pg.evaluate("(()=>{const t=document.querySelector('.marquee-track');const kids=[...t.children];return {items:kids.length,ariaHiddenItems:kids.filter(k=>k.closest('[aria-hidden=true]')).length}})()")
    # owner void at 1440
    pg.evaluate("document.querySelector('#owner').scrollIntoView()"); pg.wait_for_timeout(1200)
    o["owner_void_1440"] = pg.evaluate("(()=>{const card=document.querySelector('#owner [data-reveal=left]');const m=card.querySelector('.relative');const c=card.getBoundingClientRect(),r=m.getBoundingClientRect();return {card:Math.round(c.height),media:Math.round(r.height),void:Math.round(c.bottom-r.bottom)}})()")
    o["owner_stills"] = pg.evaluate("[...document.querySelectorAll('#owner video')].map(v=>v.getAttribute('poster'))")
    o["page_h_1440"] = pg.evaluate("document.body.scrollHeight")
    o["autoplay_videos"] = pg.evaluate("[...document.querySelectorAll('video')].map(v=>({auto:v.autoplay,loop:v.loop,controls:v.controls,preload:v.preload}))")
    o["pause_controls"] = pg.evaluate("[...document.querySelectorAll('button')].filter(b=>/pause|stop/i.test(b.getAttribute('aria-label')||b.textContent)).length")
    pg.wait_for_timeout(4000)
    o["infinite_anims_1440"] = pg.evaluate("document.getAnimations().filter(a=>a.effect&&a.effect.getTiming().iterations===Infinity&&a.playState==='running').map(a=>a.animationName)")
    o["phones"] = pg.evaluate("(()=>{const f=(root)=>[...document.querySelectorAll(root+' *')].filter(e=>e.childElementCount==0&&e.textContent.includes('334-4727')).map(e=>e.tagName+' inLink='+!!e.closest('a'));return {contact:f('#contact'),footer:f('footer'),telHrefs:[...new Set([...document.querySelectorAll('a[href^=tel]')].map(a=>a.getAttribute('href')))]}})()")
    o["blank_rels"] = pg.evaluate("[...document.querySelectorAll('a[target=_blank]')].map(a=>a.rel)")
    o["seo"] = pg.evaluate("({ldjson:document.querySelectorAll('script[type=\"application/ld+json\"]').length,canonical:document.querySelectorAll('link[rel=canonical]').length,ogImage:document.querySelector('meta[property=\"og:image\"]')?.content,ogUrl:!!document.querySelector('meta[property=\"og:url\"]'),twImage:!!document.querySelector('meta[name=\"twitter:image\"]'),desc:document.querySelector('meta[name=description]')?.content})")
    for path in ["/robots.txt", "/sitemap.xml"]:
        r = pg.request.get(BASE + path); o[path] = [r.status, r.headers.get("content-type")]
    ctx.close()
    # dark-mode badge
    ctx = b.new_context(viewport={"width": 1440, "height": 900}, color_scheme="dark"); pg = ctx.new_page(); pg.goto(BASE, wait_until="networkidle")
    o["dark_tech_badge"] = pg.evaluate("(()=>{const s=getComputedStyle(document.querySelector('.auto-tech-badge'));return [s.backgroundImage.slice(0,70),s.color]})()")
    o["dark_border_overrides"] = pg.evaluate("(()=>{const r={};for(const c of ['border-black/10','border-black/[8%]','border-black/[6%]']){const e=[...document.querySelectorAll('[class]')].find(x=>x.classList.contains(c));r[c]=e?getComputedStyle(e).borderTopColor:null}return r})()")
    ctx.close()
    # ---------- mobile 375 ----------
    ctx = b.new_context(viewport={"width": 375, "height": 812}, is_mobile=True, has_touch=True, device_scale_factor=2); pg = ctx.new_page()
    pg.goto(BASE, wait_until="networkidle"); pg.wait_for_timeout(800)
    m = {}
    sel = "header button.md\\:hidden"
    m["label"] = pg.get_attribute(sel, "aria-label"); m["text"] = pg.inner_text(sel); m["aria_controls"] = pg.get_attribute(sel, "aria-controls")
    pg.click(sel); pg.wait_for_timeout(200); pg.keyboard.press("Escape"); pg.wait_for_timeout(200)
    m["expanded_after_escape"] = pg.get_attribute(sel, "aria-expanded")
    m["results_link_in_menu"] = pg.locator("header a[href='#results']:visible").count()
    o["menu"] = m
    o["page_h_375"] = pg.evaluate("document.body.scrollHeight")
    o["sections_h_375"] = pg.evaluate("Object.fromEntries([...document.querySelectorAll('section')].map(s=>[s.id||s.querySelector('h2')?.textContent.slice(0,14),Math.round(s.offsetHeight)]))")
    o["tap_targets_375"] = pg.evaluate("[...document.querySelectorAll('#contact a, footer a, header button')].map(a=>[a.textContent.trim().slice(0,24),Math.round(a.getBoundingClientRect().width),Math.round(a.getBoundingClientRect().height)])")
    o["h1_lines_375"] = pg.evaluate("(()=>{const h=document.querySelector('h1');return Math.round(h.getBoundingClientRect().height/parseFloat(getComputedStyle(h).lineHeight))})()")
    o["call_btn_top_375"] = pg.evaluate("Math.round(document.querySelector('#top a[href^=tel]').getBoundingClientRect().top)")
    o["first_hours_y_375"] = pg.evaluate("(()=>{const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){if(/9:00 AM|9 AM/.test(n.textContent)){return Math.round(n.parentElement.getBoundingClientRect().top+scrollY)}}return null})()")
    ctx.close()
    b.close()
print(json.dumps(o, indent=1))
