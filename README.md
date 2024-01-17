# Context Creator

```js
import { contextCreator } from 'context-creator'

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

const {
  useCreatedContext: useTest,
  CreatedProvider: TestProvider, 
} = contextCreator({ name: 'test', useValue })

export default function TestConsumer () {
  const test = useTest()
  return (
    <>
      N: {test.n}
      <button onClick={test.increment}>Increment</button>
    </>
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