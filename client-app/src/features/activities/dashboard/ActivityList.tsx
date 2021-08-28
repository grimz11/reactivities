import * as React from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

interface ILocalProps {
  activities: IActivity[]
  selectActivity: (id: string) => void
  deleteActivity: (id: string) => void
  submitting: boolean
}

const ActivityList = ({ activities, selectActivity, deleteActivity, submitting }: ILocalProps) => {
  const [target, setTarget] = React.useState('')

  const handleActivityDelete = (e: React.SyntheticEvent<HTMLButtonElement>, id: string) => {
    setTarget(e.currentTarget.name)
    deleteActivity(id)
  }

  return (
    <Segment>
      <Item.Group divided>
        {activities.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Meta>
                <div>{activity.description}</div>
                <div>{activity.city}, {activity.venue}</div>
              </Item.Meta>
              <Item.Extra>
                <Button floated='right' content='View' color='blue' onClick={() => selectActivity(activity.id)} />
                <Button
                  name={activity.id}
                  floated='right'
                  content='Delete'
                  color='red'
                  onClick={(e) => handleActivityDelete(e, activity.id)}
                  loading={submitting && target === activity.id}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  )
}

export default ActivityList