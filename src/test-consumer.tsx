import { useTest } from "./test-context";

export default function TestConsumer () {
  const test = useTest()
  return (
    <>N: {test.n}</>
  )
}