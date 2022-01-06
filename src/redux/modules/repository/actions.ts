import { FetchRepositoryResult } from '@/api/github/FetchRepositoryResult'
import { actionCreatorFactory } from 'typescript-fsa'

const actionCreator = actionCreatorFactory('REPOSITORY')

export const fetchRepositories =
  actionCreator<{ keyword: string; page?: number }>('FETCH_REPOSITORIES')

export const fetchRepositoriesSucceeded = actionCreator<{
  result: FetchRepositoryResult
}>('FETCH_REPOSITORIES_SUCCEEDED')

export const fetchRepositoriesFailed = actionCreator<{ error: Error }>(
  'FETCH_REPOSITORIES_FAILED',
)

export const fetchRepositoriesMore = actionCreator('FETCH_REPOSITORIES_MORE')
