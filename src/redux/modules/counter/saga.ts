import { takeEvery } from 'redux-saga/effects'
import { assign } from './actions'

export function* counterSaga() {
  yield takeEvery(assign, assignSaga)
}

function* assignSaga(action: ReturnType<typeof assign>) {
  console.log(`assign ${action.payload}`)
  yield 0
}
