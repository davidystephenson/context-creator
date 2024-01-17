import { ReactNode } from 'react'

export interface ContextCreation <ContextValue, ProviderProps> {
  useCreatedContext: () => ContextValue
  useCreatedContextUnsafe: () => ContextValue | undefined
  CreatedProvider: React.FC<{ children: ReactNode } & ProviderProps>
}
