<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ordersApi, type Order, type OrderStatus } from '@/api/orders'
import { useRouter } from 'vue-router'
import { AxiosError } from 'axios'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import BaseButton from '@/components/BaseButton.vue'
import { type User } from '@/api/users'

const router = useRouter()
const orders = ref<Order[] | null>(null)

const props = defineProps<{
  user: User | null
}>()

const statusFilters = ref<Record<OrderStatus, boolean>>({
  Новый: true,
  'В процессе': true,
  Выполнен: true,
  Отменен: true,
})

async function getOrders() {
  try {
    const response = await ordersApi.getAll()
    orders.value = response.data
    console.log(response.data)
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 403) {
        router.push({ name: 'auth' })
      }
    }
    console.log(error)
  }
}

onMounted(() => {
  getOrders()
})

function statusColor(status: OrderStatus) {
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

function goToCreateOrder() {
  router.push({ name: 'createOrder' })
}
</script>

<template>
  <div class="list-orders">
    <div class="list-orders__header">
      <p class="list-orders__title">Список заказов</p>
      <BaseButton @click="goToCreateOrder">Создать заказ ({{ props.user?.role }})</BaseButton>
    </div>

    <table class="order-table">
      <thead>
        <tr>
          <th class="order__user-name">Имя заказчика</th>
          <th class="order__address">Адрес</th>
          <th class="order__data">Дата</th>
          <th class="order__status">Статус</th>
          <th class="order__comment">Комментарий</th>
          <th class="order__product">Название товара</th>
          <th class="order__delete-edit">Удалить/Редактировать заказ</th>
        </tr>
      </thead>

      <tbody v-if="orders">
        <TransitionGroup name="list">
          <tr
            v-for="order in orders"
            :key="order.id"
            @click.stop="router.push({ name: 'oneOrder', params: { id: String(order.id) } })"
          >
            <td class="order__user-name">{{ order.userName }}</td>
            <td class="order__address">{{ order.address }}</td>
            <td class="order__data">
              {{ new Date(Number(order.date)).toLocaleDateString('ru-RU') }}
            </td>
            <td class="order__status">
              <span :class="['status-label', statusColor(order.status)]">
                {{ order.status }}
              </span>
            </td>
            <td class="order__comment">{{ order.comment }}</td>
            <td class="order__product">{{ order.orderName }}</td>
            <td class="order__delete-edit">
              <div class="orders__buttons">
                <button
                  class="order__delete-btn"
                  @click.stop="openConfirmDialog(order.id)"
                >
                  +
                </button>
                <!-- Нажимаешь + (x) — запоминается id нужного заказа, показывается диалог. -->
                <!-- После удаления — заказ исчезает из списка, диалог закрывается. -->
                <button
                  class="order__edit-btn"
                  @click.stop="router.push({ name: 'editOrder', params: { id: order.id } })"
                >
                  <img
                    src="@/assets/icons/edit.svg"
                    alt="edit"
                  />
                </button>
              </div>
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

.order__user-name {
  width: 180px;
}
.order__address {
  width: 320px;
}
.order__data,
.order__status {
  width: 120px;
}
.order__comment {
  width: 250px;
}

.order__product {
  width: 210px;
}

.orders__buttons {
  display: flex;
  justify-content: space-between;
}

.order__delete-btn,
.order__edit-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transition: background-color 0.4s ease;
}

.order__delete-btn {
  transform: rotate(45deg);
  font-size: 24px;
}

.order__delete-btn:hover,
.order__edit-btn:hover {
  background-color: aqua;
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
 <td> Table Data — обычная ячейка с данными
 <tbody> — это контейнер для всех строк с данными таблицы.Он отделяет основные данные таблицы от её заголовков (<thead>) и нижней части (<tfoot>), если они используются.
 
 border-collapse: collapse;
  /* Оно объединяет (схлопывает) границы ячеек так, что между ними не остаётся промежутков, и они делят одну общую границу. */-->
