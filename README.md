# Context Creator

```js
import { contextCreator } from 'context-creator'

interface TestContextValue {
  n: number
}

function useValue (props: {
  n: number
}): TestContextValue {
  const value = { n: props.n }
  return value
}

const {
  useCreatedContext: useTest,
  CreatedProvider: TestProvider, 
} = contextCreator({ name: 'test', useValue })

function TestConsumer () {
  const test = useTest()
  return (
    <>N: {test.n}</>
  )
}

function App() {
  return (
    <TestProvider n={5}>
      <TestConsumer />
    </TestProvider>
  )
}
```