import { apiLocal } from '@/api'

export interface Register {
  login: string
  password: string
  firstName: string
  secondName: string
}

export const registerApi = {
  createRegistration(data: Register) {
    return apiLocal.post<Register>('register', data)
  },
}
