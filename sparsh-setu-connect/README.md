# Sparsh Setu Connect — NGO Website (Frontend Demo)

A fully frontend, production-quality demo website for **Sparsh Setu Connect**, a fictional NGO working on education, health, livelihood and environment programs.

This project is **100% static/frontend**:
- No backend, no APIs, no database.
- No authentication, no server-side code.
- All content lives in `src/data/siteData.js` as plain JavaScript.
- Forms (Volunteer registration & Contact) are **demo only** — on submit they validate inputs client-side, show a success/error toast, and save the entry to the browser's `localStorage`. Nothing is sent to any server.

## Tech Stack

- React 18 + Vite
- React Router DOM (client-side routing)
- Tailwind CSS
- Framer Motion (animations)
- React Icons

## Project Structure

```
sparsh-setu-connect/
├── public/
│   └── images/          # favicon/logo (all photo content is loaded from Unsplash URLs)
├── src/
│   ├── assets/
│   ├── components/      # Navbar, Footer, Button, Card, SectionTitle, Loader, Modal, Toast, GalleryCard, EventCard, StatisticCard
│   ├── data/             # siteData.js — all static content (stats, events, gallery, team, FAQs, etc.)
│   ├── hooks/            # useToast, useLocalStorage
│   ├── layouts/          # MainLayout (Navbar + animated page transitions + Footer)
│   ├── pages/            # Home, About, Gallery, Events, Volunteer, Contact, NotFound
│   ├── routes/           # AppRoutes.jsx (React Router route table)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## Getting Started

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build into /dist
npm run preview   # preview the production build locally
```

## Deploying to Vercel

This project needs **zero configuration** to deploy on Vercel:

1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects the Vite framework preset:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Click **Deploy** — no environment variables are required.

## Pages

| Route         | Description                                              |
|---------------|-----------------------------------------------------------|
| `/`           | Home — hero, stats, mission/vision, programs, gallery & events preview, testimonials, CTA |
| `/about`      | Story, mission, vision, objectives, timeline, team        |
| `/gallery`    | Masonry gallery with category filters & lightbox preview  |
| `/events`     | Searchable/filterable event cards with demo registration  |
| `/volunteer`  | Volunteer registration form (validated, saved to localStorage) |
| `/contact`    | Contact info, embedded map, contact form, FAQ accordion   |
| `*`           | Custom 404 page                                            |

## Notes

- Photos are loaded from Unsplash at runtime (public CDN URLs) — no images are bundled in the repo besides the small SVG favicon.
- All "submit" actions across the site (Volunteer form, Contact form, Newsletter signup, Event registration) are simulated and demo-only, per the project requirements — there is no backend of any kind.

## License

This is a demo project provided for educational/demonstration purposes.
