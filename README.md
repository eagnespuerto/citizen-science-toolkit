# citizen-science-toolkit

[![license](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![made with](https://img.shields.io/badge/made%20with-HTML5-E34F26?logo=html5&logoColor=white)](https://github.com/eagnespuerto/citizen-science-toolkit)
[![website](https://img.shields.io/badge/website-live-brightgreen)](https://eagnespuerto.github.io/citizen-science-toolkit/)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-support%20me-FF5E5B?logo=kofi&logoColor=white)](https://ko-fi.com/eagnespuerto)
[![Linktree](https://img.shields.io/badge/Linktree-soitsagnes-43E55E?logo=linktree&logoColor=white)](https://linktr.ee/soitsagnes)

**Live site: https://eagnespuerto.github.io/citizen-science-toolkit/**

A handy static site full of information about citizen science, from the basics on research and journals to motivating achievements of citizen scientists. Current focus: Astronomy, Biology, Mathematics, and AI advancements.

## Pages
| Page | What's on it |
| --- | --- |
| `index.html` | Overview, discovery log, field tiles, getting-started steps |
| `basics.html` | What citizen science is, the scientific method, reading papers, peer review, journals, glossary |
| `astronomy.html`, `biology.html`, `mathematics.html`, `ai.html` | Why volunteers matter, gear, filterable projects and achievements per field |
| `projects.html` | Project finder filtered by field, time, place and search |
| `achievements.html` | Sourced ledger of volunteer discoveries, filter by field and sort by year |

## Run locally
No build step. Open `index.html`, or serve the folder:
```sh
python3 -m http.server 8000
```
Published with GitHub Pages from the `main` branch (root folder); every push to `main` redeploys the site.

## Editing content
Projects and achievements live in `assets/js/data.js`; add an object to `CS_PROJECTS` or `CS_ACHIEVEMENTS` and it appears on the finder, ledger and matching field page. Styles are in `assets/css/style.css` (light and dark themes via CSS tokens).

After changing a CSS or JS file, bump the `?v=` number on its `<link>`/`<script>` tags in every HTML page so browsers fetch the new file instead of a cached copy.

## Credits
Icons: [Font Awesome Free](https://fontawesome.com) (CC BY 4.0). Fonts: Young Serif, Public Sans and IBM Plex Mono via Google Fonts.
