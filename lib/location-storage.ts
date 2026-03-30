'use client'

import type { DetectedLocationContext } from '@/types/models'

const STORAGE_KEY = 'qriba_confirmed_location_v2'

export function saveConfirmedLocationContext(context: DetectedLocationContext) {
  if (typeof window === 'undefined') return
  void context
  // Deprecated on purpose: the active product flow should not auto-restore
  // previously chosen manual areas on fresh entry.
  window.localStorage.removeItem(STORAGE_KEY)
}

export function loadConfirmedLocationContext(): DetectedLocationContext | null {
  return null
}

export function clearConfirmedLocationContext() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(STORAGE_KEY)
}
