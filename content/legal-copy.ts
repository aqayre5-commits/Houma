export const legalPlaceholders = {
  publisherName: 'TODO: Replace with legal publisher/operator name',
  publicationDirector: 'TODO: Replace with responsible publication name',
  registeredAddress: 'TODO: Replace with registered address',
  contactEmail: 'TODO: Replace with legal/privacy contact email',
  privacyRightsContact: 'TODO: Replace with privacy rights contact method',
  hostingProvider: 'TODO: Confirm hosting provider',
  hostingAddress: 'TODO: Confirm hosting address',
  hostingContact: 'TODO: Confirm hosting support URL or email',
  cndpReference: 'TODO: Insert CNDP filing/receipt reference if applicable',
  dataTransferPosture: 'TODO: Confirm hosting/data transfer posture',
  supplementaryProcessors: 'TODO: Confirm any additional processors or subprocessors not visible in the codebase',
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
      "Les coordonnées brutes sont utilisées de manière transitoire pour interroger l'endpoint interne de reverse geocoding, puis transformer la réponse en contexte de ville/zone. Elles ne sont pas stockées dans un cookie, localStorage ou sessionStorage par le flux live actuel.",
    transientHandlingAr:
      'تُستخدم الإحداثيات الخام بشكل عابر لاستدعاء نقطة reverse geocoding الداخلية ثم تحويل النتيجة إلى سياق مدينة أو منطقة. ولا تُخزن هذه الإحداثيات في ملف ارتباط أو localStorage أو sessionStorage في التدفق الحي الحالي.',
  },
} as const

export const siteLegalDisclaimers = {
  homeFr: 'Houma est un guide privé, non officiel, des démarches administratives au Maroc.',
  homeAr: 'Houma دليل خاص وغير رسمي للمساطر والإجراءات الإدارية في المغرب.',
  footerShortFr: 'Guide privé, non officiel.',
  footerShortAr: 'دليل خاص وغير رسمي.',
  serviceFr: "Houma explique la procédure à partir de sources publiques et officielles, sans remplacer l'administration concernée.",
  serviceAr: 'تشرح Houma الإجراء انطلاقاً من مصادر عمومية ورسمية، دون أن تعوض الإدارة المعنية.',
  verifyFr: "Vérifiez toujours l'administration concernée avant de vous déplacer ou de payer.",
  verifyAr: 'تحقق دائماً من الإدارة المعنية قبل التنقل أو الأداء.',
} as const
