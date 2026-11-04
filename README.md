# Color Studio

Minimal, professional color design workspace for web and Android developers — with **Bangladeshi Bengali (বাংলা)** as the primary UI language, optional **English** switching, and a perceptual **Culori** core color engine.

## Tech Stack

- **Framework:** Astro 5
- **UI Components:** React 19 + TypeScript (Strict)
- **Color Engine:** Culori 4 (`HEX`, `RGB`, `HSL`, `OKLCH`, perceptual sRGB gamut mapping, 6 harmony algorithms)
- **Typography:** Hind Siliguri (`@fontsource/hind-siliguri`) + Inter + Monospace
- **Styling & Tokens:** Tailwind CSS 4 (`@tailwindcss/vite`) + Semantic CSS Custom Properties
- **Testing:** Vitest

## Project Architecture

```text
src/
├── components/
│   ├── layout/        # AppHeader, AppSidebar, MobileNavDrawer, InspectorPanel, StatusBar, WorkspaceShell
│   ├── picker/        # SaturationValueCanvas, HueSlider, ChannelSliders, FormatInputsPanel
│   ├── ui/            # Button, IconButton, Input, Badge, SegmentedControl, Panel, Card, Toolbar, Divider, EmptyState, Kbd, Icon
│   └── workspace/     # ColorPickerWorkspace, ModuleContainerWorkspace, FoundationWorkspace, NotFoundWorkspace
├── config/
│   ├── navigation.ts  # Declarative navigation groups & route definitions
│   └── site.ts        # Workspace metadata, Web/Android target specs, shell shortcuts
├── i18n/
│   ├── locales/       # Natural Bangladeshi Bengali (bn, default) & English (en) dictionaries
│   ├── types.ts       # Strict compile-time translation contract
│   └── index.ts       # Language resolution & dictionary helpers
├── layouts/
│   └── BaseLayout.astro
├── lib/
│   ├── color/         # Pure TypeScript color engine (validation, gamut, convert, harmony, picker) + unit tests
│   ├── clipboard.ts   # One-click clipboard copy with iframe fallback
│   ├── cn.ts          # Zero-dependency className helper
│   ├── storage.ts     # Safe client preference persistence (cs:lang, cs:theme, panel states)
│   └── url.ts         # Subpath-aware URL helper for GitHub Pages
├── pages/             # Static Astro routes (/, /palettes, /contrast, /export, /foundation, /404)
├── styles/
│   ├── tokens.css     # Calibrated achromatic neutral surfaces, borders, restrained accent, typography & spacing tokens
│   └── global.css     # Hind Siliguri imports, Tailwind CSS @theme mappings & overflow-safe base styles
└── types/
    ├── navigation.ts
    └── ui.ts
```

## Commands

```bash
npm run dev      # Start development server
npm test         # Run Vitest unit test suite (conversions, validation, gamut, harmonies, i18n)
npm run check    # Run Astro + TypeScript strict diagnostics
npm run build    # Type-check and build production bundle to dist/
npm run preview  # Preview production build
```
