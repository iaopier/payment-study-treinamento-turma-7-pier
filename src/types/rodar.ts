export interface Rodar {
  id: string
  rodar: string
  projeto: string
  tipo: string
  createdAt: Date
  updatedAt: Date
}

export interface RodarProps {
  rodar: Rodar | null
  isLoading: boolean
  error: string | null
}

export interface RodarState {
  data: Rodar[]
  selectedId: string | null
  isLoading: boolean
  error: string | null
}
