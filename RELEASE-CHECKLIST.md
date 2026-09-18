# SiroPHP Release Checklist

## Before Release

- [ ] Confirm Core and Installer versions are intentional and documented.
- [ ] Run `npm run check:version`.
- [ ] Run `npm run verify:release`.
- [ ] Run `npm run check:docs`.
- [ ] Run `npm run check:api`.
- [ ] Run `npm run check:links`.
- [ ] Run `npm run check:security`.
- [ ] Run `npm run lint`, `npm test`, and `npm run build`.
- [ ] Confirm the PHAR checksum matches `public/downloads/manifest.json`.

## Publish

- [ ] Create the Installer GitHub release first.
- [ ] Confirm installer assets and release tag are public.
- [ ] Merge the landing page change to `main`.
- [ ] Confirm `CI`, `Documentation`, and `Production Monitor` workflows pass.
- [ ] Verify `/` returns `200` in production.
- [ ] Verify `/docs` returns `200` and renders the docs landing page.
- [ ] Verify `/documentation` returns `200` and renders the documentation index.
- [ ] Verify representative `/documentation/*` API and guide routes return `200`.
- [ ] Verify `/api/latest-version` returns the release version.
- [ ] Verify `/install` and all download URLs in production.
- [ ] Verify `/sitemap.xml` and `/robots.txt` return `200`.

## After Release

- [ ] Confirm the scheduled Production Monitor has completed successfully.
- [ ] Check the release page and documentation for the new version.
- [ ] Record the release date and any migration notes.
