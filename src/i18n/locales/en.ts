import type { TranslationDictionary } from '../types';

export const en: TranslationDictionary = {
  meta: {
    siteDescription:
      'Minimal, professional color design workspace for web and Android developers.',
    skipToWorkspace: 'Skip to workspace',
  },
  header: {
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
    expandSidebar: 'Expand navigation sidebar ([)',
    collapseSidebar: 'Collapse navigation sidebar ([)',
    platformGroupLabel: 'Target platform context',
    languageGroupLabel: 'Switch UI language',
    switchToDark: 'Switch to dark neutral surface',
    switchToLight: 'Switch to light neutral surface',
    showInspector: 'Show inspector panel (])',
    hideInspector: 'Hide inspector panel (])',
  },
  nav: {
    primaryAriaLabel: 'Primary navigation',
    mobileDrawerAriaLabel: 'Navigation menu',
    toggleRail: 'Toggle rail',
    targetLabel: 'Target',
    switchToDarkFull: 'Switch to Dark Surface',
    switchToLightFull: 'Switch to Light Surface',
    languageLabel: 'Language',
    groups: {
      studio: 'Workspace',
      system: 'Architecture',
    },
    items: {
      workspace: {
        label: 'Overview',
        description:
          'Workspace shell, target specifications, and layout regions.',
      },
      palettes: {
        label: 'Palettes',
        description:
          'Dedicated canvas container for color sets and tonal scales.',
      },
      contrast: {
        label: 'Contrast',
        description:
          'Surface and foreground legibility verification workspace.',
      },
      export: {
        label: 'Export',
        description: 'Web CSS and Android Compose / XML token output container.',
      },
      foundation: {
        label: 'UI Foundation',
        description:
          'Design tokens, typography, spacing scale, and reusable UI primitives.',
      },
    },
  },
  inspector: {
    title: 'Inspector',
    ariaLabel: 'Workspace inspector',
    collapseLabel: 'Collapse inspector',
    closeLabel: 'Close inspector',
    workspaceContext: 'Workspace Context',
    activeView: 'Active View',
    surfaceCalibration: 'Surface Calibration',
    neutralValue: 'Neutral (C=0)',
    themeMode: 'Theme Mode',
    themeLight: 'Light',
    themeDark: 'Dark',
    targetSpecification: 'Target Specification',
  },
  statusBar: {
    ariaLabel: 'Workspace status',
    ready: 'Ready',
    achromaticLabel: 'Achromatic UI (C=0)',
    targetPrefix: 'Target:',
  },
  common: {
    backToOverview: 'Back to Overview',
    inspectFoundation: 'Inspect UI Foundation',
    viewModuleSlots: 'View Module Slots',
    reviewPrimitives: 'Review UI Primitives',
    returnToWorkspace: 'Return to Workspace',
  },
  overview: {
    pageTitle: 'Workspace Overview',
    toolbarTitle: 'Studio Canvas',
    toolbarBadge: 'Shell Ready',
    heading: 'Workspace Overview',
    phaseBadge: 'Foundation & Core Engine',
    description:
      'Modular application shell and calibrated achromatic workspace designed for web and Android color engineering.',
    emptyMeta: 'WORKSPACE STAGE · READY FOR MODULES',
    emptyTitle: 'Workspace shell & core color engine initialized',
    emptyDescription:
      'Responsive layout regions and the headless Culori color engine (HEX, RGB, HSL, OKLCH conversions, perceptual sRGB gamut mapping, and 6 harmony algorithms) are active. Palette Generator UI and export modules plug into this stage next.',
    webPanel: {
      title: 'Web Platform Architecture',
      description:
        'Structured to support browser-native color spaces, semantic CSS custom properties, and Tailwind CSS utility mappings.',
      tokenOutputLabel: 'Token Output',
      colorNotationLabel: 'Color Notation',
    },
    androidPanel: {
      title: 'Android Platform Architecture',
      description:
        'Prepared for Android resource conventions, supporting both modern Jetpack Compose Color declarations and XML value resources.',
      composeTargetLabel: 'Compose Target',
      resourceTargetLabel: 'Resource Target',
    },
    shortcutsPanel: {
      title: 'Workspace Keyboard Controls',
      badge: 'Ergonomics',
      items: [
        { label: 'Collapse or expand navigation rail', keys: ['['] },
        { label: 'Show or hide right inspector panel', keys: [']'] },
        { label: 'Navigate directly between studio sections', keys: ['1', '5'] },
        { label: 'Dismiss mobile navigation or inspector drawer', keys: ['Esc'] },
      ],
    },
    inspectorSections: [
      {
        title: 'Shell Geometry',
        properties: [
          { label: 'Header Height', value: '48px (3rem)', mono: true },
          { label: 'Sidebar Width', value: '224px / 56px', mono: true },
          { label: 'Inspector Width', value: '288px (18rem)', mono: true },
          { label: 'Status Bar', value: '28px (1.75rem)', mono: true },
        ],
      },
      {
        title: 'Core Engine & Stack',
        properties: [
          { label: 'Framework', value: 'Astro 5 + React 19', mono: true },
          { label: 'Color Engine', value: 'Culori (OKLCH / sRGB)', mono: true },
          { label: 'Formats', value: 'HEX · RGB · HSL · OKLCH', mono: true },
        ],
      },
    ],
  },
  modules: {
    palettes: {
      pageTitle: 'Palettes',
      toolbarTitle: 'Palettes Workspace',
      toolbarBadge: 'Module Slot',
      heading: 'Palettes Workspace',
      statusBadge: 'Unpopulated Container',
      summary:
        'Architectural canvas slot reserved for color palette organization and tonal scale management.',
      emptyTitle: 'Palette module slot ready',
      emptyDescription:
        'Core HEX, RGB, HSL, and OKLCH conversion utilities and six harmony algorithms are implemented in the headless color engine. Interactive Palette Generator UI mounts here next.',
      scopeHeading: 'Planned Module Boundaries',
      scopeBadge: 'Architecture Contract',
      moduleScope: [
        {
          label: 'Base Color Definitions',
          detail:
            'Structured container for primary, neutral, and semantic color entries.',
        },
        {
          label: 'Tonal Scale Slots',
          detail:
            'Dedicated grid stage reserved for perceptual OKLCH step ramps and stops.',
        },
        {
          label: 'Inspector Binding',
          detail:
            'Contextual selection hooks prepared for color editing and sRGB gamut diagnostics.',
        },
      ],
      inspectorSections: [
        {
          title: 'Container Status',
          properties: [
            { label: 'Module', value: 'Palettes', mono: true },
            { label: 'Core Engine', value: 'Culori Ready', mono: true },
            { label: 'Generator UI', value: 'Deferred', mono: true },
          ],
        },
      ],
    },
    contrast: {
      pageTitle: 'Contrast',
      toolbarTitle: 'Contrast Workspace',
      toolbarBadge: 'Module Slot',
      heading: 'Contrast Workspace',
      statusBadge: 'Unpopulated Container',
      summary:
        'Dedicated workspace shell reserved for surface-to-ink legibility auditing across web and Android targets.',
      emptyTitle: 'Contrast module slot ready',
      emptyDescription:
        'Accessibility calculation and contrast scoring UI are deferred to upcoming phases. The layout shell and inspector region are ready for integration.',
      scopeHeading: 'Planned Module Boundaries',
      scopeBadge: 'Architecture Contract',
      moduleScope: [
        {
          label: 'Foreground / Surface Pairs',
          detail:
            'Layout slot for evaluating text, icon, and border legibility on neutral and tinted surfaces.',
        },
        {
          label: 'Multi-Platform Preview',
          detail:
            'Reserved stage for comparing web CSS rendering and Android surface elevation.',
        },
        {
          label: 'Diagnostic Readouts',
          detail:
            'Inspector property rows structured for contrast ratio metrics.',
        },
      ],
      inspectorSections: [
        {
          title: 'Container Status',
          properties: [
            { label: 'Module', value: 'Contrast', mono: true },
            { label: 'State', value: 'Shell Ready', mono: true },
            { label: 'Audit UI', value: 'Deferred', mono: true },
          ],
        },
      ],
    },
    export: {
      pageTitle: 'Export',
      toolbarTitle: 'Export Workspace',
      toolbarBadge: 'Module Slot',
      heading: 'Export Workspace',
      statusBadge: 'Unpopulated Container',
      summary:
        'Token serialization workspace container for web stylesheets and Android resource pipelines.',
      emptyTitle: 'Export module slot ready',
      emptyDescription:
        'Code serialization and design system token transformers are deferred to upcoming phases. Switch target context between Web and Android in the header to verify shell metadata.',
      scopeHeading: 'Planned Module Boundaries',
      scopeBadge: 'Architecture Contract',
      moduleScope: [
        {
          label: 'Web Serializers',
          detail:
            'Output target slot for CSS Custom Properties and Tailwind theme configuration.',
        },
        {
          label: 'Android Compose',
          detail:
            'Output target slot for Kotlin Color declarations and theme structures.',
        },
        {
          label: 'Android XML Values',
          detail:
            'Output target slot for standard res/values/colors.xml resource files.',
        },
      ],
      inspectorSections: [
        {
          title: 'Container Status',
          properties: [
            { label: 'Module', value: 'Export', mono: true },
            { label: 'State', value: 'Shell Ready', mono: true },
            { label: 'Serializers', value: 'Deferred', mono: true },
          ],
        },
      ],
    },
  },
  foundation: {
    pageTitle: 'UI Foundation',
    toolbarTitle: 'UI Foundation & Design Tokens',
    toolbarBadge: 'System Reference',
    heading: 'UI Foundation',
    description:
      'Semantic surface tokens, Hind Siliguri & sans/mono typography hierarchy, 4px spacing rhythm, and reusable React UI primitives powering Color Studio.',
    tokensPanel: {
      title: 'Semantic Color Tokens',
      badge: 'Light & Dark Adaptive',
      roles: {
        '--cs-canvas': 'Primary workspace backdrop',
        '--cs-surface': 'Elevated panels, header, cards',
        '--cs-surface-subtle': 'Sidebar rail, recessed control wells',
        '--cs-surface-muted': 'Interactive hover & active fills',
        '--cs-border-default': 'Standard 1px structural hairline',
        '--cs-fg-primary': 'Primary high-contrast ink',
        '--cs-accent': 'Restrained focus & primary action',
        '--cs-accent-subtle': 'Restrained active tint surface',
      },
    },
    primitivesPanel: {
      title: 'Reusable UI Primitives',
      buttonsHeading: 'Buttons & Icon Buttons',
      primaryBtn: 'Primary Action',
      secondaryBtn: 'Secondary',
      ghostBtn: 'Ghost Action',
      smallBtn: 'Small (28px)',
      disabledBtn: 'Disabled',
      gridViewLabel: 'Grid view',
      activeToggleLabel: 'Active toggle',
      segmentedHeading: 'Segmented Control',
      notationAriaLabel: 'Notation preview',
      badgesHeading: 'Badges & Keyboard Caps',
      badgeNeutral: 'Neutral',
      badgeAccent: 'Accent Mono',
      badgeOutline: 'Outline',
      workspaceInputLabel: 'Workspace Name',
      workspaceInputPlaceholder: 'e.g. Core Neutral System',
      workspaceInputDefault: 'Android & Web Core',
      workspaceInputHint: 'Standard UI input for labels and metadata.',
      tokenInputLabel: 'Token Identifier',
      tokenInputHint:
        'Monospace tabular input for HEX, RGB, HSL, OKLCH literals and CSS keys.',
    },
    typographyPanel: {
      title: 'Typography Scale (Sans + Hind Siliguri + Mono)',
      samples: {
        heading2xl: 'Workspace Heading',
        headingXl: 'Section Title',
        headingLg: 'Panel Header',
        bodyBase: 'Standard developer documentation and body copy.',
        controlSm: 'Dense studio UI control, navigation item, and toolbar label.',
        monoXs: 'HEX #2563EB · oklch(0.5461 0.2152 262.88) · CSS',
        micro2xs: 'INSPECTOR METADATA · HEX · RGB · HSL · OKLCH',
      },
    },
    spacingPanel: {
      title: 'Spacing & Radius Rhythm',
      badge: '4px Base',
    },
    inspectorSections: [
      {
        title: 'Token Architecture',
        properties: [
          { label: 'Namespace', value: '--cs-*', mono: true },
          { label: 'Bengali Font', value: 'Hind Siliguri', mono: true },
          { label: 'Base Grid', value: '4px (0.25rem)', mono: true },
          { label: 'Border Hairline', value: '1px solid', mono: true },
        ],
      },
      {
        title: 'Component Primitives',
        properties: [
          { label: 'Controls', value: 'Button, IconButton, Input', mono: true },
          { label: 'Selection', value: 'SegmentedControl', mono: true },
          { label: 'Surfaces', value: 'Panel, Card, Toolbar', mono: true },
          { label: 'Metadata', value: 'Badge, Kbd, EmptyState', mono: true },
        ],
      },
    ],
  },
  notFound: {
    pageTitle: 'Not Found',
    meta: '404 · ROUTE NOT FOUND',
    title: 'Workspace route does not exist',
    description:
      'The requested path is outside the Color Studio navigation structure.',
  },
};
