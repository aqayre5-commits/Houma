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
    title: isAr ? 'سياسة ملفات الارتباط' : 'Politique cookies',
    description: isAr
      ? 'ملخص لملفات الارتباط والتخزين وأدوات القياس التي قد يستخدمها Houma، مع إبقاء النقاط غير المؤكدة بين معقوفين.'
      : 'Résumé des cookies, stockages et outils de mesure susceptibles d’être utilisés par Houma, avec mention explicite des points restant à confirmer.',
    path: routes.cookies(),
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

export default async function CookiesPage() {
  const lang = await getLang()
  const isAr = lang === 'ar'
  const legalNoticeLines = isAr ? siteLegalDisclaimers.legalNoticeAr : siteLegalDisclaimers.legalNoticeFr

  return (
    <div className="container-shell mobile-safe-spacing py-8 md:py-12">
      <PageViewTracker context={{ route: routes.cookies(), templateType: 'cookies', lang }} />

      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">{isAr ? 'التخزين' : 'Cookies & stockage'}</p>
        <h1 className="mt-1.5 text-3xl font-bold text-slate-900 md:text-4xl">{isAr ? 'سياسة ملفات الارتباط' : 'Politique cookies'}</h1>
        <p className="mt-3 text-slate-600">
          {isAr
            ? 'تلخص هذه الصفحة التخزينات والأدوات التقنية التي قد تكون مستعملة حالياً، مع الإشارة الصريحة إلى ما يلزم تأكيده في الإنتاج.'
            : 'Cette page résume les stockages et outils techniques susceptibles d’être utilisés actuellement, avec indication explicite de ce qui doit encore être confirmé en production.'}
        </p>
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          {legalNoticeLines.map((line, index) => (
            <p key={line} className={index === 0 ? 'font-semibold' : 'mt-1'}>
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <Section title={isAr ? 'ما الذي قد يُستخدم' : 'Ce qui peut être utilisé'}>
          <p>
            {isAr
              ? `قد يستعمل الموقع ملف الارتباط ${legalStorageInventory.liveCookies[0].name} لتذكر لغة الواجهة لمدة ${legalStorageInventory.liveCookies[0].durationAr}.`
              : `Le site peut utiliser le cookie ${legalStorageInventory.liveCookies[0].name} pour mémoriser la langue d’interface pendant ${legalStorageInventory.liveCookies[0].durationFr}.`}
          </p>
          <p>
            {isAr
              ? `يظهر في الكود أيضاً المفتاح ${legalStorageInventory.legacyLocalStorageCleanup[0].name} فقط كآلية تنظيف لقيمة قديمة، كما يظهر ${legalStorageInventory.dormantCodeStorage[0].name} داخل مكوّن ثانوي غير موصول بالمسار الرئيسي الحالي.`
              : `Le code montre aussi ${legalStorageInventory.legacyLocalStorageCleanup[0].name} comme mécanisme de nettoyage d’une ancienne valeur, ainsi que ${legalStorageInventory.dormantCodeStorage[0].name} dans un composant secondaire non branché au parcours principal actuel.`}
          </p>
          <p>
            {isAr
              ? 'قد يستعمل الموقع الجغرافي الدقيق فقط عندما يطلبه المستخدم صراحة، كما قد تُحمّل أدوات القياس والأداء من Vercel في الإنتاج إذا كانت مفعلة.'
              : 'La géolocalisation précise n’est utilisée que sur action explicite de l’utilisateur. Des outils Vercel de mesure d’audience et de performance peuvent aussi être chargés en production s’ils sont activés.'}
          </p>
        </Section>

        <Section title={isAr ? 'الفئات' : 'Catégories'}>
          <p>
            {isAr
              ? 'الفئات المرصودة حالياً هي: تخزين ضروري للغة الواجهة، عناصر تقنية لتنظيف تخزين قديم، وقياس للزيارة أو الأداء إذا كانت أدوات Vercel مفعلة.'
              : 'Les catégories actuellement repérables sont: stockage nécessaire pour la langue, éléments techniques de nettoyage d’un ancien stockage, et mesure d’audience ou de performance si les outils Vercel sont activés.'}
          </p>
          <p>
            {isAr
              ? 'تشمل الأدوات المذكورة في الكود الحالي: Vercel Analytics و Vercel Speed Insights عند تفعيلهما في الإنتاج.'
              : 'Les outils explicitement visibles dans le code actuel sont Vercel Analytics et Vercel Speed Insights lorsqu’ils sont activés en production.'}
          </p>
          <p>
            {isAr
              ? 'لا تُذكر في الكود الحالي ملفات ارتباط تحليلية مسماة بشكل صريح. وإذا كانت أدوات الإنتاج تودع معرفات أو تخزينات إضافية، فيجب تأكيد ذلك من طرف المشغّل.'
              : 'Le code actuel ne nomme pas de cookies analytiques précis. Si l’environnement de production dépose des identifiants ou stockages supplémentaires, l’exploitant doit le confirmer.'}
          </p>
        </Section>

        <Section title={isAr ? 'اختيارات المستخدم' : 'Choix de l’utilisateur'}>
          <p>
            {isAr
              ? 'يمكن للمستخدم حذف ملف لغة الواجهة أو التخزين المحلي من إعدادات المتصفح، كما يمكنه رفض مشاركة الموقع الجغرافي الدقيق.'
              : 'L’utilisateur peut supprimer le cookie de langue ou les stockages locaux depuis les réglages du navigateur. Il peut aussi refuser la géolocalisation précise.'}
          </p>
          <p>
            {isAr
              ? 'لا توجد حالياً داخل الموقع واجهة مستقلة لإدارة موافقة تحليلية.'
              : 'Le site ne présente pas actuellement d’interface autonome de gestion du consentement analytique.'}
          </p>
        </Section>

        <Section title={isAr ? 'تنبيه التوافق مع التنفيذ' : 'Avertissement d’alignement'}>
          <p>
            {isAr
              ? 'هذه الصفحة تصف ما يظهر في الكود الحالي، لكن البيئة المنشورة فعلياً قد تختلف في بعض التفاصيل التقنية.'
              : 'Cette page décrit ce qui est visible dans le code actuel, mais l’environnement effectivement déployé peut différer sur certains points techniques.'}
          </p>
          <p>{legalPlaceholders.productionCookieAudit}</p>
          <p>{legalPlaceholders.cndpReference}</p>
        </Section>
      </div>
    </div>
  )
}
