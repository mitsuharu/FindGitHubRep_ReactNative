import {
  fetchRepositories,
  fetchRepositoriesSucceeded,
  fetchRepositoriesFailed,
} from '@/redux/modules/repository/actions'
import { fetchRepositories as fetch } from '@/api'
import { call, delay, put, select } from 'redux-saga/effects'
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
  console.log(`fetchRepositoriesSaga keyword: ${keyword}, page: ${page}`)
  try {
    const isRequesting: boolean = yield select(selectRepositoryIsRequesting)
    const hasNext: boolean = yield select(selectRepositoryHasNext)
    console.log(
      `fetchRepositoriesSaga isRequesting: ${isRequesting}, hasNext: ${hasNext}`,
    )
    if (!hasNext) {
      return
    }
    const result: FetchRepositoryResult = yield call(fetch, { keyword, page })

    console.log(
      `fetchRepositoriesSaga result: ${result.items.length}, total: ${result.total}`,
    )

    yield put(fetchRepositoriesSucceeded({ result }))
  } catch (e: any) {
    console.warn(`fetchRepositoriesSaga`, e)
    if (e instanceof Error) {
      yield put(fetchRepositoriesFailed({ error: e }))
    }
  }
}

export function* fetchRepositoriesMoreSaga() {
  console.log(`fetchRepositoriesMoreSaga`)

  const isRequesting: boolean = yield select(selectRepositoryIsRequesting)
  if (isRequesting) {
    return
  }

  console.log(`fetchRepositoriesMoreSaga`)

  yield delay(500)
  const keyword: string = yield select(selectRepositoryKeyword)
  const page: number = yield select(selectRepositoryPage)
  if (keyword) {
    yield put(
      fetchRepositories({
        keyword,
        page: page + 1,
      }),
    )
  }
}
