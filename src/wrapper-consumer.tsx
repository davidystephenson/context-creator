import { ReactNode } from 'react'
import { useWrapper } from './wrapper-context'

export default function WrapperConsumer (props: {
  children: ReactNode
}): JSX.Element {
  const wrapper = useWrapper()
  return (
    <div style={{ background: 'yellow' }}>
      <div>X: {wrapper.x}</div>
      {props.children}
    </div>
  )
}
