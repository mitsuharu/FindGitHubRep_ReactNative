import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from 'redux-persist'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import {
  fetchRepositories,
  fetchRepositoriesSucceeded,
  fetchRepositoriesFailed,
} from './actions'
import { initialState } from './state'

const baseReducer = reducerWithInitialState(initialState)
  .case(fetchRepositories, (state, { keyword, page }) => {
    const nextPage = page ? page : state.page
    console.log(
      `repositoryReducer#fetchRepositories page: ${page}, nextPage: ${nextPage}`,
    )
    return {
      ...state,
      keyword: keyword,
      page: nextPage,
      total: nextPage === 1 ? 0 : state.total,
      hasNext: nextPage === 1 ? true : state.hasNext,
      items: nextPage === 1 ? [] : state.items,
      isRequesting: true,
      error: null,
    }
  })
  .case(fetchRepositoriesSucceeded, (state, { result }) => {
    const items = [...state.items, ...result.items]
    const hasNext = items.length < result.total

    console.log(
      `repositoryReducer#fetchRepositoriesSucceeded state.items: ${state.items.length}, result.items: ${result.items.length}, items: ${items.length}`,
    )

    return {
      ...state,
      isRequesting: false,
      items: items,
      total: result.total,
      hasNext: hasNext,
      error: null,
    }
  })
  .case(fetchRepositoriesFailed, (state, { error }) => ({
    ...state,
    hasNext: false,
    isRequesting: false,
    error: error,
  }))
  .build()

const reducer = persistReducer(
  {
    key: 'hogehoge/repository',
    blacklist: undefined,
    whitelist: [],
    storage: AsyncStorage,
  },
  baseReducer,
)

export { reducer as repositoryReducer }
