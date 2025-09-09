<script setup lang="ts"></script>

<template>
  <header>
    <RouterLink to="/Auth">Авторизация</RouterLink> | <RouterLink to="/home">Главная</RouterLink>|
    <RouterLink to="/listOrders">Заказы</RouterLink> |
    <RouterLink to="/CreateOrder">Создать заказы</RouterLink>
  </header>

  <RouterView />
</template>
