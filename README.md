# Context Creator

```js
import { contextCreator } from 'context-creator'

interface CounterProviderProps {
  initialCount: number
}

interface TestContextValue {
  counter: number
  increment: () => void
}

function useValue (props: TestProviderProps): TestContextValue {
  const [counter, setCounter] = useState(props.initialCount)
  function increment () {
    setCounter(current => current + 1)
  }
  const value = { counter, increment }
  return value
}

const {
  useCreatedContext: useTest,
  CreatedProvider: TestProvider, 
} = contextCreator({ name: 'test', useValue })

export default function TestConsumer () {
  const test = useTest()
  return (
    <>
      Count: {test.counter}
      <button onClick={test.increment}>Increment</button>
    </>
  )
}

function App() {
  return (
    <TestProvider initialCount={5}>
      <TestConsumer />
    </TestProvider>
  )
}
```