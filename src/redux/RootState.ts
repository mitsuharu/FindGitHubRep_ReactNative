import { CounterState } from '@/redux/modules/counter/state'
import { RepositoryState } from './modules/repository/state'

export interface RootState {
  counter: CounterState
  repository: RepositoryState
}

// typescript definition
// see: https://qiita.com/Takepepe/items/6addcb1b0facb8c6ff1f
declare module 'react-redux' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultRootState extends RootState {}
}
