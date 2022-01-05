import { Repository } from '@/api/github/Repository'

export type RepositoryState = {
  keyword: string | null
  page: number
  total: number
  hasNext: boolean
  items: Repository[]
  error: Error | null
  isRequesting: boolean
}

export const initialState: Readonly<RepositoryState> = {
  keyword: null,
  page: 0,
  total: 0,
  hasNext: false,
  items: [],
  error: null,
  isRequesting: false,
}
