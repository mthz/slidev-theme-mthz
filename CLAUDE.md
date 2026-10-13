# CLAUDE.md

Slidev (≥ 53) theme `slidev-theme-mthz` for lecture decks. Installed by users from GitHub (`pnpm add github:mthz/slidev-theme-mthz#vX.Y.Z`), not published to npm (`"private": true`).

- Preview / test: `pnpm install`, `pnpm run dev` (opens `example.md`), `pnpm run build`. Every new layout, component or frontmatter option gets a demo slide in `example.md`.
- Docs live in three places; update all three when the API changes: `README.md` (humans), `skills/slidev-theme-mthz/SKILL.md` (agents in deck projects), the header comment of the layout/component itself.
- `files` in `package.json` decides what users get. New top-level files must be added there; `pnpm pack` lists the result.
- Asset URLs from props/frontmatter always go through `resolveAssetUrl` (`layout-helper.ts`), so decks built under a sub-path work.
- Dynamic UnoCSS class names (`col-span-${n}`) are not detected; use inline styles (see `layouts/two-cols-flex.vue`).
- Light-only theme; English badge texts, overridable with `label:`.
- Colours are CSS variables with fallbacks: `var(--slidev-theme-<key>, <default>)`; Slidev sets `--slidev-theme-<key>` on `<body>` from the deck's `themeConfig`. New colours follow that pattern and get documented in README, SKILL.md and example.md.
- Setup files belong in `setup/` (Slidev only loads `<root>/setup/*.ts`). Use plain default exports, not `define*Setup` from `@slidev/types` (a devDependency, missing in decks).
- A layout or component must not use a component with its own file name (`toc.vue` → `<Toc/>` recurses); import the Slidev one explicitly.
- `public/` is copied into every deck's build (Slidev copies theme `public/` dirs) and is excluded from `files`; keep only small demo assets there (`public/demo/`). `screenshots/` is for the README only.
- `.github/workflows/demo.yml` builds `example.md` to GitHub Pages on every push to `main`; the lockfile is committed for it.
- `vite.config.ts` holds the Windows/Vite 8 drive-letter workaround; Slidev merges it into every deck. Keep it until Vite fixes the bug.
- `pnpm-workspace.yaml` pins `markdown-it` 14 for this repo's own preview (Slidev 53 breaks on 15); remove once Slidev supports 15, and drop the matching README note.
- Release: bump `version`, commit, `git tag vX.Y.Z && git push --tags`.
