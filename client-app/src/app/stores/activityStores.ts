import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent"
import { IActivity } from "../models/activity"
import { v4 as uuid } from 'uuid'

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

  loadActivities = async () => {
    try {
      const activities = await agent.Activities.list()
      activities.forEach(activity => {
        activity.date = activity.date.split('T')[0]
        this.activityRegistry.set(activity.id, activity)
      })
      this.setLoadingInitial(false)
    } catch (err) {
      console.log(err)
      this.setLoadingInitial(false)
    }
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state
  }

  selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id)
  }

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined
  }

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectedActivity()
    this.editMode = true
  }

  closeForm = () => {
    this.editMode = false
  }

  createActivity = async (activity: IActivity) => {
    this.loading = true
    activity.id = uuid()
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
        if (this.selectedActivity?.id === id) this.cancelSelectedActivity()
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