import * as React from 'react'
import { Message } from 'semantic-ui-react'

interface ILocalProps {
  errors: any
}
const ValidationErrors = ({ errors }: ILocalProps) => {
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((err: any, i: any) => (
            <Message.Item key={i}>{err}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  )
}

export default ValidationErrors