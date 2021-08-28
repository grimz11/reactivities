import * as React from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

interface ILocalProps {
  activities: IActivity[]
  selectActivity: (id: string) => void
  deleteActivity: (id: string) => void
}

const ActivityList = ({ activities, selectActivity, deleteActivity }: ILocalProps) => {
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
                <Button floated='right' content='Delete' color='red' onClick={() => deleteActivity(activity.id)} />
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