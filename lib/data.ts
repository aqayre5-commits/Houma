import { City, CityService, Office, SearchResult, Service } from '@/types/models'

export const cities: Record<string, City> = {
  casablanca: {
    slug: 'casablanca',
    name: 'Casablanca',
    nameAr: 'الدار البيضاء',
    region: 'Casablanca-Settat',
    regionAr: 'كازا-سطات',
    hero: "Trouvez l'annexe administrative, les pièces à préparer et les frais pour vos démarches à Casablanca.",
    heroAr: 'اعثر على المقاطعة الإدارية والوثائق المطلوبة والرسوم لإنجاز إجراءاتك في الدار البيضاء.',
    seo: 'démarches administratives Casablanca',
    offices: ['annexe-casablanca-centre', 'hay-hassani-annexe', 'tribunal-casablanca', 'narsa-casablanca', 'commissariat-casablanca', 'barid-casablanca', 'tribunal-commerce-casablanca'],
  },
  rabat: {
    slug: 'rabat',
    name: 'Rabat',
    nameAr: 'الرباط',
    region: 'Rabat-Salé-Kénitra',
    regionAr: 'الرباط-سلا-القنيطرة',
    hero: 'Préparez vos démarches à Rabat : bureau compétent, pièces à fournir et délais habituels.',
    heroAr: 'أعدّ إجراءاتك في الرباط: المكتب المختص، الوثائق الواجب توفيرها والآجال المعتادة.',
    seo: 'démarches administratives Rabat',
    offices: ['yacoub-el-mansour-annexe', 'agdal-riyad-annexe', 'tribunal-rabat', 'narsa-rabat', 'commissariat-rabat', 'barid-rabat', 'tribunal-commerce-rabat'],
  },
  tanger: {
    slug: 'tanger',
    name: 'Tanger',
    nameAr: 'طنجة',
    region: 'Tanger-Tétouan-Al Hoceïma',
    regionAr: 'طنجة-تطوان-الحسيمة',
    hero: 'Bureau, documents et frais pour vos démarches administratives à Tanger — avant de vous déplacer.',
    heroAr: 'مكتب، وثائق ورسوم إجراءاتك الإدارية في طنجة — قبل التنقل.',
    seo: 'démarches administratives Tanger',
    offices: ['beni-makada-annexe', 'malabata-annexe', 'tribunal-tanger', 'narsa-tanger', 'commissariat-tanger', 'barid-tanger', 'tribunal-commerce-tanger'],
  },
}

export const services: Record<string, Service> = {
  'passeport-marocain': {
    slug: 'passeport-marocain',
    name: 'Passeport marocain',
    nameAr: 'جواز السفر المغربي',
    category: 'Identité',
    categoryAr: 'الهوية',
    summary: "Préparez le formulaire, le e-timbre et les pièces avant le dépôt au bureau de proximité.",
    summaryAr: 'أعدّ الاستمارة والطابع الإلكتروني والوثائق قبل إيداع الملف في مقاطعتك الإدارية.',
    needsCity: true,
    primaryOfficeType: 'annexe_administrative',
    online: ['e-timbre', 'formulaire'],
    docsSourceUrl: 'https://passeport.ma',
    docsSourceLabel: 'passeport.ma — DGSN',
    docsSourceLabelAr: 'passeport.ma — المديرية العامة للأمن الوطني',
  },
  'renouvellement-cnie': {
    slug: 'renouvellement-cnie',
    name: 'Renouvellement CNIE',
    nameAr: 'تجديد البطاقة الوطنية للتعريف الإلكترونية',
    category: 'Identité',
    categoryAr: 'الهوية',
    summary: 'Repérez le bon point de dépôt local et les pièces à vérifier avant le déplacement.',
    summaryAr: 'حدد نقطة الإيداع الأقرب إليك والوثائق المطلوبة قبل التنقل.',
    needsCity: true,
    primaryOfficeType: 'annexe_administrative',
    online: [],
    docsSourceUrl: 'https://www.idarati.ma',
    docsSourceLabel: 'idarati.ma — Portail national des procédures administratives',
    docsSourceLabelAr: 'idarati.ma — البوابة الوطنية للمساطر والإجراءات الإدارية',
  },
  'attestation-residence': {
    slug: 'attestation-residence',
    name: 'Attestation de résidence',
    nameAr: 'شهادة الإقامة',
    category: 'Attestations',
    categoryAr: 'الشهادات والوثائق',
    summary: "Trouvez l'annexe administrative de votre quartier — pièces et délais.",
    summaryAr: 'اعثر على المقاطعة الإدارية المختصة بحيك — الوثائق والآجال.',
    needsCity: true,
    primaryOfficeType: 'commune_annexe',
    online: [],
    docsSourceUrl: 'https://www.portail.ma',
    docsSourceLabel: 'portail.ma — Portail national des procédures administratives',
    docsSourceLabelAr: 'portail.ma — بوابة المساطر الإدارية الوطنية',
  },
  'acte-naissance': {
    slug: 'acte-naissance',
    name: 'Acte de naissance',
    nameAr: 'شهادة الميلاد',
    category: 'État civil',
    categoryAr: 'الحالة المدنية',
    summary: "Obtenez une copie via l'état civil local ou en ligne sur Watiqa.",
    summaryAr: 'احصل على نسخة من عقد الازدياد عبر مصلحة الحالة المدنية أو عبر الإنترنت على Watiqa.',
    needsCity: true,
    primaryOfficeType: 'etat_civil',
    online: ['watiqa'],
    docsSourceUrl: 'https://watiqa.ma',
    docsSourceLabel: "watiqa.ma — Ministère de l'Intérieur",
    docsSourceLabelAr: 'watiqa.ma — وزارة الداخلية',
  },
  'legalisation-signature': {
    slug: 'legalisation-signature',
    name: 'Légalisation de signature',
    nameAr: 'التصديق على التوقيع',
    category: 'Attestations',
    categoryAr: 'الشهادات والوثائق',
    summary: "Faites légaliser un document original à l'annexe administrative — présence obligatoire.",
    summaryAr: 'صادق على وثيقة أصلية في المقاطعة الإدارية — الحضور الشخصي إلزامي.',
    needsCity: true,
    primaryOfficeType: 'commune_annexe',
    online: [],
    docsSourceUrl: 'https://www.portail.ma',
    docsSourceLabel: 'portail.ma — Portail national des procédures administratives',
    docsSourceLabelAr: 'portail.ma — بوابة المساطر الإدارية الوطنية',
  },
  'livret-famille': {
    slug: 'livret-famille',
    name: 'Livret de famille',
    nameAr: 'الدفتر العائلي',
    category: 'État civil',
    categoryAr: 'الحالة المدنية',
    summary: "Obtenez votre livret de famille à la commune après le mariage — timbre de 50 MAD requis.",
    summaryAr: 'احصل على دفترك العائلي من الجماعة عقب الزواج — واجبات التمبر: 50 درهماً.',
    needsCity: true,
    primaryOfficeType: 'commune_annexe',
    online: [],
    docsSourceUrl: 'https://www.idarati.ma',
    docsSourceLabel: 'idarati.ma — Portail national des procédures administratives',
    docsSourceLabelAr: 'idarati.ma — البوابة الوطنية للمساطر والإجراءات الإدارية',
  },
  'acte-deces': {
    slug: 'acte-deces',
    name: 'Acte de décès',
    nameAr: 'شهادة الوفاة',
    category: 'État civil',
    categoryAr: 'الحالة المدنية',
    summary: "Obtenez une copie de l'acte de décès à la commune — gratuit, délivré en 24 h.",
    summaryAr: 'احصل على نسخة من شهادة الوفاة من الجماعة — مجاناً، تُسلَّم خلال 24 ساعة.',
    needsCity: true,
    primaryOfficeType: 'etat_civil',
    online: [],
    docsSourceUrl: 'https://www.idarati.ma',
    docsSourceLabel: 'idarati.ma — Portail national des procédures administratives',
    docsSourceLabelAr: 'idarati.ma — البوابة الوطنية للمساطر والإجراءات الإدارية',
  },
  'permis-conduire': {
    slug: 'permis-conduire',
    name: 'Permis de conduire',
    nameAr: 'رخصة السياقة',
    category: 'Transport',
    categoryAr: 'النقل والسير',
    summary: "Préparez les pièces et le certificat médical avant l'inscription à l'auto-école.",
    summaryAr: 'أعدّ الوثائق والشهادة الطبية قبل التسجيل في مدرسة تعليم السياقة.',
    needsCity: true,
    primaryOfficeType: 'annexe_administrative',
    online: [],
    docsSourceUrl: 'https://www.idarati.ma',
    docsSourceLabel: 'idarati.ma — Portail national des procédures administratives',
    docsSourceLabelAr: 'idarati.ma — البوابة الوطنية للمساطر والإجراءات الإدارية',
  },
  'casier-judiciaire': {
    slug: 'casier-judiciaire',
    name: 'Casier judiciaire (Bulletin n°3)',
    nameAr: 'السجل العدلي (البطاقة رقم 3)',
    category: 'Justice',
    categoryAr: 'العدل والقضاء',
    summary: "Obtenez votre bulletin n°3 le jour même — en ligne, par email ou retrait au tribunal.",
    summaryAr: 'احصل على البطاقة رقم 3 من السجل العدلي في نفس اليوم — إلكترونياً أو بالاستلام من المحكمة.',
    needsCity: true,
    primaryOfficeType: 'tribunal',
    online: ['casier-judiciaire-en-ligne'],
    docsSourceUrl: 'https://casierjudiciaire.justice.gov.ma',
    docsSourceLabel: 'casierjudiciaire.justice.gov.ma — Ministere de la Justice',
    docsSourceLabelAr: 'casierjudiciaire.justice.gov.ma — وزارة العدل',
  },
  'duplicata-cin': {
    slug: 'duplicata-cin',
    name: 'Duplicata CNIE (perte ou vol)',
    nameAr: 'نظير البطاقة الوطنية للتعريف الإلكترونية (ضياع أو سرقة)',
    category: 'Identite',
    categoryAr: 'الهوية',
    summary: "Faites la declaration de perte, puis deposez le dossier a l'annexe administrative.",
    summaryAr: 'قدم تصريحاً بالضياع أو السرقة، ثم أودع الملف في المقاطعة الإدارية.',
    needsCity: true,
    primaryOfficeType: 'annexe_administrative',
    online: [],
    docsSourceUrl: 'https://www.idarati.ma',
    docsSourceLabel: 'idarati.ma — Portail national des procedures administratives',
    docsSourceLabelAr: 'idarati.ma — البوابة الوطنية للمساطر والإجراءات الإدارية',
  },
  'carte-grise': {
    slug: 'carte-grise',
    name: 'Carte grise (immatriculation vehicule)',
    nameAr: 'شهادة تسجيل المركبة (البطاقة الرمادية)',
    category: 'Transport',
    categoryAr: 'النقل والسير',
    summary: "Immatriculez votre vehicule au centre NARSA — formulaire I/II, justif. residence, recu DGI.",
    summaryAr: 'سجّل مركبتك في مركز الوكالة الوطنية للسلامة الطرقية — النموذج I أو II مع وثائق الإقامة ووصل الأداء.',
    needsCity: true,
    primaryOfficeType: 'narsa_center',
    online: ['narsa-en-ligne'],
    docsSourceUrl: 'https://www.idarati.ma',
    docsSourceLabel: 'idarati.ma — procedure 06b9433d (vehicule neuf acquis au Maroc)',
    docsSourceLabelAr: 'idarati.ma — المسطرة 06b9433d (مركبة جديدة مقتناة بالمغرب)',
  },
  'carte-sejour-etranger': {
    slug: 'carte-sejour-etranger',
    name: 'Carte de sejour (etrangers)',
    nameAr: 'بطاقة الإقامة للأجانب',
    category: 'Identite',
    categoryAr: 'الهوية',
    summary: "Obtenez ou renouvelez votre carte de sejour au commissariat de police.",
    summaryAr: 'احصل على بطاقة إقامتك أو جدّدها في مفوضية الشرطة.',
    needsCity: true,
    primaryOfficeType: 'commissariat',
    online: [],
    docsSourceUrl: 'https://www.idarati.ma',
    docsSourceLabel: 'idarati.ma — procedure cb2a5a6a (carte de sejour etrangers)',
    docsSourceLabelAr: 'idarati.ma — المسطرة cb2a5a6a (بطاقة الإقامة للأجانب)',
  },
  'permis-construire': {
    slug: 'permis-construire',
    name: 'Permis de construire',
    nameAr: 'رخصة البناء',
    category: 'Urbanisme',
    categoryAr: 'التعمير والبناء',
    summary: "Deposez le dossier technique complet a la commune — etude 15 jours, decision 60 jours max.",
    summaryAr: 'أودع الملف التقني الكامل لدى الجماعة — الدراسة 15 يوماً والقرار خلال 60 يوماً على الأكثر.',
    needsCity: true,
    primaryOfficeType: 'commune_annexe',
    online: [],
    docsSourceUrl: 'https://www.idarati.ma',
    docsSourceLabel: 'idarati.ma — procedure a7efb3a8 (permis de construire)',
    docsSourceLabelAr: 'idarati.ma — المسطرة a7efb3a8 (رخصة البناء)',
  },
  'auto-entrepreneur': {
    slug: 'auto-entrepreneur',
    name: 'Statut auto-entrepreneur',
    nameAr: 'نظام المقاول الذاتي',
    category: 'Entreprise',
    categoryAr: 'المقاولة والأعمال',
    summary: "Inscrivez-vous au statut auto-entrepreneur a Barid Al Maghrib ou en ligne — gratuit, 15 jours.",
    summaryAr: 'سجّل في نظام المقاول الذاتي عبر بريد المغرب أو إلكترونياً — مجاناً، خلال 15 يوماً.',
    needsCity: true,
    primaryOfficeType: 'barid_agence',
    online: ['auto-entrepreneur-en-ligne'],
    docsSourceUrl: 'https://www.idarati.ma',
    docsSourceLabel: 'idarati.ma — procedure b8e0793b (statut auto-entrepreneur)',
    docsSourceLabelAr: 'idarati.ma — المسطرة b8e0793b (نظام المقاول الذاتي)',
  },
  'registre-commerce': {
    slug: 'registre-commerce',
    name: 'Inscription au registre de commerce (SARL)',
    nameAr: 'التسجيل في السجل التجاري (شركة ذات مسؤولية محدودة)',
    category: 'Entreprise',
    categoryAr: 'المقاولة والأعمال',
    summary: "Deposez votre dossier SARL au greffe du tribunal de commerce — 350 MAD, 2 jours.",
    summaryAr: 'أودع ملف الشركة ذات المسؤولية المحدودة لدى كتابة ضبط المحكمة التجارية — 350 درهماً، يومان.',
    needsCity: true,
    primaryOfficeType: 'tribunal_commerce',
    online: [],
    docsSourceUrl: 'https://www.idarati.ma',
    docsSourceLabel: 'idarati.ma — procedure 6272522d (SARL registre de commerce)',
    docsSourceLabelAr: 'idarati.ma — المسطرة 6272522d (تسجيل الشركة ذات المسؤولية المحدودة)',
  },
  'vignette-auto': {
    slug: 'vignette-auto',
    name: 'Vignette automobile (TSAVA)',
    nameAr: 'الرسم السنوي على السيارات (TSAVA)',
    category: 'Transport',
    categoryAr: 'النقل والسير',
    summary: 'Payez la taxe annuelle sur votre vehicule en ligne — carte grise et carte bancaire suffisent, aucun deplacement requis.',
    summaryAr: 'أدِّ الرسم السنوي على مركبتك عبر الإنترنت — البطاقة الرمادية والبطاقة البنكية تكفيان، دون أي تنقل.',
    needsCity: true,
    primaryOfficeType: 'dgi',
    online: ['Paiement sur mavignette.ma (DGI)'],
    docsSourceUrl: 'https://www.tax.gov.ma/wps/portal/DGI/Vos-impots-procedures/tsava',
    docsSourceLabel: 'tax.gov.ma — DGI, Articles 259-270 CGI 2026',
    docsSourceLabelAr: 'tax.gov.ma — المديرية العامة للضرائب، المواد 259-270 من المدونة العامة للضرائب 2026',
  },
  'inscription-liste-electorale': {
    slug: 'inscription-liste-electorale',
    name: 'Inscription sur liste electorale',
    nameAr: 'التسجيل في اللوائح الانتخابية العامة',
    category: 'Citoyennete',
    categoryAr: 'المواطنة',
    summary: "Inscrivez-vous a la commune ou a l'annexe administrative — CNIE suffisante, gratuit, 3 jours.",
    summaryAr: 'سجّل في الجماعة أو المقاطعة الإدارية — البطاقة الوطنية كافية، مجاناً، خلال 3 أيام.',
    needsCity: true,
    primaryOfficeType: 'commune_annexe',
    online: [],
    docsSourceUrl: 'https://www.idarati.ma',
    docsSourceLabel: 'idarati.ma — procedure 6542acae (liste electorale)',
    docsSourceLabelAr: 'idarati.ma — المسطرة 6542acae (اللوائح الانتخابية العامة)',
  },
}

