'use client'

import { useEffect } from 'react'
import { useRodar } from '@/hooks/useRodar'

export function Rodar() {
  const { state, load, select, reset } = useRodar()

  useEffect(() => {
    load()
  }, [load])

  if (state.isLoading) {
    return (
      <div role="status" aria-label="Carregando" className="flex items-center justify-center p-8">
        <span className="animate-spin h-6 w-6 border-2 border-current border-t-transparent rounded-full" />
        <span className="sr-only">Carregando...</span>
      </div>
    )
  }

  if (state.error) {
    return (
      <div role="alert" className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">{state.error}</p>
        <button onClick={reset} className="mt-2 text-sm text-red-600 underline">
          Tentar novamente
        </button>
      </div>
    )
  }

  if (state.data.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>Nenhum item encontrado.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {state.data.map(item => (
        <button
          key={item.id}
          onClick={() => select(item.id)}
          aria-pressed={state.selectedId === item.id}
          className={`p-4 border rounded-lg w-full text-left transition-colors ${
            state.selectedId === item.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <span className="font-medium">{item.id}</span>
        </button>
      ))}
    </div>
  )
}
