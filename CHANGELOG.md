# Changelog

All notable changes to the ABYK project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive documentation structure in `docs/`
  - DEVELOPMENT.md - Full development guide
  - BRANCHING.md - Git workflow and branch protection strategy
  - ARCHITECTURE.md - System architecture overview
  - README.md - Documentation index
- CONTRIBUTING.md - Contribution guidelines
- Environment variable `NEXT_PUBLIC_SHOW_DESIGN` to control design showcase visibility
- GitHub Actions CI workflow for automated lint checks

### Changed
- Reorganized documentation files into `docs/guides/` and `docs/archive/`
- Updated main README.md to be more concise with links to detailed docs
- Improved .gitignore with better organization and comments
- Updated .env.example with all necessary variables
- Protected `/design` route - now only accessible in development mode
- Updated CI workflow to use `main` and `develop` branches

### Moved
- All icon files to `public/` directory
- Logo files to `public/brand/`
- Share images to `public/og/`
- Migration docs to `docs/archive/`
- Guide files to `docs/guides/`

### Removed
- Removed duplicate image files from root directory
- Removed test artifacts (playwright-report, test-results) from git tracking

## [1.0.0] - 2025-10-XX (Current Production)

### Added
- Next.js 15.5.4 with App Router
- React 19.2.0
- Tailwind CSS v4
- TypeScript 5.9.3
- Email delivery system (Resend + Gmail SMTP fallback)
- PDF generation with Hebrew support
- Wealth code calculator
- Payment integration with Grow.link
- Neumorphic design system
- PWA manifest and icons
- E2E testing with Playwright

### Features
- Calculator page for birthday-to-wealth-code conversion
- Result page with detailed code interpretation
- Sales page with payment integration
- Thank you page with PDF download and sharing
- Email delivery with PDF attachment
- Webhook integration for payment processing
- Responsive design for mobile and desktop
- RTL support for Hebrew content

---

## Versioning Strategy

### Version Numbers
- **Major** (X.0.0) - Breaking changes, major redesigns
- **Minor** (1.X.0) - New features, non-breaking changes
- **Patch** (1.0.X) - Bug fixes, small improvements

### Branch to Version Mapping
- `main` - Current production version
- `develop` - Next minor/major version in development
- `feature/*` - Unreleased features

### Release Process
1. Development happens in `develop` branch
2. When ready for release, create PR: `develop` → `main`
3. After merge, tag with version: `git tag v1.1.0`
4. Update this CHANGELOG with release date
5. Deploy to production (Vercel auto-deploys from `main`)

---

**Legend:**
- `Added` - New features
- `Changed` - Changes in existing functionality
- `Deprecated` - Soon-to-be removed features
- `Removed` - Removed features
- `Fixed` - Bug fixes
- `Security` - Security improvements
