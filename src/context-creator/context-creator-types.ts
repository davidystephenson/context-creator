import { ReactNode } from 'react'

export const MissingValue = Symbol('MissingValue')

export interface ProvidedValue <ContextValue> {
  value: ContextValue
  provided: true
}

export interface UnprovidedValue {
  value: undefined
  provided: false
}

export type MaybeValue <ContextValue> = ProvidedValue<ContextValue> | UnprovidedValue

export interface ContextCreation <ContextValue, ProviderProps> {
  context: React.Context<ContextValue | typeof MissingValue>
  use: () => ContextValue
  useMaybe: () => MaybeValue<ContextValue>
  Provider: React.FC<{ children: ReactNode } & ProviderProps>
}
