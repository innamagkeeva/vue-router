import { api, apiLocal } from '@/api/'

export const usersApi = {
  get() {
    return api.get<Users[]>('users')
  },
}

export const userApi = {
  getUser() {
    return apiLocal.get<User>('user')
  },
}

export interface Users {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export interface User {
  login: string
  firstName: string
  secondName: string
  token: number
  role: 'USER' | 'ADMIN'
}
