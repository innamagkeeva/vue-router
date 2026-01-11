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
  update(id: string, order: Order) {
    return apiLocal.put(`orders/${id}`, order)
  },
}

export const orderStatuses = [
  { value: 'Новый', label: 'Новый' },
  { value: 'В процессе', label: 'В процессе' },
  { value: 'Выполнен', label: 'Выполнен' },
  { value: 'Отменен', label: 'Отменен' },
] as const
// Для себя: as const делает: По сути ты говоришь TypeScript:«Считай это не обычным массивом,а набором констант, значения которых нельзя менять» (только те, и никакие другие)

export type OrderStatus = (typeof orderStatuses)[number]['value']

//typeof в TypeScript (не путать с JS!) берёт тип переменной, а не значение.

// [number] - «Возьми тип любого элемента этого массива» Не 0, не 1, а любой.(проще:(orderStatuses[0] | orderStatuses[1] | orderStatuses[2] | orderStatuses[3]))

// ['value'] - Теперь берём только поле value у каждого элемента:

// !!!!! typeof orderStatuses[number]['value']Это превращается в: 'new' | 'in progress' | 'completed' | 'cancel'

export interface Order {
  address: string
  comment: string
  date: number
  id: string
  orderName: string
  status: OrderStatus
  userName: string
}
