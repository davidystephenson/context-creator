import { context } from './test-context'

export default function TestConsumer (): JSX.Element {
  const test = context.use()
  function handleClick (): void {
    test.increment()
  }
  return (
    <>
      N: {test.n}
      <button onClick={handleClick}>Increment</button>
    </>
  )
}
