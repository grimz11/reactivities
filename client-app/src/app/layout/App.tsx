import axios from 'axios'
import * as React from 'react'
import { Container } from 'semantic-ui-react'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { IActivity } from '../models/activity'
import NavBar from './NavBar'
import './styles.css'
import { v4 as uuid } from 'uuid'

function App() {
  const [activities, setActivities] = React.useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = React.useState<IActivity | undefined>(undefined)
  const [editMode, setEditMode] = React.useState(false)

  React.useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data)
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
    activity.id
      ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
      : setActivities([...activities, { ...activity, id: uuid() }])
    setEditMode(false)
    setSelectedActivity(activity)
  }
  const hanldeDeleteActivity = (id: string) => {
    setActivities([...activities.filter(x => x.id !== id)])
  }

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
        />
      </Container>
    </>
  );
}

export default App
