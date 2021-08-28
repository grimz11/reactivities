import * as React from "react"
import { Button, Form, Segment } from "semantic-ui-react"
import { IActivity } from "../../../app/models/activity"

interface ILocalProps {
  activity: IActivity | undefined
  closeForm: () => void
  createOrEdit: (activity: IActivity) => void
  submitting: boolean
}

const ActivityForm = ({ activity: selectedActivity, closeForm, createOrEdit, submitting }: ILocalProps) => {

  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  }

  const [activity, setActivity] = React.useState(initialState)

  const handleSubmit = () => {
    createOrEdit(activity)
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setActivity({ ...activity, [name]: value })
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
        <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
        <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
        <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
        <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
        <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
        <Button floated='right' positive type='submit' content='Submit' loading={submitting} />
        <Button floated='right' type='button' content='Cancel' onClick={closeForm} />
      </Form>
    </Segment>
  )
}

export default ActivityForm