<script setup lang="ts">
import Sidebar from '@/components/SidebarPage.vue'
</script>

<template>
  <div class="main">
    <div class="panel">
      <Sidebar />
    </div>
    <div class="list-orders">
      <div class="list-orders__header">
        <p class="list-orders__title">Список заказов</p>
        <button class="list-orders__button">Создать заказ</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
}

.list-orders {
  flex: 1;
  padding: 30px 10px;
}

.list-orders__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  padding: 10px;
}

.list-orders__title {
  display: inline;
  margin-left: 10px;
  font-size: 30px;
}

.list-orders__button {
  width: 110px;
  height: 40px;
  border: none;
  border-radius: 7px;
  background-color: blue;
  color: white;
}
</style>
