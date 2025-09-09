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

.pageHome {
  flex: 1;
  padding-top: 40px;
}

.pageHome__title {
  width: 300px;
  margin: 0 auto;
}
</style>
