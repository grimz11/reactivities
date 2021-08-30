import { makeAutoObservable } from "mobx"
import IServerError from "../models/serverError"

class CommonStore {
  error: IServerError | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setServerError = (error: IServerError) => {
    this.error = error
  }
}

export default CommonStore