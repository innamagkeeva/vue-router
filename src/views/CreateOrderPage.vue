<script setup lang="ts">
import { ref } from 'vue'
import { ordersApi, type OrderStatus } from '@/api/orders'

function resetForm() {
  address.value = ''
  comment.value = ''
  orderDate.value = ''
  product.value = ''
  userName.value = ''
}

async function createOrder() {
  try {
    const response = await ordersApi.create({
      address: address.value,
      comment: comment.value,
      orderDate: Date.now(),
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

const userName = ref<string>('')
const address = ref<string>('')
const orderDate = ref<string>('')
const comment = ref<string>('')
const product = ref<string>('')
const orderStatus = ref<OrderStatus>('Новый')

function saveOrder() {
  createOrder()
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
        <div class="form__user-data">
          <p class="form__title">Имя заказчика</p>
          <input
            class="input__name"
            type="text"
            name="name"
            placeholder="Например: Иван Петров"
            v-model="userName"
          />
        </div>

        <div class="form__user-data form__user-address">
          <p class="form__title">Адрес</p>
          <input
            class="input__name"
            type="text"
            name="name"
            placeholder="Город, улица, дом, кв"
            v-model="address"
          />
        </div>
      </div>

      <div class="form__row">
        <div class="form__user-data">
          <p class="form__title">Дата</p>
          <input
            class="input__name"
            type="date"
            placeholder="введите дату"
            v-model="orderDate"
          />
        </div>

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
            <option>Завершен</option>
            <option>Отменен</option>
          </select>
        </div>
      </div>

      <p class="form__title">Комментарий</p>
      <textarea
        class="form__comment"
        name="comment"
        placeholder="Комментарий"
        v-model="comment"
      ></textarea>

      <p class="form__title">Название товара</p>
      <input
        class="input__name input__name-product"
        type="text"
        name="product"
        placeholder="Начните вводить название"
        v-model="product"
      />
      <div class="form__button">
        <button
          type="submit"
          class="form__btn form__button-save"
        >
          сохранить заказ
        </button>
        <RouterLink
          class="form__btn form__button-cancel"
          :to="{ name: 'home' }"
          >Отменить</RouterLink
        >
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

.form__user-data {
  width: 270px;
  height: 80px;
  padding: 10px;
  margin-right: 10px;
}

.form__user-address {
  width: 430px;
}

.input__name {
  margin-bottom: 20px;
}

.form__comment {
  width: 500px;
  margin-bottom: 20px;
}

.form__button {
  width: 350px;
  height: 40px;

  display: flex;
}

.form__btn {
  width: 120px;
  height: 40px;
  border-radius: 10px;
}

.form__button-save {
  background-color: blue;
  color: white;
  margin-right: 10px;
}

.form__button-cancel {
  border: 1px solid black;
  text-align: center;
  line-height: 40px;
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

<!-- // const router = useRouter()

//   if (userName.value && address.value && data.value && comment.value && product.value) {
//     router.push({ name: 'listOrders' })
//   } else {
//     console.log('Введите все данные')
//   }
//  -->
<!-- <div class="form__user-data">
          <p class="form__title">Статус</p>
          <input
            class="input__name"
            type="text"
            name="status"
            placeholder="Новый"
            v-model="status"
          />
        </div> -->
