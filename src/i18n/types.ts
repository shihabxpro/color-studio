import type { InspectorSection, WorkspaceSectionId } from '@/types/navigation';
import type { Language } from '@/types/ui';

export type { Language };

export interface ModuleTranslation {
  pageTitle: string;
  toolbarTitle: string;
  emptyTitle: string;
  emptyDescription: string;
  inspectorSections: InspectorSection[];
}

export interface TranslationDictionary {
  meta: {
    siteDescription: string;
    skipToWorkspace: string;
  };
  header: {
    openMenu: string;
    closeMenu: string;
    expandSidebar: string;
    collapseSidebar: string;
    platformGroupLabel: string;
    languageGroupLabel: string;
    switchToDark: string;
    switchToLight: string;
    showInspector: string;
    hideInspector: string;
  };
  nav: {
    primaryAriaLabel: string;
    mobileDrawerAriaLabel: string;
    toggleRail: string;
    targetLabel: string;
    switchToDarkFull: string;
    switchToLightFull: string;
    languageLabel: string;
    groups: {
      studio: string;
      system: string;
    };
    items: Record<
      WorkspaceSectionId,
      {
        label: string;
        description: string;
      }
    >;
  };
  inspector: {
    title: string;
    ariaLabel: string;
    collapseLabel: string;
    closeLabel: string;
    workspaceContext: string;
    activeView: string;
    surfaceCalibration: string;
    neutralValue: string;
    themeMode: string;
    themeLight: string;
    themeDark: string;
    targetSpecification: string;
  };
  statusBar: {
    ariaLabel: string;
    ready: string;
    achromaticLabel: string;
    targetPrefix: string;
  };
  common: {
    backToPicker: string;
    returnToWorkspace: string;
  };
  picker: {
    pageTitle: string;
    toolbarTitle: string;
    reset: string;
    resetAria: string;
    systemPicker: string;
    canvasAria: string;
    hueLabel: string;
    channelsLabel: string;
    formatsTitle: string;
    copy: string;
    copied: string;
    inSrgb: string;
    mappedToSrgb: string;
    previewSample: string;
    inspectorColorSection: string;
    inspectorGamutLabel: string;
    inspectorLightnessLabel: string;
    inspectorChromaLabel: string;
    inspectorHueLabel: string;
    inspectorComposeLabel: string;
    inspectorCssVarLabel: string;
    errors: {
      invalidHex: string;
      invalidRgb: string;
      invalidHsl: string;
      invalidOklch: string;
    };
  };
  modules: Record<
    Exclude<WorkspaceSectionId, 'workspace' | 'foundation'>,
    ModuleTranslation
  >;
  foundation: {
    pageTitle: string;
    toolbarTitle: string;
    toolbarBadge: string;
    tokensPanel: {
      title: string;
      badge: string;
      roles: Record<string, string>;
    };
    primitivesPanel: {
      title: string;
      buttonsHeading: string;
      primaryBtn: string;
      secondaryBtn: string;
      ghostBtn: string;
      smallBtn: string;
      disabledBtn: string;
      gridViewLabel: string;
      activeToggleLabel: string;
      segmentedHeading: string;
      notationAriaLabel: string;
      badgesHeading: string;
      badgeNeutral: string;
      badgeAccent: string;
      badgeOutline: string;
      workspaceInputLabel: string;
      workspaceInputPlaceholder: string;
      workspaceInputDefault: string;
      workspaceInputHint: string;
      tokenInputLabel: string;
      tokenInputHint: string;
    };
    typographyPanel: {
      title: string;
      samples: {
        heading2xl: string;
        headingXl: string;
        headingLg: string;
        bodyBase: string;
        controlSm: string;
        monoXs: string;
        micro2xs: string;
      };
    };
    spacingPanel: {
      title: string;
      badge: string;
    };
    inspectorSections: InspectorSection[];
  };
  notFound: {
    pageTitle: string;
    meta: string;
    title: string;
    description: string;
  };
}
