import { all, fork } from 'redux-saga/effects'
import { toastSaga, repositorySaga } from './internal'

export function* rootSaga() {
  console.log('rootSaga start')
  yield all([fork(toastSaga), fork(repositorySaga)])
}