export const offices: Record<string, Office> = {
  'annexe-casablanca-centre': {
    slug: 'annexe-casablanca-centre',
    city: 'casablanca',
    name: 'Annexe Administrative Casablanca Centre',
    district: 'Centre',
    type: 'annexe_administrative',
    address: 'Boulevard Hassan II, Casablanca',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Boulevard+Hassan+II+Casablanca',
    services: ['passeport-marocain', 'renouvellement-cnie', 'legalisation-signature'],
  },
  'hay-hassani-annexe': {
    slug: 'hay-hassani-annexe',
    city: 'casablanca',
    name: 'Annexe Administrative Hay Hassani',
    district: 'Hay Hassani',
    type: 'annexe_administrative',
    address: 'Hay Hassani, Casablanca',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hay+Hassani+Casablanca',
    services: ['attestation-residence', 'acte-naissance', 'legalisation-signature'],
  },
  'yacoub-el-mansour-annexe': {
    slug: 'yacoub-el-mansour-annexe',
    city: 'rabat',
    name: 'Annexe Administrative Yacoub El Mansour',
    district: 'Yacoub El Mansour',
    type: 'annexe_administrative',
    address: 'Yacoub El Mansour, Rabat',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Yacoub+El+Mansour+Rabat',
    services: ['passeport-marocain', 'attestation-residence', 'legalisation-signature'],
  },
  'agdal-riyad-annexe': {
    slug: 'agdal-riyad-annexe',
    city: 'rabat',
    name: 'Annexe Administrative Agdal Riyad',
    district: 'Agdal Riyad',
    type: 'annexe_administrative',
    address: 'Agdal Riyad, Rabat',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Agdal+Riyad+Rabat',
    services: ['renouvellement-cnie', 'acte-naissance'],
  },
  'beni-makada-annexe': {
    slug: 'beni-makada-annexe',
    city: 'tanger',
    name: 'Annexe Administrative Beni Makada',
    district: 'Beni Makada',
    type: 'annexe_administrative',
    address: 'Beni Makada, Tanger',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Beni+Makada+Tanger',
    services: ['passeport-marocain', 'attestation-residence', 'legalisation-signature'],
  },
  'malabata-annexe': {
    slug: 'malabata-annexe',
    city: 'tanger',
    name: 'Annexe Administrative Malabata',
    district: 'Malabata',
    type: 'annexe_administrative',
    address: 'Malabata, Tanger',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Malabata+Tanger',
    services: ['renouvellement-cnie', 'acte-naissance'],
  },
  'tribunal-casablanca': {
    slug: 'tribunal-casablanca',
    city: 'casablanca',
    name: 'Tribunal de Premiere Instance de Casablanca',
    district: 'Centre',
    type: 'tribunal',
    address: 'Rue Abou Inane, Casablanca',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tribunal+Premiere+Instance+Casablanca',
    services: ['casier-judiciaire'],
  },
  'tribunal-rabat': {
    slug: 'tribunal-rabat',
    city: 'rabat',
    name: 'Tribunal de Premiere Instance de Rabat',
    district: 'Centre',
    type: 'tribunal',
    address: 'Avenue Moulay Hassan, Rabat',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tribunal+Premiere+Instance+Rabat',
    services: ['casier-judiciaire'],
  },
  'tribunal-tanger': {
    slug: 'tribunal-tanger',
    city: 'tanger',
    name: 'Tribunal de Premiere Instance de Tanger',
    district: 'Centre',
    type: 'tribunal',
    address: 'Boulevard Mohamed V, Tanger',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tribunal+Premiere+Instance+Tanger',
    services: ['casier-judiciaire'],
  },
  // NARSA centers
  'narsa-casablanca': {
    slug: 'narsa-casablanca',
    city: 'casablanca',
    name: 'Centre NARSA Casablanca',
    district: 'Ain Sebaa',
    type: 'narsa_center',
    address: 'Route Ain Sebaa, Casablanca',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=NARSA+Casablanca',
    services: ['carte-grise', 'permis-conduire'],
  },
  'narsa-rabat': {
    slug: 'narsa-rabat',
    city: 'rabat',
    name: 'Centre NARSA Rabat',
    district: 'Centre',
    type: 'narsa_center',
    address: 'Avenue de France, Rabat',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=NARSA+Rabat',
    services: ['carte-grise', 'permis-conduire'],
  },
  'narsa-tanger': {
    slug: 'narsa-tanger',
    city: 'tanger',
    name: 'Centre NARSA Tanger',
    district: 'Centre',
    type: 'narsa_center',
    address: 'Route de Tetouan, Tanger',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=NARSA+Tanger',
    services: ['carte-grise', 'permis-conduire'],
  },
  // Commissariats (carte de sejour etrangers)
  'commissariat-casablanca': {
    slug: 'commissariat-casablanca',
    city: 'casablanca',
    name: 'Service des Etrangers — Prefecture de Police de Casablanca',
    district: 'Centre',
    type: 'commissariat',
    address: 'Boulevard Brahim Roudani, Casablanca',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Prefecture+Police+Casablanca',
    services: ['carte-sejour-etranger'],
  },
  'commissariat-rabat': {
    slug: 'commissariat-rabat',
    city: 'rabat',
    name: 'Service des Etrangers — Prefecture de Police de Rabat',
    district: 'Centre',
    type: 'commissariat',
    address: 'Avenue Ibn Sina, Rabat',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Prefecture+Police+Rabat',
    services: ['carte-sejour-etranger'],
  },
  'commissariat-tanger': {
    slug: 'commissariat-tanger',
    city: 'tanger',
    name: 'Service des Etrangers — Prefecture de Police de Tanger',
    district: 'Centre',
    type: 'commissariat',
    address: 'Boulevard Mohammed V, Tanger',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Prefecture+Police+Tanger',
    services: ['carte-sejour-etranger'],
  },
  // Barid Al Maghrib (auto-entrepreneur)
  'barid-casablanca': {
    slug: 'barid-casablanca',
    city: 'casablanca',
    name: 'Barid Al Maghrib — Casablanca Centre',
    district: 'Centre',
    type: 'barid_agence',
    address: 'Place des Nations Unies, Casablanca',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Barid+Al+Maghrib+Casablanca+Centre',
    services: ['auto-entrepreneur'],
  },
  'barid-rabat': {
    slug: 'barid-rabat',
    city: 'rabat',
    name: 'Barid Al Maghrib — Rabat Centre',
    district: 'Centre',
    type: 'barid_agence',
    address: 'Avenue Mohamed V, Rabat',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Barid+Al+Maghrib+Rabat+Centre',
    services: ['auto-entrepreneur'],
  },
  'barid-tanger': {
    slug: 'barid-tanger',
    city: 'tanger',
    name: 'Barid Al Maghrib — Tanger Centre',
    district: 'Centre',
    type: 'barid_agence',
    address: 'Boulevard Mohamed V, Tanger',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Barid+Al+Maghrib+Tanger+Centre',
    services: ['auto-entrepreneur'],
  },
  // Tribunaux de commerce (registre de commerce)
  'tribunal-commerce-casablanca': {
    slug: 'tribunal-commerce-casablanca',
    city: 'casablanca',
    name: 'Tribunal de Commerce de Casablanca',
    district: 'Sidi Belyout',
    type: 'tribunal_commerce',
    address: 'Rue Arrachid Mohamed, Casablanca',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tribunal+Commerce+Casablanca',
    services: ['registre-commerce'],
  },
  'tribunal-commerce-rabat': {
    slug: 'tribunal-commerce-rabat',
    city: 'rabat',
    name: 'Tribunal de Commerce de Rabat',
    district: 'Centre',
    type: 'tribunal_commerce',
    address: 'Avenue Fal Ould Oumeir, Rabat',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tribunal+Commerce+Rabat',
    services: ['registre-commerce'],
  },
  'tribunal-commerce-tanger': {
    slug: 'tribunal-commerce-tanger',
    city: 'tanger',
    name: 'Tribunal de Commerce de Tanger',
    district: 'Centre',
    type: 'tribunal_commerce',
    address: 'Avenue Sidi Mohamed Ben Abdallah, Tanger',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tribunal+Commerce+Tanger',
    services: ['registre-commerce'],
  },
}

// ─── Docs (sourced from official Moroccan government sites — see /sources) ────

const passeportDocs = [
  "Formulaire de demande de passeport biométrique (disponible sur passeport.ma), rempli, signé et daté",
  "E-timbre électronique (واجبات التمبر) — 500 MAD, à obtenir sur etf.tax.gov.ma/etimfisc avant le dépôt",
  "Copie de la CNIE (Carte Nationale d'Identité Electronique) en cours de validité",
  "Photo d'identité récente — fond blanc, bleu ou gris, 35×45 mm, visage bien visible",
  "En cas de renouvellement : ancien passeport ou justificatif de son sort",
  "En cas de perte ou de vol : déclaration de perte ou de vol mentionnant le numéro du passeport",
]
const passeportDocsAr = [
  'استمارة طلب الحصول على جواز السفر البيومتري، المتوفرة على بوابة وزارة الداخلية passeport.ma، معبأة وموقعة ومؤرخة',
  'التمبر الإلكتروني — 500 درهم، يُحصَّل من etf.tax.gov.ma/etimfisc قبل إيداع الملف',
  'نسخة من البطاقة الوطنية للتعريف الإلكترونية سارية الصلاحية',
  'صورة فوتوغرافية للتعريف حديثة، ذات خلفية بيضاء أو زرقاء أو رمادية (حجم 35×45 مم)، تُظهر بوضوح ملامح وجه صاحب الطلب',
  'في حالة التجديد: الإدلاء بجواز السفر القديم أو ما يبرر مصيره',
  'في حالة السرقة أو الضياع: شهادة التصريح بالسرقة أو الضياع تُشير إلى رقم الجواز',
]

const cnieDocs = [
  "Copie abrégée de l'acte de naissance (نسخة موجزة من رسم الولادة)",
  "Attestation de résidence (شهادة الإقامة)",
  "Photo d'identité",
  "Droits de timbre (واجبات التمبر) — 75 MAD (50 MAD pour les enfants de moins de 12 ans)",
  "En cas de perte ou de vol : déclaration établie par la police ou la gendarmerie",
]
const cnieDocsAr = [
  'نسخة موجزة من رسم الولادة',
  'شهادة الإقامة',
  'صورة فوتوغرافية للتعريف',
  'واجبات التمبر — 75 درهماً (50 درهماً للأطفال دون 12 سنة)',
  'في حالة الضياع أو السرقة: تصريح صادر عن الشرطة أو الدرك',
]

const residenceDocs = [
  "Déclaration sur l'honneur de résidence ou dernière facture ONEE (eau ou électricité)",
  "Photo d'identité",
  "CNIE en cours de validité",
]
const residenceDocsAr = [
  'تصريح بالشرف بالإقامة أو آخر فاتورة أداء واجبات استهلاك الماء والكهرباء',
  'صورة فوتوغرافية للمرتفق',
  'البطاقة الوطنية للتعريف الإلكترونية سارية الصلاحية',
]

