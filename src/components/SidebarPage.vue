<script setup lang="ts">
import router from '@/router'
function logout() {
  // Перенаправляем на страницу авторизации
  router.push({ name: 'auth' })
  console.log('Вы вышли из системы')
}
</script>

<template>
  <div class="wrapper">
    <h1 class="title">E-Shop Admin</h1>
    <ul>
      <li>
        <RouterLink
          :to="{ name: 'home' }"
          class="routerLink__style"
          active-class="my-active-class"
          >Главная</RouterLink
        >
      </li>
      <li>
        <RouterLink
          :to="{ name: 'register' }"
          class="routerLink__style"
          active-class="my-active-class"
          >Регистрация</RouterLink
        >
      </li>

      <li>
        <RouterLink
          :to="{ name: 'listOrders' }"
          class="routerLink__style"
          active-class="my-active-class"
          >Заказы</RouterLink
        >
      </li>

      <li>
        <RouterLink
          :to="{ name: 'createOrder' }"
          class="routerLink__style"
          active-class="my-active-class"
          >Создать заказ</RouterLink
        >
      </li>

      <li>
        <RouterLink
          :to="{ name: 'user' }"
          class="routerLink__style"
          active-class="my-active-class"
          >Пользователи</RouterLink
        >
      </li>

      <li>
        <RouterLink
          :to="{ name: 'dogs' }"
          class="routerLink__style"
          active-class="my-active-class"
          >Собачки</RouterLink
        >
      </li>

      <li>
        <!-- Вместо  RouterLink используем кнопку-->
        <button
          @click="logout"
          class="logout-btn"
        >
          Выход
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.wrapper {
  width: 230px;
  min-height: 100vh;
  padding-top: 30px;
  padding-left: 10px;
  border-right: 1px solid grey;
}

.title {
  margin-bottom: 20px;
}

.routerLink__style {
  display: block;
  line-height: 40px;
  text-align: center;
  margin-bottom: 20px;
}

.logout-btn {
  display: block;
  padding: 4px;
  margin: 0 auto;
}

.my-active-class {
  color: red;
}
</style>
