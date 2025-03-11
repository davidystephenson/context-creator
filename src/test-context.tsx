import contextCreator from './context-creator/context-creator'
import { useState } from 'react'
import { WrapperProvider, useWrapper } from './wrapper-context'
import WrapperConsumer from './wrapper-consumer'

interface TestProviderProps {
  n: number
}

interface TestContextValue {
  n: number
  increment: () => void
}

function useValue (props: TestProviderProps): TestContextValue {
  const wrapper = useWrapper()
  const [n, setN] = useState(props.n)
  function increment (): void {
    setN(n + 1)
    wrapper.increment()
  }
  const value = { n, increment }
  return value
}

export const {
  use: useTest,
  Provider: TestProvider
} = contextCreator({
  name: 'test',
  useValue,
  Wrapper: (props) => (
    <WrapperProvider>
      <WrapperConsumer>
        <div style={{ padding: `${props.n}px` }}>
          {props.children}
        </div>
      </WrapperConsumer>
    </WrapperProvider>
  )
})
