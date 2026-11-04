import type { TranslationDictionary } from '../types';

export const bn: TranslationDictionary = {
  meta: {
    siteDescription:
      'Web এবং Android ডেভেলপারদের জন্য মিনিমাল ও প্রফেশনাল কালার ডিজাইন টুল।',
    skipToWorkspace: 'মূল ওয়ার্কস্পেসে যান',
  },
  header: {
    openMenu: 'নেভিগেশন মেনু খুলুন',
    closeMenu: 'নেভিগেশন মেনু বন্ধ করুন',
    expandSidebar: 'সাইডবার বড় করুন ([)',
    collapseSidebar: 'সাইডবার ছোট করুন ([)',
    platformGroupLabel: 'টার্গেট প্ল্যাটফর্ম নির্বাচন',
    languageGroupLabel: 'ভাষা পরিবর্তন করুন',
    switchToDark: 'ডার্ক মোডে যান',
    switchToLight: 'লাইট মোডে যান',
    showInspector: 'ইনস্পেক্টর প্যানেল দেখান (])',
    hideInspector: 'ইনস্পেক্টর প্যানেল লুকান (])',
  },
  nav: {
    primaryAriaLabel: 'প্রাথমিক নেভিগেশন',
    mobileDrawerAriaLabel: 'নেভিগেশন মেনু',
    toggleRail: 'সাইডবার টগল',
    targetLabel: 'টার্গেট',
    switchToDarkFull: 'ডার্ক মোডে পরিবর্তন করুন',
    switchToLightFull: 'লাইট মোডে পরিবর্তন করুন',
    languageLabel: 'ভাষা',
    groups: {
      studio: 'ওয়ার্কস্পেস',
      system: 'সিস্টেম ও ফাউন্ডেশন',
    },
    items: {
      workspace: {
        label: 'ওভারভিউ',
        description: 'ওয়ার্কস্পেস শেল, টার্গেট স্পেসিফিকেশন ও কিবোর্ড শর্টকাট।',
      },
      palettes: {
        label: 'প্যালেট',
        description: 'কালার সেট ও টোনাল স্কেলের জন্য নির্ধারিত ক্যানভাস স্লট।',
      },
      contrast: {
        label: 'কনট্রাস্ট',
        description: 'সারফেস ও টেক্সটের রিডেবিলিটি যাচাই করার ওয়ার্কস্পেস।',
      },
      export: {
        label: 'এক্সপোর্ট',
        description: 'Web CSS এবং Android Compose / XML টোকেন আউটপুট স্লট।',
      },
      foundation: {
        label: 'UI ফাউন্ডেশন',
        description:
          'ডিজাইন টোকেন, টাইপোগ্রাফি, স্পেসিং ও রিইউজেবল UI কম্পোনেন্ট।',
      },
    },
  },
  inspector: {
    title: 'ইনস্পেক্টর',
    ariaLabel: 'ওয়ার্কস্পেস ইনস্পেক্টর',
    collapseLabel: 'ইনস্পেক্টর লুকান',
    closeLabel: 'ইনস্পেক্টর বন্ধ করুন',
    workspaceContext: 'ওয়ার্কস্পেস কনটেক্সট',
    activeView: 'বর্তমান ভিউ',
    surfaceCalibration: 'সারফেস মান',
    neutralValue: 'নিউট্রাল (C=0)',
    themeMode: 'থিম মোড',
    themeLight: 'লাইট',
    themeDark: 'ডার্ক',
    targetSpecification: 'টার্গেট ফরম্যাট',
  },
  statusBar: {
    ariaLabel: 'ওয়ার্কস্পেস স্ট্যাটাস',
    ready: 'প্রস্তুত',
    achromaticLabel: 'নিউট্রাল UI (C=0)',
    targetPrefix: 'টার্গেট:',
  },
  common: {
    backToOverview: 'ওভারভিউতে ফিরুন',
    inspectFoundation: 'UI ফাউন্ডেশন দেখুন',
    viewModuleSlots: 'মডিউল স্লট দেখুন',
    reviewPrimitives: 'UI কম্পোনেন্ট দেখুন',
    returnToWorkspace: 'ওয়ার্কস্পেসে ফিরে যান',
  },
  overview: {
    pageTitle: 'ওয়ার্কস্পেস ওভারভিউ',
    toolbarTitle: 'স্টুডিও ক্যানভাস',
    toolbarBadge: 'শেল প্রস্তুত',
    heading: 'ওয়ার্কস্পেস ওভারভিউ',
    phaseBadge: 'ফাউন্ডেশন ও কোর ইঞ্জিন',
    description:
      'Web এবং Android ডেভেলপারদের জন্য তৈরি মিনিমাল ও নির্ভুল কালার ডিজাইন ওয়ার্কস্পেস।',
    emptyMeta: 'WORKSPACE STAGE · মডিউলের জন্য প্রস্তুত',
    emptyTitle: 'ওয়ার্কস্পেস শেল ও কালার ইঞ্জিন প্রস্তুত',
    emptyDescription:
      'রেসপনসিভ লেআউট শেল এবং Culori-ভিত্তিক কোর কালার ইঞ্জিন (HEX, RGB, HSL, OKLCH কনভার্সন, sRGB গ্যামাট হ্যান্ডলিং ও ৬টি হারমনি অ্যালগরিদম) যুক্ত হয়েছে। পরবর্তী ধাপে প্যালেট জেনারেটর UI এবং এক্সপোর্ট ফিচার এখানে যুক্ত হবে।',
    webPanel: {
      title: 'Web প্ল্যাটফর্ম আর্কিটেকচার',
      description:
        'আধুনিক ব্রাউজার কালার স্পেস, সিমান্টিক CSS Custom Properties এবং Tailwind CSS থিম ভ্যারিয়েবলের জন্য প্রস্তুত মডিউলার কাঠামো।',
      tokenOutputLabel: 'টোকেন আউটপুট',
      colorNotationLabel: 'কালার ফরম্যাট',
    },
    androidPanel: {
      title: 'Android প্ল্যাটফর্ম আর্কিটেকচার',
      description:
        'Jetpack Compose-এর Color ডিক্লারেশন এবং ক্লাসিক Android XML রিসোর্স ফাইলের মানদণ্ড অনুযায়ী সাজানো কাঠামো।',
      composeTargetLabel: 'Compose ফরম্যাট',
      resourceTargetLabel: 'XML রিসোর্স',
    },
    shortcutsPanel: {
      title: 'কিবোর্ড শর্টকাট',
      badge: 'দ্রুত নিয়ন্ত্রণ',
      items: [
        { label: 'বামপাশের নেভিগেশন সাইডবার ছোট বা বড় করুন', keys: ['['] },
        { label: 'ডানপাশের ইনস্পেক্টর প্যানেল দেখান বা লুকান', keys: [']'] },
        { label: 'সরাসরি যেকোনো সেকশনে যান', keys: ['1', '5'] },
        { label: 'মোবাইল মেনু বা ড্রয়ার বন্ধ করুন', keys: ['Esc'] },
      ],
    },
    inspectorSections: [
      {
        title: 'শেল মাপজোক',
        properties: [
          { label: 'হেডার উচ্চতা', value: '48px (3rem)', mono: true },
          { label: 'সাইডবার প্রস্থ', value: '224px / 56px', mono: true },
          { label: 'ইনস্পেক্টর প্রস্থ', value: '288px (18rem)', mono: true },
          { label: 'স্ট্যাটাস বার', value: '28px (1.75rem)', mono: true },
        ],
      },
      {
        title: 'কোর ইঞ্জিন ও স্ট্যাক',
        properties: [
          { label: 'ফ্রেমওয়ার্ক', value: 'Astro 5 + React 19', mono: true },
          { label: 'কালার ইঞ্জিন', value: 'Culori (OKLCH / sRGB)', mono: true },
          { label: 'ফরম্যাট', value: 'HEX · RGB · HSL · OKLCH', mono: true },
        ],
      },
    ],
  },
  modules: {
    palettes: {
      pageTitle: 'প্যালেট',
      toolbarTitle: 'প্যালেট ওয়ার্কস্পেস',
      toolbarBadge: 'মডিউল স্লট',
      heading: 'প্যালেট ওয়ার্কস্পেস',
      statusBadge: 'খালি কন্টেইনার',
      summary:
        'কালার প্যালেট তৈরি ও টোনাল স্কেল সাজানোর জন্য নির্ধারিত ওয়ার্কস্পেস ক্যানভাস।',
      emptyTitle: 'প্যালেট মডিউল স্লট প্রস্তুত',
      emptyDescription:
        'কোর কালার ইঞ্জিনে HEX, RGB, HSL ও OKLCH কনভার্সন এবং ৬টি কালার হারমনি অ্যালগরিদম প্রস্তুত আছে। পরবর্তী ধাপে ইন্টারঅ্যাক্টিভ প্যালেট জেনারেটর UI এখানে যুক্ত হবে।',
      scopeHeading: 'পরিকল্পিত মডিউল পরিধি',
      scopeBadge: 'আর্কিটেকচার চুক্তি',
      moduleScope: [
        {
          label: 'বেস কালার সংজ্ঞা',
          detail:
            'প্রাইমারি, নিউট্রাল ও সিমান্টিক কালার এন্ট্রি সংরক্ষণের কাঠামো।',
        },
        {
          label: 'টোনাল স্কেল গ্রিড',
          detail:
            'OKLCH ভিত্তিক সুষম লাইটনেস র‍্যাম্প ও কালার স্টপ প্রদর্শনের স্লট।',
        },
        {
          label: 'ইনস্পেক্টর সংযোগ',
          detail:
            'নির্বাচিত কালার এডিট ও sRGB গ্যামাট স্ট্যাটাস দেখার হুক।',
        },
      ],
      inspectorSections: [
        {
          title: 'কন্টেইনার স্ট্যাটাস',
          properties: [
            { label: 'মডিউল', value: 'Palettes', mono: true },
            { label: 'কোর ইঞ্জিন', value: 'Culori Ready', mono: true },
            { label: 'জেনারেটর UI', value: 'পরবর্তী ধাপ', mono: false },
          ],
        },
      ],
    },
    contrast: {
      pageTitle: 'কনট্রাস্ট',
      toolbarTitle: 'কনট্রাস্ট ওয়ার্কস্পেস',
      toolbarBadge: 'মডিউল স্লট',
      heading: 'কনট্রাস্ট ওয়ার্কস্পেস',
      statusBadge: 'খালি কন্টেইনার',
      summary:
        'Web ও Android ইন্টারফেসে ব্যাকগ্রাউন্ড এবং টেক্সটের স্পষ্টতা ও অ্যাক্সেসিবিলিটি যাচাইয়ের ওয়ার্কস্পেস।',
      emptyTitle: 'কনট্রাস্ট মডিউল স্লট প্রস্তুত',
      emptyDescription:
        'লেআউট শেল ও ইনস্পেক্টর প্যানেল প্রস্তুত আছে। পরবর্তী ধাপে কনট্রাস্ট রেশিও ক্যালকুলেশন ও রিডেবিলিটি অডিট টুল এখানে যুক্ত হবে।',
      scopeHeading: 'পরিকল্পিত মডিউল পরিধি',
      scopeBadge: 'আর্কিটেকচার চুক্তি',
      moduleScope: [
        {
          label: 'সারফেস ও টেক্সট পেয়ার',
          detail:
            'নিউট্রাল ও কালারড সারফেসে টেক্সট, আইকন ও বর্ডারের স্পষ্টতা পরীক্ষা।',
        },
        {
          label: 'মাল্টি-প্ল্যাটফর্ম প্রিভিউ',
          detail:
            'Web CSS কার্ড এবং Android কম্পোনেন্ট সারফেসে সরাসরি তুলনা।',
        },
        {
          label: 'ডায়াগনস্টিক রিপোর্ট',
          detail:
            'ইনস্পেক্টরে কনট্রাস্ট স্কোর ও পাস/ফেইল নির্দেশক দেখানোর স্লট।',
        },
      ],
      inspectorSections: [
        {
          title: 'কন্টেইনার স্ট্যাটাস',
          properties: [
            { label: 'মডিউল', value: 'Contrast', mono: true },
            { label: 'স্ট্যাটাস', value: 'শেল প্রস্তুত', mono: false },
            { label: 'অডিট ইঞ্জিন', value: 'পরবর্তী ধাপ', mono: false },
          ],
        },
      ],
    },
    export: {
      pageTitle: 'এক্সপোর্ট',
      toolbarTitle: 'এক্সপোর্ট ওয়ার্কস্পেস',
      toolbarBadge: 'মডিউল স্লট',
      heading: 'এক্সপোর্ট ওয়ার্কস্পেস',
      statusBadge: 'খালি কন্টেইনার',
      summary:
        'Web স্টাইলশিট এবং Android প্রজেক্টের জন্য রেডিমেড কালার টোকেন আউটপুট কন্টেইনার।',
      emptyTitle: 'এক্সপোর্ট মডিউল স্লট প্রস্তুত',
      emptyDescription:
        'টোকেন সিরিয়ালাইজার পরবর্তী ধাপে যুক্ত হবে। হেডার থেকে Web এবং Android টার্গেট পরিবর্তন করে ইনস্পেক্টরে আউটপুট স্পেসিফিকেশন দেখতে পারেন।',
      scopeHeading: 'পরিকল্পিত মডিউল পরিধি',
      scopeBadge: 'আর্কিটেকচার চুক্তি',
      moduleScope: [
        {
          label: 'Web CSS ও Tailwind',
          detail:
            'CSS Custom Properties এবং Tailwind CSS থিম ভ্যারিয়েবল জেনারেটর স্লট।',
        },
        {
          label: 'Android Jetpack Compose',
          detail:
            'Kotlin Color.kt অবজেক্ট ও থিম কালার স্কিম কোড জেনারেটর স্লট।',
        },
        {
          label: 'Android XML রিসোর্স',
          detail:
            'স্ট্যান্ডার্ড res/values/colors.xml রিসোর্স ফাইল আউটপুট স্লট।',
        },
      ],
      inspectorSections: [
        {
          title: 'কন্টেইনার স্ট্যাটাস',
          properties: [
            { label: 'মডিউল', value: 'Export', mono: true },
            { label: 'স্ট্যাটাস', value: 'শেল প্রস্তুত', mono: false },
            { label: 'সিরিয়ালাইজার', value: 'পরবর্তী ধাপ', mono: false },
          ],
        },
      ],
    },
  },
  foundation: {
    pageTitle: 'UI ফাউন্ডেশন',
    toolbarTitle: 'UI ফাউন্ডেশন ও ডিজাইন টোকেন',
    toolbarBadge: 'সিস্টেম রেফারেন্স',
    heading: 'UI ফাউন্ডেশন',
    description:
      'Color Studio-র সিমান্টিক নিউট্রাল টোকেন, Hind Siliguri টাইপোগ্রাফি স্কেল, 4px স্পেসিং গ্রিড এবং রিইউজেবল React কম্পোনেন্টসমূহ।',
    tokensPanel: {
      title: 'সিমান্টিক কালার টোকেন',
      badge: 'লাইট ও ডার্ক অ্যাডাপ্টিভ',
      roles: {
        '--cs-canvas': 'মূল ওয়ার্কস্পেস ব্যাকগ্রাউন্ড',
        '--cs-surface': 'প্যানেল, কার্ড ও হেডার সারফেস',
        '--cs-surface-subtle': 'সাইডবার ও সেকেন্ডারি কন্ট্রোল ব্যাকগ্রাউন্ড',
        '--cs-surface-muted': 'হোভার ও অ্যাক্টিভ ইন্টারঅ্যাকশন ফিল',
        '--cs-border-default': 'স্ট্যান্ডার্ড 1px সূক্ষ্ম বর্ডার',
        '--cs-fg-primary': 'প্রাথমিক স্পষ্ট টেক্সট কালার',
        '--cs-accent': 'সংযত ফোকাস ও প্রাইমারি অ্যাকশন কালার',
        '--cs-accent-subtle': 'অ্যাক্টিভ আইটেমের হালকা অ্যাকসেন্ট টিন্ট',
      },
    },
    primitivesPanel: {
      title: 'রিইউজেবল UI কম্পোনেন্ট',
      buttonsHeading: 'বাটন ও আইকন বাটন',
      primaryBtn: 'প্রাইমারি অ্যাকশন',
      secondaryBtn: 'সেকেন্ডারি',
      ghostBtn: 'ঘোস্ট বাটন',
      smallBtn: 'ছোট (28px)',
      disabledBtn: 'নিষ্ক্রিয়',
      gridViewLabel: 'গ্রিড ভিউ',
      activeToggleLabel: 'সক্রিয় টগল',
      segmentedHeading: 'সেগমেন্টেড কন্ট্রোল',
      notationAriaLabel: 'কালার ফরম্যাট প্রিভিউ',
      badgesHeading: 'ব্যাজ ও কিবোর্ড শর্টকাট ক্যাপ',
      badgeNeutral: 'নিউট্রাল',
      badgeAccent: 'অ্যাকসেন্ট',
      badgeOutline: 'আউটলাইন',
      workspaceInputLabel: 'ওয়ার্কস্পেসের নাম',
      workspaceInputPlaceholder: 'যেমন: কোর ব্র্যান্ড কালার সিস্টেম',
      workspaceInputDefault: 'Web ও Android কোর সিস্টেম',
      workspaceInputHint: 'লেবেল ও সাধারণ তথ্যের জন্য স্ট্যান্ডার্ড ইনপুট।',
      tokenInputLabel: 'টোকেন আইডেন্টিফায়ার',
      tokenInputHint:
        'HEX, RGB, HSL, OKLCH ভ্যালু ও CSS টোকেন কী লেখার মনোস্পেস ইনপুট।',
    },
    typographyPanel: {
      title: 'টাইপোগ্রাফি স্কেল (Hind Siliguri + Mono)',
      samples: {
        heading2xl: 'ওয়ার্কস্পেস প্রধান শিরোনাম',
        headingXl: 'সেকশন শিরোনাম',
        headingLg: 'প্যানেল হেডার',
        bodyBase:
          'ডেভেলপার ডকুমেন্টেশন এবং সাধারণ বিবরণের জন্য সহজপাঠ্য বাংলা টেক্সট।',
        controlSm:
          'স্টুডিও UI কন্ট্রোল, নেভিগেশন মেনু এবং টুলবার লেবেল।',
        monoXs: 'HEX #2563EB · oklch(0.5461 0.2152 262.88) · CSS',
        micro2xs: 'INSPECTOR METADATA · HEX · RGB · HSL · OKLCH',
      },
    },
    spacingPanel: {
      title: 'স্পেসিং ও বর্ডার রেডিয়াস',
      badge: '4px গ্রিড',
    },
    inspectorSections: [
      {
        title: 'টোকেন আর্কিটেকচার',
        properties: [
          { label: 'নেমস্পেস', value: '--cs-*', mono: true },
          { label: 'বাংলা ফন্ট', value: 'Hind Siliguri', mono: true },
          { label: 'বেস গ্রিড', value: '4px (0.25rem)', mono: true },
          { label: 'বর্ডার', value: '1px solid', mono: true },
        ],
      },
      {
        title: 'UI কম্পোনেন্ট সেট',
        properties: [
          { label: 'কন্ট্রোল', value: 'Button, IconButton, Input', mono: true },
          { label: 'সিলেকশন', value: 'SegmentedControl', mono: true },
          { label: 'সারফেস', value: 'Panel, Card, Toolbar', mono: true },
          { label: 'মেটাডেটা', value: 'Badge, Kbd, EmptyState', mono: true },
        ],
      },
    ],
  },
  notFound: {
    pageTitle: 'পাওয়া যায়নি',
    meta: '404 · রাউট পাওয়া যায়নি',
    title: 'এই ওয়ার্কস্পেস পেজটি খুঁজে পাওয়া যায়নি',
    description:
      'আপনি যে লিংকে প্রবেশ করতে চাচ্ছেন সেটি Color Studio-র নেভিগেশনে নেই।',
  },
};
