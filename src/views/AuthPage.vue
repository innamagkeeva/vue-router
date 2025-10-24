<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { authApi } from '@/api/auth'
import type { AxiosError } from 'axios'

const login = ref<string>('')
const password = ref<string>('')

async function onSignIn() {
  if (login.value.length > 1 && password.value.length > 1) {
    try {
      const response = await authApi.signIn({
        login: login.value,
        password: password.value,
      })
      if (response.status === 200) {
        // Сохраняем токен в localStorage
        localStorage.setItem('token', response.data.token)
        console.log('Авторизация успешна!')
        // когда авторизация успешна - переходим на главную страницу.
        router.push({ name: 'home' })
      } else {
        // если login.value.length > 1 && password.value.length > 1-то выполняется запрос, А ИНАЧЕ:
        console.log('Введите логин/пароль правильно. Символов должно быть больше 1.')
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>
      if (err.response) {
        console.log(`Ошибка: ${err.response.data.message} || 'Неверный логин или пароль' `)
      } else {
        console.log('Ошибка подключения к серверу')
      }
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
        <p class="form__text">Логин</p>
        <input
          class="form__input"
          type="text"
          required
          placeholder="Введите логин"
          v-model="login"
        />
        <p class="form__text">Пароль</p>
        <input
          class="form__input"
          type="password"
          required
          placeholder="Введите пароль"
          v-model="password"
        />
        <button class="form__button form__button-memorization">Запомнить меня</button>
        <button
          type="submit"
          class="form__button form__button-entrance"
        >
          Войти
        </button>
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

.form__text,
.form__input {
  font-size: 20px;
  margin-bottom: 20px;
}

.form__input {
  width: 100%;
  height: 40px;
  padding-left: 10px;
  outline: none;
  border: 1px solid grey;
}

.form__button {
  width: 150px;
  display: block;
  font-size: 15px;
  margin-bottom: 20px;
}

.form__button-memorization {
  height: 35px;
}

.form__button-entrance {
  height: 45px;
  border: none;
  border-radius: 10px;
  background-color: blue;
  color: white;
  font-size: 15px;
}

.title {
  margin-bottom: 30px;
}
</style>

<!-- Токен авторизации — это ключ (цифровой или физический), который используется для подтверждения личности пользователя и предоставления доступа к ресурсам без необходимости каждый раз вводить логин и пароль. Он может быть в виде программного файла (например, JWT) или физического устройства (например, USB-ключа), а также использоваться как дополнительный фактор аутентификации.  -->

<!--  пока токен добавлен в localStorage - пользователь будет авторизован, и вход не будет требоваться = открывая сайт каждый раз будет попадать на свою страницу с доступом.  там делаю кнопку выхода из системы, то есть токен удаляется из  localStorage и теперь без новой авторизации на свою страницу не попасть.-->
