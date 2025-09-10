<script setup lang="ts"></script>

<template>
  <header>
    <RouterLink :to="{ name: 'auth' }">Авторизация</RouterLink> |
    <RouterLink :to="{ name: 'home' }">Главная</RouterLink>|
    <RouterLink :to="{ name: 'listOrders' }">Заказы</RouterLink> |
    <RouterLink :to="{ name: 'createOrder' }">Создать заказы</RouterLink>
  </header>

  <RouterView />
</template>
