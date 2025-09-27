<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '@/api'

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
</script>

<template>
  <h1 class="title">Пользователь:</h1>
  <RouterLink
    :to="{ name: 'user' }"
    class="back-button"
    >Назад</RouterLink
  >
  {{ user }}
</template>

<style scoped>
.title {
  margin-bottom: 20px;
}

.back-button {
  display: block;
  width: 55px;
  margin-bottom: 30px;
  padding: 6px;
  border: none;
  border-radius: 7px;
  background-color: blueviolet;
  color: white;
}
</style>
