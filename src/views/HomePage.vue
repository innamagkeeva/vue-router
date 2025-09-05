<script setup lang="ts">
import Sidebar from '@/components/SidebarPage.vue'
</script>

<template>
  <div class="main">
    <div class="panel">
      <Sidebar />
    </div>
    <div class="pageHome">
      <h1 class="pageHome__title">Главная страница</h1>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
}
/* ??? как лучше назвать этот класс? если называю wrapper - то почему-то путает стили из другого компонента, хотя на стилях стоит scoped  */
.pageHome {
  flex: 1;
  padding-top: 40px;
  /* box-sizing: border-box; */
}

.pageHome__title {
  width: 300px;
  margin: 0 auto;
}
</style>

<!-- на этом этапе надо разобраться почему боковой скролл..  -->
