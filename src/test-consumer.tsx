import { useTest } from './test-context'

export default function TestConsumer (): JSX.Element {
  const test = useTest()
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
