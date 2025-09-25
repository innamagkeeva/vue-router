<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

interface Users {
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

const users = ref<Users[] | null>(null)

async function getUsers() {
  const url = 'https://jsonplaceholder.typicode.com/users'
  try {
    const response = await axios(url)
    users.value = response.data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getUsers()
})
</script>

<template>
  <h1 class="title">Пользователи</h1>
  <table class="user__table">
    <thead>
      <tr>
        <th class="user__name">Название</th>
        <th class="user__user-name">Имя</th>
        <th class="user__email">Эл.адрес</th>
        <th class="user__address">Адрес</th>

        <th class="user__phone">Телефон</th>
        <th class="user__website">Страница</th>
        <th class="user__company">Место работы</th>
      </tr>
    </thead>

    <tbody v-if="users">
      <tr
        v-for="user in users"
        :key="user.id"
        @click="router.push({ name: 'OneUser', params: { id: String(user.id) } })"
      >
        <td class="user__name">{{ user.name }}</td>
        <td class="user__user-name">{{ user.username }}</td>
        <td class="user__email">{{ user.email }}</td>
        <td class="user__address">
          {{ user.address.street }}, {{ user.address.suite }}, {{ user.address.city }},
          {{ user.address.zipcode }}
          <br />
          <small> {{ user.address.geo.lat }}, {{ user.address.geo.lng }} </small>
        </td>

        <td class="user__phone">{{ user.phone }}</td>
        <td class="user__website">{{ user.website }}</td>
        <td class="user__company">
          {{ user.company.name }}, {{ user.company.catchPhrase }}, {{ user.company.bs }}
        </td>
      </tr>
    </tbody>

    <tbody v-else>
      <tr>
        <td
          colspan="7"
          class="spinner__wrapper"
        >
          <div class="spinner"></div>
          <p>Загрузка...</p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<!-- colspan="7" у спинера — количество столбцов в таблице (у меня их 7). -->

<style scoped>
.title {
  text-align: center;
  margin-bottom: 20px;
}

.user__list {
  display: flex;
}

.user__table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.user__table th,
.user__table td {
  padding: 5px;
  text-align: left;
  border: 1px solid gray;
}
.user__name,
.user__user-name,
.user__phone {
  width: 55px;
}
.user__email {
  width: 78px;
}
.user__address {
  width: 120px;
}

.user__website {
  width: 40px;
}
.user__company {
  width: 125px;
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
  border-top-color: blue;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
