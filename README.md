# Cape Town, Summer 2026 — Study-abroad portfolio

A single-page case study of a 6-week study-abroad program in Cape Town, South Africa,
building a financial-tracking web app for **GRIT (Gender Rights in Tech)**.

Built with plain **HTML, CSS, and JavaScript** — no framework, no build step, no
dependencies (fonts load from Google Fonts). Hosts for free on GitHub Pages, Netlify,
or Vercel.

## Run it locally
Just open `index.html` in a browser. For the photo gallery's file-probing to work
reliably, serve it over a tiny local server instead of `file://`:

```bash
# Python (any recent version)
python -m http.server 5173
# then visit http://localhost:5173
```

## Add your photos
Put images in the [`photos/`](photos/) folder using the filenames listed in
[`photos/README.md`](photos/README.md). Missing images show a labelled placeholder,
so the site looks intentional even before every photo is in.

## Edit the content
All copy is drafted to be replaced with your real experience. Look for:
- **Your details:** name (`Shreya Shanmugam`), and "Summer 2026" — search & replace in
  `index.html` if needed.
- **`data-edit`** markers in `index.html` (e.g. the database name in the tech strip) —
  swap in the real tool.
- The **Overview**, **Reflection**, and **six-week Ledger** text in `index.html` —
  rewrite in your own voice.

## Files
| File | What it is |
|------|-----------|
| `index.html` | All content and structure |
| `styles.css` | All styling (design tokens at the top under `:root`) |
| `script.js` | Nav, scroll reveals, count-up stats, gallery + lightbox |
| `photos/` | Your images (see its README) |
