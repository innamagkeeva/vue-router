import { apiOrders } from '@/api'
export const ordersApi = {
  getAll() {
    return apiOrders<Order[]>('orders')
  },
  create(order: Order) {
    return apiOrders.post('orders', order)
  },
  delete(id: string) {
    return apiOrders.delete(`orders/${id}`)
  },
  getOrder(id: string) {
    return apiOrders.get<Order>(`orders/${id}`)
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