const naissanceDocs = [
  "Copie de l'acte de naissance (quelle que soit la date d'émission)",
  "Livret de famille (الدفتر العائلي) ou carnet d'identification et d'état civil",
  "CNIE (si disponible)",
  "Références d'enregistrement de l'acte : numéro du registre et année",
]
const naissanceDocsAr = [
  'نسخة من رسم الولادة مهما كان تاريخ إصدارها',
  'الدفتر العائلي أو كناش التعريف والحالة المدنية',
  'البطاقة الوطنية للتعريف الإلكترونية لمن يتوفر عليها',
  'مراجع تسجيل رسم الولادة: رقم الرسم والسنة',
]

const legalisationDocs = [
  'CNIE ou passeport en cours de validité du signataire',
  "Document original à légaliser — les copies ne sont pas acceptées",
  "Présence physique du signataire au guichet — aucune procuration n'est possible",
]
const legalisationDocsAr = [
  'البطاقة الوطنية للتعريف الإلكترونية أو جواز السفر ساري المفعول لصاحب التوقيع',
  'الوثيقة الأصلية المراد التصديق عليها — النسخ غير مقبولة',
  'الحضور الشخصي الإلزامي لصاحب التوقيع — لا يجوز التوكيل',
]

const livretFamilleDocs = [
  "Copie complète de l'acte de naissance (رسم الولادة) du mari et de la femme",
  "Copie de la CNIE du mari et de la femme",
  "Copie de l'acte de mariage (عقد الزواج) ou document attestant le mariage",
  "Demande écrite signée par le demandeur",
  "Droits de timbre (واجبات التمبر) — 50 MAD",
]
const livretFamilleDocsAr = [
  'نسخة كاملة من رسم ولادة الزوج والزوجة',
  'صورة عن البطاقة الوطنية للتعريف الإلكترونية للزوج والزوجة',
  'نسخة من عقد الزواج أو وثيقة ثبوت الزواج',
  'طلب كتابي موقع من طرف المعني بالأمر',
  'واجبات التمبر — 50 درهماً',
]

const aceDecesDocs = [
  "Copie de la CNIE du demandeur",
  "Copie de la CNIE, du titre de séjour ou du passeport du défunt",
  "Fiche de sortie de l'hôpital du défunt (si décès en milieu hospitalier)",
  "Document prouvant le lien de parenté avec le défunt, ou procuration",
  "Demande de délivrance de l'acte de décès",
]
const aceDecessDocsAr = [
  'نسخة من بطاقة هوية طالب الشهادة',
  'نسخة من البطاقة الوطنية أو بطاقة الإقامة أو جواز السفر للمتوفى',
  'ورقة الخروج من المستشفى للمتوفى (في حالة الوفاة بمؤسسة صحية)',
  'وثيقة تُثبت القرابة مع المتوفى أو وكالة في حالة عدم القرابة',
  'طلب الحصول على شهادة الوفاة',
]

const permisConducteDocs = [
  "Formulaire de demande d'examen de permis de conduire, dûment rempli et signé",
  "Copie de la CNIE en cours de validité ou passeport biométrique marocain",
  "Photo d'identité couleur récente — fond bleu, 35×45 mm",
  "Certificat médical de moins de 3 mois attestant l'aptitude physique et mentale",
  "Contrat de formation signé avec une auto-école agréée",
  "Attestation de fin de formation délivrée par l'auto-école",
  "Quittance de paiement des droits (250 MAD NARSA + frais DGI)",
]
const permisConducteDocsAr = [
  'المطبوع الخاص المسمى "طلب اجتياز امتحان رخصة السياقة"، معبأ بشكل صحيح وموقع عليه',
  'نسخة من البطاقة الوطنية للتعريف الإلكترونية سارية الصلاحية أو جواز السفر البيومتري المغربي',
  'صورة فوتوغرافية للتعريف بالألوان حديثة وأمامية، خلفية زرقاء، حجم 35×45 مم',
  'شهادة طبية لا يتعدى تاريخ تسليمها 3 أشهر تُثبت الأهلية البدنية والذهنية',
  'عقد التكوين بين المرشح ومؤسسة تعليم السياقة المرخصة',
  'شهادة إتمام التكوين مسلمة من طرف مؤسسة تعليم السياقة',
  'وصل أداء الواجبات — 250 درهماً للوكالة الوطنية للسلامة الطرقية + رسوم الإدارة الضريبية',
]

const casierJudiciaireDocs = [
  "CNIE (Carte Nationale d'Identite Electronique) en cours de validite, ou passeport biometrique",
  "Pour les etrangers : titre de sejour (carte de sejour) en cours de validite",
  "Timbre fiscal de 10 MAD (فئة 10 دراهم) — requis uniquement pour le retrait en personne au tribunal",
  "En cas de demande par tiers : procuration notariee (en cas de representation)",
]
const casierJudiciaireDocsAr = [
  'البطاقة الوطنية للتعريف الإلكترونية سارية الصلاحية، أو جواز السفر البيومتري',
  'بالنسبة للأجانب: بطاقة الإقامة سارية الصلاحية',
  'تنبر جبائي من فئة 10 دراهم — يُشترط فقط عند الاستلام الشخصي من المحكمة',
  'في حالة التقديم بواسطة الغير: توكيل رسمي موثق',
]

const duplicataCinDocs = [
  "Copie abrégée de l'acte de naissance (نسخة موجزة من رسم الولادة)",
  "Attestation de résidence (شهادة الإقامة)",
  "Photo d'identité",
  "Droits de timbre (واجبات التمبر) — 75 MAD",
  "Déclaration de perte ou de vol établie par la police ou la gendarmerie royale",
]
const duplicataCinDocsAr = [
  'نسخة موجزة من رسم الولادة',
  'شهادة الإقامة',
  'صورة فوتوغرافية للتعريف',
  'واجبات التمبر — 75 درهماً',
  'تصريح بالضياع أو السرقة صادر عن الشرطة أو الدرك الملكي',
]

const carteGriseDocs = [
  "Formulaire de demande (norme I pour vehicule neuf, norme II pour vehicule d'occasion) — signe par l'acheteur, le vendeur et la societe de financement si applicable",
  "Justificatif de residence de l'acheteur (CNIE ou attestation de residence)",
  "Justificatif d'usage professionnel du vehicule si applicable",
  "Quittance de paiement des droits DGI + 300 MAD NARSA",
]
const carteGriseDocsAr = [
  'طلب محرر على المطبوع الخاص (نموذج I للمركبة الجديدة، نموذج II للمركبة المستعملة) — موقع من طرف المشتري والبائع وشركة التمويل عند الاقتضاء',
  'ما يُثبت مكان إقامة صاحب الطلب (البطاقة الوطنية أو شهادة الإقامة)',
  'وثيقة تُثبت الاستعمال المهني للمركبة عند الاقتضاء',
  'وصل أداء الواجبات المقررة لدى إدارة الضرائب + 300 درهم للوكالة الوطنية للسلامة الطرقية',
]

const carteSejourDocs = [
  "Copie des pages du passeport (pages d'identite et visa)",
  "Photo d'identite recente",
  "Titre de propriete, contrat de bail enregistre ou document prouvant la residence effective au Maroc",
  "Certificat medical etabli par un medecin agree",
  "Document prouvant la nature de l'activite professionnelle ou les moyens de subsistance (si applicable)",
]
const carteSejourDocsAr = [
  'نسخة من صفحات جواز السفر (صفحات الهوية والتأشيرة)',
  'صورة فوتوغرافية للتعريف حديثة',
  'عقد ملكية أو عقد كراء مسجل أو أية وثيقة تُثبت الإقامة الفعلية بالمغرب',
  'شهادة طبية يُسلّمها طبيب معتمد',
  'وثيقة تُثبت طبيعة النشاط المهني أو مصادر الرزق عند الاقتضاء',
]

const permisConstruireDocs = [
  "Formulaire de demande de permis de construire signe — norme fixee par le decret 2.18.577",
  "Plans architecturaux a l'echelle 1/100 (tous niveaux, sous-sols, toitures, facades, coupes) signes par l'architecte agree",
  "Note technique sur la resistance et la stabilite des structures, signee par ingenieur",
  "Note technique sur l'efficacite energetique du batiment (conforme decret 2.13.874)",
  "Titre de propriete du terrain ou document autorisant les travaux",
  "Plan topographique si le terrain n'est pas immatricule",
  "Contrat de l'architecte (obligatoire selon la loi)",
  "Quittances de paiement des droits dus",
]
const permisConstruireDocsAr = [
  'طلب رخصة البناء موقع عليه — وفق النموذج المحدد بالمرسوم 2.18.577',
  'التصاميم المعمارية بمقياس 1/100 (جميع الطوابق، الأدوار السفلية، الأسطح، الواجهات، المقاطع) موقعة من المهندس المعماري',
  'مذكرة تقنية حول متانة الهياكل وثباتها موقعة من مهندس مختص',
  'مذكرة تقنية حول النجاعة الطاقية للمبنى (وفق المرسوم 2.13.874)',
  'وثيقة تُثبت ملكية البقعة أو تُخوّل القيام بأشغال البناء',
  'تصميم طبوغرافي إذا كان العقار غير محفظ',
  'عقد المهندس المعماري (إلزامي وفق القانون)',
  'وصولات أداء الرسوم والواجبات المستحقة',
]

const autoEntrepreneurDocs = [
  "Photo d'identite recente",
  "Copie de la CNIE (Carte Nationale d'Identite Electronique) en cours de validite",
  "Formulaire de demande d'inscription au statut auto-entrepreneur (disponible a Barid Al Maghrib ou en ligne)",
]
const autoEntrepreneurDocsAr = [
  'صورة فوتوغرافية للتعريف حديثة',
  'نسخة من البطاقة الوطنية للتعريف الإلكترونية سارية الصلاحية',
  'استمارة طلب التسجيل في نظام المقاول الذاتي (متوفرة ببريد المغرب أو عبر الإنترنت)',
]

const registreCommerceDocs = [
  "Certificat negatif (denomination sociale) — delivre par l'OMPIC, valide 90 jours",
  "Statuts de la societe (originaux signes par tous les associes et enregistres a la Direction des Impots)",
  "Contrat de bail enregistre ou contrat de domiciliation signe — preuve du siege social",
  "Certificat de blocage du capital (minimum 25 % si capital > 100 000 MAD) — delivre par la banque",
  "CNIE (original + copie) des gerants et associes ; passeport pour etrangers non residents",
  "Declaration fiscale norme 2 remplie et signee",
  "Pouvoir notarie si depot via mandataire",
]
const registreCommerceDocsAr = [
  'الشهادة السلبية (اسم الشركة) — تُسلّمها المنظمة المغربية للملكية الصناعية والتجارية (OMPIC)، صالحة 90 يوماً',
  'النظام الأساسي للشركة (أصول موقعة من جميع الشركاء ومسجلة لدى إدارة الضرائب)',
  'عقد الكراء المسجل أو عقد التوطين الموقع — إثبات المقر الاجتماعي',
  'شهادة تجميد رأس المال (25 % على الأقل إذا تجاوز 100 000 درهم) — تُسلّمها البنك',
  'البطاقة الوطنية للتعريف الإلكترونية (أصل + نسخة) لمسيري الشركة والشركاء؛ جواز السفر للأجانب غير المقيمين',
  'التصريح الضريبي نموذج 2 معبأ وموقع',
  'توكيل رسمي موثق في حالة الإيداع بواسطة وكيل',
]

const listeElectoraleDocs = [
  "Copie de la CNIE (Carte Nationale d'Identite Electronique) en cours de validite",
]
const listeElectoraleDocsAr = [
  'نسخة من البطاقة الوطنية للتعريف الإلكترونية سارية الصلاحية',
]

// ─── City-service detail data ──────────────────────────────────────────────

