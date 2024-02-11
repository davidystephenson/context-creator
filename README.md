# Context Creator

## Installation

```sh
npm install context-creator
```

## Usage

```TSX
import contextCreator from 'context-creator'

function useValue (props: {
  initialCount: number
}) {
  const [count, setCount] = useState(props.initialCount)
  function increment () {
    setCount(current => current + 1)
  }
  const value = { count, increment }
  return value
}

export const {
  useContext: useCounter,
  Provider: CounterProvider, 
} = contextCreator({ name: 'counter', useValue })

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

## Problem

Creating and using React contexts out of the box requires repeating boilerplate code for each new context:

* defining a context type
* creating a context
* defining a hook to consume the context
* defining a provider component that wraps the internal context provider

### Without Context Creator

#### context/counter.tsx

```TSX
import { createContext, useContext } from 'react'

interface CounterContextValue {
  count: number
  increment: () => void
}

export const counterContext = createContext<CounterContextValue | undefined>(undefined)

export function useCounter (): CounterContextValue {
  const value = useContext(counterContext)
  if (value == null) {
    const message = `useContext must be used within a Provider`
    throw new Error(message)
  }
  return value
}

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
```

#### component/CounterConsumer.tsx

```TSX
function CounterConsumer () {
  const counter = useCounter()
  return (
    <>
      Count: {counter.count}
      <button onClick={counter.increment}>Increment</button>
    </>
  )
}
```

#### App.tsx

```TSX
function App() {
  return (
    <CounterProvider initialCount={5}>
      <CounterConsumer />
    </CounterProvider>
  )
}
```

## Solution

Context creator minimizes this boilerplate.
The `contextCreator` function defines the context, the provider, and consuming hooks for you.
For TypeScript developers, it also infers the type of the context value and the provider's props.

You define a hook named `useValue`.
The hook should take a single argument to receive the props passed to the created provider.
`contextCreator` will infer the type of the created Provider's props from this argument.
`useValue`'s return value will be the passed to the internal context provider as it's `value` prop that can be consumed by any child component.
`contextCreator` will infer the type of the created context's value from this return value.
`contextCreator` also creates a hook that returns the provided context value or throw an error if called outside of a provider.

To create the provider and hooks, call `contextCreator` and pass a single object with two properties: `name` and `useValue`.

* `name` should be a string is used to identify the context in error messages.
* `useValue` should be a hook that will be called inside the provider.
The provider's props will be passed to `useValue`, and whatever `useValue` returns will be provided to the context.

`contextCreator` will return an object of type `ContextCreation`.
The object includes properties for the provider and hooks to consume the context.
`ContextCreation` is a generic type that can be imported from the `context-creator` package.
The functions `contextCreator` returns can be immediately destructured, aliased, and exported in a single statement.

### With Context Creator

#### context/counter.ts

```TypeScript
import contextCreator from 'context-creator'

function useValue (props: {
  initialCount: number
}) {
  const [count, setCount] = useState(props.initialCount)
  function increment () {
    setCount(current => current + 1)
  }
  const value = { count, increment }
  return value
}

export const {
  useContext: useCounter,
  Provider: CounterProvider
} = contextCreator({ name: 'counter', useValue })
```

#### component/CounterConsumer.tsx

```TSX
import { useCounter} from '../context/counter'

function CounterConsumer () {
  const counter = useContext()
  return (
    <>
      Count: {counter.count}
      <button onClick={counter.increment}>Increment</button>
    </>
  )
}
```

#### App.tsx

```TSX
import { CounterProvider } from './context/counter'
import CounterConsumer from './component/CounterConsumer'

function App() {
  return (
    <CounterProvider initialCount={5}>
      <CounterConsumer />
    </CounterProvider>
  )
}
```

## Optional consumption

The created `useContext` hook will throw an error if used outside a provider.
If you need to consume the context in a component that might be rendered outside a provider, call the `useOptionalContext` hook also returned by `contextCreator`.

```TSX
import contextCreator from 'context-creator'

function useValue (props: {
  initialCount: number
}) {
  const [count, setCount] = useState(props.initialCount)
  const value = { count, setCount }
  return value
}

const {
  useContext: useCounter,
  useOptionalContext: useOptionalCounter,
  Provider: CounterProvider, 
} = contextCreator({ name: 'counter', useValue })

function RequiredConsumer () {
  const counter = useCounter()
  return <>Count: {counter.count}</>
}

function OptionalConsumer () {
  const counter = useOptionalCounter()
  if (counter == null) {
    return <>Unknown counter</>
  }
  return <>Count: {counter.count}</>
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
