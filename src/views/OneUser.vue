<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

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
    const response = await axios(`https://jsonplaceholder.typicode.com/users/${route.params.id}`)
    user.value = response.data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getUser()
  console.log(route.params.id)
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
  margin-bottom: 30px;
  padding: 6px;
  width: 55px;
  border: none;
  border-radius: 7px;
  background-color: blueviolet;
  color: white;
}
</style>
