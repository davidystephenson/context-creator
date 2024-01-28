import React from 'react'
import { ContextCreation } from './context-creator-types'

export * from'./context-creator-types'

export function contextCreator <ContextValue, ProviderProps> (props: {
  useValue: (props: ProviderProps) => ContextValue
  name: string
}): ContextCreation<ContextValue, ProviderProps> {
  const createdContext = React.createContext<ContextValue | undefined>(undefined)

  function useContext (): ContextValue {
    const value = React.useContext(createdContext)
    if (value == null) {
      const message = `(${props.name}) useContext must be used within a Provider`
      throw new Error(message)
    }
    return value
  }

  function useOptionalContext (): ContextValue | undefined {
    const value = React.useContext(createdContext)
    return value
  }

  function Provider (providerProps: {
    children: React.ReactNode
  } & ProviderProps): JSX.Element {
    const value = props.useValue(providerProps)
    return (
      <createdContext.Provider value={value}>
        {providerProps.children}
      </createdContext.Provider>
    )
  }

  return {
    useContext,
    useOptionalContext,
    Provider
  }
}

export default contextCreator