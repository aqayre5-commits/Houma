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
      ? 'ملخص للبيانات التي قد يعالجها Houma ولأغراضها وللنقاط التي ما زالت تنتظر استكمالها من المشغّل.'
      : 'Résumé des données susceptibles d’être traitées par Houma, de leurs finalités et des points restant à compléter par l’exploitant.',
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
  const legalNoticeLines = isAr ? siteLegalDisclaimers.legalNoticeAr : siteLegalDisclaimers.legalNoticeFr

  return (
    <div className="container-shell mobile-safe-spacing py-8 md:py-12">
      <PageViewTracker context={{ route: routes.privacy(), templateType: 'privacy', lang }} />

      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">{isAr ? 'خصوصية' : 'Confidentialité'}</p>
        <h1 className="mt-1.5 text-3xl font-bold text-slate-900 md:text-4xl">{isAr ? 'سياسة الخصوصية' : 'Politique de confidentialité'}</h1>
        <p className="mt-3 text-slate-600">
          {isAr
            ? 'تلخص هذه الصفحة البيانات التي قد يعالجها الموقع بحسب السلوك الظاهر حالياً، مع إبقاء المعطيات غير المؤكدة بين معقوفين.'
            : 'Cette page résume les données susceptibles d’être traitées selon le comportement actuellement visible du site, en laissant entre crochets les informations opérateur non confirmées.'}
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
        <Section title={isAr ? 'المسؤول عن المعالجة' : 'Responsable du traitement'}>
          <p>{legalPlaceholders.publisherName}</p>
          <p>{legalPlaceholders.registeredAddress}</p>
          <p>{legalPlaceholders.contactEmail}</p>
        </Section>

        <Section title={isAr ? 'البيانات التي قد تُعالج' : 'Données susceptibles d’être traitées'}>
          <p>
            {isAr
              ? 'قد يعالج الموقع البيانات التي يرسلها المستخدم عبر نماذج الإبلاغ عن خطأ أو طلب الرعاية، مثل رابط الصفحة ونوع المشكلة ووصفها وبيانات الاتصال.'
              : 'Le site peut traiter les données envoyées via les formulaires de signalement ou de sponsoring, comme l’URL de page, le type de problème, sa description et les coordonnées transmises.'}
          </p>
          <p>
            {isAr
              ? 'قد يستعمل الموقع لغة الواجهة المختارة وبعض معطيات التخزين الضرورية، وقد يستعمل الموقع الجغرافي الدقيق فقط عندما يفعّله المستخدم صراحة.'
              : 'Le site peut utiliser la langue choisie, certains stockages strictement nécessaires et, le cas échéant, une géolocalisation précise seulement lorsque l’utilisateur l’active explicitement.'}
          </p>
          <p>
            {isAr
              ? 'قد تُرسل أيضاً بيانات قياس الزيارة أو الأداء إلى أدوات Vercel المفعلة في بيئة الإنتاج إذا كانت مستعملة فعلاً.'
              : 'Des données de mesure d’audience ou de performance peuvent aussi être envoyées aux outils Vercel activés en production, s’ils sont effectivement utilisés.'}
          </p>
        </Section>

        <Section title={isAr ? 'الأغراض' : 'Finalités'}>
          <p>
            {isAr
              ? 'تُستخدم هذه البيانات لتوجيه المستخدم داخل الموقع، ومعالجة الرسائل الواردة، وتحسين المحتوى، وقياس الزيارة أو الأداء عند تفعيل تلك الأدوات.'
              : 'Ces données servent à orienter l’utilisateur dans le site, traiter les messages reçus, améliorer le contenu et mesurer l’audience ou la performance lorsque ces outils sont activés.'}
          </p>
          <p>
            {isAr
              ? 'لا تُستعمل هذه المعطيات لإيداع الطلبات نيابة عن المستخدم.'
              : 'Ces données ne sont pas utilisées pour déposer une demande au nom de l’utilisateur.'}
          </p>
        </Section>

        <Section title={isAr ? 'المستلمون' : 'Destinataires'}>
          <p>
            {isAr
              ? 'قد يطّلع المشغّل على الرسائل الواردة عبر النماذج. وإذا كانت متغيرات Supabase مفعلة، فقد تُخزن هذه البيانات في Supabase.'
              : 'L’exploitant peut recevoir les messages transmis par formulaire. Si les variables Supabase sont configurées, ces données peuvent être stockées dans Supabase.'}
          </p>
          <p>
            {isAr
              ? 'قد تُرسل بيانات قياس الزيارات أو الأداء إلى Vercel Analytics وVercel Speed Insights عند تفعيلهما في الإنتاج.'
              : 'Des données de mesure d’audience ou de performance peuvent être transmises à Vercel Analytics et Vercel Speed Insights lorsqu’ils sont activés en production.'}
          </p>
          <p>{legalPlaceholders.hostingProvider}</p>
          <p>{legalPlaceholders.supplementaryProcessors}</p>
        </Section>

        <Section title={isAr ? 'مدة الاحتفاظ' : 'Durée de conservation'}>
          <p>
            {isAr
              ? 'لا تُنشر في الموقع حالياً مدد احتفاظ مفصلة لكل فئة من البيانات.'
              : 'Les durées de conservation détaillées par catégorie ne sont pas publiées à ce stade.'}
          </p>
          <p>{legalPlaceholders.retentionSchedule}</p>
        </Section>

        <Section title={isAr ? 'حقوقكم' : 'Vos droits'}>
          <p>
            {isAr
              ? 'يمكن للمستخدم طلب الوصول أو التصحيح أو الحذف أو أي معالجة أخرى وفق الإطار القانوني المطبق.'
              : 'L’utilisateur peut demander l’accès, la rectification, l’effacement ou tout autre traitement prévu par le cadre juridique applicable.'}
          </p>
          <p>{legalPlaceholders.privacyRightsContact}</p>
        </Section>

        <Section title={isAr ? 'الموقع الجغرافي والتخزين المحلي' : 'Géolocalisation et stockage local'}>
          <p>
            {isAr
              ? `ملف الارتباط الضروري الظاهر في التدفق الحالي هو ${legalStorageInventory.liveCookies[0].name}.`
              : `Le cookie strictement nécessaire visible dans le flux actuel est ${legalStorageInventory.liveCookies[0].name}.`}
          </p>
          <p>{isAr ? legalStorageInventory.geolocation.transientHandlingAr : legalStorageInventory.geolocation.transientHandlingFr}</p>
          <p>
            {isAr
              ? `يظهر المفتاح ${legalStorageInventory.legacyLocalStorageCleanup[0].name} فقط كآلية تنظيف لقيمة قديمة.`
              : `La clé ${legalStorageInventory.legacyLocalStorageCleanup[0].name} n’apparaît que comme mécanisme de nettoyage d’une ancienne valeur.`}
          </p>
        </Section>

        <Section title={isAr ? 'الاستضافة / التحويل' : 'Hébergement / transfert'}>
          <p>{legalPlaceholders.hostingProvider}</p>
          <p>{legalPlaceholders.dataTransferPosture}</p>
        </Section>

        <Section title="CNDP">
          <p>{legalPlaceholders.cndpReference}</p>
        </Section>
      </div>
    </div>
  )
}
