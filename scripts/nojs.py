#!/usr/bin/env python3
"""No-JS render check. Usage: python3 nojs.py http://localhost:4173  PASS: body text length > 500 with JS disabled."""
import sys
from playwright.sync_api import sync_playwright
BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4173"
with sync_playwright() as p:
    b = p.chromium.launch(); ctx = b.new_context(java_script_enabled=False); pg = ctx.new_page(); pg.goto(BASE)
    n = len(pg.inner_text("body")); print({"nojs_body_text_len": n, "PASS": n > 500}); b.close()
