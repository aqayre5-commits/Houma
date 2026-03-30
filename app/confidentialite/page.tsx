import { PageViewTracker } from '@/components/page-view-tracker'
import { legalPlaceholders, legalStorageInventory, siteLegalDisclaimers } from '@/content/legal-copy'
import { getLang } from '@/lib/lang'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 86400

export async function generateMetadata() {
  const lang = await getLang()
  const isAr = lang === 'ar'

  return buildMetadata({
    title: isAr ? 'سياسة الخصوصية' : 'Confidentialité',
    description: isAr
      ? 'كيف يتعامل الموقع مع بيانات النماذج واللغة والتحليلات والموقع الجغرافي وفقاً لما يظهر في الكود الحالي.'
      : 'Comment le site traite les données de formulaire, la langue, les mesures d’audience et la géolocalisation selon l’implémentation actuelle.',
    path: routes.privacy(),
    lang,
  })
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card p-6">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-600">{children}</div>
    </section>
  )
}

export default async function PrivacyPage() {
  const lang = await getLang()
  const isAr = lang === 'ar'

  return (
    <div className="container-shell mobile-safe-spacing py-8 md:py-12">
      <PageViewTracker context={{ route: routes.privacy(), templateType: 'privacy', lang }} />

      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">{isAr ? 'خصوصية' : 'Confidentialité'}</p>
        <h1 className="mt-1.5 text-3xl font-bold text-slate-900 md:text-4xl">{isAr ? 'سياسة الخصوصية' : 'Politique de confidentialité'}</h1>
        <p className="mt-3 text-slate-600">
          {isAr
            ? 'تصف هذه الصفحة البيانات التي يمكن أن يعالجها الموقع بحسب السلوك الظاهر في الكود الحالي. وهي لا تشكل مراجعة قانونية نهائية.'
            : 'Cette page décrit les données susceptibles d’être traitées par le site selon le comportement visible dans le code actuel. Elle ne constitue pas un avis juridique définitif.'}
        </p>

        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          <p className="font-semibold">{isAr ? siteLegalDisclaimers.homeAr : siteLegalDisclaimers.homeFr}</p>
          <p className="mt-1">
            {isAr
              ? 'توجد في هذه الصفحة عناصر TODO يجب أن يستكملها مشغّل الموقع قبل اعتمادها كسياسة نهائية.'
              : 'Cette page contient des TODO explicites que l’exploitant doit compléter avant validation comme politique définitive.'}
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <Section title={isAr ? 'المسؤول عن المعالجة' : 'Responsable du traitement'}>
          <p>{legalPlaceholders.publisherName}</p>
          <p>{legalPlaceholders.contactEmail}</p>
          <p>{legalPlaceholders.privacyRightsContact}</p>
        </Section>

        <Section title={isAr ? 'ما البيانات التي قد تُجمع' : 'Quelles données peuvent être collectées'}>
          <p>
            {isAr
              ? 'قد يجمع الموقع بيانات النماذج عندما يرسل المستخدم بلاغ خطأ أو طلب رعاية: رابط الصفحة، نوع المشكلة، وصف الخطأ، اسم الشركة، اسم جهة الاتصال، البريد الإلكتروني، ومحتوى الرسالة.'
              : 'Le site peut collecter des données de formulaire lorsqu’un utilisateur envoie un signalement ou une demande de sponsoring: URL de page, type de problème, détail saisi, société, nom du contact, email et contenu du message.'}
          </p>
          <p>
            {isAr
              ? 'قد يستعمل الموقع بيانات موقع دقيقة عندما يختار المستخدم ذلك صراحة بعد اختيار خدمة. وتُستخدم الإحداثيات بشكل عابر لتحويلها إلى سياق مدينة أو منطقة دون حفظها كإحداثيات خام في ملفات الارتباط أو localStorage أو sessionStorage ضمن التدفق الحي الحالي.'
              : "Le site peut utiliser une localisation précise lorsque l’utilisateur la demande explicitement après avoir choisi une démarche. Les coordonnées brutes sont utilisées de manière transitoire pour obtenir un contexte de ville ou de zone, sans être conservées comme coordonnées brutes dans des cookies, localStorage ou sessionStorage par le flux live actuel."}
          </p>
          <p>
            {isAr
              ? 'قد تُرسل أيضاً بيانات قياس الاستخدام وأداء الصفحات عبر Vercel Analytics وVercel Speed Insights عندما تكون هذه الخدمات مفعلة في بيئة الإنتاج.'
              : 'Des données de mesure d’audience et de performance peuvent également être envoyées via Vercel Analytics et Vercel Speed Insights lorsqu’ils sont activés en production.'}
          </p>
        </Section>

        <Section title={isAr ? 'لماذا تُستخدم هذه البيانات' : 'Pourquoi ces données sont utilisées'}>
          <p>
            {isAr
              ? 'تُستخدم بيانات النماذج لمراجعة البلاغات، والرد على طلبات الرعاية، وتحسين محتوى الموقع عند الحاجة.'
              : 'Les données de formulaire servent à examiner les signalements, répondre aux demandes de sponsoring et améliorer le contenu du site si nécessaire.'}
          </p>
          <p>
            {isAr
              ? 'تُستخدم اللغة وبيانات التخزين الضرورية لتشغيل الواجهة كما اختارها المستخدم.'
              : "La langue et les données de stockage strictement nécessaires sont utilisées pour faire fonctionner l’interface selon le choix de l’utilisateur."}
          </p>
          <p>
            {isAr
              ? 'تُستخدم بيانات الموقع لإعطاء سياق محلي أو تحديد سلطة محلية محتملة، ولا تُستخدم لإيداع الطلبات نيابة عن المستخدم.'
              : "La localisation est utilisée pour fournir un contexte local ou identifier une autorité locale probable, et non pour déposer une demande au nom de l’utilisateur."}
          </p>
        </Section>

        <Section title={isAr ? 'المعالِجون أو المستلمون المحتملون' : 'Destinataires ou sous-traitants potentiels'}>
          <p>
            {isAr
              ? 'إذا كانت متغيرات Supabase مفعلة في النشر، فقد تُخزن بيانات النماذج في Supabase.'
              : 'Si les variables de déploiement Supabase sont renseignées, les données de formulaire peuvent être stockées dans Supabase.'}
          </p>
          <p>
            {isAr
              ? 'قد تُرسل بيانات قياس الزيارات أو الأداء إلى خدمات Vercel Analytics وVercel Speed Insights عند تفعيلها في الإنتاج.'
              : 'Des données de mesure d’audience ou de performance peuvent être envoyées à Vercel Analytics et Vercel Speed Insights lorsqu’ils sont activés en production.'}
          </p>
          <p>{legalPlaceholders.supplementaryProcessors}</p>
        </Section>

        <Section title={isAr ? 'مدة الاحتفاظ' : 'Durée de conservation'}>
          <p>
            {isAr
              ? 'لا يحدد الكود الحالي سياسة احتفاظ قانونية مفصلة للبيانات المرسلة عبر النماذج. يجب على المشغّل تحديد مدد احتفاظ مناسبة بحسب طبيعة كل فئة من البيانات.'
              : "Le code actuel ne fixe pas de politique légale détaillée de conservation pour les données transmises via les formulaires. L’exploitant doit définir des durées adaptées selon la nature de chaque catégorie de données."}
          </p>
        </Section>

        <Section title={isAr ? 'حقوق المستخدم والطلبات' : 'Droits des utilisateurs et demandes'}>
          <p>{legalPlaceholders.privacyRightsContact}</p>
          <p>{legalPlaceholders.cndpReference}</p>
        </Section>

        <Section title={isAr ? 'الموقع الجغرافي والتخزين' : 'Géolocalisation et stockage local'}>
          <p>
            {isAr
              ? `ملف الارتباط الضروري المرصود في التدفق الحي الحالي: ${legalStorageInventory.liveCookies[0].name}.`
              : `Cookie strictement nécessaire visible dans le flux live actuel: ${legalStorageInventory.liveCookies[0].name}.`}
          </p>
          <p>
            {isAr
              ? legalStorageInventory.geolocation.transientHandlingAr
              : legalStorageInventory.geolocation.transientHandlingFr}
          </p>
          <p>
            {isAr
              ? `المفتاح ${legalStorageInventory.legacyLocalStorageCleanup[0].name} يظهر فقط كآلية حذف لقيمة قديمة حتى لا تُستعاد تلقائياً.`
              : `La clé ${legalStorageInventory.legacyLocalStorageCleanup[0].name} n’apparaît plus que comme mécanisme de suppression d’une ancienne valeur, afin d’éviter toute restauration automatique.`}
          </p>
          <p>
            {isAr
              ? `يوجد أيضاً مفتاح تقني ${legalStorageInventory.dormantCodeStorage[0].name} داخل مكوّن ثانوي غير موصول بالمسار الرئيسي الحالي؛ لذلك لا يُعامل هنا كسلوك حي أساسي.`
              : `Une clé technique ${legalStorageInventory.dormantCodeStorage[0].name} existe aussi dans un composant secondaire non branché au parcours principal actuel; elle n’est donc pas décrite ici comme un comportement live principal.`}
          </p>
        </Section>

        <Section title={isAr ? 'الاستضافة والتحويلات' : 'Hébergement et transferts'}>
          <p>{legalPlaceholders.hostingProvider}</p>
          <p>{legalPlaceholders.dataTransferPosture}</p>
        </Section>
      </div>
    </div>
  )
}
