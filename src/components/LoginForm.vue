<script setup lang="ts">
import { ref } from 'vue'

const login = defineModel<string>('login')
const password = defineModel<string>('password')

const showPassword = ref(false)

function togglePassword() {
  showPassword.value = !showPassword.value
}
// функция делает: если showPassword-true - то делает false и наоборот
</script>

<template>
  <div class="form">
    <p class="form__text">Логин</p>
    <input
      class="form__input"
      type="text"
      required
      placeholder="Введите логин"
      v-model="login"
    />

    <p class="form__text">Пароль</p>
    <div class="form__input-password">
      <input
        class="form__input"
        :type="showPassword ? 'text' : 'password'"
        required
        placeholder="Введите пароль"
        v-model="password"
      />
      <span
        @click="togglePassword"
        class="form__password-toggle"
      >
        <img
          v-if="!showPassword"
          class="form__password-img"
          src="@/assets/icons/eye_open.svg"
          alt="eye open"
        />
        <img
          v-else
          class="form__password-img"
          src="@/assets/icons/eye_closed.svg"
          alt="eye closed"
        />
      </span>
    </div>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form__input {
  width: 100%;
  height: 40px;
  padding-left: 10px;
  outline: none;
  border: 1px solid grey;
}

.form__text,
.form__input {
  font-size: 20px;
}

.form__password-img {
  width: 20px;
  height: 20px;
}

.form__input-password {
  position: relative;
  margin-bottom: 20px;
}

.form__input-password .form__input {
  padding-right: 40px; /* место для иконки */
}

.form__password-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
