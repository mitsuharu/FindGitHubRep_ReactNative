import { all, fork } from 'redux-saga/effects'
import { counterSaga } from './internal'

export function* rootSaga() {
  console.log('rootSaga start')
  yield all([fork(counterSaga)])
}
