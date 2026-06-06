'use client'

import { useState, useCallback } from 'react'
import type { Rodar, RodarState } from '@/types/rodar'

interface useRodarReturn {
  state: RodarState
  load: () => Promise<void>
  select: (id: string) => void
  reset: () => void
}

const initialState: RodarState = {
  data: [],
  selectedId: null,
  isLoading: false,
  error: null,
}

export function useRodar(): useRodarReturn {
  const [state, setState] = useState<RodarState>(initialState)

  const load = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500))
      setState(prev => ({ ...prev, isLoading: false, data: [] }))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar dados'
      setState(prev => ({ ...prev, isLoading: false, error: message }))
    }
  }, [])

  const select = useCallback((id: string) => {
    setState(prev => ({ ...prev, selectedId: id }))
  }, [])

  const reset = useCallback(() => {
    setState(initialState)
  }, [])

  return { state, load, select, reset }
}
