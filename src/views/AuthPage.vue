<script setup lang="ts">
import { ref } from 'vue'
import { authApi } from '@/api/auth'
import LoginForm from '@/components/LoginForm.vue'
import BaseButton from '@/components/BaseButton.vue'
import router from '@/router'

const login = ref<string>('')
const password = ref<string>('')

async function onSignIn() {
  console.log('Поля формы:', login.value, password.value)
  if (login.value.length > 1 && password.value.length > 1) {
    try {
      const response = await authApi.signIn({
        login: login.value,
        password: password.value,
      })
      if (response.status === 200) {
        // Сохраняем токен в localStorage
        localStorage.setItem('token', response.data.token)
        // когда авторизация успешна - переходим на главную страницу.
        router.push({ name: 'home' })
      } else {
        // если login.value.length > 1 && password.value.length > 1-то выполняется запрос, А ИНАЧЕ:
        console.log('Введите логин/пароль правильно. Символов должно быть больше 1.')
      }
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<template>
  <div class="body">
    <div class="wrapper">
      <h1 class="title">Вход в админку</h1>
      <form
        class="form"
        @submit.prevent="onSignIn"
      >
        <LoginForm
          v-model:login="login"
          v-model:password="password"
        />
        <BaseButton> Войти</BaseButton>
      </form>
    </div>
  </div>
</template>

<style scoped>
.body {
  padding-top: 100px;
}

.wrapper {
  width: 500px;
  height: 500px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  margin-bottom: 30px;
}
</style>
