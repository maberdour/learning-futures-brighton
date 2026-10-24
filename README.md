# Learning Futures Brighton — Astro + Pages CMS

This project converts the approved static prototype v5 into an Astro static website.

## Preview locally

1. Install Node.js 22 or newer.
2. Run `npm ci` (uses the committed lockfile), then `npm run dev`.
3. Open the localhost address shown in the terminal.
4. Run `npm run build` to generate static HTML in `dist/`.

## Collaborative editing

1. Put this project in a GitHub repository.
2. Open [Pages CMS](https://pagescms.org/) and sign in using GitHub.
3. Grant organisers suitable access to the repository and Pages CMS.
4. Edit the five existing events or add new JSON event records. Each event has exactly three speaker fields.
5. Publishing commits changes to GitHub; the included GitHub Actions workflow builds a downloadable static artifact.

## Slides and video

Add slide files to `public/resources/` (or use externally hosted files), and enter their public URLs in the relevant speaker's `slides` field. Add externally hosted video URLs in `videoUrl`. Blank fields are hidden on the public site. Large videos should not be committed to GitHub.

## Next event

Edit Next event in Pages CMS to maintain the homepage event and its three speakers. Registration stays on Luma via the booking URL.

## Deployment

No credentials are required for the site itself. The workflow **builds only** and does not publish to your hosting. After confirming the hosting provider, domain, document root and SFTP method, add a secure deployment step using GitHub Actions secrets. Do not store passwords in code.

## Notes

- The two original Brighton JPEG assets are copied unchanged into `public/images/`.
- Content was migrated from the approved prototype v5, not re-researched.
- Event slugs use filenames such as `september-2026.json`.
- Set the actual domain in `astro.config.mjs` before launch.
- Complete Pages CMS account authorisation as described below.

## Development and organiser access

All source work is on `development`. No hosting deployment is configured. Do not merge or deploy without Mark's approval.

Open https://app.pagescms.org, sign in with GitHub, and install/authorise the Pages CMS GitHub App for `maberdour/learning-futures-brighton`. Select the **development** branch before editing. An account owner must complete the GitHub authorisation; repository configuration alone cannot grant this access. Give each organiser repository write access or invite them through Pages CMS as appropriate.

**Next event** edits the homepage event. Complete event details and all three speaker names/talk titles, then enable “Show event details”. Until enabled, the existing Luma placeholder remains. **Events** edits past events and creates event pages. Each event has exactly three required speaker objects, with optional slides and video links. Upload resources into the CMS media folder (`public/resources`), then use their `/resources/...` URLs. The original artwork folder is intentionally outside CMS media access.

Changes saved in Pages CMS commit to the selected branch. They do not publish the website. Keep edits on development while awaiting approval. The build-only GitHub Actions workflow uses `npm ci` and uploads the static output as an artifact.
