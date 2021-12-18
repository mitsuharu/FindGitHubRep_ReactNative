import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from 'redux-persist'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { increase, decrease, assign } from './actions'
import { initialState } from './state'

const baseReducer = reducerWithInitialState(initialState)
  .case(increase, (state) => ({
    ...state,
    count: state.count + 1,
  }))
  .case(decrease, (state) => ({
    ...state,
    count: state.count - 1,
  }))
  .case(assign, (state, nextCount) => ({
    ...state,
    count: nextCount,
  }))
  .build()

const reducer = persistReducer(
  {
    key: 'hogehoge/counter',
    blacklist: undefined,
    whitelist: [],
    storage: AsyncStorage,
  },
  baseReducer,
)

export { reducer as counterReducer }
