import {
  fetchRepositories,
  fetchRepositoriesSucceeded,
  fetchRepositoriesFailed,
} from '@/redux/modules/repository/actions'
import { fetchRepositories as fetch } from '@/api'
import { call, put, select } from 'redux-saga/effects'
import { FetchRepositoryResult } from '@/api/github/FetchRepositoryResult'
import {
  selectRepositoryHasNext,
  selectRepositoryIsRequesting,
  selectRepositoryKeyword,
  selectRepositoryPage,
} from '../selectors'

export function* fetchRepositoriesSaga({
  payload: { keyword, page },
}: ReturnType<typeof fetchRepositories>) {
  try {
    const isRequesting: boolean = yield select(selectRepositoryIsRequesting)
    const hasNext: boolean = yield select(selectRepositoryHasNext)
    if (isRequesting || !hasNext) {
      return
    }
    const result: FetchRepositoryResult = yield call(fetch, { keyword, page })
    yield put(fetchRepositoriesSucceeded({ result }))
  } catch (e: any) {
    console.warn(`fetchRepositoriesSaga`, e)
    if (e instanceof Error) {
      yield put(fetchRepositoriesFailed({ error: e }))
    }
  }
}

export function* fetchRepositoriesMoreSaga() {
  const keyword: string = yield select(selectRepositoryKeyword)
  const page: number = yield select(selectRepositoryPage)
  yield put(
    fetchRepositories({
      keyword,
      page: page + 1,
    }),
  )
}
