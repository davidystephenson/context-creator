import React from 'react'
import { ContextCreation, MaybeValue, MissingValue } from './context-creator-types'

export * from './context-creator-types'

export function contextCreator<ContextValue, HookProps> (props: {
  useValue: (props: HookProps) => ContextValue
  name: string
  Wrapper?: React.ComponentType<{ children: React.ReactNode } & HookProps>
  InnerWrapper?: React.ComponentType<{ children: React.ReactNode } & HookProps>
}): ContextCreation<ContextValue, HookProps> {
  const createdContext = React.createContext<ContextValue | typeof MissingValue>(MissingValue)

  function useContext (): ContextValue {
    const value = React.useContext(createdContext)
    if (value === MissingValue) {
      const message = `(${props.name}) useContext must be used within a Provider`
      throw new Error(message)
    }
    return value
  }

  function useOptionalContext (): MaybeValue<ContextValue> {
    const value = React.useContext(createdContext)
    if (value === MissingValue) {
      return {
        value: undefined,
        provided: false
      }
    }
    return {
      value,
      provided: true
    }
  }

  type ProviderProps = HookProps & { children: React.ReactNode }

  function Consumer (consumerProps: ProviderProps): JSX.Element {
    const value = props.useValue(consumerProps)
    if (props.InnerWrapper == null) {
      return (
        <createdContext.Provider value={value}>
          {consumerProps.children}
        </createdContext.Provider>
      )
    }
    return (
      <createdContext.Provider value={value}>
        <props.InnerWrapper {...consumerProps}>
          {consumerProps.children}
        </props.InnerWrapper>
      </createdContext.Provider>
    )
  }

  function Provider (providerProps: ProviderProps): JSX.Element {
    if (props.Wrapper == null) {
      return (
        <Consumer {...providerProps} />
      )
    }

    return (
      <props.Wrapper {...providerProps}>
        <Consumer {...providerProps} />
      </props.Wrapper>
    )
  }

  return {
    context: createdContext,
    use: useContext,
    useMaybe: useOptionalContext,
    Provider
  }
}

export default contextCreator
