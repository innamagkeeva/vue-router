import { api } from '@/api/'
import { apiLocal } from '@/api/'

export const usersApi = {
  get() {
    return api<Users[]>('users')
  },
}

export const userApi = {
  getUser() {
    return apiLocal<User>('user')
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

interface User {
  login: string
  firstName: string
  secondName: string
  token: number
  role: string
}
