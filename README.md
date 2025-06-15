# Context Creator

## Installation

```sh
npm install context-creator
```

## Usage

```TSX
import contextCreator from 'context-creator'

const counterContext = contextCreator({
  name: 'counter',
  useValue (props: { initialCount: number }) {
    const [count, setCount] = useState(props.initialCount)
    function increment () {
      setCount(current => current + 1)
    }
    const value = { count, increment }
    return value
  }
})

function CounterConsumer () {
  const counter = counterContext.use()
  return (
    <button onClick={counter.increment}>
      {counter.count}
    </button>
  )
}

function App() {
  return (
    <counterContext.Provider initialCount={5}>
      <CounterConsumer />
    </counterContext.Provider>
  )
}
```

## Problem

Creating and using React contexts out of the box requires repeating boilerplate code for each new context:

* defining a context type
* creating a context
* defining a provider component that wraps the internal context provider
* defining a hook to consume the context

### Without Context Creator

#### context/counter.tsx

```TSX
import { createContext, useContext } from 'react'

interface CounterContextValue {
  count: number
  increment: () => void
}

const counterContext = createContext<CounterContextValue | undefined>(undefined)

export function CounterProvider (props: {
  initialCount: number
}): JSX.Element {
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

export function useCounterContext (): CounterContextValue {
  const value = useContext(counterContext)
  if (value == null) {
    const message = `useCounterContext must be used within a Provider`
    throw new Error(message)
  }
  return value
}
```

#### component/CounterConsumer.tsx

```TSX
import { useCounter } from '../context/counter'

export default function CounterConsumer () {
  const counter = useCounter()
  return (
    <button onClick={counter.increment}>
      {counter.count}
    </button>
  )
}
```

#### App.tsx

```TSX
import { CounterProvider } from './context/counter'
import CounterConsumer from './component/CounterConsumer'

export default function App() {
  return (
    <CounterProvider initialCount={5}>
      <CounterConsumer />
    </CounterProvider>
  )
}
```

## Solution

Context creator minimizes this boilerplate. The `contextCreator` function defines the context, the provider, and consuming hooks for you. For TypeScript developers, it also infers the type of the context value and the provider's props.

`contextCreator` returns an object with a `.Provider` component and a `.use` hook to consume the context. To create the provider and hooks, call `contextCreator` and pass a single object with two parameters:

* `name`, a string is used to identify the context in error messages.
* `useValue`, a hook that will be called inside the provider.

The `useValue` hook should take a single argument to receive the props passed to the created provider. The provider's props will be passed to `useValue`. `contextCreator` will infer the type of the created Provider's props from `useValue`'s argument.

`useValue`'s return value can be consumed by any child of the provider. `contextCreator` will infer the type of the created context's value from `useValue`'s return.

### With Context Creator

#### context/counter.ts

```TypeScript
import contextCreator from 'context-creator'

export const counterContext = contextCreator({
  name: 'counter',
  useValue: (props: { initialCount: number }) => {
    const [count, setCount] = useState(props.initialCount)
    function increment () {
      setCount(current => current + 1)
    }
    const value = { count, increment }
    return value
  }
})
```

#### component/CounterConsumer.tsx

```TSX
import { counterContext } from '../context/counter'

export default function CounterConsumer () {
  const counter = counterContext.use()
  return (
    <button onClick={counter.increment}>
      {counter.count}
    </button>
  )
}
```

#### App.tsx

```TSX
import { counterContext } from './context/counter'
import CounterConsumer from './component/CounterConsumer'

export default function App() {
  return (
    <counterContext.Provider initialCount={5}>
      <CounterConsumer />
    </counterContext.Provider>
  )
}
```

## .useMaybe

The `.use` hook will throw an error if used outside a provider. If you need to consume the context in a component that might be rendered outside a provider, call the `.useMaybe` hook.

```TSX
import contextCreator from 'context-creator'

const counterContext = contextCreator({
  name: 'counter',
  useValue (props: { initialCount: number }) {
    const [count, setCount] = useState(props.initialCount)
    function increment () {
      setCount(current => current + 1)
    }
    const value = { count, increment }
    return value
  }
})

function RequiredConsumer () {
  const counter = counterContext.use()
  return <>Count: {counter.count}</>
}

function OptionalConsumer () {
  const counter = counterContext.useMaybe()
  if (!counter.provided) {
    return <>Unknown counter</>
  }
  return <>Count: {counter.value.count}</>
}

function App() {
  return (
    <>
      {/* Throws the error "(counter) useContext must be used within a Provider" */}
      <RequiredConsumer />


      {/* Renders "Unknown counter" with no error */}
      <OptionalConsumer />
    </>
  )
}
```

### `MaybeValue`

`.useMaybe` returns an object with two properties:

* `value`, the context value if it is provided.
* `provided`, a boolean indicating if the context is provided.

If `provided` is `false`, `value` is `undefined`. If `provided` is `true`, `value` is the context value. The type signature of `MaybeValue` is:

```TypeScript
interface ProvidedValue <ContextValue> {
  value: ContextValue
  provided: true
}
interface UnprovidedValue {
  value: undefined
  provided: false
}
type MaybeValue <ContextValue> = ProvidedValue<ContextValue> | UnprovidedValue
```

## `ContextCreation`

`contextCreator` returns an object of type `ContextCreation`. `ContextCreation` is a generic type that can be imported from the `context-creator` package. `ContextCreation` takes two generic type parameters:

* `ContextValue`, the type of the context value returned by the `useValue` hook.
* `ProviderProps`, the type of the props passed to the created provider.

```TypeScript
export interface ContextCreation <ContextValue, ProviderProps> {
  use: () => ContextValue
  useMaybe: () => ContextValue | undefined
  Provider: React.FC<{ children: ReactNode } & ProviderProps>
}
```
