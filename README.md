# Justin Udu — Student Portfolio & Academic Management Website

COS 106 Term Project — Responsive Student Portfolio and Academic Management Website.

## Live site
udumunachukwu.netlify.app
## Repository structure

```
justin-portfolio/
├── index.html        Homepage — bio, photo, intro cards
├── about.html         Education timeline, career goals, hobbies, skills, audio intro
├── projects.html       Three sample/practice projects
├── planner.html         Interactive academic planner (add/complete/delete tasks)
├── contact.html          Contact form with JS validation
├── style.css              Shared stylesheet (all pages)
├── main.js                 Shared behavior: nav toggle, active link, scroll reveal, skill bars
├── planner.js                Task management logic (arrays, localStorage, DOM)
├── contact.js                  Form validation logic
├── assets/
│   └── justin.png               Profile photo
└── README.md
```

## How each requirement is met

**Homepage** — name/photo, welcome message, nav, bio, layout: `index.html`.

**About Me** — education table + timeline, career aspirations list, skills bars,
hobbies list, short audio intro slot: `about.html`.

**Projects** — three labeled sample/practice projects (password strength checker,
landing page clone, basic port scanner) since the student has no shipped projects
yet at 100 level. Clearly noted as practice work, with GitHub links: `projects.html`.

**Academic Planner** — add / complete / delete tasks, priority tagging, due dates,
overdue flagging, filter tabs (all/active/completed), live stats, persisted via
`localStorage`: `planner.html` + `planner.js`.

**Contact** — name, email, phone, message fields. JS validates: no empty fields,
valid email format (regex), phone is digits-only: `contact.html` + `contact.js`.

## Technical checklist

- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<table>`, `<audio>`
- Forms, tables, images, hyperlinks, lists — all present
- External stylesheet (`style.css`), no inline style blocks
- Responsive layout via Flexbox + CSS Grid, mobile nav toggle, breakpoints at 880px/640px
- Transitions/animations: hover states, scroll-reveal, skill bar fill, task insert animation
- Consistent dark theme with blue/red accent palette throughout
- JavaScript: event handling, DOM manipulation, arrays + functions, form validation,
  dynamic content updates, full CRUD-style task management

## Deployment notes

Deployed on Netlify as a Static Portfolio Website.
Thank you
