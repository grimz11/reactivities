import axios, { AxiosError, AxiosResponse } from 'axios'
import { Slide, toast } from 'react-toastify'
import { history } from '../..'
import { IActivity } from '../models/activity'
import IUser, { IUserFormValues } from '../models/user'
import { store } from '../stores/store'

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.request.use((config: any) => {
  const token = store.commonStore.token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

axios.interceptors.response.use(async response => {
  try {
    await sleep(1000)
    return response
  } catch (error) {
    return await Promise.reject(error)
  }
}, (error: AxiosError) => {
  const { data, status, config } = error.response!

  switch (status) {
    case 400:
      if (typeof data === 'string') {
        toast.error(data, { transition: Slide })
      }

      if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
        history.push('/not-found')
      }

      if (data.errors) {
        const modalStateErrors = []

        for (const key in data.errors) {
          if (data.errors[key]) {
            modalStateErrors.push(data.errors[key])
          }
        }
        throw modalStateErrors.flat()
      } else {
        toast.error(data)
      }
      break
    case 401:
      toast.error('unauthorised', { transition: Slide })
      break
    case 404:
      history.push('/not-found')
      break
    case 500:
      store.commonStore.setServerError(data)
      history.push('/server-error')
      break
  }
  return Promise.reject(error)
})

const responseBody = <T>(respose: AxiosResponse<T>) => respose.data

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Activities = {
  list: () => request.get<IActivity[]>('/activities'),
  details: (id: string) => request.get<IActivity>(`/activities/${id}`),
  create: (activity: IActivity) => request.post<void>('/activities', activity),
  update: (activity: IActivity) => request.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => request.del<void>(`/activities/${id}`)
}

const Account = {
  current: () => request.get<IUser>('/account'),
  login: (user: IUserFormValues) => request.post<IUser>('/account/login', user),
  regiter: (user: IUserFormValues) => request.post<IUser>('/account/register', user)
}

const agent = {
  Activities,
  Account
}

export default agent