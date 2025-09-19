<script setup lang="ts">
type OrderStatus = 'Новый' | 'В обработке' | 'Доставлен' | 'Отменён'

interface Order {
  id: number
  customerName: string
  address: string
  data: string
  status: OrderStatus
  comment: string
  productName: string
}

const orders: Order[] = [
  {
    id: 1,
    customerName: 'Иван Петров',
    address: 'Москва, Тверская 10',
    data: '2025-08-20',
    status: 'В обработке',
    comment: 'Позвонить перед доставкой',
    productName: 'Кроссовки X',
  },
  {
    id: 2,
    customerName: 'Анна Смирнова',
    address: 'СПБ, Невский 25',
    data: '2025-08-21',
    status: 'Доставлен',
    comment: 'Оставить у консьержа',
    productName: 'Рюкзак Urban',
  },
  {
    id: 3,
    customerName: 'Павел Орлов',
    address: 'Екатеринбург, Ленина 5',
    data: '2025-08-22',
    status: 'Отменён',
    comment: 'Клиент передумал',
    productName: 'Фитнес-бутылка',
  },
]

function statusColor(status: string) {
  switch (status) {
    case 'Доставлен':
      return 'green'
    case 'В обработке':
      return 'orange'
    case 'Отменён':
      return 'red'
    default:
      return ''
  }
}
</script>

<template>
  <div class="list-orders">
    <div class="list-orders__header">
      <p class="list-orders__title">Список заказов</p>
      <RouterLink
        class="list-orders__button"
        :to="{ name: 'createOrder' }"
        >Создать заказ</RouterLink
      >
    </div>

    <table class="order-table">
      <thead>
        <tr>
          <th class="thead__name">Имя заказчика</th>

          <th class="thead__address">Адрес</th>
          <th class="thead__data">Дата</th>
          <th class="thead__status">Статус</th>
          <th class="thead__comment">Комментарий</th>
          <th class="thead__product">название товара</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="order in orders"
          :key="order.id"
        >
          <td class="thead__name">
            {{ order.customerName }}
          </td>
          <td class="thead__address">{{ order.address }}</td>
          <td class="thead__data">{{ order.data }}</td>
          <td class="thead__status">
            <span :class="['status-label', statusColor(order.status)]">
              {{ order.status }}
            </span>
          </td>
          <td class="thead__comment">{{ order.comment }}</td>
          <td class="thead__product">{{ order.productName }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.list-orders {
  flex: 1;
  padding: 0px 10px;
}

.list-orders__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 10px;
  margin-bottom: 30px;
}

.list-orders__title {
  display: inline;
  margin-left: 10px;
  font-size: 30px;
}

.list-orders__button {
  width: 110px;
  line-height: 40px;
  border-radius: 7px;
  background-color: blue;
  color: white;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
}

.order-table th,
.order-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid gray;
}

.thead__name {
  width: 180px;
}
.thead__address {
  width: 320px;
}
.thead__data,
.thead__status {
  width: 120px;
}
.thead__comment {
  width: 250px;
}

.status-label {
  padding: 6px 12px;
  border-radius: 20px;
  color: white;
  font-size: 14px;
  display: inline-block;
}

.status-label.green {
  background-color: green;
}

.status-label.orange {
  background-color: orange;
}

.status-label.red {
  background-color: red;
}
</style>

<!-- для себя: 
 <table> Создаёт таблицу
 <tr> Table Row — строка таблицы
 <th> Table Header — ячейка-заголовок 
 <tr> Table Row — строка таблицы 
 <td> Table Data — обычная ячейка с данными
 <tbody> — это контейнер для всех строк с данными таблицы.Он отделяет основные данные таблицы от её заголовков (<thead>) и нижней части (<tfoot>), если они используются.
 
 border-collapse: collapse;
  /* Оно объединяет (схлопывает) границы ячеек так, что между ними не остаётся промежутков, и они делят одну общую границу. */-->
