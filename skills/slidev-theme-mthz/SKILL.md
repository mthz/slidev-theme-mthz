---
name: slidev-theme-mthz
description: Layouts, components and conventions of the Slidev theme slidev-theme-mthz (lecture decks) - cover/end with author/institution info, two-column slots, the teaching block layouts recap/vote/exercise/questions, index (references), toc, Figure, note, Footnotes, pdf, LectureVideo, colours via themeConfig. Use together with the generic `slidev` skill whenever writing or editing slides in a deck whose headmatter says `theme: mthz` or `theme: ./slidev-theme-mthz`.
---

# slidev-theme-mthz

A light-only Slidev (≥ 53) theme for lectures. Prefer the theme's layouts and components over hand-written HTML/CSS; a full demo of everything below is in `example.md` of the theme package (`node_modules/slidev-theme-mthz/example.md`), live at https://mthz.github.io/slidev-theme-mthz/.

## Setup facts

- Headmatter: `theme: mthz` (installed via `pnpm add github:mthz/slidev-theme-mthz`) or `theme: ./slidev-theme-mthz` (git submodule).
- The theme ships a `vite.config.ts` with a Windows/Vite 8 drive-letter workaround; Slidev merges it automatically. Don't add a copy to the deck.
- Slidev 53 needs `markdown-it` pinned to 14 in the deck's `pnpm-workspace.yaml` (`overrides: { markdown-it: ^14.1.0 }`); symptom otherwise: `ERR_PACKAGE_PATH_NOT_EXPORTED … markdown-it/lib/token.mjs`.
- Fonts are bundled (offline-safe); the theme forces `colorSchema: light`. Don't write dark-mode styles.
- Asset paths in frontmatter and component props: absolute from the deck's `public/` (`/img/diagram.png`). The theme's components resolve them against the deck base URL, so builds under a sub-path work.

## Layouts

| Layout | Frontmatter | Content |
|---|---|---|
| `cover` | `image`, `imageAlt`, `background`, `meta` (force info block on/off); per-slide overrides `email`, `institution`, `semester`, `date` | `# title`, optional subtitle paragraph. Info block (author, email, `institution · semester · date`) comes from the deck headmatter keys `author`, `email`, `institution`, `semester`, `date`; shown on slide 1 when `author` is set. Use `cover` again for a closing slide (no info block there). |
| `intro` | `background` | Block opener, `# title` + subtitle paragraph. |
| `section` | `background` | Divider between parts. |
| `default` | `colspan`, `gap`, `colclick` | Normal slide; also accepts `::left::` / `::right::` / `::bottom::` (same as `two-cols-flex`). |
| `two-cols-flex` | `colspan` (left width of 12, 1–11, default 6), `gap` (default true), `colclick` (reveal right column on click) | Text above, then `::left::`, `::right::`, optional `::bottom::` full width. |
| `image-header-intro` | `imageHeader`, `imageRight` | Chapter opener with images. |
| `toc` | `columns`, `minDepth`, `maxDepth`, `mode` (passed to `<Toc/>`) | Optional heading (default "Table of Contents"). Use `columns: 2`/`3` for long decks. |
| `index` | `entries:` list of `{ title, detail, key, uri, image }`, `numbered` | References / literature / image sources. `uri`: URL → new tab, slide number → jump. Heading in the slot. |
| `recap` | `label`, `duration` | Opens a unit: what the previous unit established, 3–5 bullets. |
| `vote` | `label` | One peer-instruction question per unit: `# title`, one lead-in paragraph, then a numbered list `1.`–`4.` (rendered as answer cards A–D). Exactly one plausible correct answer, distractors = real misconceptions. |
| `exercise` | `duration` (e.g. `5 min`), `label` | Hands-on task or lecturer-led discussion case. |
| `questions` | `label`, `duration` | Closes a unit: understanding questions, usually in `<v-clicks>`. |
| `end` | `background` | Closing slide in cover style; empty → "Thank you". Use it instead of a second `cover`. |

`background:` accepts a CSS color, a gradient or an image URL (images are dimmed, text turns white).

