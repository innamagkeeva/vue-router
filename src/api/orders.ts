import { apiOrders } from '@/api'
export const ordersApi = {
  getAll() {
    return apiOrders<Order[]>('orders')
  },
  create() {},
}

interface Order {
  address: string
  comment: string
  date: number
  id: string
  orderName: string
  status: string
  userName: string
}
