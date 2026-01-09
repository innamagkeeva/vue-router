<script setup lang="ts">
import { ref } from 'vue'
import { ordersApi, type OrderStatus } from '@/api/orders'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'

const router = useRouter()

const userName = ref<string>('')
const address = ref<string>('')
const orderDate = ref<string>('')
const comment = ref<string>('')
const product = ref<string>('')
const orderStatus = ref<OrderStatus>('Новый')

function resetForm() {
  address.value = ''
  comment.value = ''
  orderDate.value = ''
  product.value = ''
  userName.value = ''
  orderStatus.value = 'Новый'
}

async function createOrder() {
  try {
    const response = await ordersApi.create({
      address: address.value,
      comment: comment.value,
      date: Date.now(),
      id: Date.now().toString(),
      orderName: product.value,
      status: orderStatus.value,
      userName: userName.value,
    })
    console.log('Заказ успешно сохранен', response.data)
    resetForm()
  } catch (error) {
    console.log(error)
  }
}

function saveOrder() {
  if (
    userName.value &&
    address.value &&
    orderDate.value &&
    comment.value &&
    product.value &&
    orderStatus.value
  ) {
    createOrder()
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
          id="userName"
          label="Имя заказчика"
          v-model="userName"
          placeholder="Введите имя"
        />

        <BaseInput
          class="form__user-address"
          id="address"
          label="Адрес"
          v-model="address"
          placeholder="Город, улица, дом, кв"
        />
      </div>

      <div class="form__row">
        <BaseInput
          id="date"
          type="date"
          label="Дата"
          v-model="orderDate"
        />

        <div>
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

      <div class="form__user-data">
        <p class="form__title">Комментарий</p>
        <textarea
          class="form__comment"
          name="comment"
          placeholder="Комментарий"
          v-model="comment"
        ></textarea>
      </div>

      <BaseInput
        class="form__product"
        id="product"
        label="Название товара"
        v-model="product"
        placeholder="Начните вводить название товара"
      />

      <div class="form__buttons">
        <BaseButton type="submit">Сохранить заказ</BaseButton>
        <BaseButton
          type="button"
          @click="goToHomePage"
        >
          Отменить
        </BaseButton>
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
  height: 40px;
  border: 1px solid black;
  border-radius: 7px;
}
</style>
