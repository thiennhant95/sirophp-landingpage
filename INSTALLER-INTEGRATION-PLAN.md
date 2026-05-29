# Installer Integration Plan

## Goal
Serve installer files (`install.ps1`, `install.sh`, `siro.phar`) from `https://sirophp.com` so visitors can run:
- `iwr https://sirophp.com/install.ps1 | iex` (Windows)
- `curl -sS https://sirophp.com/install.sh | bash` (macOS/Linux)
- Download `siro.phar` directly

## Files Changed

| # | File | Action | Type |
|---|------|--------|------|
| 1 | `public/downloads/install.ps1` | Copy from siro-installer | Static file |
| 2 | `public/downloads/install.sh` | Copy from siro-installer | Static file |
| 3 | `public/downloads/siro.phar` | Copy from siro-installer | Static file |
| 4 | `src/lib/installer.ts` | **New** — version config |
| 5 | `src/components/InstallCommands.tsx` | **New** — OS tabs + copy |
| 6 | `src/components/DownloadButton.tsx` | **New** — download + checksum |
| 7 | `src/components/InstallSection.tsx` | **New** — full section for homepage |
| 8 | `src/app/install/page.tsx` | **New** — /install page |
| 9 | `src/app/api/latest-version/route.tsx` | **New** — version API |
| 10 | `src/app/page.tsx` | **Edit** — add InstallSection + update FAQ |

## Implementation

### 1. Config — `src/lib/installer.ts`
- Version `0.32.0`
- Download URLs, checksums
- One-liner commands for each OS

### 2. InstallCommands.tsx
- Tabs: Windows / macOS / Linux / Composer
- Auto-detect OS via `navigator.platform`
- Copy-to-clipboard each command
- Styled to match Hero component's terminal style

### 3. DownloadButton.tsx
- Show version badge
- Download PHAR link
- Show SHA256 checksum on hover/click
- Track download (optional)

### 4. InstallSection.tsx
- Full-width section for homepage
- Headline: "Get Started in Seconds"
- Subhead: "Choose your platform"
- Renders InstallCommands
- Renders DownloadButton
- Links to /install page for details

### 5. /install page
- Full instructions
- System requirements
- Troubleshooting
- What's next (dev server, first CRUD)

### 6. API route — `/api/latest-version`
- Returns JSON: `{ version: "0.32.0", phar_url: "/downloads/siro.phar", sha256: "..." }`
- Can be used by installer scripts to check for updates

### 7. Homepage edits
- Add `<InstallSection />` between `<WhySiro />` and `<CTA />`
- Update FAQ "How do I install SiroPHP?" to include one-liner commands

## CI Integration

Trong `siro-installer/.github/workflows/build.yml`, job `release` đã được mở rộng:

### Flow

```
Tag v0.33.0 pushed
  → Build PHAR
  → Create GitHub Release
  → Extract version từ manifest.json
  → Clone SiroPHPLandingPage repo
  → Copy install.ps1, install.sh, siro.phar → public/downloads/
  → Commit + Push (nếu có thay đổi)
  → Trigger Vercel redeploy (nếu HOOK_URL được set)
  → Warm /api/latest-version cache
```

### GitHub Secrets required

| Secret | Mô tả |
|--------|-------|
| `LANDING_PAGE_PAT` | Personal Access Token với quyền push vào `SiroSoft/SiroPHPLandingPage` |
| `VERCEL_DEPLOY_HOOK_URL` | (Optional) Vercel Deploy Hook URL để trigger redeploy |

## Status
- [x] Plan created
- [x] Copy installer files to public/downloads/
- [x] Create src/lib/installer.ts
- [x] Create InstallCommands.tsx — OS tabs + auto-detect + copy
- [x] Create DownloadButton.tsx — live version từ API + GitHub checksum
- [x] Create InstallSection.tsx — section cho homepage
- [x] Create /install page — full guide + requirements + troubleshooting
- [x] Create /api/latest-version route — dynamic, fetch từ GitHub API
- [x] Update homepage page.tsx — thêm section + sửa FAQ
- [x] CI build.yml — thêm sync files + warm cache steps
- [x] Build & verify ✅ 27 pages, 0 errors

## Kết quả build

```
Route (app)             Type
┌ ○ /                   Static
├ ○ /install            Static (new)
├ ƒ /api/latest-version Dynamic (new) — tự động lấy version từ GitHub
├ ○ /blog/*             Static (7 posts)
├ ○ /docs, /features    Static
├ ○ /faq, /benchmarks   Static
└ (17 more pages)       Static
```

## Files created/modified

### Landing page (siro-php-landing)

| File | Action |
|------|--------|
| `public/downloads/install.ps1` | New |
| `public/downloads/install.sh` | New |
| `public/downloads/siro.phar` | New |
| `src/lib/installer.ts` | New + edited (thêm publishedAt) |
| `src/components/InstallCommands.tsx` | New |
| `src/components/DownloadButton.tsx` | New + live version |
| `src/components/InstallSection.tsx` | New |
| `src/app/install/page.tsx` | New |
| `src/app/api/latest-version/route.ts` | New — dynamic, GitHub API |
| `src/app/page.tsx` | Modified — thêm section + FAQ |
| `INSTALLER-INTEGRATION-PLAN.md` | Plan file này |

### Installer (siro-installer)

| File | Action |
|------|--------|
| `.github/workflows/build.yml` | Modified — thêm sync + warm cache |

## URLs

| URL | Description |
|-----|-------------|
| `https://sirophp.com/install` | Install guide page |
| `https://sirophp.com/api/latest-version` | Version API (dynamic, từ GitHub) |
| `https://sirophp.com/downloads/install.ps1` | Windows installer |
| `https://sirophp.com/downloads/install.sh` | macOS/Linux installer |
| `https://sirophp.com/downloads/siro.phar` | PHAR download |
