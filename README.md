# Portfolio

A Vite + React portfolio with automatic markdown blog support.

## Project structure

```
portfolio/
├── public/
│   └── blog/
│       ├── posts/          ← DROP YOUR .md FILES HERE
│       │   └── my-post.md
│       └── index.json      ← Auto-generated at build time (don't edit)
├── src/
│   ├── components/
│   │   ├── Nav.jsx         ← Shared navigation
│   │   └── Globe.jsx       ← Three.js hero globe
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── BlogIndex.jsx   ← Blog listing with tag filter
│   │   ├── BlogPost.jsx    ← Individual post renderer
│   │   └── Contact.jsx
│   └── styles/
│       └── globals.css
└── vite.config.js          ← Contains blog-index plugin
```

## Adding a blog post

1. Create a `.md` file in `public/blog/posts/`:

```markdown
---
title: My Post Title
date: 2025-04-01
tags: [AI, Go, Backend]
excerpt: A one-sentence summary shown on the blog index.
---

# My Post Title

Your content here...
```

2. Run `npm run build` (or `npm run dev` — the index regenerates on every build start).

3. Your post is live at `/blog/my-post-filename`.

## Frontmatter fields

| Field       | Required | Description                        |
|-------------|----------|------------------------------------|
| `title`     | Yes      | Post title                         |
| `date`      | Yes      | ISO date (YYYY-MM-DD)              |
| `tags`      | No       | Array of tags for filtering        |
| `excerpt`   | No       | Short description for index card   |
| `readingTime`| No      | Auto-calculated if omitted         |

## Dev & deploy

```bash
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the build locally
```

Deploy the `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages).
The `public/_redirects` file handles SPA routing on Netlify.
For Vercel, add a `vercel.json`:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```
