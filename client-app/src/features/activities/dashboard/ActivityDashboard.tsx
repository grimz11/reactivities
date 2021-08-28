import * as React from 'react'
import { Grid } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

interface ILocalProps {
  activities: IActivity[]
  selectedActivity: IActivity | undefined
  selectActivity: (id: string) => void
  cancelSelectActivity: () => void
  editMode: boolean
  openForm: (id: string) => void
  closeForm: () => void
  createOrEdit: (activity: IActivity) => void
  deleteActivity: (id: string) => void
  submitting: boolean
}

const ActivityDashboard = ({ activities, selectedActivity, selectActivity, cancelSelectActivity, editMode, openForm, closeForm, createOrEdit, deleteActivity, submitting }: ILocalProps) => {
  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
          deleteActivity={deleteActivity}
          submitting={submitting}
        />
      </Grid.Column>
      <Grid.Column width='6'>
        {selectedActivity && !editMode &&
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
          />}
        {editMode &&
          <ActivityForm
            closeForm={closeForm}
            activity={selectedActivity}
            createOrEdit={createOrEdit}
            submitting={submitting}
          />}
      </Grid.Column>
    </Grid>
  )
}

export default ActivityDashboard