export const SITE_CONFIG = {
  name: 'Color Studio',
  version: '0.1.0',
  stage: 'Foundation',
  description:
    'Minimal, professional color design workspace for web and Android developers.',
  platforms: {
    web: {
      id: 'web',
      label: 'Web',
      formats: ['CSS Custom Properties', 'Tailwind CSS', 'OKLCH / sRGB'],
    },
    android: {
      id: 'android',
      label: 'Android',
      formats: ['Jetpack Compose Color.kt', 'Values colors.xml', 'ARGB Hex'],
    },
  },
  shortcuts: {
    toggleSidebar: '[',
    toggleInspector: ']',
  },
} as const;
