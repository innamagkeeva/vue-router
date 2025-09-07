<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'

const userName = ref<string>('')
const password = ref<string>('')

function login() {
  if (userName.value && password.value) {
    router.push('/home')
  } else {
    console.log('Введите пароль')
  }
}
</script>

<template>
  <div class="body">
    <div class="wrapper">
      <h1 class="title">Вход в админку</h1>
      <form class="form">
        <p class="form__text">Логин</p>
        <input
          class="form__input"
          type="text"
          placeholder="Введите логин"
          v-model="userName"
        />
        <p class="form__text">Пароль</p>
        <input
          class="form__input"
          type="password"
          placeholder="Введите пароль"
          v-model="password"
        />
        <button class="form__button form__button-memorization">Запомнить меня</button>
        <button
          @click="login"
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
  /* background-color: gray; */
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
  box-sizing: border-box;
  border: 1px solid rgb(219, 209, 209);
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
}
</style>
