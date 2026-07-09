# Poorani S — Data Analyst Portfolio

A single-page portfolio built with React + Vite + Tailwind CSS, styled as a data-terminal / analytics console.

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

Output goes to `dist/`. Deploy `dist/` to Vercel, Netlify, GitHub Pages, or Render.

## Structure

```
src/
  App.jsx        # entire site (nav, hero, about, skills, experience, projects, contact)
  main.jsx       # React entry point
  index.css      # Tailwind imports
public/
  resume.pdf     # downloadable resume (replace with an updated version anytime)
```

## Customizing

- All content (bio, skills, internships, projects, contact info) lives in the data
  arrays at the top of `src/App.jsx` — edit those, no need to touch the JSX/markup.
- Colors use Tailwind's built-in `amber` / `neutral` palettes on a black background.
  Change the accent by swapping `amber-500` for another Tailwind color throughout.
- To add project screenshots, drop images into `public/` and reference them with an
  `<img src="/your-image.png" />` inside a project card.
- Replace `public/resume.pdf` with your latest resume — the filename must stay the same,
  or update the two `href="/resume.pdf"` links in `App.jsx`.

## Deploying

Quickest options:
- **Vercel**: import the repo, framework preset "Vite", no config needed.
- **Netlify**: build command `npm run build`, publish directory `dist`.
- **GitHub Pages**: run `npm run build`, push the `dist/` folder to a `gh-pages` branch (or use the `gh-pages` npm package).
