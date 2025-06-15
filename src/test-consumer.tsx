import { context } from './test-context'

export default function TestConsumer (): JSX.Element {
  const test = context.useMaybe()
  if (!test.provided) {
    return <div>Loading...</div>
  }
  function handleClick (): void {
    test.value?.increment()
  }
  return (
    <>
      N: {test.value.n}
      <button onClick={handleClick}>Increment</button>
    </>
  )
}
