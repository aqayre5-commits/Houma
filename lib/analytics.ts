import type { AnalyticsContext } from '@/types/models'

export type AnalyticsPayload = Record<string, string | number | boolean | undefined>

export type AnalyticsEventName =
  | 'page_view_template_type'
  | 'click_primary_cta'
  | 'click_secondary_cta'
  | 'service_card_click'
  | 'source_click_outbound'
  | 'search_submit'
  | 'search_result_click'
  | 'location_mode_change'
  | 'office_resolution_result'
  | 'search_filter_apply'
  | 'outbound_map_click'
  | 'form_submit_start'
  | 'form_submit_success'
  | 'form_submit_error'
  | 'location_detect_start'
  | 'location_detect_success'
  | 'location_detect_failed'
  | 'location_detect_dismissed'
  | 'location_city_click'
  | 'location_ip_prefill'
  | 'location_postcode_hint'
  | 'location_gps_request'
  | 'location_gps_success'
  | 'location_gps_error'
  | 'location_conflict'
  | 'location_local_area_preselected'
  | 'location_confirm_detected'
  | 'location_confirm_manual'
  | 'location_change'

declare global {
  interface Window {
    va?: (event: string, payload?: AnalyticsPayload) => void
  }
}

export function buildAnalyticsContext(context: AnalyticsContext): AnalyticsPayload {
  return {
    route: context.route,
    template_type: context.templateType,
    lang: context.lang,
    city_slug: context.citySlug,
    service_slug: context.serviceSlug,
    neighborhood_slug: context.neighborhoodSlug,
    office_slug: context.officeSlug,
    mode: context.mode,
    confidence: context.confidence,
  }
}

export function track(event: AnalyticsEventName | string, payload: AnalyticsPayload = {}) {
  if (typeof window === 'undefined') return
  window.va?.(event, payload)
}

export function trackPageViewTemplateType(context: AnalyticsContext) {
  track('page_view_template_type', buildAnalyticsContext(context))
}
