<script setup lang="ts">
import { ref } from 'vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const isOpen = ref(false)

function openConfirmDialog() {
  isOpen.value = true
}
</script>

<template>
  <div class="pageHome">
    <h1 class="pageHome__title">Главная страница</h1>
    <button @click="openConfirmDialog">Открыть окно</button>
    <ConfirmDialog v-model="isOpen" />
  </div>
</template>

<style scoped>
.pageHome {
  flex: 1;
  padding-top: 40px;
}

.pageHome__title {
  width: 300px;
  margin: 0 auto;
}
</style>
