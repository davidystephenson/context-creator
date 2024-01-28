import { ReactNode } from 'react'

export interface ContextCreation <ContextValue, ProviderProps> {
  useContext: () => ContextValue
  useOptionalContext: () => ContextValue | undefined
  Provider: React.FC<{ children: ReactNode } & ProviderProps>
}
