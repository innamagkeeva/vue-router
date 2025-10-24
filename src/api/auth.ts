import { apiLocal } from '@/api'

export interface AuthData {
  login: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    login: string
    password: string
    firstName: string
    secondName: string
  }
}

export const authApi = {
  signIn(data: AuthData) {
    return apiLocal.post<AuthResponse>('auth', data)
  },
}
