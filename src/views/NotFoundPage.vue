<script setup lang="ts"></script>

<template>
  <div class="not-found">
    <h1>*404*</h1>
    <RouterLink :to="{ name: 'home' }">На главную страницу</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  width: 200px;
  height: 100px;
  margin: 0 auto;
}
</style>
