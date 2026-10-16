#!/usr/bin/env bash
# Static source checks. Usage: bash static.sh . [base_url]
# Each line prints CHECK-ID, then matches (empty = PASS unless noted).
R=${1:-.}; BASE=${2:-http://localhost:4173}; F=$R/src/NuFinishSite.jsx
echo "== content guard (expect no matches)"; grep -nE "[a-z]+-[a-z]+(-[a-z]+)? clip|presented on the public site|Featuring this part of John|provide personal background on the owner" $F
echo "== kicker colour (expect text-brand-ink for dark={false})"; grep -n 'tracking-\[0.28em\] text-brand"' $F
echo "== overflow clip on shell (expect a match)"; grep -n "overflow-x-clip\|overflow-x: clip" $F $R/src/index.css
echo "== reveal right translate"; grep -n -A2 '\[data-reveal="right"\]' $R/src/index.css
echo "== main/skip link (expect matches)"; grep -nE "<main|Skip to" $F
echo "== global focus-visible (expect match)"; grep -nE "^\s*(\*|:where\(a, ?button\))?:focus-visible" $R/src/index.css
echo "== tel href (expect +1 E.164)"; grep -n "PHONE_HREF =" $F
echo "== dark !important count"; grep -c "!important" $R/src/index.css
echo "== dark selector mismatch (expect /\\[8%\\] variants)"; grep -n 'border-black\\/' $R/src/index.css
echo "== dead files (expect none)"; ls $R/src/App.css $R/src/assets/react.svg $R/public/race-car.jpg $R/public/nufinish-badge-dark.jpg $R/public/nufinish-wordmark.png 2>/dev/null; grep -n "ken-burns" $R/src/index.css
echo "== video stills (expect no front-of-building for ownerTrack/ownerRace/motorsports)"; grep -n -B3 'still: "/gallery/front-of-building.webp"' $F | grep -E "^[0-9]+-  [a-zA-Z]+: \{|still"
echo "== font @import (expect none)"; grep -n "@import url" $R/src/index.css
echo "== videos:build rmSync before existence check"; grep -nE "rmSync|existsSync\(sourcePath\)" $R/scripts/process-videos.mjs
echo "== CI"; ls -d $R/.github 2>/dev/null || echo "no .github"
echo "== version"; grep -n '"version"' $R/package.json; grep -n "^## \[" $R/CHANGELOG.md | head -3
echo "== index.html meta"; grep -nE "og:image|twitter:card|apple-touch-icon|theme-color|Family-run|free in-person|Free in-person" $R/index.html
echo "== asset dims"; python3 -c "
from PIL import Image
for f in ['public/nufinish-logo.png','public/nufinish-wordmark-transparent.png','public/spraygun.png','public/favicon.png']:
    import os; p=os.path.join('$R',f); print(f, Image.open(p).size, os.path.getsize(p))"
echo "== video encodes"; for f in $R/public/gallery/videos/web/*.mp4; do echo "$(basename $f) $(ffprobe -v error -select_streams v:0 -show_entries stream=bit_rate,color_transfer -of csv=p=0 $f) $(stat -c %s $f)"; done
echo "== robots/sitemap content-type (expect text/plain, application/xml)"; for u in robots.txt sitemap.xml; do curl -s -o /dev/null -w "$u %{http_code} %{content_type}\n" $BASE/$u; done
