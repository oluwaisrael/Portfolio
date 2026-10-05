import { useSyncExternalStore } from 'react'

const subscribe = (listener: () => void) => {
  document.addEventListener('visibilitychange', listener)
  return () => document.removeEventListener('visibilitychange', listener)
}

const getSnapshot = () => document.visibilityState === 'visible'

export function useDocumentVisibility() {
  return useSyncExternalStore(subscribe, getSnapshot, () => true)
}
