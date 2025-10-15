<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'

const login = ref<string>('')
const password = ref<string>('')

function signIn() {
  if (login.value.length > 1 && password.value.length > 1) {
    router.push({ name: 'home' })
  } else {
    console.log('Введите пароль правильно. Символов должно быть больше 5.')
  }
}
</script>

<template>
  <div class="body">
    <div class="wrapper">
      <h1 class="title">Вход в админку</h1>
      <form
        class="form"
        @submit.prevent="signIn"
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
