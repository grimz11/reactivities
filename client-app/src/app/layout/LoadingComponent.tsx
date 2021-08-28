import * as React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

interface ILocalProps {
  inverted?: boolean
  content: string
}

const LoadingComponent = ({ inverted = true, content = 'Loading...' }: ILocalProps) => {
  return (
    <Dimmer active={true} inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  )
}

export default LoadingComponent