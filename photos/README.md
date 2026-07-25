# Photos folder

Drop your trip images in **this folder**. The site looks for these exact filenames
(no code changes needed — missing files just show a labelled placeholder):

## Hero image (top of page)
- `hero.jpg` — a strong wide landscape/portrait shot. Shows behind the headline.

## App screenshots (Walkthrough section)
- `app-01-signin.jpg`
- `app-02-dashboard.jpg`
- `app-03-record.jpg`
- `app-04-grants.jpg`
- `app-05-reports.jpg`

## Photo gallery
- `photo-01.jpg` … `photo-12.jpg`

## Notes
- **Format:** `.jpg` is expected. To use `.png`/`.webp`, change the extensions in
  `index.html` (hero + app shots) and the `.jpg` in `script.js` (gallery loop).
- **Want more/fewer gallery photos?** Change `PHOTO_COUNT` near the top of `script.js`
  (default 12).
- **Sizes (suggested, not required):** hero ~1600×1200, app shots ~1600×1000,
  gallery ~1200×1200. Keep each file under ~500 KB for fast loading.
- Filenames are case-sensitive on most web hosts — keep them lowercase.
