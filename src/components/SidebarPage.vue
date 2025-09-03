<script setup lang="ts"></script>

<template>
  <div class="wrapper">
    <h1 class="title">E-Shop Admin</h1>
    <button class="button">Главная</button>
    <button class="button">Заказы</button>
    <button class="button">Создать заказ</button>
    <button class="button">Выход</button>
  </div>
</template>

<style scoped>
.wrapper {
  width: 230px;
  height: 100vh;
  padding-top: 30px;
  padding-left: 10px;
  box-sizing: border-box;
}

.button {
  display: block;
  width: 100%;
  height: 40px;
  margin-bottom: 15px;
  border: none;
  background-color: white;
  cursor: pointer;
}
</style>
