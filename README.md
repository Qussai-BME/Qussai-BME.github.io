# Qussai Adlbi — Research Portfolio

Personal research-portfolio site. React + Vite + TypeScript, deployed as a static site to GitHub Pages.

## Content source

All text content (research projects, software, education, CV data) lives in one file:
`client/src/content/portfolio.ts`. Edit that file to change content anywhere on the
site, including the on-site CV. Page components under `client/src/pages/` render
that data; they don't hold content themselves.

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/research` | Research index (all projects) |
| `/research/:slug` | Individual research project detail |
| `/systems` | Software platforms (MyoControl, MyoAdapt, BioSignal-FM, MyoSim) |
| `/outputs` | All outputs by evidence type (publications, manuscripts, software, in-progress) |
| `/about` | Academic background and research philosophy |
| `/cv` | Full CV, rendered from the same content file |
| `/contact` | Contact links |

Routing is client-side (`wouter`). `client/public/404.html` and the redirect
script in `index.html` implement the standard GitHub Pages SPA fallback, so
direct links and refreshes on any route resolve correctly.

## Scholarship-specific pages (not linked from navigation)

`client/public/{kaust,daad,eminent,emai,maia,said,chevening,eiffel,
fulbright,emmah,microscom,stipendium,turkiye,bseisu}/` each contain a
self-contained static site (`index.html`, `cv.html`, `evidence.html`,
`assets.css`) tailored to that specific programme. These build into the
same deployment (e.g. `qussai-bme.github.io/kaust/`) but are deliberately
**not linked from the main site's navigation** — they're meant to be
shared individually with a specific recommender, committee, or
university, not discovered by a general visitor. See
`INTERNAL_STRATEGY_NOTES.md` (kept outside this repository) for status,
priority, and verification notes per programme — none of that internal
material is duplicated here.

## Visual assets

All diagrams (hero visual, cross-subject generalisation diagram, research
trajectory, systems map, logo mark) are inline SVG in `client/src/components/Diagrams.tsx`,
not external image files. Nothing needs to be added before building. The only
static image files are `public/favicon.svg`, `public/favicon-32.png`, and
`public/images/og-cover.png` (social-preview card) — all already in the repo.

To swap a diagram for a real photo, drop the file into `client/public/images/`
and replace the corresponding component in `Home.tsx` or `SiteChrome.tsx` with a
plain `<img>` tag.

## Local development

```bash
npm ci             # reproducible install from package-lock.json
npm run dev        # local dev server
npm run check      # TypeScript check
npm run build      # production build -> ./dist
npm run preview    # preview the production build locally
```

## Deployment

`.github/workflows/deploy.yml` builds and publishes `./dist` to GitHub Pages on
every push to `main`. One-time setup: in the repo's Settings → Pages, set
Source to "GitHub Actions".

The Europass CV used for applications is bundled at
`client/public/cv/Qussai_Adlbi_Europass_CV.pdf` and served from
`/cv/Qussai_Adlbi_Europass_CV.pdf`. Replace that file directly to update it —
it is not generated from `portfolio.ts`.

## Status

Live, actively maintained. Content changes as research progresses (manuscript
status, released software, new results); layout and page structure are stable.

## License

Site code: no license file included yet — treat as all-rights-reserved until
one is added. Individual research software repositories (MyoControl, MyoAdapt,
BioSignal-FM, MyoSim) carry their own licenses; see each repository.
