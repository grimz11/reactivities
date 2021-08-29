import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent"
import { IActivity } from "../models/activity"
class ActivityStore {
  activityRegistry = new Map<string, IActivity>()
  selectedActivity: IActivity | undefined = undefined
  editMode = false
  loading = false
  loadingInitial = true

  constructor() {
    makeAutoObservable(this)
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  }

  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        const date = activity.date
        activities[date] = activities[date] ? [...activities[date], activity] : [activity]

        return activities
      }, {} as { [key: string]: IActivity[] })
    )
  }

  loadActivities = async () => {
    this.loadingInitial = true
    try {
      const activities = await agent.Activities.list()
      activities.forEach(activity => {
        this.setActivity(activity)
      })
      this.setLoadingInitial(false)
    } catch (err) {
      console.log(err)
      this.setLoadingInitial(false)
    }
  }

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id)
    if (activity) {
      this.selectedActivity = activity
      return activity
    } else {
      this.loadingInitial = true
      try {
        activity = await agent.Activities.details(id)
        this.setActivity(activity)

        runInAction(() => {
          this.selectedActivity = activity
        })

        this.setLoadingInitial(false)
        return activity
      } catch (err) {
        this.setLoadingInitial(false)
      }
    }
  }

  private setActivity = (activity: IActivity) => {
    activity.date = activity.date.split('T')[0]
    this.activityRegistry.set(activity.id, activity)
  }

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id)
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state
  }

  createActivity = async (activity: IActivity) => {
    this.loading = true
    try {
      await agent.Activities.create(activity)
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity)
        this.selectedActivity = activity
        this.editMode = false
        this.loading = false
      })
    } catch (err) {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  updateActivity = async (activity: IActivity) => {
    this.loading = true
    try {
      await agent.Activities.update(activity)
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity)
        this.selectedActivity = activity
        this.editMode = false
        this.loading = false
      })
    } catch (err) {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  deleteActivity = async (id: string) => {
    this.loading = true
    try {
      await agent.Activities.delete(id)
      runInAction(() => {
        this.activityRegistry.delete(id)
        this.loading = false
      })
    } catch (err) {
      runInAction(() => {
        this.loading = false
      })
    }
  }
}

export default ActivityStore