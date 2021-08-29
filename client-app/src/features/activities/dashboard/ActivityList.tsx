import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'

const ActivityList = () => {
  const [target, setTarget] = React.useState('')
  const { activityStore } = useStore()
  const { deleteActivity, activitiesByDate, loading } = activityStore

  const handleActivityDelete = (e: React.SyntheticEvent<HTMLButtonElement>, id: string) => {
    setTarget(e.currentTarget.name)
    deleteActivity(id)
  }

  return (
    <Segment>
      <Item.Group divided>
        {activitiesByDate.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Meta>
                <div>{activity.description}</div>
                <div>{activity.city}, {activity.venue}</div>
              </Item.Meta>
              <Item.Extra>
                <Button floated='right' content='View' color='blue' as={Link} to={`/activities/${activity.id}`} />
                <Button
                  name={activity.id}
                  floated='right'
                  content='Delete'
                  color='red'
                  onClick={(e) => handleActivityDelete(e, activity.id)}
                  loading={loading && target === activity.id}
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

export default observer(ActivityList)