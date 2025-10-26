<script setup lang="ts">
const login = defineModel<string>('login')
const password = defineModel<string>('password')
</script>

<template>
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
</template>

<style scoped>
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
  margin-bottom: 20px;
}
</style>
