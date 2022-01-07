import { RootState } from '@/redux/RootState'

export const selectRepositoryKeyword = (state: RootState) =>
  state.repository.keyword

export const selectRepositoryPage = (state: RootState) => state.repository.page

export const selectRepositoryIsRequesting = (state: RootState) =>
  state.repository.isRequesting

export const selectRepositoryHasNext = (state: RootState) =>
  state.repository.hasNext

export const selectRepositoryItems = (state: RootState) =>
  state.repository.items