Slidev's built-in layouts (`center`, `fact`, `statement`, `quote`, `image-left`, `image-right`, `two-cols-header`, `full` …) also work; on image, full and iframe layouts the theme shows only the page number, without the bar.

The paragraph right after `# title` is rendered as a subtitle only on `cover`, `intro`, `section` and `image-header-intro`; on content slides it is normal body text.

### Unit structure

A teaching unit follows `recap` → content → `vote` → `exercise` → `questions`. These slides look identical across courses, so use the layouts instead of styling such slides by hand. Badge texts are English ("Recap", "Vote", "Exercise", "Check your understanding"); change one only with `label:`.

```markdown
---
layout: vote
---

# Vote, discuss, vote again

Students vote alone, discuss with a neighbour, then vote again. What does the second vote usually show?

1. The same answers as the first
2. More correct answers
3. Fewer correct answers
4. Votes spread out at random
```

## Components

```markdown
<Figure src="/img/pinhole.svg" width="400" cite="Forsyth & Ponce, 2011" caption="Pinhole model" title="optional heading" />

<note title="Definition" label="info">

Markdown body (keep the blank lines around it).

</note>
<!-- label: info (default) | success | warning | failure | tip | quote -->

<Footnotes x="r" y="row" separator>
  <Footnote number="1">A. Smith et al., Book Title, 2020</Footnote>
</Footnotes>
<!-- anchored to the slide bottom; x: l | r, y: row | col (stacked) -->

<pdf src="/paper.pdf" :page="3" />

<LectureVideo src="/videos/clip.mp4" poster="/videos/clip.jpg" youtube="<video id>" link="https://…" link-label="Article" />
<!-- live: plays the local file; PDF export: still image (export-poster, else poster) linking to YouTube + link.
     Always give a poster: videos are usually not committed, the export needs the still. -->

<tag>place</tag>        inline gray pill
<hl>important</hl>      inline cyan highlight
<cite>Author, Year</cite>  tiny italic source line
<p class="caption">What the figure shows</p>  short grey caption under a figure / chart / demo
```

Using the helpers in a deck's own components:

```ts
import { resolveAssetUrl } from 'slidev-theme-mthz/layout-helper'
```

## Colours

Defaults fit most decks. Override per deck in the headmatter, all keys optional:

```yaml
themeConfig:
  primary: '#3ab9d5'   # links, highlights, Mermaid node fill
  accent: '#038ccb'    # cover rule, video links, Mermaid borders
  exercise: '#00bfa5'
  questions: '#ff9100'
  recap: '#448aff'
  vote: '#7c4dff'
  bar: 'linear-gradient(90deg, #294380, #038ccb)'   # replaces the bar pattern
```

Mermaid diagrams get the theme palette automatically (flat shapes, no Mermaid 12 gradient or shadow); don't add `{theme: …}` unless a diagram needs a different look. Highlight at most one node, in a theme colour with white text: `style B fill:#038ccb,stroke:#038ccb,color:#fff`. Use `#rrggbb` for `primary`/`accent`, other formats are ignored by Mermaid.

## Style rules the theme assumes

- `**bold**` renders as a tinted pill: use it for a few key terms per slide, not whole sentences.
- `h1` is the slide title; use `h2`/`h3` sparingly inside a slide. `h6` renders as a small grey uppercase kicker.
- Page numbers are drawn by the theme on every non-cover slide; don't add your own.
- Change colours with `themeConfig` (above), not with CSS overrides.
- Grey caption text under a figure: `class="caption"`, not hand-written `text-xs text-gray-500` / `opacity-*`; sources go in `<cite>`.
- Markdown inside a component (`<note>`, `<Footnote>` …) needs blank lines around it, otherwise `**bold**` stays literal.

## Common mistakes

| Symptom | Fix |
|---|---|
| Image missing in build | Path without leading `/`, or file not in the deck's `public/` |
| Cover shows no author/institution | `author` missing in the deck headmatter, or not slide 1 (set `meta: true`) |
| Vote shows a plain list | `layout: vote` missing, or the answers are a bullet list instead of `1.`–`4.` |
| Video slide is blank in the PDF | `<video>` used directly; use `<LectureVideo>` with a `poster` |
