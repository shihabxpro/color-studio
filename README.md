# Color Studio

Minimal, professional color design workspace foundation for web and Android developers.

## Tech Stack

- **Framework:** Astro 5
- **UI Components:** React 19 + TypeScript (Strict)
- **Styling & Tokens:** Tailwind CSS 4 (`@tailwindcss/vite`) + Semantic CSS Custom Properties

## Project Architecture

```text
src/
├── components/
│   ├── layout/        # Application shell: AppHeader, AppSidebar, MobileNavDrawer, InspectorPanel, StatusBar, WorkspaceShell
│   ├── ui/            # Reusable token-driven UI primitives (Button, IconButton, Input, Badge, SegmentedControl, Panel, Card, Toolbar, Divider, EmptyState, Kbd, Icon)
│   └── workspace/     # Modular workspace views & containers
├── config/
│   ├── navigation.ts  # Declarative navigation groups & route definitions
│   └── site.ts        # Workspace metadata, Web/Android target specs, shell shortcuts
├── layouts/
│   └── BaseLayout.astro
├── lib/
│   ├── cn.ts          # Zero-dependency className helper
│   └── storage.ts     # Safe client preference persistence
├── pages/             # Static Astro routes (/, /palettes, /contrast, /export, /foundation, /404)
├── styles/
│   ├── tokens.css     # Calibrated achromatic neutral surfaces, borders, restrained accent, typography & spacing tokens
│   └── global.css     # Tailwind CSS @theme token mappings & base styles
└── types/
    ├── navigation.ts
    └── ui.ts
```

## Design Principles

- **Calibrated Neutral Surfaces (`C=0`):** Workspace chrome uses strictly achromatic neutrals so surrounding UI never biases human color perception.
- **Subtle Structural Borders:** `1px` hairline dividers define workspace regions cleanly without heavy drop shadows.
- **Restrained Developer Accent:** Technical cobalt accent is reserved strictly for keyboard focus states, active indicators, and primary actions.
- **Responsive Shell:** Three-pane desktop studio (`Sidebar` + `Canvas` + `Inspector`) adapts smoothly to slide-over drawers on tablet and mobile viewports.

## Commands

```bash
npm run dev      # Start development server
npm run check    # Run Astro + TypeScript strict diagnostics
npm run build    # Type-check and build production bundle to dist/
npm run preview  # Preview production build
```

## GitHub Pages Deployment

This project includes `.github/workflows/deploy.yml` and automatic subpath routing (`SITE_URL` / `BASE_PATH` via `actions/configure-pages@v5`).

1. Push the `main` branch to a GitHub repository.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Every push to `main` (or manual **Run workflow**) builds and publishes `dist/` automatically.

