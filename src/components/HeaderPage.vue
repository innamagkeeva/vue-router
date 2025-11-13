<script setup lang="ts">
defineProps<{
  firstName?: string
  secondName?: string
}>()
</script>

<template>
  <div class="header">{{ firstName }} {{ secondName }}</div>
</template>

<style>
.header {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  background-color: white;
  position: fixed;
}
</style>
