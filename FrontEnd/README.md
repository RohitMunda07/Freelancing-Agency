# Stackform — Agency Platform

Marketing site + client portal prototype for a MERN / Android (Kotlin, Compose) dev studio.
Built with React, Tailwind CSS, and GSAP (ScrollTrigger) for the scroll-driven timeline.

## Structure

```
src/
  components/
    layout/     Nav, Footer
    ui/         Button, Pill, StackCard, ProcessCard, ServiceIcons — shared primitives
    site/       Hero, Services, ProcessTimeline, Work, Reviews, Contact, Connect, PublicSite
    portal/     LoginScreen, Dashboard, ProjectCard, ProjectDetail, UpdatesFeed, InvoicesTable
  data/
    mockData.js   All mock content (projects, updates, invoices, services, process steps, socials)
  hooks/
    useGSAP.js    Wraps gsap.context for auto-cleaned ScrollTrigger animations
  index.css       Tailwind directives + font import + .dot-grid utility
  App.jsx         Top-level view switcher (site / login / dashboard)
```

Everything reads from `src/data/mockData.js` — update that file to change project names, service copy, social links, etc. without touching component code.

## Run it

```
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build

```
npm run build
npm run preview
```

## Notes

- The client portal login is a mock — any email/password "works" and just switches the view. Wire up real auth + an Express/MongoDB API when you're ready to go from prototype to product (swap the arrays in `mockData.js` for `fetch`/API calls).
- Reviews section (`src/components/site/Reviews.jsx`) is a placeholder — replace the `PLACEHOLDERS` array with real `{ quote, name, role }` objects once you have testimonials.
- Colors, fonts, and shadows live in `tailwind.config.js` under `theme.extend` — change them there and they propagate everywhere.
