# Planning artifacts (paused)

Working files from the bots' design and build passes, moved off the shared box on 2026-10-02. The site itself is in `web/` and `infra/`.

- `design/`: the four direction mockups (A Wenntech evolved, B editorial, C infra, D terminal; D was built), `tokens.css`, the expand-row spec (`expand-spec.md`), the generator (`build.py`, `common.py`) and `review/` screenshots of the deployed site.
- `engineering/scaffold-plan.md`: the original scaffold plan, plus desktop/mobile screenshots of the first D build.
- QA keyboard/focus checks live in `scripts/qa/`.

Content source: `web/src/content/projects.ts` is now the only copy of the project data. `scripts/sync-content.mjs` defaults to a box path that no longer exists; pass a file path if you use it again.
