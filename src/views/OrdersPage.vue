<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
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

// (1) Состояние фильтров
const statusFilters = ref<Record<OrderStatus, boolean>>({
  Новый: true,
  'В процессе': true,
  Выполнен: true,
  Отменен: true,
})

const filteredOrders = computed(() => {
  if (!orders.value) return []

  return orders.value.filter((order) => statusFilters.value[order.status])
})

// (2) Состояние выбранного заказа
const selectedOrderId = ref<string | null>(null)

const isOpenConfirm = ref(false)

// (3) Фильтруем заказы по статусам
const isFiltersChanged = computed(() => {
  return Object.values(statusFilters.value).some((value) => !value)
})
// Что делает:берёт все значения (true/false).если есть хотя бы один false → возвращает true
// .some() — это метод массива, который: проверяет, есть ли хотя бы один элемент, который подходит под условие И возвращает: true — если найден хотя бы один подходящий элемент false — если ни одного нет.                              Синтаксис: array.some((element) => условие)

// (4) Получение заказов
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

// функция сохраНЕНИЯ фильтров в localStorage
function saveFilters() {
  localStorage.setItem('orderStatusFilters', JSON.stringify(statusFilters.value))
}

// Хук жизненного цикла ДоМонтирование
onMounted(() => {
  getOrders()
  //  восстанавливаем фильтры из localStorage (встроенное хранилище в браузере), т.е. читается сохранеННЫЕ фильтры
  const savedFilters = localStorage.getItem('orderStatusFilters') // orderStatusFilters - это ключ из localStorage

  if (savedFilters) {
    statusFilters.value = JSON.parse(savedFilters)
  }
})

// (5) Цвет статуса
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

// (6) Сброс фильтров
function resetFilters() {
  for (const status in statusFilters.value) {
    statusFilters.value[status as OrderStatus] = true
  }
  saveFilters() // сохраняем изменения
}
// мы проходим по всем ключам объекта и каждому статусу ставим true

// (7) Удаление заказа
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

// (8) Диалог подтверждения удаления
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

// (9) Переход на создание заказа
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

    <!-- Если еще не загрузилось ничего, то крутится спиннер -->
    <div
      v-if="orders === null"
      class="spinner__wrapper"
    >
      <div class="spinner"></div>
      <p>Загрузка...</p>
    </div>

    <!-- Если заказы есть, то загружается таблица -->
    <div v-else>
      <!-- Создаем список чекбоксов, автоматически построенный
из объекта statusFilters (ключ-название статуса. значение-включен ли чекбокс)-->

      <div class="status-filters">
        <label
          class="status-filter"
          v-for="(checked, status) in statusFilters"
          :key="status"
        >
          <span>{{ status }}</span>
          <input
            type="checkbox"
            v-model="statusFilters[status]"
            @change="saveFilters"
          />
          <!-- @change- слушатель события. когда отметка инпута меняется, фильтры сразу сохраняются-->
        </label>
        <!-- Как это читается: «Пройтись по объекту statusFilters и для каждой пары (значение, ключ) создать label»  Важно: Для объектов порядок такой: (value, key) а не наоборот,То есть:
        checked → true / false
        status → 'Новый' | 'В процессе' | ...
        слово 'checked'если не подсвечивает, можно заменить на '_' или настроить ESLint, чтобы он такое подсвечивал, но можно оставить и так-все работает -->
        <BaseButton
          v-if="isFiltersChanged"
          @click="resetFilters"
          >Сбросить фильтры</BaseButton
        >
      </div>

      <!-- Если галочки фильтров сняты, то заголовок "НЕТ ЗАКАЗОВ" -->
      <div v-if="filteredOrders.length === 0">
        <p>Нет заказов с выбранными статусами</p>
      </div>
      <table
        v-else
        class="order-table"
      >
        <thead>
          <tr>
            <th class="order-table__user-name">Имя заказчика</th>
            <th class="order-table__address">Адрес</th>
            <th class="order-table__data">Дата</th>
            <th class="order-table__status">Статус</th>
            <th class="order-table__comment">Комментарий</th>
            <th class="order-table__product">Название товара</th>
            <th class="order-table__delete-edit">Удалить/Редактировать заказ</th>
          </tr>
        </thead>

        <tbody>
          <TransitionGroup name="list">
            <tr
              v-for="order in filteredOrders"
              :key="order.id"
              @click.stop="router.push({ name: 'oneOrder', params: { id: String(order.id) } })"
            >
              <td class="order-table__user-name">{{ order.userName }}</td>
              <td class="order-table__address">{{ order.address }}</td>
              <td class="order-table__data">
                {{ new Date(Number(order.date)).toLocaleDateString('ru-RU') }}
              </td>
              <td class="order-table__status">
                <span :class="['status-label', statusColor(order.status)]">
                  {{ order.status }}
                </span>
              </td>
              <td class="order-table__comment">{{ order.comment }}</td>
              <td class="order-table__product">{{ order.orderName }}</td>
              <td class="order-table__delete-edit">
                <div class="order-table__buttons order-table__buttons-side">
                  <button
                    class="order-table__delete-btn"
                    @click.stop="openConfirmDialog(order.id)"
                  >
                    +
                  </button>
                  <!-- Нажимаешь + (x) — запоминается id нужного заказа, показывается диалог. -->
                  <!-- После удаления — заказ исчезает из списка, диалог закрывается. -->
                  <button
                    class="order-table__edit-btn"
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
      </table>

      <ConfirmDialog
        v-model="isOpenConfirm"
        @ok="handleDelete"
      />
      <!-- Нажимаешь "ok" — вызывается deleteOrder(id) -->
    </div>
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
  height: 40px;
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

.status-filters {
  display: flex;
  gap: 20px;
  padding: 10px 20px;
  margin-bottom: 20px;
  min-height: 60px;
}

.status-filter {
  display: flex;
  align-items: center;
  gap: 3px;
}

.status-filters__btn {
  padding: 10px;
  border: 1px solid black;
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
.order-table__address {
  width: 320px;
}
.order-table__data,
.order-table__status {
  width: 120px;
}
.order-table__comment {
  width: 250px;
}

.order-table__product {
  width: 210px;
}

.order-table__buttons {
  display: flex;
  justify-content: space-between;
}

.order-table__delete-btn,
.order-table__edit-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transition: background-color 0.4s ease;
}

.order-table__delete-btn {
  transform: rotate(45deg);
  font-size: 24px;
  z-index: -1;
}

.order-table__buttons-side {
  padding: 10px 30px;
}

.order-table__delete-btn:hover,
.order-table__edit-btn:hover {
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

<!-- ВОПРОС: по какой причине после создания  класса .order-table__buttons-side {
  padding: 10px 30px;} у кнопки удаления стал высокий приоритет, и именно х стал выезжать выше в шапку. правильно ли в этой ситуации сделать кнопке удаления z-index минусовой?-->