export const cityServices: Record<string, CityService> = {
  'casablanca-passeport-marocain': {
    citySlug: 'casablanca', serviceSlug: 'passeport-marocain',
    requiredDocs: passeportDocs, requiredDocsAr: passeportDocsAr,
    feesNote: '500 MAD — à régler via e-timbre sur etf.tax.gov.ma/etimfisc avant le dépôt du dossier.',
    feesNoteAr: '500 درهم — تُسدَّد عبر الطابع الجبائي الإلكتروني على etf.tax.gov.ma/etimfisc قبل إيداع الملف.',
    delayNote: '15 jours (délai officiel national, variable). Les grandes villes étant plus sollicitées, comptez ce délai complet voire davantage en période de forte demande (été, rentrée, fêtes). Les villes de taille moyenne traitent parfois plus rapidement. Retrait au même bureau après notification par SMS.',
    delayNoteAr: '15 يوماً (الأجل الرسمي الوطني، متغير). المدن الكبرى أكثر ازدحاماً، لذا خطّط لهذا الأجل كاملاً أو أكثر في فترات الذروة (الصيف، الدخول المدرسي، الأعياد). المدن المتوسطة قد تعالج الطلبات بشكل أسرع. يُستلم من نفس المكتب عند الإشعار برسالة نصية.',
    onlineLinks: [
      { label: "Acheter l'e-timbre", url: 'https://etf.tax.gov.ma/etimfisc' },
      { label: 'Formulaire officiel', url: 'https://passeport.ma' },
    ],
    fallbackNote: 'Arrivez avant 8h30 en semaine pour éviter les files. Retrait au même bureau après notification par SMS.',
    fallbackNoteAr: 'احرص على الحضور قبل الساعة 8:30 صباحاً خلال أيام العمل لتفادي الطوابير. يُستلم جواز السفر من نفس المكتب عند وصول الإشعار.',
    verificationDate: '2026-03-27',
  },
  'casablanca-renouvellement-cnie': {
    citySlug: 'casablanca', serviceSlug: 'renouvellement-cnie',
    requiredDocs: cnieDocs, requiredDocsAr: cnieDocsAr,
    feesNote: '75 MAD (50 MAD pour les enfants de moins de 12 ans) — droits de timbre (واجبات التمبر).',
    feesNoteAr: '75 درهماً (50 درهماً للأطفال دون 12 سنة) — واجبات التمبر.',
    delayNote: '10 jours (délai officiel national pour les résidents au Maroc). Dans les grandes villes, prévoyez ce délai complet. Les villes de taille moyenne peuvent traiter plus rapidement. Retrait au même bureau sur présentation du reçu de dépôt.',
    delayNoteAr: '10 أيام (الأجل الرسمي الوطني للمقيمين بالمغرب). في المدن الكبرى، خطّط لهذا الأجل كاملاً. قد تكون المدن المتوسطة أسرع في المعالجة. يُستلم من نفس المكتب بتقديم وصل الإيداع.',
    onlineLinks: [{ label: "Acheter l'e-timbre", url: 'https://etf.tax.gov.ma/etimfisc' }],
    fallbackNote: 'En cas de perte, prévoir une déclaration de perte auprès de la police ou de la gendarmerie avant le dépôt.',
    fallbackNoteAr: 'في حالة الضياع، يجب الحصول على تصريح بالضياع من الشرطة أو الدرك قبل تقديم الملف.',
    verificationDate: '2026-03-27',
  },
  'casablanca-attestation-residence': {
    citySlug: 'casablanca', serviceSlug: 'attestation-residence',
    requiredDocs: residenceDocs, requiredDocsAr: residenceDocsAr,
    feesNote: 'Gratuit dans la majorité des annexes administratives de Casablanca.',
    feesNoteAr: 'مجاناً في معظم المقاطعات الإدارية بالدار البيضاء.',
    delayNote: "Délivrée le jour même dans la plupart des cas. Délai possible de 24h selon l'affluence.",
    delayNoteAr: 'تُسلَّم في نفس اليوم في معظم الحالات. قد يصل الأجل إلى 24 ساعة في أوقات الذروة.',
    onlineLinks: [],
    fallbackNote: "Adressez-vous à l'annexe administrative ou à la commune du lieu exact de résidence. Présence physique obligatoire.",
    fallbackNoteAr: 'توجه إلى المقاطعة الإدارية أو البلدية التابعة لمكان إقامتك الفعلي. الحضور الشخصي إلزامي.',
    verificationDate: '2026-03-27',
  },
  'casablanca-acte-naissance': {
    citySlug: 'casablanca', serviceSlug: 'acte-naissance',
    requiredDocs: naissanceDocs, requiredDocsAr: naissanceDocsAr,
    feesNote: '2 MAD (واجبات الشيات — درهمان). La légalisation éventuelle est en sus.',
    feesNoteAr: 'درهمان (واجبات الشيات). رسوم التصديق عند الاقتضاء.',
    delayNote: 'Délivré immédiatement sur place. Envoi postal : 3 à 5 jours ouvrés. Via Watiqa : 5 à 7 jours.',
    delayNoteAr: 'تُسلَّم فوراً في المكتب. بالبريد: من 3 إلى 5 أيام عمل. عبر Watiqa: من 5 إلى 7 أيام.',
    onlineLinks: [{ label: 'Demande en ligne (Watiqa)', url: 'https://watiqa.ma' }],
    fallbackNote: "Pour les copies légalisées ou les actes anciens, s'adresser au tribunal de première instance de Casablanca.",
    fallbackNoteAr: 'للحصول على نسخ مصادق عليها أو وثائق قديمة، توجه إلى المحكمة الابتدائية بالدار البيضاء.',
    verificationDate: '2026-03-27',
  },
  'casablanca-legalisation-signature': {
    citySlug: 'casablanca', serviceSlug: 'legalisation-signature',
    requiredDocs: legalisationDocs, requiredDocsAr: legalisationDocsAr,
    feesNote: 'Gratuit.',
    feesNoteAr: 'مجاناً.',
    delayNote: 'Immédiat — délivré dans la même visite.',
    delayNoteAr: 'فوري — يُنجَز في نفس الزيارة.',
    onlineLinks: [],
    fallbackNote: "La légalisation n'est pas possible par procuration. Le signataire doit se présenter en personne.",
    fallbackNoteAr: 'التصديق على التوقيع لا يمكن القيام به عن طريق وكيل. يجب حضور صاحب التوقيع شخصياً.',
    verificationDate: '2026-03-27',
  },
  'rabat-passeport-marocain': {
    citySlug: 'rabat', serviceSlug: 'passeport-marocain',
    requiredDocs: passeportDocs, requiredDocsAr: passeportDocsAr,
    feesNote: '500 MAD — à régler via e-timbre sur etf.tax.gov.ma/etimfisc avant le dépôt du dossier.',
    feesNoteAr: '500 درهم — تُسدَّد عبر الطابع الجبائي الإلكتروني على etf.tax.gov.ma/etimfisc قبل إيداع الملف.',
    delayNote: '15 jours (délai officiel national, variable). Les grandes villes étant plus sollicitées, comptez ce délai complet voire davantage en période de forte demande (été, rentrée, fêtes). Les villes de taille moyenne traitent parfois plus rapidement. Retrait au même bureau après notification par SMS.',
    delayNoteAr: '15 يوماً (الأجل الرسمي الوطني، متغير). المدن الكبرى أكثر ازدحاماً، لذا خطّط لهذا الأجل كاملاً أو أكثر في فترات الذروة (الصيف، الدخول المدرسي، الأعياد). المدن المتوسطة قد تعالج الطلبات بشكل أسرع. يُستلم من نفس المكتب عند الإشعار برسالة نصية.',
    onlineLinks: [
      { label: "Acheter l'e-timbre", url: 'https://etf.tax.gov.ma/etimfisc' },
      { label: 'Formulaire officiel', url: 'https://passeport.ma' },
    ],
    fallbackNote: "Arrivez avant 8h30 en semaine. L'annexe Yacoub El Mansour est généralement moins fréquentée que les guichets centraux.",
    fallbackNoteAr: 'احرص على الحضور قبل الساعة 8:30 صباحاً. مقاطعة يعقوب المنصور عادةً أقل ازدحاماً من مراكز المدينة.',
    verificationDate: '2026-03-27',
  },
  'rabat-renouvellement-cnie': {
    citySlug: 'rabat', serviceSlug: 'renouvellement-cnie',
    requiredDocs: cnieDocs, requiredDocsAr: cnieDocsAr,
    feesNote: '75 MAD (50 MAD pour les enfants de moins de 12 ans) — droits de timbre (واجبات التمبر).',
    feesNoteAr: '75 درهماً (50 درهماً للأطفال دون 12 سنة) — واجبات التمبر.',
    delayNote: '10 jours (délai officiel national pour les résidents au Maroc). Dans les grandes villes, prévoyez ce délai complet. Les villes de taille moyenne peuvent traiter plus rapidement. Retrait au même bureau sur présentation du reçu de dépôt.',
    delayNoteAr: '10 أيام (الأجل الرسمي الوطني للمقيمين بالمغرب). في المدن الكبرى، خطّط لهذا الأجل كاملاً. قد تكون المدن المتوسطة أسرع في المعالجة. يُستلم من نفس المكتب بتقديم وصل الإيداع.',
    onlineLinks: [{ label: "Acheter l'e-timbre", url: 'https://etf.tax.gov.ma/etimfisc' }],
    fallbackNote: 'En cas de perte, prévoir une déclaration auprès des services de police ou gendarmerie de Rabat avant le dépôt.',
    fallbackNoteAr: 'في حالة الضياع، تقدم بتصريح إلى خدمات الشرطة أو الدرك بالرباط قبل إيداع الملف.',
    verificationDate: '2026-03-27',
  },
  'rabat-attestation-residence': {
    citySlug: 'rabat', serviceSlug: 'attestation-residence',
    requiredDocs: residenceDocs, requiredDocsAr: residenceDocsAr,
    feesNote: 'Gratuit.',
    feesNoteAr: 'مجاناً.',
    delayNote: 'Délivrée le jour même dans la plupart des annexes de Rabat.',
    delayNoteAr: 'تُسلَّم في نفس اليوم في معظم مقاطعات الرباط.',
    onlineLinks: [],
    fallbackNote: "Adressez-vous à l'annexe administrative du quartier de résidence. Pour Agdal-Riyad, l'annexe éponyme est la référence locale.",
    fallbackNoteAr: 'توجه إلى المقاطعة الإدارية التابعة لحيك. لحي أكدال-الرياض، اعتمد على المقاطعة المحلية المختصة.',
    verificationDate: '2026-03-27',
  },
  'rabat-acte-naissance': {
    citySlug: 'rabat', serviceSlug: 'acte-naissance',
    requiredDocs: naissanceDocs, requiredDocsAr: naissanceDocsAr,
    feesNote: '2 MAD (واجبات الشيات — درهمان). La légalisation éventuelle est en sus.',
    feesNoteAr: 'درهمان (واجبات الشيات). رسوم التصديق عند الاقتضاء.',
    delayNote: 'Délivré immédiatement sur place. Envoi postal : 3 à 5 jours ouvrés. Via Watiqa : 5 à 7 jours.',
    delayNoteAr: 'تُسلَّم فوراً في المكتب. بالبريد: من 3 إلى 5 أيام عمل. عبر Watiqa: من 5 إلى 7 أيام.',
    onlineLinks: [{ label: 'Demande en ligne (Watiqa)', url: 'https://watiqa.ma' }],
    fallbackNote: "Pour les actes anciens ou les copies légalisées, s'adresser au tribunal de première instance de Rabat.",
    fallbackNoteAr: 'للوثائق القديمة أو النسخ المصادق عليها، توجه إلى المحكمة الابتدائية بالرباط.',
    verificationDate: '2026-03-27',
  },
  'rabat-legalisation-signature': {
    citySlug: 'rabat', serviceSlug: 'legalisation-signature',
    requiredDocs: legalisationDocs, requiredDocsAr: legalisationDocsAr,
    feesNote: 'Gratuit.',
    feesNoteAr: 'مجاناً.',
    delayNote: 'Immédiat — délivré dans la même visite.',
    delayNoteAr: 'فوري — يُنجَز في نفس الزيارة.',
    onlineLinks: [],
    fallbackNote: "La légalisation n'est pas possible par procuration. Présence du signataire obligatoire avec pièce d'identité valide.",
    fallbackNoteAr: 'التصديق على التوقيع لا يمكن القيام به عن طريق وكيل. الحضور الشخصي مع بطاقة التعريف الوطنية إلزامي.',
    verificationDate: '2026-03-27',
  },
  'tanger-passeport-marocain': {
    citySlug: 'tanger', serviceSlug: 'passeport-marocain',
    requiredDocs: passeportDocs, requiredDocsAr: passeportDocsAr,
    feesNote: '500 MAD — à régler via e-timbre sur etf.tax.gov.ma/etimfisc avant le dépôt du dossier.',
    feesNoteAr: '500 درهم — تُسدَّد عبر الطابع الجبائي الإلكتروني على etf.tax.gov.ma/etimfisc قبل إيداع الملف.',
    delayNote: '15 jours (délai officiel national, variable). Les grandes villes étant plus sollicitées, comptez ce délai complet voire davantage en période de forte demande (été, rentrée, fêtes). Les villes de taille moyenne traitent parfois plus rapidement. Retrait au même bureau après notification par SMS.',
    delayNoteAr: '15 يوماً (الأجل الرسمي الوطني، متغير). المدن الكبرى أكثر ازدحاماً، لذا خطّط لهذا الأجل كاملاً أو أكثر في فترات الذروة (الصيف، الدخول المدرسي، الأعياد). المدن المتوسطة قد تعالج الطلبات بشكل أسرع. يُستلم من نفس المكتب عند الإشعار برسالة نصية.',
    onlineLinks: [
      { label: "Acheter l'e-timbre", url: 'https://etf.tax.gov.ma/etimfisc' },
      { label: 'Formulaire officiel', url: 'https://passeport.ma' },
    ],
    fallbackNote: "Arrivez tôt le matin en semaine. L'annexe Beni Makada couvre le nord de la ville. Retrait au même bureau après notification.",
    fallbackNoteAr: 'احرص على الحضور في الصباح الباكر. مقاطعة بني مكادة تغطي شمال المدينة. يُستلم جواز السفر من نفس المكتب عند وصول الإشعار.',
    verificationDate: '2026-03-27',
  },
  'tanger-renouvellement-cnie': {
    citySlug: 'tanger', serviceSlug: 'renouvellement-cnie',
    requiredDocs: cnieDocs, requiredDocsAr: cnieDocsAr,
    feesNote: '75 MAD (50 MAD pour les enfants de moins de 12 ans) — droits de timbre (واجبات التمبر).',
    feesNoteAr: '75 درهماً (50 درهماً للأطفال دون 12 سنة) — واجبات التمبر.',
    delayNote: '10 jours (délai officiel national pour les résidents au Maroc). Dans les grandes villes, prévoyez ce délai complet. Les villes de taille moyenne peuvent traiter plus rapidement. Retrait au même bureau sur présentation du reçu de dépôt.',
    delayNoteAr: '10 أيام (الأجل الرسمي الوطني للمقيمين بالمغرب). في المدن الكبرى، خطّط لهذا الأجل كاملاً. قد تكون المدن المتوسطة أسرع في المعالجة. يُستلم من نفس المكتب بتقديم وصل الإيداع.',
    onlineLinks: [{ label: "Acheter l'e-timbre", url: 'https://etf.tax.gov.ma/etimfisc' }],
    fallbackNote: "L'annexe Malabata couvre le secteur Malabata et les quartiers Est. Déclaration de perte requise en cas de perte.",
    fallbackNoteAr: 'مقاطعة المالاباطا تغطي منطقة المالاباطا والأحياء الشرقية. تصريح بالضياع مطلوب في حالة الضياع.',
    verificationDate: '2026-03-27',
  },
  'tanger-attestation-residence': {
    citySlug: 'tanger', serviceSlug: 'attestation-residence',
    requiredDocs: residenceDocs, requiredDocsAr: residenceDocsAr,
    feesNote: 'Gratuit.',
    feesNoteAr: 'مجاناً.',
    delayNote: 'Délivrée le jour même dans la plupart des annexes de Tanger.',
    delayNoteAr: 'تُسلَّم في نفس اليوم في معظم مقاطعات طنجة.',
    onlineLinks: [],
    fallbackNote: "Rendez-vous à l'annexe administrative du quartier de résidence. Les deux annexes (Beni Makada / Malabata) couvrent des secteurs distincts.",
    fallbackNoteAr: 'توجه إلى المقاطعة الإدارية المختصة بحيك. مقاطعتا بني مكادة والمالاباطا تغطيان قطاعات مختلفة.',
    verificationDate: '2026-03-27',
  },
  'tanger-acte-naissance': {
    citySlug: 'tanger', serviceSlug: 'acte-naissance',
    requiredDocs: naissanceDocs, requiredDocsAr: naissanceDocsAr,
    feesNote: '2 MAD (واجبات الشيات — درهمان). La légalisation éventuelle est en sus.',
    feesNoteAr: 'درهمان (واجبات الشيات). رسوم التصديق عند الاقتضاء.',
    delayNote: 'Délivré immédiatement sur place. Envoi postal : 3 à 5 jours ouvrés. Via Watiqa : 5 à 7 jours.',
    delayNoteAr: 'تُسلَّم فوراً في المكتب. بالبريد: من 3 إلى 5 أيام عمل. عبر Watiqa: من 5 إلى 7 أيام.',
    onlineLinks: [{ label: 'Demande en ligne (Watiqa)', url: 'https://watiqa.ma' }],
    fallbackNote: "Pour les actes anciens ou copies légalisées, s'adresser au tribunal de première instance de Tanger.",
    fallbackNoteAr: 'للوثائق القديمة أو النسخ المصادق عليها، توجه إلى المحكمة الابتدائية بطنجة.',
    verificationDate: '2026-03-27',
  },
  'tanger-legalisation-signature': {
    citySlug: 'tanger', serviceSlug: 'legalisation-signature',
    requiredDocs: legalisationDocs, requiredDocsAr: legalisationDocsAr,
    feesNote: 'Gratuit.',
    feesNoteAr: 'مجاناً.',
    delayNote: 'Immédiat — délivré dans la même visite.',
    delayNoteAr: 'فوري — يُنجَز في نفس الزيارة.',
    onlineLinks: [],
    fallbackNote: "La légalisation n'est pas possible par procuration. Le signataire doit se présenter en personne avec sa pièce d'identité.",
    fallbackNoteAr: 'التصديق على التوقيع لا يمكن القيام به عن طريق وكيل. يجب حضور صاحب التوقيع شخصياً ببطاقة تعريفه.',
    verificationDate: '2026-03-27',
  },

  // ─── Livret de famille ─────────────────────────────────────────────────────
  'casablanca-livret-famille': {
    citySlug: 'casablanca', serviceSlug: 'livret-famille',
    requiredDocs: livretFamilleDocs, requiredDocsAr: livretFamilleDocsAr,
    feesNote: '50 MAD — droits de timbre (واجبات التمبر).',
    feesNoteAr: '50 درهماً — واجبات التمبر.',
    delayNote: '1 à 3 jours. Délivré par la commune ou l\'arrondissement du lieu de mariage.',
    delayNoteAr: 'من يوم إلى 3 أيام. يُسلَّم من طرف الجماعة أو المقاطعة التابعة لمكان إبرام عقد الزواج.',
    onlineLinks: [],
    fallbackNote: "Le livret est délivré une seule fois à la suite du mariage. En cas de perte, demandez un duplicata (نظير) à la même commune.",
    fallbackNoteAr: 'يُسلَّم الدفتر مرة واحدة عقب الزواج. في حالة الضياع، اطلب نظيراً من نفس الجماعة.',
    verificationDate: '2026-03-27',
  },
  'rabat-livret-famille': {
    citySlug: 'rabat', serviceSlug: 'livret-famille',
    requiredDocs: livretFamilleDocs, requiredDocsAr: livretFamilleDocsAr,
    feesNote: '50 MAD — droits de timbre (واجبات التمبر).',
    feesNoteAr: '50 درهماً — واجبات التمبر.',
    delayNote: '1 à 3 jours. Délivré par la commune du lieu de mariage.',
    delayNoteAr: 'من يوم إلى 3 أيام. يُسلَّم من طرف جماعة مكان إبرام عقد الزواج.',
    onlineLinks: [],
    fallbackNote: "En cas de perte, le duplicata (نظير) s'obtient à la même commune avec les mêmes pièces.",
    fallbackNoteAr: 'في حالة الضياع، يُستخرج النظير من نفس الجماعة بتقديم نفس الوثائق.',
    verificationDate: '2026-03-27',
  },
  'tanger-livret-famille': {
    citySlug: 'tanger', serviceSlug: 'livret-famille',
    requiredDocs: livretFamilleDocs, requiredDocsAr: livretFamilleDocsAr,
    feesNote: '50 MAD — droits de timbre (واجبات التمبر).',
    feesNoteAr: '50 درهماً — واجبات التمبر.',
    delayNote: '1 à 3 jours. Délivré par la commune du lieu de mariage.',
    delayNoteAr: 'من يوم إلى 3 أيام. يُسلَّم من طرف جماعة مكان إبرام عقد الزواج.',
    onlineLinks: [],
    fallbackNote: "En cas de perte ou de détérioration, un duplicata est délivré par la même commune sur demande écrite.",
    fallbackNoteAr: 'في حالة الضياع أو التلف، يُسلَّم نظير من نفس الجماعة بتقديم طلب كتابي.',
    verificationDate: '2026-03-27',
  },

  // ─── Acte de décès ─────────────────────────────────────────────────────────
  'casablanca-acte-deces': {
    citySlug: 'casablanca', serviceSlug: 'acte-deces',
    requiredDocs: aceDecesDocs, requiredDocsAr: aceDecessDocsAr,
    feesNote: 'Gratuit.',
    feesNoteAr: 'مجاناً.',
    delayNote: "Délivré en 24 h à la commune de l'arrondissement du lieu de décès.",
    delayNoteAr: 'تُسلَّم خلال 24 ساعة من الجماعة التابعة لمكان وقوع الوفاة.',
    onlineLinks: [],
    fallbackNote: "S'adresser à la commune ou à l'arrondissement du lieu de décès. Plusieurs copies peuvent être demandées simultanément.",
    fallbackNoteAr: 'توجه إلى جماعة أو مقاطعة مكان وقوع الوفاة. يمكن طلب عدة نسخ في آنٍ واحد.',
    verificationDate: '2026-03-27',
  },
  'rabat-acte-deces': {
    citySlug: 'rabat', serviceSlug: 'acte-deces',
    requiredDocs: aceDecesDocs, requiredDocsAr: aceDecessDocsAr,
    feesNote: 'Gratuit.',
    feesNoteAr: 'مجاناً.',
    delayNote: "Délivré en 24 h à la commune de l'arrondissement du lieu de décès.",
    delayNoteAr: 'تُسلَّم خلال 24 ساعة من الجماعة التابعة لمكان وقوع الوفاة.',
    onlineLinks: [],
    fallbackNote: "S'adresser à la commune du lieu de décès. Un proche ou un mandataire peut effectuer la démarche.",
    fallbackNoteAr: 'توجه إلى جماعة مكان وقوع الوفاة. يمكن لأحد المقربين أو وكيل القيام بالإجراء.',
    verificationDate: '2026-03-27',
  },
  'tanger-acte-deces': {
    citySlug: 'tanger', serviceSlug: 'acte-deces',
    requiredDocs: aceDecesDocs, requiredDocsAr: aceDecessDocsAr,
    feesNote: 'Gratuit.',
    feesNoteAr: 'مجاناً.',
    delayNote: "Délivré en 24 h à la commune de l'arrondissement du lieu de décès.",
    delayNoteAr: 'تُسلَّم خلال 24 ساعة من الجماعة التابعة لمكان وقوع الوفاة.',
    onlineLinks: [],
    fallbackNote: "S'adresser à la commune ou à l'annexe administrative du lieu de décès à Tanger.",
    fallbackNoteAr: 'توجه إلى الجماعة أو المقاطعة الإدارية التابعة لمكان وقوع الوفاة بطنجة.',
    verificationDate: '2026-03-27',
  },

  // ─── Permis de conduire ────────────────────────────────────────────────────
  'casablanca-permis-conduire': {
    citySlug: 'casablanca', serviceSlug: 'permis-conduire',
    requiredDocs: permisConducteDocs, requiredDocsAr: permisConducteDocsAr,
    feesNote: '250 MAD (NARSA) + frais DGI variables selon catégorie. Payés à l\'auto-école lors de l\'inscription.',
    feesNoteAr: '250 درهماً (الوكالة الوطنية للسلامة الطرقية) + رسوم الإدارة الضريبية تتفاوت حسب الصنف. تُؤدَّى لمدرسة السياقة عند التسجيل.',
    delayNote: "60 jours en moyenne (délai variable selon la disponibilité des sessions d'examen). Le permis est retiré au service provincial de la sécurité routière.",
    delayNoteAr: '60 يوماً في المتوسط (يتغير الأجل تبعاً لمواعيد دورات الامتحان). تُستلم رخصة السياقة من المصلحة الإقليمية للسلامة الطرقية.',
    onlineLinks: [],
    fallbackNote: "L'inscription se fait via une auto-école agréée à Casablanca. Le certificat médical doit avoir moins de 3 mois à la date de dépôt.",
    fallbackNoteAr: 'يتم التسجيل عبر مدرسة تعليم السياقة معتمدة بالدار البيضاء. يجب ألا تتجاوز صلاحية الشهادة الطبية 3 أشهر في تاريخ إيداع الملف.',
    verificationDate: '2026-03-27',
  },
  'rabat-permis-conduire': {
    citySlug: 'rabat', serviceSlug: 'permis-conduire',
    requiredDocs: permisConducteDocs, requiredDocsAr: permisConducteDocsAr,
    feesNote: '250 MAD (NARSA) + frais DGI variables selon catégorie.',
    feesNoteAr: '250 درهماً (الوكالة الوطنية للسلامة الطرقية) + رسوم الإدارة الضريبية حسب الصنف.',
    delayNote: "60 jours en moyenne (délai variable). Permis retiré au service provincial de la sécurité routière de Rabat.",
    delayNoteAr: '60 يوماً في المتوسط (الأجل متغير). تُستلم رخصة السياقة من المصلحة الإقليمية للسلامة الطرقية بالرباط.',
    onlineLinks: [],
    fallbackNote: "Inscription via une auto-école agréée à Rabat. Le service provincial de la sécurité routière est compétent pour la délivrance.",
    fallbackNoteAr: 'التسجيل عبر مدرسة تعليم السياقة المعتمدة بالرباط. المصلحة الإقليمية للسلامة الطرقية هي الجهة المختصة بالتسليم.',
    verificationDate: '2026-03-27',
  },
  'tanger-permis-conduire': {
    citySlug: 'tanger', serviceSlug: 'permis-conduire',
    requiredDocs: permisConducteDocs, requiredDocsAr: permisConducteDocsAr,
    feesNote: '250 MAD (NARSA) + frais DGI variables selon catégorie.',
    feesNoteAr: '250 درهماً (الوكالة الوطنية للسلامة الطرقية) + رسوم الإدارة الضريبية حسب الصنف.',
    delayNote: "60 jours en moyenne (délai variable). Permis retiré au service provincial de la sécurité routière de Tanger.",
    delayNoteAr: '60 يوماً في المتوسط (الأجل متغير). تُستلم رخصة السياقة من المصلحة الإقليمية للسلامة الطرقية بطنجة.',
    onlineLinks: [],
    fallbackNote: "Inscription via une auto-école agréée à Tanger. Le certificat médical est délivré par un médecin agréé par le service provincial.",
    fallbackNoteAr: 'التسجيل عبر مدرسة تعليم السياقة المعتمدة بطنجة. تُسلَّم الشهادة الطبية من طبيب معتمد من طرف المصلحة الإقليمية.',
    verificationDate: '2026-03-27',
  },

  // ─── Casier judiciaire ─────────────────────────────────────────────────────
  'casablanca-casier-judiciaire': {
    citySlug: 'casablanca', serviceSlug: 'casier-judiciaire',
    requiredDocs: casierJudiciaireDocs, requiredDocsAr: casierJudiciaireDocsAr,
    feesNote: 'Gratuit par email. 25 MAD par courrier recommande au Maroc. 40 MAD par courrier international. Timbre fiscal de 10 MAD pour le retrait en personne.',
    feesNoteAr: 'مجانا عبر البريد الإلكتروني. 25 درهماً بالبريد المضمون داخل المغرب. 40 درهماً بالبريد الدولي. تنبر جبائي 10 دراهم عند الاستلام الشخصي.',
    delayNote: 'Le jour meme de la demande. Le bulletin est delivre immediatement lors du retrait en personne au tribunal, ou envoye par email apres soumission en ligne.',
    delayNoteAr: 'في نفس يوم تقديم الطلب. تُسلَّم البطاقة فوراً عند الاستلام الشخصي من المحكمة، أو تُرسَل بالبريد الإلكتروني بعد التقديم الرقمي.',
    onlineLinks: [
      { label: 'Demande en ligne (casier judiciaire)', url: 'https://casierjudiciaire.justice.gov.ma' },
    ],
    fallbackNote: "Le centre local du casier judiciaire est tenu par le greffe du Tribunal de Premiere Instance de Casablanca (lieu de naissance pour les nes a Casablanca). Pour les nes a l'etranger : Centre national du casier judiciaire, Ministere de la Justice, Rabat.",
    fallbackNoteAr: 'المركز المحلي للسجل العدلي يتولى إدارته كتابة ضبط المحكمة الابتدائية بالدار البيضاء (للمولودين بالدار البيضاء). للمولودين في الخارج: المركز الوطني للسجل العدلي، وزارة العدل، الرباط.',
    verificationDate: '2026-03-27',
  },
  'rabat-casier-judiciaire': {
    citySlug: 'rabat', serviceSlug: 'casier-judiciaire',
    requiredDocs: casierJudiciaireDocs, requiredDocsAr: casierJudiciaireDocsAr,
    feesNote: 'Gratuit par email. 25 MAD par courrier recommande au Maroc. 40 MAD par courrier international. Timbre fiscal de 10 MAD pour le retrait en personne.',
    feesNoteAr: 'مجانا عبر البريد الإلكتروني. 25 درهماً بالبريد المضمون داخل المغرب. 40 درهماً بالبريد الدولي. تنبر جبائي 10 دراهم عند الاستلام الشخصي.',
    delayNote: 'Le jour meme de la demande. Le centre national du casier judiciaire est situe a Rabat (Ministere de la Justice) — competent pour les nes a l\'etranger.',
    delayNoteAr: 'في نفس يوم تقديم الطلب. المركز الوطني للسجل العدلي يقع بالرباط (وزارة العدل) — مختص بالمولودين في الخارج.',
    onlineLinks: [
      { label: 'Demande en ligne (casier judiciaire)', url: 'https://casierjudiciaire.justice.gov.ma' },
    ],
    fallbackNote: "Le Tribunal de Premiere Instance de Rabat gere les casiers des nes a Rabat. Le Centre national (Ministere de la Justice, Rabat) gere les casiers des nes a l'etranger.",
    fallbackNoteAr: 'المحكمة الابتدائية بالرباط تتولى السجلات العدلية للمولودين بالرباط. المركز الوطني (وزارة العدل، الرباط) يختص بسجلات المولودين في الخارج.',
    verificationDate: '2026-03-27',
  },
  'tanger-casier-judiciaire': {
    citySlug: 'tanger', serviceSlug: 'casier-judiciaire',
    requiredDocs: casierJudiciaireDocs, requiredDocsAr: casierJudiciaireDocsAr,
    feesNote: 'Gratuit par email. 25 MAD par courrier recommande au Maroc. 40 MAD par courrier international. Timbre fiscal de 10 MAD pour le retrait en personne.',
    feesNoteAr: 'مجانا عبر البريد الإلكتروني. 25 درهماً بالبريد المضمون داخل المغرب. 40 درهماً بالبريد الدولي. تنبر جبائي 10 دراهم عند الاستلام الشخصي.',
    delayNote: 'Le jour meme de la demande. Retrait en personne au Tribunal de Premiere Instance de Tanger ou envoi par email apres soumission en ligne.',
    delayNoteAr: 'في نفس يوم تقديم الطلب. يُستلم شخصياً من المحكمة الابتدائية بطنجة أو يُرسَل بالبريد الإلكتروني بعد التقديم الإلكتروني.',
    onlineLinks: [
      { label: 'Demande en ligne (casier judiciaire)', url: 'https://casierjudiciaire.justice.gov.ma' },
    ],
    fallbackNote: "Le centre local du casier judiciaire est tenu par le greffe du Tribunal de Premiere Instance de Tanger (pour les nes a Tanger). Le tribunal est situe boulevard Mohamed V.",
    fallbackNoteAr: 'المركز المحلي للسجل العدلي يتولى إدارته كتابة ضبط المحكمة الابتدائية بطنجة (للمولودين بطنجة). تقع المحكمة بشارع محمد الخامس.',
    verificationDate: '2026-03-27',
  },

  // ─── Duplicata CNIE (perte / vol) ─────────────────────────────────────────
  'casablanca-duplicata-cin': {
    citySlug: 'casablanca', serviceSlug: 'duplicata-cin',
    requiredDocs: duplicataCinDocs, requiredDocsAr: duplicataCinDocsAr,
    feesNote: '75 MAD — droits de timbre (واجبات التمبر). Meme tarif que le renouvellement standard.',
    feesNoteAr: '75 درهماً — واجبات التمبر. نفس تعريفة التجديد العادي.',
    delayNote: '10 jours. La declaration de perte doit etre etablie avant le depot du dossier a l\'annexe administrative.',
    delayNoteAr: '10 أيام. يجب تقديم تصريح الضياع قبل إيداع الملف في المقاطعة الإدارية.',
    onlineLinks: [],
    fallbackNote: "Demarche identique au renouvellement CNIE, avec en plus la declaration de perte/vol. Adressez-vous a l'annexe administrative de votre quartier a Casablanca.",
    fallbackNoteAr: 'الإجراء مماثل لتجديد البطاقة الوطنية، مع إضافة تصريح الضياع أو السرقة. توجه إلى مقاطعتك الإدارية بالدار البيضاء.',
    verificationDate: '2026-03-27',
  },
  'rabat-duplicata-cin': {
    citySlug: 'rabat', serviceSlug: 'duplicata-cin',
    requiredDocs: duplicataCinDocs, requiredDocsAr: duplicataCinDocsAr,
    feesNote: '75 MAD — droits de timbre (واجبات التمبر).',
    feesNoteAr: '75 درهماً — واجبات التمبر.',
    delayNote: '10 jours. Declaration de perte obligatoire avant depot a l\'annexe.',
    delayNoteAr: '10 أيام. تصريح الضياع إلزامي قبل الإيداع في المقاطعة.',
    onlineLinks: [],
    fallbackNote: "Presentez-vous au commissariat ou a la gendarmerie pour la declaration de perte, puis deposez le dossier a l'annexe administrative de Rabat.",
    fallbackNoteAr: 'توجه أولاً للشرطة أو الدرك للتصريح بالضياع، ثم أودع الملف في المقاطعة الإدارية بالرباط.',
    verificationDate: '2026-03-27',
  },
  'tanger-duplicata-cin': {
    citySlug: 'tanger', serviceSlug: 'duplicata-cin',
    requiredDocs: duplicataCinDocs, requiredDocsAr: duplicataCinDocsAr,
    feesNote: '75 MAD — droits de timbre (واجبات التمبر).',
    feesNoteAr: '75 درهماً — واجبات التمبر.',
    delayNote: '10 jours. Declaration de perte obligatoire avant depot a l\'annexe.',
    delayNoteAr: '10 أيام. تصريح الضياع إلزامي قبل الإيداع في المقاطعة.',
    onlineLinks: [],
    fallbackNote: "Faire la declaration de perte a la police ou gendarmerie de Tanger, puis deposer le dossier a l'annexe Beni Makada ou Malabata selon le quartier.",
    fallbackNoteAr: 'قدم تصريح الضياع للشرطة أو الدرك بطنجة، ثم أودع الملف في مقاطعة بني مكادة أو المالاباطا حسب حيك.',
    verificationDate: '2026-03-27',
  },

  // ─── Carte grise ──────────────────────────────────────────────────────────
  'casablanca-carte-grise': {
    citySlug: 'casablanca', serviceSlug: 'carte-grise',
    requiredDocs: carteGriseDocs, requiredDocsAr: carteGriseDocsAr,
    feesNote: 'DGI variable selon puissance fiscale + 300 MAD NARSA. Le montant DGI est calcule selon les articles 252 CGI et l\'article 2 du decret 2.19.971.',
    feesNoteAr: 'واجبات الضرائب متغيرة حسب القدرة الجبائية للمركبة + 300 درهم للوكالة الوطنية للسلامة الطرقية. يُحسب المبلغ وفق المادة 252 م.ع.ض والمادة 2 من المرسوم 2.19.971.',
    delayNote: '60 jours. Le retrait se fait au centre NARSA Casablanca (Ain Sebaa) sur presentation du recu de depot.',
    delayNoteAr: '60 يوماً. يُستلم من مركز الوكالة الوطنية للسلامة الطرقية بالدار البيضاء (عين السبع) بتقديم وصل الإيداع.',
    onlineLinks: [{ label: 'Services en ligne NARSA', url: 'https://v2khadamatnarsa.ltc.ma' }],
    fallbackNote: "Achetez d'abord le formulaire norme I (vehicule neuf) ou norme II (vehicule d'occasion) au centre NARSA. Les droits DGI se reglent via un intermediaire agree avant le depot.",
    fallbackNoteAr: 'احصل أولاً على النموذج I (مركبة جديدة) أو النموذج II (مركبة مستعملة) من مركز الوكالة. تُسدَّد واجبات إدارة الضرائب عبر وسيط معتمد قبل الإيداع.',
    verificationDate: '2026-03-27',
  },
  'rabat-carte-grise': {
    citySlug: 'rabat', serviceSlug: 'carte-grise',
    requiredDocs: carteGriseDocs, requiredDocsAr: carteGriseDocsAr,
    feesNote: 'DGI variable selon puissance fiscale + 300 MAD NARSA.',
    feesNoteAr: 'واجبات الضرائب متغيرة حسب القدرة الجبائية + 300 درهم للوكالة الوطنية للسلامة الطرقية.',
    delayNote: '60 jours. Retrait au centre NARSA Rabat (Avenue de France).',
    delayNoteAr: '60 يوماً. يُستلم من مركز الوكالة الوطنية للسلامة الطرقية بالرباط (شارع فرنسا).',
    onlineLinks: [{ label: 'Services en ligne NARSA', url: 'https://v2khadamatnarsa.ltc.ma' }],
    fallbackNote: "Le centre NARSA de Rabat est l'interlocuteur pour l'immatriculation. Verifiez la competence territoriale selon votre adresse de residence.",
    fallbackNoteAr: 'مركز الوكالة الوطنية للسلامة الطرقية بالرباط هو الجهة المختصة بالتسجيل. تحقق من الاختصاص الترابي حسب عنوان إقامتك.',
    verificationDate: '2026-03-27',
  },
  'tanger-carte-grise': {
    citySlug: 'tanger', serviceSlug: 'carte-grise',
    requiredDocs: carteGriseDocs, requiredDocsAr: carteGriseDocsAr,
    feesNote: 'DGI variable selon puissance fiscale + 300 MAD NARSA.',
    feesNoteAr: 'واجبات الضرائب متغيرة حسب القدرة الجبائية + 300 درهم للوكالة الوطنية للسلامة الطرقية.',
    delayNote: '60 jours. Retrait au centre NARSA Tanger (Route de Tetouan).',
    delayNoteAr: '60 يوماً. يُستلم من مركز الوكالة الوطنية للسلامة الطرقية بطنجة (طريق تطوان).',
    onlineLinks: [{ label: 'Services en ligne NARSA', url: 'https://v2khadamatnarsa.ltc.ma' }],
    fallbackNote: "Le centre NARSA de Tanger couvre la region Tanger-Tetouan-Al Hoceima. Munissez-vous du formulaire et des droits DGI avant le depot.",
    fallbackNoteAr: 'مركز الوكالة الوطنية للسلامة الطرقية بطنجة يغطي جهة طنجة-تطوان-الحسيمة. احضر النموذج ووصل واجبات الضرائب قبل إيداع الملف.',
    verificationDate: '2026-03-27',
  },

  // ─── Carte de sejour etrangers ─────────────────────────────────────────────
  'casablanca-carte-sejour-etranger': {
    citySlug: 'casablanca', serviceSlug: 'carte-sejour-etranger',
    requiredDocs: carteSejourDocs, requiredDocsAr: carteSejourDocsAr,
    feesNote: '100 MAD (واجب التسجيل والتمبر — droit d\'enregistrement et de timbre).',
    feesNoteAr: '100 درهم (واجب التسجيل والتنبر).',
    delayNote: '30 jours. Retrait a la Prefecture de Police de Casablanca (Service des etrangers).',
    delayNoteAr: '30 يوماً. يُستلم من مديرية الأمن بالدار البيضاء (مصلحة الأجانب).',
    onlineLinks: [],
    fallbackNote: "Adressez-vous au service des etrangers de la prefecture de police du lieu de residence. Le certificat medical doit etre etabli par un medecin agree par la prefecture.",
    fallbackNoteAr: 'توجه إلى مصلحة الأجانب في مديرية الأمن التابعة لمحل إقامتك. يجب أن تكون الشهادة الطبية صادرة عن طبيب معتمد لدى المديرية.',
    verificationDate: '2026-03-27',
  },
  'rabat-carte-sejour-etranger': {
    citySlug: 'rabat', serviceSlug: 'carte-sejour-etranger',
    requiredDocs: carteSejourDocs, requiredDocsAr: carteSejourDocsAr,
    feesNote: '100 MAD (واجب التسجيل والتمبر).',
    feesNoteAr: '100 درهم (واجب التسجيل والتنبر).',
    delayNote: '30 jours. Retrait a la Prefecture de Police de Rabat (Service des etrangers, Avenue Ibn Sina).',
    delayNoteAr: '30 يوماً. يُستلم من مديرية الأمن بالرباط (مصلحة الأجانب، شارع ابن سينا).',
    onlineLinks: [],
    fallbackNote: "La prefecture de police de Rabat (Avenue Ibn Sina) gere les cartes de sejour du ressort de Rabat. Verifiez la competence selon votre commune de residence.",
    fallbackNoteAr: 'مديرية أمن الرباط (شارع ابن سينا) تتولى بطاقات الإقامة في نفوذها الترابي. تحقق من الاختصاص حسب جماعة إقامتك.',
    verificationDate: '2026-03-27',
  },
  'tanger-carte-sejour-etranger': {
    citySlug: 'tanger', serviceSlug: 'carte-sejour-etranger',
    requiredDocs: carteSejourDocs, requiredDocsAr: carteSejourDocsAr,
    feesNote: '100 MAD (واجب التسجيل والتمبر).',
    feesNoteAr: '100 درهم (واجب التسجيل والتنبر).',
    delayNote: '30 jours. Retrait a la Prefecture de Police de Tanger (Service des etrangers).',
    delayNoteAr: '30 يوماً. يُستلم من مديرية الأمن بطنجة (مصلحة الأجانب).',
    onlineLinks: [],
    fallbackNote: "Adressez-vous a la prefecture de police de Tanger. Tanger etant un point d'entree international, les delais peuvent varier selon l'affluence.",
    fallbackNoteAr: 'توجه إلى مديرية أمن طنجة. نظراً لكون طنجة نقطة دخول دولية، قد تتفاوت الآجال حسب الإقبال.',
    verificationDate: '2026-03-27',
  },

  // ─── Permis de construire ──────────────────────────────────────────────────
  'casablanca-permis-construire': {
    citySlug: 'casablanca', serviceSlug: 'permis-construire',
    requiredDocs: permisConstruireDocs, requiredDocsAr: permisConstruireDocsAr,
    feesNote: 'Taxe sur operations de construction : 10-20 MAD/m2 (immeubles collectifs, commerciaux) ou 20-30 MAD/m2 (maisons individuelles). Fixee par le conseil communal. + Contrepartie Agence Urbaine variable.',
    feesNoteAr: 'رسم عمليات البناء: 10-20 درهماً/م² (العمارات الجماعية والتجارية) أو 20-30 درهماً/م² (المساكن الفردية). يُحدد بقرار المجلس الجماعي. + مقابل الوكالة الحضرية (متغير).',
    delayNote: 'Etude du dossier : immediat (petits projets) ou 15 jours ouvrables (grands projets). Decision du president de commune : dans les 60 jours maximum (loi 19-55). Notification : 2 jours ouvrables.',
    delayNoteAr: 'دراسة الملف: فوري (المشاريع الصغيرة) أو 15 يوماً مفتوحاً (المشاريع الكبيرة). قرار رئيس الجماعة: خلال 60 يوماً على الأكثر (القانون 19-55). التبليغ: يومان مفتوحان.',
    onlineLinks: [],
    fallbackNote: "Deposez le dossier a la commune (arrondissement) du lieu du terrain. L'Agence Urbaine de Casablanca instruit et emet un avis avant decision communale.",
    fallbackNoteAr: 'أودع الملف في جماعة (مقاطعة) موقع البقعة. تتولى الوكالة الحضرية للدار البيضاء الدراسة وإبداء الرأي قبل القرار الجماعي.',
    verificationDate: '2026-03-27',
  },
  'rabat-permis-construire': {
    citySlug: 'rabat', serviceSlug: 'permis-construire',
    requiredDocs: permisConstruireDocs, requiredDocsAr: permisConstruireDocsAr,
    feesNote: 'Taxe sur operations de construction : 10-20 MAD/m2 (collectif) ou 20-30 MAD/m2 (individuel). + Contrepartie Agence Urbaine de Rabat-Sale.',
    feesNoteAr: 'رسم عمليات البناء: 10-20 درهماً/م² (الجماعي) أو 20-30 درهماً/م² (الفردي). + مقابل وكالة الرباط-سلا الحضرية.',
    delayNote: 'Petits projets : immediat. Grands projets : 15 jours etude + decision dans 60 jours max (loi 19-55).',
    delayNoteAr: 'المشاريع الصغيرة: فوري. المشاريع الكبيرة: 15 يوماً للدراسة + القرار خلال 60 يوماً على الأكثر (القانون 19-55).',
    onlineLinks: [],
    fallbackNote: "Deposez le dossier a la commune ou l'arrondissement du lieu de construction. L'Agence Urbaine de Rabat-Sale instruit le dossier en parallele.",
    fallbackNoteAr: 'أودع الملف في جماعة أو مقاطعة موقع البناء. تتولى وكالة الرباط-سلا الحضرية دراسة الملف بالتوازي.',
    verificationDate: '2026-03-27',
  },
  'tanger-permis-construire': {
    citySlug: 'tanger', serviceSlug: 'permis-construire',
    requiredDocs: permisConstruireDocs, requiredDocsAr: permisConstruireDocsAr,
    feesNote: 'Taxe sur operations de construction : 10-20 MAD/m2 (collectif) ou 20-30 MAD/m2 (individuel). + Contrepartie Agence Urbaine de Tanger-Tetouan.',
    feesNoteAr: 'رسم عمليات البناء: 10-20 درهماً/م² (الجماعي) أو 20-30 درهماً/م² (الفردي). + مقابل وكالة طنجة-تطوان الحضرية.',
    delayNote: 'Petits projets : immediat. Grands projets : 15 jours etude + decision dans 60 jours max (loi 19-55).',
    delayNoteAr: 'المشاريع الصغيرة: فوري. المشاريع الكبيرة: 15 يوماً للدراسة + القرار خلال 60 يوماً على الأكثر (القانون 19-55).',
    onlineLinks: [],
    fallbackNote: "Deposez le dossier a la commune de Tanger. L'Agence Urbaine de Tanger-Tetouan instruit le dossier. L'architecte agree est obligatoire pour tout projet soumis a permis.",
    fallbackNoteAr: 'أودع الملف في جماعة طنجة. تتولى وكالة طنجة-تطوان الحضرية دراسة الملف. المهندس المعماري المرخص إلزامي لكل مشروع يستوجب رخصة البناء.',
    verificationDate: '2026-03-27',
  },

  // ─── Statut auto-entrepreneur ──────────────────────────────────────────────
  'casablanca-auto-entrepreneur': {
    citySlug: 'casablanca', serviceSlug: 'auto-entrepreneur',
    requiredDocs: autoEntrepreneurDocs, requiredDocsAr: autoEntrepreneurDocsAr,
    feesNote: 'Gratuit a Barid Al Maghrib. Commission variable selon la banque partenaire choisie.',
    feesNoteAr: 'مجاناً عبر بريد المغرب. عمولة متغيرة حسب البنك الشريك المختار.',
    delayNote: '15 jours. Le numero de reference auto-entrepreneur est delivre par Barid Al Maghrib ou la banque.',
    delayNoteAr: '15 يوماً. يُسلَّم رقم مرجع المقاول الذاتي عبر بريد المغرب أو البنك.',
    onlineLinks: [{ label: 'Inscription en ligne', url: 'https://www.autoentrepreneur.ma' }],
    fallbackNote: "Presentez-vous a n'importe quelle agence Barid Al Maghrib de Casablanca. L'inscription est aussi possible en ligne sur autoentrepreneur.ma. Le CA plafond est de 500 000 MAD/an (services) ou 2 000 000 MAD/an (commerce).",
    fallbackNoteAr: 'توجه إلى أي وكالة لبريد المغرب بالدار البيضاء. يمكن أيضاً التسجيل إلكترونياً على autoentrepreneur.ma. الحد الأقصى للرقم المعاملات: 500 000 درهم/سنة (الخدمات) أو 2 000 000 درهم/سنة (التجارة).',
    verificationDate: '2026-03-27',
  },
  'rabat-auto-entrepreneur': {
    citySlug: 'rabat', serviceSlug: 'auto-entrepreneur',
    requiredDocs: autoEntrepreneurDocs, requiredDocsAr: autoEntrepreneurDocsAr,
    feesNote: 'Gratuit a Barid Al Maghrib. Commission variable selon la banque partenaire.',
    feesNoteAr: 'مجاناً عبر بريد المغرب. عمولة متغيرة حسب البنك الشريك.',
    delayNote: '15 jours. Numero de reference delivre par Barid ou banque partenaire.',
    delayNoteAr: '15 يوماً. يُسلَّم رقم المرجع عبر بريد المغرب أو البنك الشريك.',
    onlineLinks: [{ label: 'Inscription en ligne', url: 'https://www.autoentrepreneur.ma' }],
    fallbackNote: "Toute agence Barid Al Maghrib de Rabat est habilitee a recevoir les inscriptions. Inscription possible en ligne sur autoentrepreneur.ma.",
    fallbackNoteAr: 'كل وكالات بريد المغرب بالرباط مخولة لاستقبال التسجيلات. يمكن أيضاً التسجيل إلكترونياً على autoentrepreneur.ma.',
    verificationDate: '2026-03-27',
  },
  'tanger-auto-entrepreneur': {
    citySlug: 'tanger', serviceSlug: 'auto-entrepreneur',
    requiredDocs: autoEntrepreneurDocs, requiredDocsAr: autoEntrepreneurDocsAr,
    feesNote: 'Gratuit a Barid Al Maghrib. Commission variable selon la banque partenaire.',
    feesNoteAr: 'مجاناً عبر بريد المغرب. عمولة متغيرة حسب البنك الشريك.',
    delayNote: '15 jours. Numero de reference delivre par Barid ou banque partenaire.',
    delayNoteAr: '15 يوماً. يُسلَّم رقم المرجع عبر بريد المغرب أو البنك الشريك.',
    onlineLinks: [{ label: 'Inscription en ligne', url: 'https://www.autoentrepreneur.ma' }],
    fallbackNote: "Inscrivez-vous a n'importe quelle agence Barid de Tanger ou en ligne sur autoentrepreneur.ma. La cotisation sociale (CNSS) est de 6 % sur le CA (services) ou 3 % (commerce).",
    fallbackNoteAr: 'سجّل في أي وكالة لبريد المغرب بطنجة أو إلكترونياً على autoentrepreneur.ma. الاشتراك الاجتماعي (CNSS): 6 % من رقم الأعمال (الخدمات) أو 3 % (التجارة).',
    verificationDate: '2026-03-27',
  },

  // ─── Registre de commerce (SARL) ──────────────────────────────────────────
  'casablanca-registre-commerce': {
    citySlug: 'casablanca', serviceSlug: 'registre-commerce',
    requiredDocs: registreCommerceDocs, requiredDocsAr: registreCommerceDocsAr,
    feesNote: '200 MAD (depot) + 150 MAD (inscription au registre) = 350 MAD total. Hors frais de notaire pour les statuts et enregistrement fiscal.',
    feesNoteAr: '200 درهم (الإيداع) + 150 درهم (التقييد في السجل التجاري) = 350 درهماً إجمالاً. دون احتساب أتعاب الموثق لتسجيل النظام الأساسي.',
    delayNote: '2 jours ouvrables apres depot complet du dossier au greffe du Tribunal de Commerce de Casablanca.',
    delayNoteAr: 'يومان من أيام العمل بعد إيداع الملف الكامل لدى كتابة ضبط المحكمة التجارية بالدار البيضاء.',
    onlineLinks: [{ label: 'Certificat negatif (OMPIC)', url: 'https://www.ompic.ma' }],
    fallbackNote: "Commencez par obtenir la Shehada Salbiya (certificat negatif) aupres de l'OMPIC. Les statuts doivent etre enregistres a la Direction des Impots avant le depot au greffe.",
    fallbackNoteAr: 'ابدأ بالحصول على الشهادة السلبية من المنظمة المغربية للملكية الصناعية والتجارية. يجب تسجيل النظام الأساسي لدى إدارة الضرائب قبل الإيداع لدى كتابة الضبط.',
    verificationDate: '2026-03-27',
  },
  'rabat-registre-commerce': {
    citySlug: 'rabat', serviceSlug: 'registre-commerce',
    requiredDocs: registreCommerceDocs, requiredDocsAr: registreCommerceDocsAr,
    feesNote: '200 MAD (depot) + 150 MAD (inscription) = 350 MAD total.',
    feesNoteAr: '200 درهم (الإيداع) + 150 درهم (التقييد) = 350 درهماً إجمالاً.',
    delayNote: '2 jours ouvrables. Depot au Tribunal de Commerce de Rabat (Avenue Fal Ould Oumeir).',
    delayNoteAr: 'يومان من أيام العمل. الإيداع في المحكمة التجارية بالرباط (شارع فال ولد عمير).',
    onlineLinks: [{ label: 'Certificat negatif (OMPIC)', url: 'https://www.ompic.ma' }],
    fallbackNote: "Obtenez d'abord le certificat negatif OMPIC, enregistrez les statuts a la Direction des Impots de Rabat, puis deposez au greffe du Tribunal de Commerce.",
    fallbackNoteAr: 'احصل أولاً على الشهادة السلبية من OMPIC، سجّل النظام الأساسي لدى مديرية الضرائب بالرباط، ثم أودع لدى كتابة ضبط المحكمة التجارية.',
    verificationDate: '2026-03-27',
  },
  'tanger-registre-commerce': {
    citySlug: 'tanger', serviceSlug: 'registre-commerce',
    requiredDocs: registreCommerceDocs, requiredDocsAr: registreCommerceDocsAr,
    feesNote: '200 MAD (depot) + 150 MAD (inscription) = 350 MAD total.',
    feesNoteAr: '200 درهم (الإيداع) + 150 درهم (التقييد) = 350 درهماً إجمالاً.',
    delayNote: '2 jours ouvrables. Depot au Tribunal de Commerce de Tanger.',
    delayNoteAr: 'يومان من أيام العمل. الإيداع في المحكمة التجارية بطنجة.',
    onlineLinks: [{ label: 'Certificat negatif (OMPIC)', url: 'https://www.ompic.ma' }],
    fallbackNote: "Le Tribunal de Commerce de Tanger couvre la region Tanger-Tetouan. La shehada salbiya OMPIC est disponible en ligne ou dans les centres CRI de la region.",
    fallbackNoteAr: 'المحكمة التجارية بطنجة تغطي جهة طنجة-تطوان. الشهادة السلبية من OMPIC متوفرة إلكترونياً أو في مراكز الجهوية للاستثمار بالجهة.',
    verificationDate: '2026-03-27',
  },

  // ─── Inscription liste electorale ─────────────────────────────────────────
  'casablanca-inscription-liste-electorale': {
    citySlug: 'casablanca', serviceSlug: 'inscription-liste-electorale',
    requiredDocs: listeElectoraleDocs, requiredDocsAr: listeElectoraleDocsAr,
    feesNote: 'Gratuit.',
    feesNoteAr: 'مجاناً.',
    delayNote: '3 jours. L\'inscription est effective a compter de la validation par la commission administrative locale.',
    delayNoteAr: '3 أيام. يصبح التسجيل نافذاً بعد مصادقة اللجنة الإدارية المحلية.',
    onlineLinks: [],
    fallbackNote: "Adressez-vous a l'annexe administrative ou a la commune de votre lieu de residence a Casablanca. L'inscription est ouverte en continu (hors periode electorale close).",
    fallbackNoteAr: 'توجه إلى المقاطعة الإدارية أو الجماعة التابعة لمحل إقامتك بالدار البيضاء. التسجيل مفتوح باستمرار (خارج فترة إغلاق اللوائح الانتخابية).',
    verificationDate: '2026-03-27',
  },
  'rabat-inscription-liste-electorale': {
    citySlug: 'rabat', serviceSlug: 'inscription-liste-electorale',
    requiredDocs: listeElectoraleDocs, requiredDocsAr: listeElectoraleDocsAr,
    feesNote: 'Gratuit.',
    feesNoteAr: 'مجاناً.',
    delayNote: '3 jours. Validation par la commission administrative de la commune.',
    delayNoteAr: '3 أيام. تصادق عليه اللجنة الإدارية للجماعة.',
    onlineLinks: [],
    fallbackNote: "Presentez-vous a l'annexe administrative ou a la commune de Rabat du lieu de residence. La CNIE en cours de validite suffit.",
    fallbackNoteAr: 'توجه إلى المقاطعة الإدارية أو جماعة محل إقامتك بالرباط. البطاقة الوطنية الوطنية سارية المفعول كافية.',
    verificationDate: '2026-03-27',
  },
  'tanger-inscription-liste-electorale': {
    citySlug: 'tanger', serviceSlug: 'inscription-liste-electorale',
    requiredDocs: listeElectoraleDocs, requiredDocsAr: listeElectoraleDocsAr,
    feesNote: 'Gratuit.',
    feesNoteAr: 'مجاناً.',
    delayNote: '3 jours. Validation par la commission administrative de la commune de Tanger.',
    delayNoteAr: '3 أيام. تصادق عليه اللجنة الإدارية لجماعة طنجة.',
    onlineLinks: [],
    fallbackNote: "Adressez-vous a la commune ou a l'annexe administrative de votre quartier a Tanger. Aucun frais, aucun document supplementaire requis.",
    fallbackNoteAr: 'توجه إلى الجماعة أو المقاطعة الإدارية بحيك في طنجة. لا رسوم، ولا وثائق إضافية مطلوبة.',
    verificationDate: '2026-03-27',
  },

  // ── Vignette automobile (TSAVA) ─────────────────────────────────────────────
  'casablanca-vignette-auto': {
    citySlug: 'casablanca', serviceSlug: 'vignette-auto',
    requiredDocs: [
      "Carte grise de votre vehicule (pour connaitre la puissance fiscale en CV et le type de carburant)",
      "Carte bancaire marocaine (CMI) pour le paiement en ligne sur mavignette.ma",
    ],
    requiredDocsAr: [
      'بطاقة تسجيل المركبة (الرمادية) — للاطلاع على القوة الجبائية بالحصان والوقود المستعمل',
      'بطاقة بنكية مغربية (CMI) للأداء الإلكتروني عبر mavignette.ma',
    ],
    feesNote: 'Tarif national (CGI 2026, art. 259-270) — mavignette.ma (+12 MAD frais de service). Voitures de tourisme, Essence : < 8 CV = 350 MAD, 8-10 CV = 650 MAD, 11-14 CV = 3 000 MAD, 15 CV et + = 8 000 MAD. Gasoil : < 8 CV = 700 MAD, 8-10 CV = 1 500 MAD, 11-14 CV = 6 000 MAD, 15 CV et + = 20 000 MAD. Vehicules electriques et hybrides : exoneres.',
    feesNoteAr: 'تعريفة وطنية (CGI 2026، المواد 259-270) — mavignette.ma (+12 درهماً رسوم الخدمة). السيارات السياحية، بنزين: أقل من 8 أحصنة = 350 درهماً، 8-10 أحصنة = 650 درهماً، 11-14 حصاناً = 3000 درهم، 15 حصاناً وأكثر = 8000 درهم. ديزل: أقل من 8 أحصنة = 700 درهم، 8-10 أحصنة = 1500 درهم، 11-14 حصاناً = 6000 درهم، 15 حصاناً وأكثر = 20000 درهم. المركبات الكهربائية والهجينة: معفاة.',
    delayNote: 'Immediat — attestation telechargeable des la confirmation du paiement.',
    delayNoteAr: 'فوري — تُنزَّل شهادة الأداء فور تأكيد الدفع.',
    onlineLinks: [
      { label: 'Payer sur mavignette.ma', url: 'https://www.mavignette.ma' },
      { label: "Telecharger l'attestation", url: 'https://www.vignette.ma' },
    ],
    fallbackNote: "Aucun deplacement requis. Payez en ligne sur mavignette.ma ou dans n'importe quelle agence bancaire, DAB ou via votre banque en ligne. La puissance fiscale (CV) figure sur votre carte grise. Echeance : avant fin janvier de chaque annee (ou dans les 30 jours suivant la date du recepisse pour un vehicule neuf).",
    fallbackNoteAr: 'لا يلزم التنقل. أدِّ الرسم عبر mavignette.ma أو في أي وكالة بنكية أو صراف آلي أو عبر بنكك الإلكتروني. القوة الجبائية (بالحصان) مذكورة في البطاقة الرمادية. أجل الأداء: قبل نهاية يناير من كل سنة (أو خلال 30 يوماً من تاريخ الاستلام للمركبات الجديدة).',
    verificationDate: '2026-03-28',
  },
  'rabat-vignette-auto': {
    citySlug: 'rabat', serviceSlug: 'vignette-auto',
    requiredDocs: [
      "Carte grise de votre vehicule (pour connaitre la puissance fiscale en CV et le type de carburant)",
      "Carte bancaire marocaine (CMI) pour le paiement en ligne sur mavignette.ma",
    ],
    requiredDocsAr: [
      'بطاقة تسجيل المركبة (الرمادية) — للاطلاع على القوة الجبائية بالحصان والوقود المستعمل',
      'بطاقة بنكية مغربية (CMI) للأداء الإلكتروني عبر mavignette.ma',
    ],
    feesNote: 'Tarif national (CGI 2026, art. 259-270) — mavignette.ma (+12 MAD frais de service). Voitures de tourisme, Essence : < 8 CV = 350 MAD, 8-10 CV = 650 MAD, 11-14 CV = 3 000 MAD, 15 CV et + = 8 000 MAD. Gasoil : < 8 CV = 700 MAD, 8-10 CV = 1 500 MAD, 11-14 CV = 6 000 MAD, 15 CV et + = 20 000 MAD. Vehicules electriques et hybrides : exoneres.',
    feesNoteAr: 'تعريفة وطنية (CGI 2026، المواد 259-270) — mavignette.ma (+12 درهماً رسوم الخدمة). السيارات السياحية، بنزين: أقل من 8 أحصنة = 350 درهماً، 8-10 أحصنة = 650 درهماً، 11-14 حصاناً = 3000 درهم، 15 حصاناً وأكثر = 8000 درهم. ديزل: أقل من 8 أحصنة = 700 درهم، 8-10 أحصنة = 1500 درهم، 11-14 حصاناً = 6000 درهم، 15 حصاناً وأكثر = 20000 درهم. المركبات الكهربائية والهجينة: معفاة.',
    delayNote: 'Immediat — attestation telechargeable des la confirmation du paiement.',
    delayNoteAr: 'فوري — تُنزَّل شهادة الأداء فور تأكيد الدفع.',
    onlineLinks: [
      { label: 'Payer sur mavignette.ma', url: 'https://www.mavignette.ma' },
      { label: "Telecharger l'attestation", url: 'https://www.vignette.ma' },
    ],
    fallbackNote: "Aucun deplacement requis. Payez en ligne sur mavignette.ma ou dans n'importe quelle agence bancaire, DAB ou via votre banque en ligne. La puissance fiscale (CV) figure sur votre carte grise. Echeance : avant fin janvier de chaque annee (ou dans les 30 jours suivant la date du recepisse pour un vehicule neuf).",
    fallbackNoteAr: 'لا يلزم التنقل. أدِّ الرسم عبر mavignette.ma أو في أي وكالة بنكية أو صراف آلي أو عبر بنكك الإلكتروني. القوة الجبائية (بالحصان) مذكورة في البطاقة الرمادية. أجل الأداء: قبل نهاية يناير من كل سنة (أو خلال 30 يوماً من تاريخ الاستلام للمركبات الجديدة).',
    verificationDate: '2026-03-28',
  },
  'tanger-vignette-auto': {
    citySlug: 'tanger', serviceSlug: 'vignette-auto',
    requiredDocs: [
      "Carte grise de votre vehicule (pour connaitre la puissance fiscale en CV et le type de carburant)",
      "Carte bancaire marocaine (CMI) pour le paiement en ligne sur mavignette.ma",
    ],
    requiredDocsAr: [
      'بطاقة تسجيل المركبة (الرمادية) — للاطلاع على القوة الجبائية بالحصان والوقود المستعمل',
      'بطاقة بنكية مغربية (CMI) للأداء الإلكتروني عبر mavignette.ma',
    ],
    feesNote: 'Tarif national (CGI 2026, art. 259-270) — mavignette.ma (+12 MAD frais de service). Voitures de tourisme, Essence : < 8 CV = 350 MAD, 8-10 CV = 650 MAD, 11-14 CV = 3 000 MAD, 15 CV et + = 8 000 MAD. Gasoil : < 8 CV = 700 MAD, 8-10 CV = 1 500 MAD, 11-14 CV = 6 000 MAD, 15 CV et + = 20 000 MAD. Vehicules electriques et hybrides : exoneres.',
    feesNoteAr: 'تعريفة وطنية (CGI 2026، المواد 259-270) — mavignette.ma (+12 درهماً رسوم الخدمة). السيارات السياحية، بنزين: أقل من 8 أحصنة = 350 درهماً، 8-10 أحصنة = 650 درهماً، 11-14 حصاناً = 3000 درهم، 15 حصاناً وأكثر = 8000 درهم. ديزل: أقل من 8 أحصنة = 700 درهم، 8-10 أحصنة = 1500 درهم، 11-14 حصاناً = 6000 درهم، 15 حصاناً وأكثر = 20000 درهم. المركبات الكهربائية والهجينة: معفاة.',
    delayNote: 'Immediat — attestation telechargeable des la confirmation du paiement.',
    delayNoteAr: 'فوري — تُنزَّل شهادة الأداء فور تأكيد الدفع.',
    onlineLinks: [
      { label: 'Payer sur mavignette.ma', url: 'https://www.mavignette.ma' },
      { label: "Telecharger l'attestation", url: 'https://www.vignette.ma' },
    ],
    fallbackNote: "Aucun deplacement requis. Payez en ligne sur mavignette.ma ou dans n'importe quelle agence bancaire, DAB ou via votre banque en ligne. La puissance fiscale (CV) figure sur votre carte grise. Echeance : avant fin janvier de chaque annee (ou dans les 30 jours suivant la date du recepisse pour un vehicule neuf).",
    fallbackNoteAr: 'لا يلزم التنقل. أدِّ الرسم عبر mavignette.ma أو في أي وكالة بنكية أو صراف آلي أو عبر بنكك الإلكتروني. القوة الجبائية (بالحصان) مذكورة في البطاقة الرمادية. أجل الأداء: قبل نهاية يناير من كل سنة (أو خلال 30 يوماً من تاريخ الاستلام للمركبات الجديدة).',
    verificationDate: '2026-03-28',
  },
}

