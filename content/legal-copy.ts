export const legalPlaceholders = {
  publisherName: '[À compléter : nom légal de l’éditeur / exploitant]',
  publicationDirector: '[À compléter]',
  registeredAddress: '[À compléter]',
  contactEmail: '[À compléter : email de contact]',
  privacyRightsContact: '[À compléter : modalité de contact pour vos droits]',
  hostingProvider: '[À compléter : hébergeur]',
  hostingAddress: '[À compléter]',
  hostingContact: '[À compléter]',
  cndpReference: '[À compléter : position CNDP applicable le cas échéant]',
  dataTransferPosture: '[À compléter : lieu d’hébergement et transferts éventuels]',
  supplementaryProcessors: '[À compléter : autres destinataires ou sous-traitants, si applicables]',
  retentionSchedule: '[À compléter : durées de conservation par catégorie de données]',
  productionCookieAudit: '[À compléter : confirmer les cookies et stockages réellement utilisés en production]',
} as const

export const legalStorageInventory = {
  liveCookies: [
    {
      name: 'qriba_lang',
      category: 'necessary',
      purposeFr: "Mémoriser la langue d'interface choisie par l'utilisateur.",
      purposeAr: 'تذكر لغة الواجهة التي اختارها المستخدم.',
      durationFr: '1 an',
      durationAr: 'سنة واحدة',
    },
  ],
  legacyLocalStorageCleanup: [
    {
      name: 'qriba_confirmed_location_v2',
      category: 'necessary',
      purposeFr: "Ancienne clé de contexte local désormais dépréciée. Le code actif supprime cette clé au lieu de la réutiliser automatiquement.",
      purposeAr: 'مفتاح قديم لسياق الموقع أصبح مهملاً. الكود الحالي يحذف هذا المفتاح بدل إعادة استعماله تلقائياً.',
    },
  ],
  dormantCodeStorage: [
    {
      name: 'qriba_location_v1',
      category: 'dormant',
      purposeFr: "Clé présente dans un composant secondaire non branché au parcours principal actuel. Elle ne fait pas partie du flux live principal documenté dans les pages publiques.",
      purposeAr: 'مفتاح موجود في مكوّن ثانوي غير موصول بالمسار الرئيسي الحالي، ولا يدخل في التدفق الحي الأساسي الموصوف في الصفحات العامة.',
    },
  ],
  runtimeServices: [
    {
      name: 'Vercel Analytics',
      category: 'analytics',
      purposeFr: 'Mesure de fréquentation et événements de navigation côté client, activée uniquement en production.',
      purposeAr: 'قياس الزيارات وأحداث التصفح على جهة العميل، ويُفعّل فقط في الإنتاج.',
    },
    {
      name: 'Vercel Speed Insights',
      category: 'analytics',
      purposeFr: 'Mesure de performance réelle, activée uniquement en production.',
      purposeAr: 'قياس الأداء الفعلي، ويُفعّل فقط في الإنتاج.',
    },
    {
      name: 'Supabase (si configuré)',
      category: 'necessary',
      purposeFr: "Stockage des formulaires d'erreur ou de sponsoring si les variables d'environnement Supabase sont renseignées au déploiement.",
      purposeAr: 'تخزين نماذج الأخطاء أو الرعاية إذا كانت متغيرات بيئة Supabase مفعلة عند النشر.',
    },
  ],
  geolocation: {
    purposeFr:
      "La géolocalisation précise est demandée après une action explicite de l'utilisateur pour mieux identifier la ville ou le contexte local d'une démarche.",
    purposeAr:
      'يُطلب الموقع الجغرافي الدقيق بعد إجراء صريح من المستخدم لتحسين تحديد المدينة أو السياق المحلي الخاص بالخدمة.',
    transientHandlingFr:
      "Les coordonnées brutes sont utilisées de manière transitoire pour obtenir un contexte de ville ou de zone, sans être conservées comme coordonnées brutes dans des cookies, localStorage ou sessionStorage par le flux live actuel.",
    transientHandlingAr:
      'تُستخدم الإحداثيات الخام بشكل عابر لاستدعاء نقطة reverse geocoding الداخلية ثم تحويل النتيجة إلى سياق مدينة أو منطقة. ولا تُخزن هذه الإحداثيات في ملف ارتباط أو localStorage أو sessionStorage في التدفق الحي الحالي.',
  },
} as const

export const siteLegalDisclaimers = {
  siteWideFr: [
    'Houma est un guide privé, non officiel, des démarches administratives au Maroc.',
    'Nous vous aidons à comprendre la procédure, les documents à préparer, les frais indicatifs, les délais et l’autorité locale la plus probable à contacter.',
    'Houma ne remplace pas l’administration et ne dépose pas la demande à votre place.',
    'Vérifiez toujours la source officielle avant de vous déplacer ou de payer.',
  ],
  siteWideAr: [
    'Houma دليل خاص وغير رسمي للمساطر والإجراءات الإدارية في المغرب.',
    'يساعدك Houma على فهم المسطرة والوثائق الواجب تحضيرها والرسوم التقريبية والآجال والسلطة المحلية الأرجح التي ينبغي التواصل معها.',
    'لا يعوض Houma الإدارة ولا يودع الطلب نيابة عنك.',
    'تحقق دائماً من المصدر الرسمي قبل التنقل أو الأداء.',
  ],
  footerFr: 'Guide privé, non officiel. Informations préparatoires à partir de sources publiques et officielles.',
  footerAr: 'دليل خاص وغير رسمي. معلومات تحضيرية مبنية على مصادر عمومية ورسمية.',
  serviceFr: [
    'Houma vous donne une orientation pratique à partir de sources publiques et officielles.',
    'L’autorité affichée est une autorité locale probable ou responsable selon les informations disponibles.',
    'Vérifiez toujours la source officielle avant déplacement ou paiement.',
  ],
  serviceAr: [
    'يمنحك Houma توجيهاً عملياً انطلاقاً من مصادر عمومية ورسمية.',
    'الجهة المعروضة هي جهة محلية محتملة أو مسؤولة بحسب المعلومات المتاحة.',
    'تحقق دائماً من المصدر الرسمي قبل التنقل أو الأداء.',
  ],
  legalNoticeFr: [
    'Houma est un guide privé, non officiel, consacré à l’information pratique sur les démarches administratives au Maroc.',
    'Le site ne constitue pas un portail gouvernemental officiel et ne réalise pas les formalités au nom de l’utilisateur.',
  ],
  legalNoticeAr: [
    'Houma دليل خاص وغير رسمي مخصص للمعلومة العملية حول الإجراءات الإدارية في المغرب.',
    'لا يشكل الموقع بوابة حكومية رسمية ولا ينجز الإجراءات باسم المستخدم.',
  ],
} as const
