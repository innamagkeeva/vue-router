<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ordersApi, type Order } from '@/api/orders'
import { useRouter } from 'vue-router'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const router = useRouter()
const orders = ref<Order[] | null>(null)

async function getOrders() {
  try {
    const response = await ordersApi.getAll()
    orders.value = response.data
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getOrders()
})

function statusColor(status: string) {
  switch (status) {
    case 'Новый':
      return 'green'
    case 'В процессе':
      return 'orange'
    case 'Выполнен':
      return 'blueviolet'
    case 'Отменен':
      return 'red'

    default:
      return ''
  }
}

async function deleteOrder(id: string) {
  try {
    await ordersApi.delete(id)
    const index = orders.value?.findIndex((order) => order.id === id)
    if (index !== undefined && index !== -1) {
      orders.value!.splice(index, 1)
    }
  } catch (error) {
    console.log(error)
  }
}
const selectedOrderId = ref<string | null>(null)

const isOpenConfirm = ref(false)

function openConfirmDialog(id: string) {
  selectedOrderId.value = id
  isOpenConfirm.value = true
}

async function handleDelete() {
  if (selectedOrderId.value) {
    await deleteOrder(selectedOrderId.value)
  }
  isOpenConfirm.value = false
  selectedOrderId.value = null
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
          <th class="thead__product">Название товара</th>
          <th class="thead__delete">Удалить заказ</th>
        </tr>
      </thead>

      <tbody v-if="orders">
        <TransitionGroup name="list">
          <tr
            v-for="order in orders"
            :key="order.id"
            @click.stop="router.push({ name: 'oneOrder', params: { id: String(order.id) } })"
          >
            <td class="thead__name">{{ order.userName }}</td>
            <td class="thead__address">{{ order.address }}</td>
            <td class="thead__data">
              {{ new Date(Number(order.date)).toLocaleDateString('ru-RU') }}
            </td>
            <td class="thead__status">
              <span :class="['status-label', statusColor(order.status)]">
                {{ order.status }}
              </span>
            </td>
            <td class="thead__comment">{{ order.comment }}</td>
            <td class="thead__product">{{ order.orderName }}</td>
            <td class="thead__delete">
              <button
                class="thead__delete-btn"
                @click.stop="openConfirmDialog(order.id)"
              >
                +
              </button>
              <!-- Нажимаешь + (x) — запоминается id нужного заказа, показывается диалог. -->
              <!-- После удаления — заказ исчезает из списка, диалог закрывается. -->
            </td>
          </tr>
        </TransitionGroup>
      </tbody>

      <tbody v-else>
        <tr>
          <td
            colspan="7"
            class="spinner__wrapper"
          >
            <div class="spinner"></div>
            <p>Загрузка...</p>
          </td>
        </tr>
      </tbody>
    </table>
    <ConfirmDialog
      v-model="isOpenConfirm"
      @ok="handleDelete"
    />
    <!-- Нажимаешь "ok" — вызывается deleteOrder(id) -->
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
  line-height: 30px;
  padding: 5px;
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

.thead__product {
  width: 210px;
}

.thead__delete-btn {
  width: 20px;
  height: 20px;
  rotate: 45deg;
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

.status-label.blueviolet {
  background-color: blueviolet;
}

.status-label.red {
  background-color: red;
}

.spinner__wrapper {
  text-align: center;
  padding: 30px;
}

.spinner {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid gray;
  border-top-color: blue;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
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
