import { contextCreator } from './context-creator/context-creator'

interface TestContextValue {
  n: number
}

function useValue (props: {
  n: number
}): TestContextValue {
  const value = { n: props.n }
  return value
}

export const {
  useCreatedContext: useTest,
  CreatedProvider: TestProvider, 
} = contextCreator({ name: 'test', useValue })