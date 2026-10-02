# Portfolio scaffold plan (Engineer)

Follows the shared skill "Alex stack conventions". Not built yet: waiting on Alex's design pick.

## Repo
- Build in `alex-wenner/portfolio` (currently just a README), so the old `Wenntech/Wenntech` stays as reference.

## Layout
```
portfolio/
  AGENTS.md, .github/skills/, .github/workflows/
  infra/
    sst.config.ts          # stages: nonprod, prod, pr
    stacks/naming.ts       # stackName()
    stacks/web-stack.ts    # WebStack class -> sst.aws.StaticSite (+ domain on prod)
  web/                     # Vite + React + TS strict, react-router
    src/theme.ts           # Designer's tokens (#0F0F0F, #BCFF2D, Inter)
    src/content/projects.ts  # typed project data from projects.md
    src/components/        # Nav, MenuOverlay, Hero, FeaturedProject, ToolingGrid, ClientSites, StackStrip, Footer (CSS Modules)
    src/pages/             # Home, ProjectCaseStudy (/work/:slug), NotFound
    public/projects/<slug>/  # screenshots
    tests/                 # Vitest + Testing Library
```

## Content model
`Project { slug, title, tagline, tier, stack[], role, period, visibility: "public" | "private", repoUrl?, liveUrl?, images[], caseStudy }`.
Private projects (NightScene, FitGoAI, Works by Sam Ø) get case studies and screenshots, no `repoUrl`. rapidstack is excluded.

## Infra
- Static only to start: one `WebStack` with `StaticSite` (S3 + CloudFront). No API until there's a reason (a contact form would be one Function + SES).
- Domain: TBD with Alex (wenntech.cloud or a personal domain), only on prod.

## CI
- `on-pr.yaml`: typecheck, lint, test, build.
- `deploy.yaml`: push to main -> nonprod; manual dispatch -> prod. AWS OIDC role, `sst unlock || true`, `sst deploy`.

## Open questions for Alex
1. Which AWS account deploys this, and is there an OIDC deploy role or should I plan one?
2. Domain?
