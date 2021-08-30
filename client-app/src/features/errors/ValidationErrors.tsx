import * as React from 'react'
import { Message } from 'semantic-ui-react'

interface ILocalProps {
  errors: string[] | null
}
const ValidationErrors = ({ errors }: ILocalProps) => {
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((err: any, i) => (
            <Message.Item key={i}>{err}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  )
}

export default ValidationErrors