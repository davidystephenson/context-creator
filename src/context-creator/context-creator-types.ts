import { ReactNode } from 'react'

export interface ContextCreation <ContextValue, ProviderProps> {
  context: React.Context<ContextValue | undefined>
  use: () => ContextValue
  useMaybe: () => ContextValue | undefined
  Provider: React.FC<{ children: ReactNode } & ProviderProps>
}
