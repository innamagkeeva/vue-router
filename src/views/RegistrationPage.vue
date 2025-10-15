<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'

const login = ref<string>('')
const password = ref<string>('')
const firstName = ref<string>('')
const secondName = ref<string>('')

function signIn() {
  if (
    login.value.length > 1 &&
    password.value.length > 1 &&
    firstName.value.length > 1 &&
    secondName.value.length > 1
  ) {
    router.push({ name: 'home' })
  } else {
    console.log('Не все данные ввели')
  }
}
</script>

<template>
  <div class="body">
    <div class="wrapper">
      <h1 class="title">Регистрация</h1>
      <form
        @submit.prevent="signIn"
        class="form"
      >
        <p class="form__text">Логин</p>
        <input
          class="form__input"
          type="text"
          required
          placeholder="Придумайте логин"
          v-model="login"
        />
        <p class="form__text">Пароль</p>
        <input
          class="form__input"
          type="password"
          required
          placeholder="Придумайте пароль"
          v-model="password"
        />
        <p class="form__text">Ваше имя</p>
        <input
          class="form__input"
          type="text"
          required
          placeholder="Введите ваше имя"
          v-model="firstName"
        />
        <p class="form__text">Ваша фамилия</p>
        <input
          class="form__input"
          type="text"
          required
          placeholder="Введите вашу фамилию"
          v-model="secondName"
        />
        <button
          class="form__button"
          type="submit"
        >
          Зарегестрироваться
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.body {
  padding-top: 60px;
}

.wrapper {
  width: 500px;
  height: 520px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  margin-bottom: 20px;
}

.form__text {
  font-size: 18px;
  margin-bottom: 15px;
}

.form__input {
  width: 100%;
  height: 40px;
  padding-left: 10px;
  outline: none;
  border: 1px solid grey;
  margin-bottom: 15px;
}

.form__button {
  padding: 10px;
  background-color: blueviolet;
  color: white;
  border: none;
  border-radius: 7px;
}
</style>
