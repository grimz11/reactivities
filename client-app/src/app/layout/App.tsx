import * as React from 'react'
import { Container } from 'semantic-ui-react'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { IActivity } from '../models/activity'
import NavBar from './NavBar'
import './styles.css'
import { v4 as uuid } from 'uuid'
import agent from '../api/agent'
import LoadingComponent from './LoadingComponent'

function App() {
  const [activities, setActivities] = React.useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = React.useState<IActivity | undefined>(undefined)
  const [editMode, setEditMode] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [submitting, setSubmitting] = React.useState(false)

  React.useEffect(() => {
    agent.Activities.list().then(response => {
      let activities: IActivity[] = []
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0]
        activities.push(activity)
      })

      setActivities(activities)
      setLoading(false)
    })
  }, [])

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id))
  }
  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined)
  }
  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity()
    setEditMode(true)
  }
  const handleFormClose = () => {
    setEditMode(false)
  }
  const handleCreateOrEditActivity = (activity: IActivity) => {
    setSubmitting(true)
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setSelectedActivity(activity)
        setEditMode(false)
        setSubmitting(false)
      })
    } else {
      activity.id = uuid()
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity])
        setSelectedActivity(activity)
        setEditMode(false)
        setSubmitting(false)
      })
    }
  }
  const hanldeDeleteActivity = (id: string) => {
    setSubmitting(true)
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)])
      setSubmitting(false)
    })
  }

  if (loading) return <LoadingComponent content='Loading app' />

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={hanldeDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App
