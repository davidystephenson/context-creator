import TestConsumer from './test-consumer'
import { TestProvider } from './test-context'

export default function App (): JSX.Element {
  return (
    <TestProvider n={5}>
      <TestConsumer />
    </TestProvider>
  )
}
