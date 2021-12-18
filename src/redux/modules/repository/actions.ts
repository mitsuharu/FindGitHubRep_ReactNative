import { actionCreatorFactory } from 'typescript-fsa'

const actionCreator = actionCreatorFactory('repository')

export const fetchRemoteConfig = actionCreator<boolean>('FETCH_REMOTE_CONFIG')
