# Design D: project row expand spec

## Markup
- Each project row is a `<button aria-expanded aria-controls="readme-{slug}">` inside an `<li>`; the panel is a region with `id="readme-{slug}"`, `aria-labelledby` the button, `hidden` when closed.
- Button text order (what a screen reader hears): name, one-line summary, visibility ("private" / "public"). Stack tags live in the panel, not the row label.

## Keyboard
- Tab / Shift+Tab: move between rows (native order). Links inside an open panel join the tab order after their row.
- Enter / Space: toggle the row. Multiple rows may be open at once (no accordion auto-close), so nothing moves under the user's focus.
- Escape on an open row button, or anywhere inside its panel: close it and keep or return focus on that row button.
- Arrow Up/Down on rows: optional nicety, moves focus to previous/next row. Not required.

## Visual states
| State | Treatment |
|---|---|
| Rest | dashed bottom border `--border-row`, name in `--color-accent` |
| Hover | background `--color-row-hover` |
| Focus-visible | `--focus-ring` around the row plus 3px accent bar on the left (`box-shadow: inset 3px 0 var(--color-accent)`) |
| Open | background `--color-row-open`, left accent bar stays, a `▾` replaces `▸` before the name |

## Panel content (the "README")
Drawn as the bordered box from the mockup with a `── {slug}/README.md` label notched into the top border.
1. Name in `--font-type` at `--fs-h2`, then a dim meta line: apps · years · Alex's role.
2. Why it exists (1 to 2 sentences).
3. What was built, as `→` bullets.
4. How it works (architecture, 2 to 4 bullets).
5. Stack tags (bordered chips).
6. Footer: `$ git clone …` link for public projects, or a dim `# source is private` line.
7. Screenshot on the right on desktop; stacked below the text under 640px, max 70% width.

## Motion
- Open/close: height and opacity over `--expand-ms` with `--ease`; 0ms under reduced motion.
- Optional: the panel's first line "prints" with a 1-line typing effect only when motion is allowed; full text is always in the DOM.

## Hero (after Alex's note)
- Just `$ whoami` then "Alex Wenner." typed out with the blinking cursor, and the dim comment line below. No tagline sentence.
