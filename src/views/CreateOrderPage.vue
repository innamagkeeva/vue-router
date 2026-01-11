<script setup lang="ts">
import { reactive } from 'vue'
import { ordersApi, orderStatuses, type OrderStatus } from '@/api/orders'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'

const router = useRouter()

const orderForm = reactive({
  userName: '',
  address: '',
  date: '',
  comment: '',
  product: '',
  status: '' as OrderStatus | '',
})

function resetForm() {
  orderForm.address = ''
  orderForm.comment = ''
  orderForm.date = ''
  orderForm.product = ''
  orderForm.userName = ''
  orderForm.status = ''
}

async function createOrder(status: OrderStatus) {
  try {
    const response = await ordersApi.create({
      address: orderForm.address,
      comment: orderForm.comment,
      date: new Date(orderForm.date).getTime(),
      id: Date.now().toString(),
      orderName: orderForm.product,
      status,
      userName: orderForm.userName,
    })
    console.log('Заказ успешно сохранен', response.data)
    resetForm()
  } catch (error) {
    console.log(error)
  }
}

function saveOrder() {
  if (
    orderForm.userName &&
    orderForm.address &&
    orderForm.date &&
    orderForm.comment &&
    orderForm.product &&
    orderForm.status !== ''
  ) {
    const status: OrderStatus = orderForm.status
    createOrder(status)
  } else {
    console.log('Введите все данные')
  }
}

function goToHomePage() {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="wrapper">
    <h1 class="title">Создать заказ</h1>
    <form
      class="form"
      @submit.prevent="saveOrder"
    >
      <div class="form__row">
        <BaseInput
          id="user-name"
          label="Имя заказчика"
          v-model="orderForm.userName"
          placeholder="Введите имя"
        />

        <BaseInput
          class="form__user-address"
          id="address"
          label="Адрес"
          v-model="orderForm.address"
          placeholder="Город, улица, дом, кв"
        />
      </div>

      <div class="form__row">
        <BaseInput
          id="date"
          type="date"
          label="Дата"
          v-model="orderForm.date"
        />

        <div>
          <div class="status__select">
            Выбран статус:
            <strong>{{
              orderStatuses.find((s) => s.value === orderForm.status)?.label || 'Не выбран'
            }}</strong>
          </div>

          <select
            class="select__model"
            v-model="orderForm.status"
          >
            <option
              disabled
              value=""
            >
              Выберите один из вариантов
            </option>

            <option
              v-for="status in orderStatuses"
              :key="status.value"
              :value="status.value"
            >
              {{ status.label }}
            </option>
          </select>
        </div>
      </div>

      <div class="form__user-data">
        <p class="form__title">Комментарий</p>
        <textarea
          class="form__comment"
          name="comment"
          placeholder="Комментарий"
          v-model="orderForm.comment"
        ></textarea>
      </div>

      <BaseInput
        class="form__product"
        id="product"
        label="Название товара"
        v-model="orderForm.product"
        placeholder="Начните вводить название товара"
      />

      <div class="form__buttons">
        <BaseButton
          type="button"
          @click="goToHomePage"
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
  width: 200px;
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

.form__user-address {
  width: 430px;
}

.input__order {
  margin-bottom: 20px;
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

.form__product {
  width: 100%;
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
</style>
