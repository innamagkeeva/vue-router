<script setup lang="ts"></script>

<template>
  <div class="wrapper">
    <h1 class="title">E-Shop Admin</h1>
    <ul>
      <li>
        <RouterLink
          :to="{ name: 'home' }"
          class="routerLink__style"
          >Главная</RouterLink
        >
      </li>
      <li>
        <RouterLink
          :to="{ name: 'listOrders' }"
          class="routerLink__style"
          >Заказы</RouterLink
        >
      </li>
      <li>
        <RouterLink
          :to="{ name: 'createOrder' }"
          class="routerLink__style"
          >Создать заказ</RouterLink
        >
      </li>
      <li>
        <RouterLink
          :to="{ name: 'auth' }"
          class="routerLink__style"
          >Выход</RouterLink
        >
      </li>
    </ul>
  </div>
</template>

<style scoped>
.wrapper {
  width: 230px;
  height: 100vh;
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
</style>
