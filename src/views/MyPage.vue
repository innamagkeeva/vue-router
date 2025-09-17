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
}

.flex__router {
  width: 100%;
  height: 100vh;
}
</style>
