import TestConsumer from "./test-consumer"
import { TestProvider } from "./test-context"

function App() {
  return (
    <TestProvider n={5}>
      <TestConsumer />
    </TestProvider>
  )
}

export default App
