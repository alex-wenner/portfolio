# Alex Wenner — Portfolio

A responsive, progressively enhanced portfolio built with TypeScript and Vite,
deployed as a static site with **SST v3** on AWS (S3 and CloudFront). All project
content and links work without JavaScript; JavaScript adds search and category
filters. No GitHub credentials or runtime API calls are needed.

## Local development

Use Node.js 22.12+ (Node.js 24 recommended) and npm.

```sh
npm ci
npm run dev
```

```sh
npm run build       # TypeScript checks and production build
npm run preview    # Serve the production build locally
npm audit          # Check dependency advisories
```

There is no separate lint or automated test suite. Check desktop and mobile
layouts, keyboard navigation, category filters, search (including no results),
and the clear-filters action before publishing. Respect the system's reduced
motion preference, and verify that content still works with JavaScript disabled.

## Deploy with SST v3

Configure AWS credentials locally through your usual AWS profile or environment;
never put credentials in source code or `VITE_*` variables.

```sh
AWS_PROFILE=your-profile npm run deploy -- --stage preview
AWS_PROFILE=your-profile npm run deploy -- --stage production
```

SST prints the HTTPS CloudFront URL as the `url` output. The site builds into
`dist/`; only that directory is uploaded. Production resources are protected
against removal and retained on deletion. Use a non-production stage to test
deployment, and remove it afterward to avoid ongoing charges:

```sh
AWS_PROFILE=your-profile npm run remove -- --stage preview
```

AWS deployment incurs charges and requires suitable IAM permissions. A custom
domain is not configured; add one to the `StaticSite` in `sst.config.ts` once the
domain and DNS ownership are confirmed. No deployment has been performed as part
of creating this project.

SST is pinned to `3.9.28`: this v3 release avoids the vulnerable legacy AWS SDK
and OpenControl dependency chains found in `3.19.3` during implementation.
Recheck advisories and deployment compatibility before changing it; do not
use `npm audit fix --force`, which can upgrade SST to v4.

## Content and publication boundaries

Edit `index.html` for content, `src/style.css` for presentation, and `src/main.ts`
for filters. Repository rows in `.project-list` use `data-category="ai"` or
`data-category="web"`. When adding a category, add its filter button too. When
adding or removing rows, update the displayed “All work” count, initial result
count, and index date. Featured illustrations are original conceptual diagrams,
not product screenshots or measured attribution results.

The initial index contains all three owned public repositories returned by
GitHub search on September 8, 2026:

| Project | Source | Content notes |
| --- | --- | --- |
| prompt-lens | https://github.com/alex-wenner/prompt-lens | Description based on its README: black-box prompt attribution and observability, not automatic prompt optimization. |
| Rennew | https://github.com/alex-wenner/rennew | Description based on its README: local-first sessions and graph memory. Explicitly early-stage / pre-alpha. |
| Portfolio | https://github.com/alex-wenner/portfolio | This site. |

This is a curated snapshot, not a live or exhaustive history of contributions to
other owners' repositories. Follow the “Latest on GitHub” link for current work.

**Private repository search returned no accessible results.** That does not mean
no private work exists. Do not fabricate entries or automatically publish private
repository metadata. Add private-work references only after the owner supplies an
explicitly approved public title, summary, technologies, and optional public URL.
Use a non-link title when no public URL is approved, label it “Private”, and
never include confidential names, source code, repository URLs, client details,
tokens, or internal architecture. Everything in this repository and the built
site is public; hiding an element or omitting a link does not protect its data.

“Samo website” could not be confidently identified from the brief. This is an
original, restrained editorial design, not a recreation of an unverified
reference. Supply the exact URL to refine the visual direction.

Fonts load from Google Fonts with local sans-serif fallbacks; the site remains
usable if the font service is blocked. No analytics or tracking scripts are
included. Before launch, confirm the first-person copy and supply any additional
approved work references or preferred public contact URL.