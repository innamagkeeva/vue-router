import { apiLocal } from '@/api'

export interface Register {
  login: string
  password: string
  firstName: string
  secondName: string
}

export interface RegisterResponse {
  login: string
  firstName: string
  secondName: string
  token: number
  role: string
}

export const registerApi = {
  createRegistration(data: Register) {
    return apiLocal.post<RegisterResponse>('register', data)
  },
}
