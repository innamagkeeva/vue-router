<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ordersApi, type OrderStatus } from '@/api/orders'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseTextarea from '@/components/BaseTextarea.vue'
import OrderStatusSelect from '@/components/OrderStatusSelect.vue'

const route = useRoute()
const router = useRouter()

const id = route.params.id as string

const orderForm = reactive({
  userName: '',
  address: '',
  comment: '',
  product: '',
  date: '',
  status: 'Новый' as OrderStatus,
})

const errors = reactive({
  userName: '',
  address: '',
  date: '',
  comment: '',
  product: '',
  status: '',
})

function validateUserName() {
  errors.userName = orderForm.userName.length > 2 ? '' : 'Заполните это поле'
}

function validateAddress() {
  errors.address = orderForm.address.length > 10 ? '' : 'Заполните это поле'
}

function validateDate() {
  errors.date = orderForm.date ? '' : 'Заполните это поле'
}

function validateComment() {
  errors.comment = orderForm.comment ? '' : 'Заполните это поле'
}

function validateProduct() {
  errors.product = orderForm.product ? '' : 'Заполните это поле'
}

function validateStatus() {
  errors.status = orderForm.status ? '' : 'Заполните это поле'
}

function validateForm() {
  validateUserName()
  validateAddress()
  validateDate()
  validateComment()
  validateProduct()
  validateStatus()

  return (
    !errors.userName &&
    !errors.address &&
    !errors.date &&
    !errors.comment &&
    !errors.product &&
    !errors.status
  )
}

function formatDateForInput(timestamp: number) {
  return new Date(timestamp).toISOString().split('T')[0]
}

async function getOrder() {
  try {
    const response = await ordersApi.getOrder(id)
    const order = response.data

    orderForm.userName = order.userName
    orderForm.address = order.address
    orderForm.comment = order.comment
    orderForm.product = order.orderName
    orderForm.status = order.status
    orderForm.date = formatDateForInput(order.date)
  } catch (error) {
    console.log(error)
  }
}

async function saveOrder() {
  if (!validateForm()) {
    return
  }
  try {
    const response = await ordersApi.update(id, {
      // переменную можно не использовать, сразу написать await ordersApi.update.... если не нужен консольЛог
      id,
      userName: orderForm.userName,
      address: orderForm.address,
      comment: orderForm.comment,
      orderName: orderForm.product,
      status: orderForm.status,
      date: new Date(orderForm.date).getTime(),
    })
    console.log('Данные успешно исправлены', response.data) // Если я сюда ставлю консольЛог, то выводит в консоль исправленный заказ, если после пуша на страницу заказов - то выводит все заказы вместе с исправленным
    router.push({ name: 'orders' })
  } catch (error) {
    console.log(error)
  }
}

function goToOrdersPage() {
  router.push({ name: 'orders' })
}

onMounted(getOrder)
</script>

<template>
  <div class="wrapper">
    <h1 class="title">Редактировать заказ</h1>
    <form
      class="form"
      @submit.prevent="saveOrder"
    >
      <div class="form__row">
        <div class="form__block">
          <BaseInput
            id="edit-user-name"
            label="Имя заказчика"
            v-model="orderForm.userName"
            :max-length="15"
          />
          <p class="error">{{ errors.userName }}</p>
        </div>

        <div class="form__block">
          <BaseInput
            class="form__user-address"
            id="edit-address"
            label="Адрес"
            v-model="orderForm.address"
            :max-length="50"
          />
          <p class="error">{{ errors.address }}</p>
        </div>
      </div>

      <div class="form__row">
        <div class="form__block">
          <BaseInput
            id="edit-date"
            type="date"
            label="Дата"
            v-model="orderForm.date"
          />
          <p class="error">{{ errors.date }}</p>
        </div>

        <OrderStatusSelect v-model="orderForm.status" />
        <p class="error">{{ errors.status }}</p>
      </div>

      <div class="form__block">
        <BaseTextarea
          label="Комментарий"
          id="comment"
          v-model="orderForm.comment"
        />
        <p class="error">{{ errors.comment }}</p>
      </div>

      <div class="form__block form__block-indent">
        <BaseInput
          class="form__product"
          id="product"
          label="Название товара"
          v-model="orderForm.product"
          :max-length="20"
        />
        <p class="error">{{ errors.product }}</p>
      </div>

      <div class="form__buttons">
        <BaseButton
          type="button"
          @click="goToOrdersPage"
        >
          Отменить
        </BaseButton>
        <BaseButton type="submit">Сохранить заказ</BaseButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.wrapper {
  width: 700px;
  margin: 0 auto;
}

.title {
  width: 300px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.form__row {
  display: flex;
  margin-bottom: 20px;
}

.form__title {
  margin-bottom: 10px;
  width: 115px;
}

.form__user-data {
  width: 270px;
  height: 80px;
  padding: 10px;
  margin-right: 10px;
}

.form__user-address {
  width: 430px;
}

.input__order {
  margin-bottom: 20px;
}

.form__product {
  width: 100%;
  margin-bottom: 40px;
}

.form__comment {
  width: 500px;
  margin-bottom: 20px;
}

.form__buttons {
  width: 350px;
  display: flex;
  justify-content: space-between;
}

.input__name-product {
  margin-bottom: 40px;
}

.status__select {
  margin-bottom: 20px;
}

.select__model {
  width: 220px;
  height: 35px;
  border: 1px solid gray;
  border-radius: 7px;
}

.error {
  width: 120px;
  min-height: 18px;
  margin: 0 auto;
  color: red;
  font-size: 13px;
}

.form__block {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 10px;
}
</style>
