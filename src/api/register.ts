import { apiLocal } from '@/api'

export const registerApi = {
  createRegistration(data: Register) {
    return apiLocal.post<Register>('register', data)
  },
}

export interface Register {
  login: string
  password: string
  firstName: string
  secondName: string
}
