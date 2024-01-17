# Context Creator

## Without Context Creator

```js
interface CounterProviderProps {
  initialCount: number
}

interface CounterContextValue {
  count: number
  increment: () => void
}

const counterContext = createContext<CounterContextValue | undefined>(undefined)

function useCounter (): CounterContextValue {
  const value = useContext(counterContext)
  if (value == null) {
    const message = `useContext must be used within a ContextProvider`
    throw new Error(message)
  }
  return value
}

function CounterProvider (props: CounterProviderProps): JSX.Element {
  const [count, setCount] = useState(props.initialCount)
  function increment () {
    setCount(current => current + 1)
  }
  const value = { count, increment }
  return (
    <createdContext.Provider value={value}>
      {providerProps.children}
    </createdContext.Provider>
  )
}

function CounterConsumer () {
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

## With Context Creator

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

function CounterConsumer () {
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
