import { ReactNode } from 'react'

export interface ContextCreation <ContextValue, ProviderProps> {
  use: () => ContextValue
  useMaybe: () => ContextValue | undefined
  Provider: React.FC<{ children: ReactNode } & ProviderProps>
}
