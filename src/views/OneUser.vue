<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '@/api'
import BaseButton from '@/components/BaseButton.vue'

const route = useRoute()
const router = useRouter()

interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

const user = ref<User | null>(null)

async function getUser() {
  try {
    const response = await api(`users/${route.params.id}`)
    user.value = response.data
  } catch (error) {
    const err = error as { response?: { status: number } }

    if (err.response?.status === 404) {
      router.push({ name: 'notFound' })
    } else {
      console.error('Ошибка при загрузке пользователя:', error)
    }
  }
}

onMounted(() => {
  getUser()
})

function goToUsersPage() {
  router.push({ name: 'user' })
}
</script>

<template>
  <div class="user">
    <h1 class="title">Пользователь:</h1>

    <div
      v-if="user"
      class="user__business-card"
    >
      <h2 class="margin-10">{{ user?.name }} (@{{ user?.username }})</h2>
      <p><strong>email: </strong>{{ user?.email }}</p>
      <p><strong>Телефон: </strong>{{ user?.phone }}</p>
      <p class="margin-20"><strong>Веб-сайт: </strong>{{ user?.website }}</p>

      <h3 class="margin-10">Адрес:</h3>
      <p>{{ user.address.street }}, {{ user.address.suite }}</p>
      <p class="margin-20">{{ user.address.city }}, {{ user.address.zipcode }}</p>

      <h3 class="margin-10">Компания:</h3>
      <p>
        <strong>{{ user.company.name }}</strong>
      </p>
      <p>{{ user.company.catchPhrase }}</p>
      <p>{{ user.company.bs }}</p>
    </div>

    <div
      v-else
      class="spinner__wrapper"
    >
      <div class="spinner"></div>
      <p>Загрузка...</p>
    </div>
    <BaseButton
      type="button"
      class="back-button"
      @click="goToUsersPage"
      >Назад</BaseButton
    >
    <!-- <RouterLink
      :to="{ name: 'user' }"
      class="back-button"
      >Назад</RouterLink
    > -->
  </div>
</template>

<style scoped>
.title {
  width: 220px;
  margin: 0 auto;
  margin-bottom: 40px;
}

.back-button {
  margin: 0 auto;
}

.user__business-card {
  padding: 10px;
  width: 350px;
  height: 360px;
  background-color: aqua;
  border-radius: 10px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.margin-10 {
  margin-bottom: 10px;
}
.margin-20 {
  margin-bottom: 20px;
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
  border-top-color: blueviolet;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
