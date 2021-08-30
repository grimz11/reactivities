import { useField } from 'formik'
import * as React from 'react'
import { Form, Label } from 'semantic-ui-react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'


const MyDateinput = (props: Partial<ReactDatePickerProps<any>>) => {
  const [field, meta, helpers] = useField(props.name!)

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={value => helpers.setValue(value)}
      />

      {meta.touched && meta.error ? (
        <Label basic color='red'>{meta.error}</Label>
      ) : null}
    </Form.Field>
  )
}

export default MyDateinput