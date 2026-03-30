import { PageViewTracker } from '@/components/page-view-tracker'
import { legalPlaceholders, legalStorageInventory } from '@/content/legal-copy'
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
      ? 'شرح ملفات الارتباط والتخزين المحلي وقياس الاستخدام الظاهر في الكود الحالي للموقع.'
      : 'Explication des cookies, du stockage local et des mesures d’audience visibles dans le code actuel du site.',
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

  return (
    <div className="container-shell mobile-safe-spacing py-8 md:py-12">
      <PageViewTracker context={{ route: routes.cookies(), templateType: 'cookies', lang }} />

      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">{isAr ? 'التخزين' : 'Cookies & stockage'}</p>
        <h1 className="mt-1.5 text-3xl font-bold text-slate-900 md:text-4xl">{isAr ? 'سياسة ملفات الارتباط' : 'Politique cookies'}</h1>
        <p className="mt-3 text-slate-600">
          {isAr
            ? 'تصف هذه الصفحة ملفات الارتباط والتخزين المحلي والقياس البرمجي الظاهر حالياً في الكود، دون ادعاء مطابقة قانونية نهائية.'
            : 'Cette page décrit les cookies, stockages locaux et mesures techniques actuellement visibles dans le code, sans revendiquer une conformité légale définitive.'}
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <Section title={isAr ? 'الفئة الضرورية' : 'Catégorie nécessaire'}>
          <p>
            {isAr
              ? `${legalStorageInventory.liveCookies[0].name} يُستخدم لتذكر لغة الواجهة. هذا التخزين ضروري لتشغيل تجربة اللغة التي يختارها المستخدم.`
              : `${legalStorageInventory.liveCookies[0].name} sert à mémoriser la langue d’interface. Ce stockage est nécessaire au fonctionnement de l’expérience de langue choisie par l’utilisateur.`}
          </p>
          <p>
            {isAr
              ? 'التدفق الحي الحالي لا يخزن الإحداثيات الخام أو سياق الموقع الدقيق داخل sessionStorage. ويستعمل المتصفح الموقع الجغرافي فقط عندما يختار المستخدم ذلك صراحة.'
              : "Le flux live actuel ne stocke pas les coordonnées brutes ni le contexte précis de localisation dans sessionStorage. La géolocalisation du navigateur n’est utilisée que lorsque l’utilisateur la déclenche explicitement."}
          </p>
          <p>
            {isAr
              ? `${legalStorageInventory.legacyLocalStorageCleanup[0].name} يظهر في الكود فقط بغرض حذف قيمة قديمة وعدم إعادة استعمالها تلقائياً.`
              : `${legalStorageInventory.legacyLocalStorageCleanup[0].name} apparaît dans le code uniquement pour supprimer une ancienne valeur et éviter sa réutilisation automatique.`}
          </p>
          <p>
            {isAr
              ? `يوجد مفتاح ${legalStorageInventory.dormantCodeStorage[0].name} في مكوّن ثانوي غير موصول بالمسار الرئيسي الحالي، لذلك لا يُعامل هنا كجزء من السلوك الحي الأساسي.`
              : `La clé ${legalStorageInventory.dormantCodeStorage[0].name} subsiste dans un composant secondaire non branché au parcours principal actuel; elle n’est donc pas traitée ici comme un comportement live principal.`}
          </p>
        </Section>

        <Section title={isAr ? 'الفئة التحليلية' : 'Catégorie analytique'}>
          <p>
            {isAr
              ? 'يحمّل الموقع Vercel Analytics وVercel Speed Insights في الإنتاج فقط. هذه الأدوات تدخل في فئة القياس التحليلي أو قياس الأداء، ويجب على المشغّل تقييم ما إذا كانت تحتاج إلى آلية موافقة إضافية وفق وضعه القانوني.'
              : 'Le site charge Vercel Analytics et Vercel Speed Insights uniquement en production. Ces outils relèvent de la mesure d’audience ou de performance, et l’exploitant doit évaluer si un mécanisme de consentement supplémentaire est requis selon sa situation juridique.'}
          </p>
          <p>
            {isAr
              ? 'الكود الظاهر لا يسمي ملفات ارتباط تحليلية محددة بالاسم. وإذا كانت هذه الأدوات تنشئ معرفات أو تخزيناً إضافياً في بيئة الإنتاج، فيجب على المشغّل تأكيد ذلك في النشر الفعلي.'
              : "Le code visible ne nomme pas de cookies analytiques précis. Si ces outils créent des identifiants ou stockages supplémentaires en production, l’exploitant doit le confirmer dans l’environnement réellement déployé."}
          </p>
          <p>{legalPlaceholders.cndpReference}</p>
        </Section>

        <Section title={isAr ? 'الموقع الجغرافي' : 'Géolocalisation'}>
          <p>{isAr ? legalStorageInventory.geolocation.purposeAr : legalStorageInventory.geolocation.purposeFr}</p>
          <p>{isAr ? legalStorageInventory.geolocation.transientHandlingAr : legalStorageInventory.geolocation.transientHandlingFr}</p>
        </Section>

        <Section title={isAr ? 'ما الذي لا يظهر في الكود حالياً' : 'Ce qui n’apparaît pas dans le code actuellement'}>
          <p>
            {isAr
              ? 'لا تظهر في الكود الحالي منطق إعلانات مخصصة، أو أدوات إعادة استهداف، أو ملف تعريف ارتباط تسويقي واضح. لذلك لا تدعي هذه الصفحة وجود فئات تسويقية غير مرصودة فعلاً.'
              : 'Le code actuel ne montre pas de logique de publicité personnalisée, de retargeting ni de cookie marketing clairement identifié. Cette page ne crée donc pas artificiellement de catégorie marketing non observée.'}
          </p>
        </Section>

        <Section title={isAr ? 'كيف يغيّر المستخدم اختياراته' : 'Comment modifier ses choix'}>
          <p>
            {isAr
              ? 'يمكن للمستخدم حذف ملف لغة الواجهة أو التخزين المحلي من إعدادات المتصفح. ويمكنه أيضاً رفض مشاركة الموقع الجغرافي الدقيق عبر المتصفح.'
              : 'L’utilisateur peut supprimer le cookie de langue ou les stockages locaux depuis les réglages du navigateur. Il peut également refuser le partage de sa géolocalisation précise via le navigateur.'}
          </p>
          <p>
            {isAr
              ? 'لا توجد حالياً واجهة مستقلة لإدارة الموافقة التحليلية داخل الموقع. يجب على المشغّل تأكيد ما إذا كانت هناك حاجة إلى هذا السطح القانوني الإضافي قبل mise en ligne définitive.'
              : 'Il n’existe pas actuellement d’interface autonome de gestion du consentement analytique dans le site. L’exploitant doit confirmer si une telle surface est nécessaire avant mise en ligne définitive.'}
          </p>
        </Section>
      </div>
    </div>
  )
}
