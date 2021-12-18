import { actionCreatorFactory } from 'typescript-fsa'

const actionCreator = actionCreatorFactory('counter')

export const increase = actionCreator('INCREASE')
export const decrease = actionCreator('DECREASE')
export const assign = actionCreator<number>('ASSIGN')
