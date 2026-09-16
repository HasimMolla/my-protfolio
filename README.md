# Molla Hasim — Portfolio

Personal portfolio. Single page, light and dark themes, built with Next.js 16 (App Router),
Tailwind CSS v4 and Motion.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # eslint
```

## Where things live

```
src/
  app/
    layout.js          fonts, metadata, theme provider
    page.js            section composition + Person JSON-LD
    globals.css        design tokens, base styles, utilities
  components/
    sections/          nav, hero, stack, experience, projects, contact, footer
    ui/                reveal, text-reveal, spotlight-card, cursor-glow,
                       flip-portrait, link-preview, copy-email, section, local-clock
    theme/             next-themes provider + toggle
    icons/             brand glyphs (generated once from simple-icons, not a runtime dep)
  lib/
    data.js            all copy, links, projects, stack, experience
    hooks.js           useHydrated / useMediaQuery
    utils.js           cn()
```

**Editing content:** everything visible on the page — bio, links, projects, stack,
experience — lives in `src/lib/data.js`. You shouldn't need to touch a component to
update the site.

A project's `tech` array holds **brand-icon keys** (`"nextjs"`, `"react"`, …) from
`components/icons/brand-icons.jsx`, not free text — the cards render them as a row of
marks. `linkPreviews` in the same file supplies the screenshots for the hover previews
in the intro copy.

## Theming

Colours are CSS custom properties on `:root` and `.dark` in `globals.css`, exposed to
Tailwind through `@theme inline`. `next-themes` toggles the `dark` class on `<html>`;
light is the default for first-time visitors.

The signature is black ink on transparency — `.signature-ink` inverts it in dark mode,
so there's only one asset to maintain.

## Assets

| File | Used for |
| --- | --- |
| `public/assets/signature.png` | nav logo, hero sign-off, footer |
| `public/assets/portrait.jpg` | hero photo, OG/Twitter image |
| `public/assets/avatar.jpg` | contact card |
| `public/assets/project/*.jpg` | project cards |

## Notes

- **ESLint is pinned to v9.** `eslint-config-next@16` declares `eslint >=9` but its
  bundled parser doesn't implement the scope-manager API ESLint 10 requires — v10 fails
  with `scopeManager.addGlobals is not a function`. Move to v10 once Next ships a
  compatible parser.
- Motion respects `prefers-reduced-motion` throughout: reveals, the character-by-character
  hero, and the cursor glow all render their end state (or nothing) when it's set.
- `scroll-padding-top` on `<html>` handles the sticky-header offset for anchor links.
  Don't also add `scroll-mt-*` to sections — the two stack and overshoot.

Deployed on Vercel.
