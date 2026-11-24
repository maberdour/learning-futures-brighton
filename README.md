# Learning Futures Brighton

A static event website for the Learning Futures Brighton community, built with **Astro 5**, managed through **Pages CMS**, and hosted on **GitHub Pages**.

**Live website:** https://maberdour.github.io/learning-futures-brighton/  
**Repository:** https://github.com/maberdour/learning-futures-brighton  
**Content editor:** https://app.pagescms.org  
**Event registration:** https://luma.com/futuresbri

## Architecture

- **Astro 5** builds static HTML, CSS and JavaScript. No application server or website database is required.
- **GitHub** is the source of truth for code, images and JSON event content.
- **Pages CMS** is a hosted, Git-backed headless CMS. It edits files in GitHub rather than maintaining a separate content database.
- **Luma** manages upcoming event details and registration; the homepage displays a Luma iframe.
- **GitHub Actions** installs dependencies, checks the project, builds it and deploys approved production changes.
- **GitHub Pages** serves the generated static website over HTTPS.

### Content flow

```text
Organiser -> Pages CMS -> main (JSON content commit)
                                  |
Developer -> development -> PR -> main
                                  |
                           GitHub Actions
                       npm ci / check / build
                                  |
                             GitHub Pages
                                  |
                            Public website

Luma -> embedded upcoming-event content in visitors' browsers
```

Past event data is read at build time. Updating JSON files requires a new successful deployment before visitors see the changes. The Luma iframe loads its event content from Luma in the visitor's browser, so changes made within the same Luma event can appear without rebuilding this site.

## Branches and publishing

| Branch | Purpose | Deployment |
| --- | --- | --- |
| `development` | Website code and design changes, testing and review | Runs checks and build; **does not publish** |
| `main` | Production website and organiser-managed event content | Successful builds **publish to GitHub Pages** |

### Organiser content updates

1. Open https://app.pagescms.org and sign in with GitHub.
2. Select `maberdour/learning-futures-brighton` and **the `main` branch**.
3. Open **Events** to edit or create past events, or **Next Event** to update the Luma iframe embed code.
4. Save. Pages CMS commits the content changes to `main`.
5. GitHub Actions checks, builds and deploys the updated website automatically. Monitor the run in the [Actions tab](https://github.com/maberdour/learning-futures-brighton/actions).

Organisers need the appropriate GitHub repository/Pages CMS permissions. Saving a change does not bypass build validation: if a build fails, the new content will not deploy.

### Website development changes

1. Work on `development`, not directly on `main`.
2. **Synchronise `development` with the latest `main` first**, so recent CMS event edits are retained.
3. Make and test changes on `development`; pushes trigger automated checks and a build, but not deployment.
4. Open a pull request from `development` to `main`, review the changes and obtain approval.
5. Merge the approved pull request. A successful `main` workflow publishes the changes.

GitHub Pages provides one public site for this repository. The `development` branch does **not** have its own automatically deployed preview URL. Use local preview or build artifacts for review.

## Content structure

- `src/data/events/*.json`: past event records. Each event has three speaker objects (`speaker1`, `speaker2`, `speaker3`), with names and talk titles plus optional descriptions, slides and video URLs.
- `src/data/next-event.json`: the `embedCode` field containing the Luma iframe HTML. This is the only field in the **Next Event** CMS editor.
- `.pages.yml`: Pages CMS content schema and media configuration.
- `src/pages/`: Astro pages and routes.
- `src/components/`: reusable website components.
- `src/layouts/` and `src/styles/`: shared layout and styling.
- `public/images/`: original Brighton artwork, retained unchanged.
- `public/resources/`: downloadable resources and CMS media uploads.

For past events, add a slides URL to the relevant speaker's `slides` field and an externally hosted video URL to `videoUrl`. Blank optional fields are hidden. Avoid committing large video files to GitHub. The original Brighton artwork is deliberately outside the CMS media folder.

## Local development

Requires **Node.js 22 or newer**.

```bash
npm ci
npm run dev
```

Open the local address printed by Astro. Before proposing a change, run:

```bash
npm run check
npm run build
npm run preview
```

The static production output is generated in `dist/`. `npm ci` uses the committed lockfile.

## Deployment configuration

The workflow is defined in `.github/workflows/build.yml`.

- On pushes to `development` or `main`, and on pull requests, it runs `npm ci`, `npm run check` and `npm run build`.
- It uploads `dist/` as a downloadable workflow artifact.
- Only a push to **`main`** uploads a GitHub Pages deployment artifact and runs `actions/deploy-pages`.
- GitHub Pages uses the repository's `github-pages` deployment environment.

Astro is configured in `astro.config.mjs` with:

```js
site: 'https://maberdour.github.io',
base: '/learning-futures-brighton',
```

These settings produce the current public URL: https://maberdour.github.io/learning-futures-brighton/

### Moving to a custom domain later

Keep GitHub Pages as the host. When ready, configure the custom domain in GitHub Pages, update the domain's DNS records, and adjust Astro's `site` and `base` settings (and any affected asset links). Verify HTTPS and the resulting links before switching over.

## Operations and resilience

- GitHub retains source and content history; keep an independent backup of the repository where practical.
- The public static site does not need Pages CMS to be available to serve existing content.
- If Pages CMS is unavailable, content remains in GitHub and can be edited there.
- Luma registration and embedded event content depend on Luma's availability.
- Review failed GitHub Actions runs before assuming a saved CMS change is live.
- Keep Astro and workflow dependencies updated through reviewed development changes.

The original Brighton artwork must not be cropped, retouched or regenerated without explicit approval.
