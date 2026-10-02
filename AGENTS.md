# AGENTS.md — Portfolio

Follow the shared "Alex stack conventions" skill.

- `infra/`: SST v3. `sst.config.ts` wires OOP stacks from `infra/stacks/`. Stages: nonprod, prod, pr.
- `web/`: Vite + React + TypeScript strict, CSS Modules, tokens in `src/styles/theme.css`.
- Content lives in `web/src/content/projects.ts`. Private projects never get a `repoUrl` (a test enforces it).
- Before a PR: `npm run typecheck && npm test && npm run build`.
- Deploy: `npm run deploy:nonprod`. Confirm with Alex before prod.
