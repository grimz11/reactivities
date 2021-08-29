import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { Header } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import ActivityListItem from './ActivityListItem'

const ActivityList = () => {
  const { activityStore } = useStore()
  const { groupedActivities } = activityStore

  return (
    <>
      {groupedActivities.map(([group, activities]) => (
        <React.Fragment key={group}>
          <Header sub color='teal'>
            {group}
          </Header>
          {activities.map(activity => (
            <ActivityListItem key={activity.id} activity={activity} />
          ))}
        </React.Fragment>
      ))}
    </>
  )
}

export default observer(ActivityList)