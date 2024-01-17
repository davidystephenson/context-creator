import { createContext, useContext, ReactNode } from 'react'
import { ContextCreation } from './context-creator-types'
export function contextCreator <ContextValue, ProviderProps> (props: {
  useValue: (props: ProviderProps) => ContextValue
  name: string
}): ContextCreation<ContextValue, ProviderProps> {
  const createdContext = createContext<ContextValue | undefined>(undefined)

  function useCreatedContext (): ContextValue {
    const value = useContext(createdContext)
    if (value == null) {
      const message = `(${props.name}) useCreatedContext must be used within a ContextProvider`
      throw new Error(message)
    }
    return value
  }

  function useCreatedContextUnsafe (): ContextValue | undefined {
    const value = useContext(createdContext)
    return value
  }

  function CreatedProvider (providerProps: {
    children: ReactNode
  } & ProviderProps): JSX.Element {
    const value = props.useValue(providerProps)
    return (
      <createdContext.Provider value={value}>
        {providerProps.children}
      </createdContext.Provider>
    )
  }

  return {
    useCreatedContext,
    useCreatedContextUnsafe,
    CreatedProvider
  }
}