export function shortFee(feesNote: string): string {
  if (/gratuit/i.test(feesNote)) return 'Gratuit'
  if (/mavignette\.ma/i.test(feesNote)) return 'Payant'
  const match = feesNote.match(/(\d[\d\s]*MAD)/i)
  if (match) return match[1].trim()
  if (/etf\.tax\.gov\.ma/i.test(feesNote)) return 'Payant'
  return feesNote.split('.')[0].trim().slice(0, 20)
}

export function shortFeeAr(feesNoteAr: string): string {
  if (/مجاناً/.test(feesNoteAr)) return 'مجاناً'
  if (/mavignette\.ma|etf\.tax\.gov\.ma/.test(feesNoteAr)) return 'بدفع'
  return feesNoteAr.split('.')[0].trim().slice(0, 20)
}

export function shortDelay(delayNote: string): string {
  if (/immédiat/i.test(delayNote)) return 'Immédiat'
  const match = delayNote.match(/^([^.]+)/)
  return match ? match[1].trim() : delayNote
}

export function shortDelayAr(delayNoteAr: string): string {
  if (/فوري/.test(delayNoteAr)) return 'فوري'
  const match = delayNoteAr.match(/^([^.،]+)/)
  return match ? match[1].trim() : delayNoteAr
}

export function getCityService(citySlug: string, serviceSlug: string): CityService | null {
  return cityServices[`${citySlug}-${serviceSlug}`] ?? null
}
export function listCityServices(): CityService[] { return Object.values(cityServices) }
export function listCities(): City[] { return Object.values(cities) }
export function listServices(): Service[] { return Object.values(services) }
export function listOffices(): Office[] { return Object.values(offices) }
export function getCity(slug: string) { return cities[slug] ?? null }
export function getService(slug: string) { return services[slug] ?? null }
export function getOffice(slug: string) { return offices[slug] ?? null }
export function getOfficesByCity(citySlug: string) {
  return listOffices().filter((o) => o.city === citySlug)
}
export function getOfficesByCityAndService(citySlug: string, serviceSlug: string) {
  return listOffices().filter((o) => o.city === citySlug && o.services.includes(serviceSlug))
}

export function searchIndex(query: string): SearchResult[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  const hits: SearchResult[] = []
  for (const city of listCities()) {
    if (city.name.toLowerCase().includes(q) || city.slug.includes(q) || city.nameAr.includes(q)) {
      hits.push({ type: 'city', href: `/villes/${city.slug}`, title: city.name, subtitle: `Ville · ${city.region}` })
    }
  }
  for (const service of listServices()) {
    if (service.name.toLowerCase().includes(q) || service.slug.includes(q) || service.nameAr.includes(q)) {
      hits.push({ type: 'service', href: `/demarches/${service.slug}`, title: service.name, subtitle: `Démarche · ${service.category}` })
      for (const city of listCities()) {
        hits.push({ type: 'city_service', href: `/villes/${city.slug}/demarches/${service.slug}`, title: `${service.name} à ${city.name}`, subtitle: 'Réponse locale' })
      }
    }
  }
  for (const office of listOffices()) {
    if (office.name.toLowerCase().includes(q) || office.district.toLowerCase().includes(q)) {
      hits.push({ type: 'office', href: `/bureaux/${office.slug}`, title: office.name, subtitle: office.address })
    }
  }
  return hits.slice(0, 12)
}
