import contextCreator from './context-creator/context-creator'
import { useState } from 'react'

interface WrapperValue {
  x: number
  increment: () => void
}

function useValue (): WrapperValue {
  const [x, setX] = useState(1)
  function increment (): void {
    setX(x + 1)
  }
  const value = { x, increment }
  return value
}

export const {
  use: useWrapper,
  Provider: WrapperProvider
} = contextCreator({
  name: 'wrapper',
  useValue,
  Wrapper: (props) => <span {...props} />
})
