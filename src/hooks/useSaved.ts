import { useEffect, useState } from 'react'

const STORAGE_KEY = 'nexus-saved-tools'

export function useSaved(): [string[], (id: string) => void] {
  const [saved, setSaved] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as string[] } catch { return [] }
  })
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)) }, [saved])
  const toggle = (id: string) => setSaved(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
  return [saved, toggle]
}
