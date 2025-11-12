<script setup lang="ts">
import { registerApi } from '@/api/register'
import { ref } from 'vue'
import { STORAGE_KEYS } from '@/constants/keys.ts'
import { useRouter } from 'vue-router'
import LoginForm from '@/components/LoginForm.vue'
import BaseButton from '@/components/BaseButton.vue'

const router = useRouter()

const login = ref<string>('')
const password = ref<string>('')
const firstName = ref<string>('')
const secondName = ref<string>('')

async function signIn() {
  console.log('Поля формы:', login.value, password.value, firstName.value, secondName.value)
  if (
    login.value.length > 1 &&
    password.value.length > 1 &&
    firstName.value.length > 1 &&
    secondName.value.length > 1
  ) {
    try {
      const response = await registerApi.createRegistration({
        login: login.value,
        password: password.value,
        firstName: firstName.value,
        secondName: secondName.value,
      })
      if (response.status === 201 || response.status === 200) {
        localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token.toString())
        console.log('Регистрация успешна!')
        router.push({ name: 'home' })
      } else {
        console.log('Регистрация не удалась. Попробуйте снова.')
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
      <h1 class="title">Регистрация</h1>
      <form
        @submit.prevent="signIn"
        class="form"
      >
        <LoginForm
          v-model:login="login"
          v-model:password="password"
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
          class="form__input form__input-secondName"
          type="text"
          required
          placeholder="Введите вашу фамилию"
          v-model="secondName"
        />
        <BaseButton type="submit">Зарегистрироваться</BaseButton>
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

.form {
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
  margin-bottom: 20px;
}
</style>
