import { contextCreator } from './context-creator/context-creator'
import { useState } from 'react'

interface TestProviderProps {
  n: number
}

interface TestContextValue {
  n: number
  increment: () => void
}

function useValue (props: TestProviderProps): TestContextValue {
  const [n, setN] = useState(props.n)
  function increment () {
    setN(n + 1)
  }
  const value = { n, increment }
  return value
}

export const {
  useCreatedContext: useTest,
  CreatedProvider: TestProvider, 
} = contextCreator({ name: 'test', useValue })