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
  .case(fetchRepositories, (state, { keyword, page }) => ({
    ...state,
    keyword: keyword,
    page: page ? 1 : state.page,
    total: page ? 0 : state.total,
    hasNext: page ? true : state.hasNext,
    items: page ? [] : state.items,
    isRequesting: true,
    error: null,
  }))
  .case(fetchRepositoriesSucceeded, (state, { result }) => {
    const items = state.items.concat(result.items)
    const hasNext = items.length < result.total
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
