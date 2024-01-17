# Context Creator

```js
import { contextCreator } from 'context-creator'

interface CounterProviderProps {
  initialCount: number
}

interface CounterContextValue {
  count: number
  increment: () => void
}

function useCounter (props: CounterProviderProps): CounterContextValue {
  const [count, setCount] = useState(props.initialCount)
  function increment () {
    setCount(current => current + 1)
  }
  const value = { count, increment }
  return value
}

const {
  useCreatedContext: useCounter,
  CreatedProvider: CounterProvider, 
} = contextCreator({ name: 'counter', useValue: useCounter })

export default function CounterConsumer () {
  const counter = useCounter()
  return (
    <>
      Count: {counter.count}
      <button onClick={counter.increment}>Increment</button>
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

```js
import { contextCreator } from 'context-creator'

interface CounterProviderProps {
  initialCount: number
}

interface CounterContextValue {
  count: number
  increment: () => void
}

function useCounter (props: CounterProviderProps): CounterContextValue {
  const [count, setCount] = useState(props.initialCount)
  function increment () {
    setCount(current => current + 1)
  }
  const value = { count, increment }
  return value
}

const {
  useCreatedContext: useCounter,
  CreatedProvider: CounterProvider, 
} = contextCreator({ name: 'counter', useValue: useCounter })

export default function CounterConsumer () {
  const counter = useCounter()
  return (
    <>
      Count: {counter.count}
      <button onClick={counter.increment}>Increment</button>
    </>
  )
}

function App() {
  return (
    <CounterProvider initialCount={5}>
      <CounterConsumer />
    </CounterProvider>
  )
}
```
