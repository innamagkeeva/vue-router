<script setup lang="ts">
import { ordersApi, type Order } from '@/api/orders'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const order = ref<Order | null>(null)

async function getOrder() {
  try {
    const id = route.params.id as string
    const response = await ordersApi.getOrder(id)
    order.value = response.data
    console.log('Заказ получен:', response.data)
  } catch (error) {
    console.error('Ошибка при получении заказа:', error)
  }
}

onMounted(() => {
  getOrder()
})
</script>

<template>
  <h1 class="title">ВАШ ЗАКАЗ:</h1>

  <div
    v-if="order"
    class="order__card"
  >
    <h2 class="order__title">Заказчик: {{ order.userName }}</h2>
    <p><strong>Товар:</strong> {{ order.orderName }}</p>
    <p><strong>Адрес:</strong> {{ order.address }}</p>
    <p><strong>Комментарий:</strong> {{ order.comment }}</p>
    <p><strong>Статус:</strong> {{ order.status }}</p>
    <p><strong>Дата:</strong> {{ new Date(order.date).toLocaleDateString() }}</p>
  </div>

  <div v-else>
    <p>Загрузка заказа...</p>
  </div>
</template>

<style scoped>
.title {
  width: 220px;
  margin: 0 auto;
  margin-bottom: 40px;
}

.order__card {
  padding: 10px;
  width: 350px;
  height: 360px;
  background-color: darkkhaki;
  border-radius: 10px;
  margin: 0 auto;
  margin-bottom: 20px;
}
</style>
