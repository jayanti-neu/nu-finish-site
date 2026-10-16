# Nu‑Finish Auto Collision

Website for Nu Finish Auto Collision, a local auto body & collision repair shop in Oakland, MD. Built with React, Vite, and Tailwind CSS.

## Stack

- **React 19** — UI components
- **Vite** — development server and build tooling
- **Tailwind CSS v4** — utility-first styling via `@tailwindcss/vite`
- **Lucide React** — icon library

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the site.

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run videos:build` | Process and compress source videos |

## Browser regression checks

The scripts in `scripts/*.py` use Python, Playwright, and Pillow. Install their
dependencies and Chromium once:

```bash
python -m pip install playwright pillow
python -m playwright install chromium
```

Build and serve the site, then run a check against the preview URL in another
terminal:

```bash
npm run build
npm run preview
python scripts/overflow.py http://localhost:4173
python scripts/a11y_regress.py http://localhost:4173
```

The remaining Python scripts use the same optional URL argument. `static.sh`
also requires Bash, curl, and FFmpeg/ffprobe; run it from the repository root
with `bash scripts/static.sh . http://localhost:4173`.
