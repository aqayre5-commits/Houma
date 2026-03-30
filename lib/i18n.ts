import type { Lang } from '@/lib/lang'

const translations = {
  fr: {
    // Language
    switchLang: 'العربية',
    // Nav / header
    search: 'Recherche',
    reportError: 'Signaler une erreur',
    nonOfficialBadge: 'Guide non officiel',
    // Home
    heroTag: 'Casablanca · Rabat · Tanger · 17 démarches vérifiées',
    heroTitle1: 'Préparez vos démarches',
    heroTitle2: 'avant de vous déplacer.',
    heroSubtitle: 'Trouvez les documents à préparer, les étapes de la demande et l’autorité locale compétente pour vos services à Casablanca, Rabat et Tanger.',
    chooseCity: 'Choisissez votre ville',
    or: 'ou',
    chooseService: 'Choisissez une démarche',
    allServices: 'Toutes les démarches',
    // City page
    whatService: (city: string) => `Quelle démarche à ${city} ?`,
    officesIn: (city: string) => `Bureaux à ${city}`,
    // City-service page
    recommendedOffice: 'Bureau recommandé',
    docsToPrep: 'Pièces à préparer',
    onlineFirst: 'À faire en ligne avant de vous déplacer',
    practicalTip: 'Conseil pratique',
    fees: 'Frais',
    delay: 'Délai',
    otherCity: 'Autre ville ?',
    allServicesIn: (city: string) => `Toutes les démarches à ${city}`,
    officeNotConfirmed: 'Bureau non confirmé',
    officeNotConfirmedDesc: (_type: string) => `Rendez-vous à la commune ou à la préfecture de votre quartier.`,
    source: 'Source',
    lastVerified: 'Dernière vérification',
    privateGuide: 'Guide privé et non officiel.',
    reportAnError: 'Signaler une erreur',
    viewGuide: 'Voir le guide →',
    seeArrow: 'Voir →',
    onlineAvailable: 'Étape en ligne disponible',
    onlineBadge: 'En ligne',
    // Office card
    itinerary: 'Itinéraire ↗',
    officeSheet: 'Fiche bureau',
    localService: 'Démarche locale',
    // Service/demarche page
    inWhichCity: 'Dans quelle ville ?',
    generalSteps: 'Étapes générales',
    step1: 'Choisissez votre ville dans la liste.',
    step2: 'Préparez les pièces avant de vous déplacer.',
    step3: 'Consultez l\'adresse et les horaires du bureau compétent.',
    allDemarches: 'Toutes les démarches',
    // Footer
    footerTagline: "Site d'information qui aide à préparer les documents et les étapes de demande auprès des autorités locales marocaines décentralisées. Houma ne remplace pas les administrations concernées.",
    footerExplore: 'Explorer',
    footerGuides: 'Guides',
    footerCities: 'Villes',
    footerServices: 'Démarches',
    footerOffices: 'Bureaux',
    footerInfo: 'Infos',
    footerAllGuides: 'Tous les guides',
    footerFaq: 'Questions fréquentes',
    footerHowItWorks: 'Comment ça marche',
    footerAbout: 'À propos',
    footerMethodology: 'Méthodologie',
    footerSources: 'Sources',
    footerNote: 'Houma — Documents, étapes et autorités locales · 3 villes · 17 démarches',
    // Breadcrumb
    breadVilles: 'Villes',
    breadDemarches: 'Démarches',
    breadBureaux: 'Bureaux',
  },
  ar: {
    // Language
    switchLang: 'Français',
    // Nav / header
    search: 'بحث',
    reportError: 'الإبلاغ عن خطأ',
    nonOfficialBadge: 'دليل غير رسمي',
    // Home
    heroTag: 'الدار البيضاء · الرباط · طنجة · 17 إجراءً موثقاً',
    heroTitle1: 'أعدّ إجراءاتك',
    heroTitle2: 'قبل التنقل.',
    heroSubtitle: 'اعثر على الوثائق الواجب إعدادها وخطوات الطلب والسلطة المحلية المختصة بخدمتك في الدار البيضاء والرباط وطنجة.',
    chooseCity: 'اختر مدينتك',
    or: 'أو',
    chooseService: 'اختر إجراءك',
    allServices: 'جميع الإجراءات',
    // City page
    whatService: (city: string) => `ما هو الإجراء الذي تريد إنجازه في ${city}؟`,
    officesIn: (city: string) => `مكاتب في ${city}`,
    // City-service page
    recommendedOffice: 'المكتب الموصى به',
    docsToPrep: 'الوثائق المطلوبة',
    onlineFirst: 'ما يجب القيام به عبر الإنترنت أولاً',
    practicalTip: 'نصيحة عملية',
    fees: 'الرسوم',
    delay: 'المدة',
    otherCity: 'مدينة أخرى؟',
    allServicesIn: (city: string) => `جميع الإجراءات في ${city}`,
    officeNotConfirmed: 'مكتب غير مؤكد',
    officeNotConfirmedDesc: (_type: string) => `توجّه إلى الجماعة أو العمالة في حيّك.`,
    source: 'المصدر',
    lastVerified: 'آخر مراجعة',
    privateGuide: 'دليل خاص وغير رسمي.',
    reportAnError: 'الإبلاغ عن خطأ',
    viewGuide: '← عرض الدليل',
    seeArrow: '← عرض',
    onlineAvailable: 'خطوة متاحة عبر الإنترنت',
    onlineBadge: 'عبر الإنترنت',
    // Office card
    itinerary: '↖ خريطة الطريق',
    officeSheet: 'بيانات المكتب',
    localService: 'إجراء محلي',
    // Service/demarche page
    inWhichCity: 'في أي مدينة؟',
    generalSteps: 'الخطوات العامة',
    step1: 'اختر مدينتك من القائمة.',
    step2: 'أعدّ الوثائق المطلوبة قبل التنقل.',
    step3: 'راجع عنوان المكتب المختص وأوقات عمله.',
    allDemarches: 'جميع الإجراءات',
    // Footer
    footerTagline: 'موقع معلوماتي يساعد على إعداد الوثائق وفهم خطوات الطلب لدى السلطات المحلية المغربية اللاممركزة. ولا يعوض Houma الإدارات المعنية.',
    footerExplore: 'استكشاف',
    footerGuides: 'الأدلة',
    footerCities: 'المدن',
    footerServices: 'الإجراءات',
    footerOffices: 'المكاتب',
    footerInfo: 'معلومات',
    footerAllGuides: 'جميع الأدلة',
    footerFaq: 'الأسئلة الشائعة',
    footerHowItWorks: 'كيف يعمل',
    footerAbout: 'حول Houma',
    footerMethodology: 'المنهجية',
    footerSources: 'المصادر',
    footerNote: 'Houma — الوثائق والخطوات والسلطات المحلية · 3 مدن · 17 إجراءاً',
    // Breadcrumb
    breadVilles: 'المدن',
    breadDemarches: 'الإجراءات',
    breadBureaux: 'المكاتب',
  },
} as const

export type T = typeof translations.fr

export function useT(lang: Lang): T {
  return translations[lang] as unknown as T
}
