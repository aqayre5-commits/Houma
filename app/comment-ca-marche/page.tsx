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
      ? 'كيف تستعمل Houma لاختيار الخدمة ثم فهم الجهة المسؤولة والمصادر الرسمية.'
      : 'Comment utiliser Houma pour choisir une démarche, comprendre l’autorité responsable et vérifier les sources officielles.',
    path: routes.howItWorks(),
    lang,
  })
}

export default async function HowItWorksPage() {
  const lang = await getLang()
  const isAr = lang === 'ar'

  const steps = isAr
    ? [
        'اختر الخدمة أولاً من الصفحة الرئيسية أو من صفحة الإجراءات.',
        'تستعمل Houma المدينة والمنطقة كسياق عندما يفيد ذلك.',
        'تعرض صفحة الخدمة الجهة المسؤولة كجواب نهائي.',
        'تحقق دائما من المصدر الرسمي قبل التنقل.',
      ]
    : [
        'Choisissez d’abord la démarche depuis la page d’accueil ou la page des démarches.',
        'Houma utilise la ville et la zone comme contexte quand cela améliore la réponse.',
        'La page de service affiche l’autorité responsable comme réponse finale.',
        'Vérifiez toujours la source officielle avant de vous déplacer.',
      ]

  return (
    <div className="container-shell py-10">
      <PageViewTracker context={{ route: routes.howItWorks(), templateType: 'how_it_works', lang }} />
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold">{isAr ? 'كيف يعمل Houma' : 'Comment ça marche'}</h1>
        <p className="mt-4 text-lg text-slate-600">
          {isAr
            ? 'Houma دليل خاص يساعدك على فهم المسطرة والوثائق والجهة المسؤولة، لكنه لا يعوض الإدارة أو المصدر الرسمي.'
            : 'Houma est un guide privé qui vous aide à comprendre la démarche, les pièces et l’autorité responsable, sans remplacer l’administration ni la source officielle.'}
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
