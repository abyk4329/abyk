# abyk.online

A minimal, performance-first web application built with **Astro**, **React islands**, and **Tailwind v4**.

## Features

- 🚀 **Static-first**: Zero JavaScript by default on content pages
- ⚡ **React islands**: Selective hydration for interactive components
- 🎨 **Neumorphic design**: Minimal UI with soft shadows
- ♿ **Accessible**: WCAG 2.1 AA compliant
- 📱 **Responsive**: Mobile-first design
- 🌓 **Dark mode**: Theme toggle with localStorage persistence

## Stack

- **Framework**: Astro v4+
- **UI Library**: React v18+
- **Styling**: Tailwind v4
- **Hosting**: Vercel
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

### Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## Project Structure

```text
abyk.online/
├── src/
│   ├── components/        # React components (islands)
│   ├── layouts/           # Astro layouts
│   ├── lib/              # Utility functions
│   ├── pages/            # Routes (file-based routing)
│   └── styles/           # CSS (tokens, typography, neumorphic)
├── public/               # Static assets
├── astro.config.mjs      # Astro configuration
├── tailwind.css          # Tailwind entry point
└── tsconfig.json         # TypeScript configuration
```

## Pages

- `/` - Home page
- `/calculator` - Loan payment calculator
- `/about` - About page
- `/terms` - Terms of Service
- `/privacy` - Privacy Policy

## Design System

See documentation files:

- `03-Design-System.md` - Color palette, shadows, spacing
- `04-Typography-Guide.md` - Font scale, weights, line heights

## Deployment

Deployed automatically to Vercel on push to `main` branch.

### Manual Deploy

```bash
vercel --prod
```

## License

All rights reserved.
