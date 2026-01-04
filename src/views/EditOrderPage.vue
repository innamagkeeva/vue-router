<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ordersApi, type OrderStatus } from '@/api/orders'
import BaseButton from '@/components/BaseButton.vue'

const route = useRoute()
const router = useRouter()

const id = route.params.id as string

const userName = ref<string>('')
const address = ref<string>('')
const comment = ref<string>('')
const product = ref<string>('')
const orderDate = ref<string>('')
const orderStatus = ref<OrderStatus>('Новый')

async function getOrder() {
  try {
    const response = await ordersApi.getOrder(id)
    const order = response.data

    userName.value = order.userName
    address.value = order.address
    comment.value = order.comment
    product.value = order.orderName
  } catch (error) {
    console.log(error)
  }
}

async function saveOrder() {
  await ordersApi.update(id, {
    id,
    userName: userName.value,
    address: address.value,
    comment: comment.value,
    orderName: product.value,
    status: orderStatus.value,
    date: Date.now(),
  })
  router.push({ name: 'Orders' })
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
        <div class="form__user-data">
          <p class="form__title">Имя заказчика</p>
          <input
            class="input__order"
            type="text"
            v-model="userName"
          />
        </div>
        <div class="form__user-data form__user-address">
          <p class="form__title">Адрес</p>
          <input
            class="input__order"
            type="text"
            v-model="address"
          />
        </div>
      </div>

      <div class="form__row">
        <div class="form__user-data">
          <p class="form__title">Дата</p>
          <input
            class="input__order"
            type="date"
            v-model="orderDate"
          />
        </div>

        <div class="form__user-data">
          <div class="status__select">
            Выбран статус: <strong>{{ orderStatus || 'Не выбран' }}</strong>
          </div>
          <select
            class="select__model"
            v-model="orderStatus"
          >
            <option
              disabled
              value=""
            >
              Выберите один из вариантов
            </option>
            <option>Новый</option>
            <option>В процессе</option>
            <option>Выполнен</option>
            <option>Отменен</option>
          </select>
        </div>
      </div>

      <p class="form__title">Комментарий</p>
      <textarea
        class="form__comment"
        v-model="comment"
      ></textarea>

      <p class="form__title">Название товара</p>
      <input
        class="input__order"
        type="text"
        v-model="product"
      />
      <BaseButton type="submit">Сохранить заказ</BaseButton>
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
  height: 40px;
  border: 1px solid black;
  border-radius: 7px;
}
</style>
