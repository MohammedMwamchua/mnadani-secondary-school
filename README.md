# Mnadani Secondary School — Website

React components for the school website, structured for a real codebase.

## Structure

```
src/
  config/
    theme.js          Design tokens (colors, fonts, radii) — the single source of truth
  components/
    FontLoader.jsx     Loads Fraunces + Inter once, at the app root
    Nav.jsx             Top navigation
    Footer.jsx          Site footer
    ui.jsx              Shared primitives: Card, Section, PageHero, Tag, Kicker, Crest (real
                         school insignia, not a placeholder), MottoStrip, InitialsAvatar,
                         PhotoAvatar, AwardCard
  data/
    content.js          All editorial copy — school facts (motto, vision, P.O. Box, council),
                         subjects, timeline, headteachers, notable teachers, awards, nav links
  pages/
    Home.jsx, About.jsx, History.jsx, Academics.jsx,
    StudentLife.jsx, Alumni.jsx, Gallery.jsx, Contact.jsx
  App.jsx                Wires pages + layout together
```

## Editing content

Almost everything a non-developer would want to change lives in `src/data/content.js`:
school facts, subjects, timeline entries, former headteachers, contact info, nav labels.
Adding a timeline entry or a new subject is a one-line addition to an array — no JSX edits.

## Moving to real routing

`App.jsx` currently uses `useState` to switch pages, so this whole thing runs as a single
artifact/demo. To use it in a real app with `react-router-dom`:

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

<BrowserRouter>
  <Nav />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/history" element={<History />} />
    <Route path="/academics" element={<Academics />} />
    <Route path="/students" element={<StudentLife />} />
    <Route path="/alumni" element={<Alumni />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
  <Footer />
</BrowserRouter>
```

Every page component already avoids route-specific props (only `Home` takes `setPage`,
for its internal quick-link cards) — so the swap is mechanical.

## Wiring to a Django backend

Natural next step given your stack (React + Django + PostgreSQL):

- **News & Events** — replace the hardcoded list in a future `News.jsx` with a fetch to
  a Django REST Framework endpoint (`/api/news/`), backed by a simple `NewsPost` model.
- **Alumni submissions** — the "Submit your story" button on `Alumni.jsx` and the contact
  form on `Contact.jsx` are the two obvious POST targets — wire them to
  `/api/alumni-submissions/` and `/api/contact/` respectively.
- **Gallery** — swap the placeholder tiles for a `Photo` model with an `ImageField`,
  served via Django and rendered in the existing grid layout.

None of the visual layer needs to change for any of this — only the data source.

## The entrance signboard photo

`Contact.jsx` references the school's real entrance signboard at
`/images/mnadani-signboard.jpg`. Drop the actual photo file at that path in your app's
static/public assets folder (e.g. `public/images/mnadani-signboard.jpg` in Create React
App or Vite) and it will render automatically — until then it shows the tinted
placeholder background.

## Notable Teachers & Awards

`History.jsx` includes a "Notable Teachers" section (`NOTABLE_TEACHERS` in
`content.js`) using `PhotoAvatar`, which shows a dashed-circle placeholder until a real
photo path is supplied per entry. `Academics.jsx` and `StudentLife.jsx` each have an
"Awards & Recognition" section (`ACADEMIC_AWARDS` / `STUDENT_AWARDS`) using `AwardCard`,
styled with a dashed border to signal placeholder content — fill in real names, years,
and awarding bodies in `content.js` and the dashed styling can be dropped.

## Design tokens

All colors, the type scale, and radii are centralized in `src/config/theme.js`.
Change a value there and it propagates through every component — no hunting for
hardcoded hex codes across files.
