import { PageViewTracker } from '@/components/page-view-tracker'
import { getLang } from '@/lib/lang'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 86400

export async function generateMetadata() {
  const lang = await getLang()
  const isAr = lang === 'ar'

  return buildMetadata({
    title: isAr ? 'كيف يعمل Houma' : 'Comment ça marche',
    description: isAr
      ? 'كيف يساعد Houma على فهم الوثائق المطلوبة وخطوات الطلب والسلطة المحلية المعنية والمصادر الرسمية.'
      : 'Comment Houma aide à comprendre les documents requis, les étapes de la demande, l’autorité locale concernée et les sources officielles.',
    path: routes.howItWorks(),
    lang,
  })
}

export default async function HowItWorksPage() {
  const lang = await getLang()
  const isAr = lang === 'ar'

  const steps = isAr
    ? [
        'ابدأ بالخدمة التي تريد إنجازها من الصفحة الرئيسية أو من صفحة الإجراءات.',
        'استعمل الموقع أو اختر المدينة يدوياً عندما يساعد ذلك على تحديد السلطة المحلية المختصة.',
        'راجع الوثائق المطلوبة والرسوم والخطوات المعروضة في صفحة الخدمة.',
        'تحقق من المصدر الرسمي قبل إيداع الطلب أو التنقل إلى الإدارة.',
      ]
    : [
        'Commencez par le service que vous voulez effectuer depuis la page d’accueil ou la page des démarches.',
        'Utilisez la localisation ou choisissez la ville manuellement lorsque cela aide à identifier l’autorité locale compétente.',
        'Consultez les documents requis, les frais et les étapes affichés sur la page du service.',
        'Vérifiez toujours la source officielle avant de déposer la demande ou de vous déplacer.',
      ]

  return (
    <div className="container-shell py-10">
      <PageViewTracker context={{ route: routes.howItWorks(), templateType: 'how_it_works', lang }} />
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold">{isAr ? 'كيف يعمل Houma' : 'Comment ça marche'}</h1>
        <p className="mt-4 text-lg text-slate-600">
          {isAr
            ? 'Houma موقع معلوماتي يساعدك على فهم الوثائق المطلوبة، وخطوات الطلب، والسلطة المحلية اللاممركزة التي ينبغي التوجه إليها، دون أن يعوض الإدارة أو المصدر الرسمي.'
            : 'Houma est un site d’information qui vous aide à comprendre les documents requis, le processus de demande et l’autorité locale décentralisée à laquelle vous adresser, sans remplacer l’administration ni la source officielle.'}
        </p>
        <div className="mt-8 card p-6">
          <ol className="list-decimal space-y-3 pl-5 text-slate-700">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
