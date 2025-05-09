import TestConsumer from './test-consumer'
import { context } from './test-context'

export default function App (): JSX.Element {
  return (
    <context.Provider n={10}>
      <TestConsumer />
    </context.Provider>
  )
}
