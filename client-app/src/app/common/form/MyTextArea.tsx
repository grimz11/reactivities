import { useField } from 'formik'
import * as React from 'react'
import { Form, Label } from 'semantic-ui-react'

interface IProps {
  placeholder: string
  name: string
  rows: number
  label?: string
}
const MyTextArea = (props: IProps) => {
  const [field, meta] = useField(props.name)

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <textarea {...field} {...props} />

      {meta.touched && meta.error ? (
        <Label basic color='red'>{meta.error}</Label>
      ) : null}
    </Form.Field>
  )
}

export default MyTextArea