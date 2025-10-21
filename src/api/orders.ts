import { apiLocal } from '@/api'
export const ordersApi = {
  getAll() {
    return apiLocal<Order[]>('orders')
  },
  create(order: Order) {
    return apiLocal.post('orders', order)
  },
  delete(id: string) {
    return apiLocal.delete(`orders/${id}`)
  },
  getOrder(id: string) {
    return apiLocal.get<Order>(`orders/${id}`)
  },
}

export type OrderStatus = 'Новый' | 'В процессе' | 'Выполнен' | 'Отменён'

export interface Order {
  address: string
  comment: string
  date: number
  id: string
  orderName: string
  status: OrderStatus
  userName: string
}
