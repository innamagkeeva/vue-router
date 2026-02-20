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
  <div class="oneOrder">
    <h1 class="oneOrder__page-title">ВАШ ЗАКАЗ:</h1>

    <div
      v-if="order"
      class="oneOrder__card"
    >
      <h2 class="oneOrder__title">Заказчик: {{ order.userName }}</h2>
      <p class="oneOrder__element"><strong>Товар:</strong> {{ order.orderName }}</p>
      <p class="oneOrder__element"><strong>Адрес:</strong> {{ order.address }}</p>
      <p class="oneOrder__element"><strong>Комментарий:</strong> {{ order.comment }}</p>
      <p class="oneOrder__element"><strong>Статус:</strong> {{ order.status }}</p>
      <p class="oneOrder__element">
        <strong>Дата:</strong> {{ new Date(Number(order.date)).toLocaleDateString('ru-RU') }}
      </p>
    </div>

    <div v-else>
      <p>Загрузка заказа...</p>
    </div>
  </div>
</template>

<style scoped>
.oneOrder__page-title {
  width: 220px;
  margin: 0 auto;
  margin-bottom: 40px;
}

.oneOrder__card {
  padding: 10px;
  width: 350px;
  height: 360px;
  background-color: darkkhaki;
  border-radius: 10px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.oneOrder__title {
  margin-bottom: 30px;
}

.oneOrder__element {
  margin-bottom: 25px;
}
</style>
