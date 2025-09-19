<script setup lang="ts">
import SidebarPage from '@/components/SidebarPage.vue'
</script>

<template>
  <div class="flex">
    <div class="flex__sidebar">
      <SidebarPage />
    </div>
    <div class="flex__router">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  min-height: 100vh;
}

.flex__router {
  flex: 1;
  padding: 30px 10px;
}
</style>
