<script setup lang="ts"></script>

<template>
  <header>
    <RouterLink to="/auth">Auth</RouterLink> | <RouterLink to="/home">Home </RouterLink>|
    <RouterLink to="/listOrders">ListOrders</RouterLink> |
    <RouterLink to="/CreateOrder">CreateOrder</RouterLink>
  </header>

  <RouterView />
</template>
