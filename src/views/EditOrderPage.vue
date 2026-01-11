<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ordersApi, orderStatuses, type OrderStatus } from '@/api/orders'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'

const route = useRoute()
const router = useRouter()

const id = route.params.id as string

const orderForm = reactive({
  userName: '',
  address: '',
  comment: '',
  product: '',
  orderDate: '',
  orderStatus: 'new' as OrderStatus,
})

async function getOrder() {
  try {
    const response = await ordersApi.getOrder(id)
    const order = response.data

    orderForm.userName = order.userName
    orderForm.address = order.address
    orderForm.comment = order.comment
    orderForm.product = order.orderName
    orderForm.orderStatus = order.status
  } catch (error) {
    console.log(error)
  }
}

async function saveOrder() {
  try {
    const response = await ordersApi.update(id, {
      // переменную можно не использовать, сразу написать await ordersApi.update.... если не нужен консольЛог
      id,
      userName: orderForm.userName,
      address: orderForm.address,
      comment: orderForm.comment,
      orderName: orderForm.product,
      status: orderForm.orderStatus,
      date: Date.now(),
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
        <BaseInput
          id="edit-user-name"
          label="Имя заказчика"
          v-model="orderForm.userName"
        />

        <BaseInput
          class="form__user-address"
          id="edit-address"
          label="Адрес"
          v-model="orderForm.address"
        />
      </div>

      <div class="form__row">
        <BaseInput
          id="edit-date"
          type="date"
          label="Дата"
          v-model="orderForm.orderDate"
        />

        <div>
          <div class="status__select">
            Выбран статус:
            <strong>{{
              orderStatuses.find((s) => s.value === orderForm.orderStatus)?.label || 'Не выбран'
            }}</strong>
          </div>

          <select
            class="select__model"
            v-model="orderForm.orderStatus"
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

      <p class="form__title">Комментарий</p>
      <textarea
        class="form__comment"
        v-model="orderForm.comment"
      ></textarea>

      <BaseInput
        class="form__product"
        id="product"
        label="Название товара"
        v-model="orderForm.product"
      />

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
</style>
