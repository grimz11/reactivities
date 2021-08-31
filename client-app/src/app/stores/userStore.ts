import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import IUser, { IUserFormValues } from "../models/user";
import { store } from "./store";

export default class UserStore {
  user: IUser | null = null

  constructor() {
    makeAutoObservable(this)
  }

  get isLoggedIn() {
    return !!this.user
  }

  login = async (credential: IUserFormValues) => {
    try {
      const user = await agent.Account.login(credential)
      store.commonStore.setToken(user.token)
      runInAction(() => this.user = user)
      history.push('/activities')
      store.modalStore.closeModal()
    } catch (err) {
      throw err
    }
  }

  logout = () => {
    store.commonStore.setToken(null)
    window.localStorage.removeItem('jwt')
    this.user = null
    history.push('/')
  }

  getUser = async () => {
    try {
      const user = await agent.Account.current()
      runInAction(() => this.user = user)
    } catch (err) {
      console.log(err);

    }
  }

  register = async (credential: IUserFormValues) => {
    try {
      const user = await agent.Account.regiter(credential)
      store.commonStore.setToken(user.token)
      runInAction(() => this.user = user)
      history.push('/activities')
      store.modalStore.closeModal()
    } catch (err) {
      throw err
    }
  }
}