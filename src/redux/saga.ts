import { all, fork } from 'redux-saga/effects'
import { counterSaga, repositorySaga } from './internal'

export function* rootSaga() {
  console.log('rootSaga start')
  yield all([fork(counterSaga), fork(repositorySaga)])
}
