import { all, fork } from 'redux-saga/effects'
import { repositorySaga } from './internal'

export function* rootSaga() {
  console.log('rootSaga start')
  yield all([fork(repositorySaga)])
}
