# Photos folder

Drop your trip images in **this folder**. The site looks for these filenames
(no code changes needed — missing files just show a labelled placeholder).

**Accepted formats:** `.jpg`, `.jpeg`, or `.png` — use whichever you have for any
image below. The site tries each extension automatically, so `hero.png` and
`photo-03.jpeg` work just as well as `.jpg`.

## Hero image (top of page)
- `hero.jpg` / `hero.jpeg` / `hero.png` — a strong wide shot. Shows behind the headline.

## App screenshots (Walkthrough section)
- `app-01-signin`
- `app-02-dashboard`
- `app-03-record`
- `app-04-grants`
- `app-05-reports`

  …plus `.jpg`, `.jpeg`, or `.png`.

## Photo gallery
- `photo-01` … `photo-12` (each with a `.jpg`, `.jpeg`, or `.png` extension)

## Notes
- **Other formats** (e.g. `.webp`): add the extension to the `EXTS` list near the top
  of `script.js`.
- **Want more/fewer gallery photos?** Change `PHOTO_COUNT` near the top of `script.js`
  (default 12).
- **Sizes (suggested, not required):** hero ~1600×1200, app shots ~1600×1000,
  gallery ~1200×1200. Keep each file under ~500 KB for fast loading.
- Filenames are case-sensitive on most web hosts — keep them lowercase.
