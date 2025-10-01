import { apiOrders } from '@/api'
export const ordersApi = {
  getAll() {
    return apiOrders<Order[]>('orders')
  },
  create() {},
}

type OrderStatus = 'Новый' | 'В процессе' | 'Выполнен' | 'Отменён'

export interface Order {
  address: string
  comment: string
  date: number
  id: string
  orderName: string
  status: OrderStatus
  userName: string
}
