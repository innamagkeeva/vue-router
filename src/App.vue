<script setup lang="ts">
import { ref } from 'vue'
import AuthPage from '@/views/AuthPage.vue'
import SidebarPage from '@/views/HomePage.vue'

const currentPage = ref<'auth' | 'sidebar'>('auth')
</script>

<template>
  <header>
    <button @click="currentPage = 'auth'">Auth</button>
    <button @click="currentPage = 'sidebar'">Sidebar</button>
    {{ currentPage }}
  </header>
  <AuthPage v-if="currentPage === 'auth'" />
  <SidebarPage v-if="currentPage === 'sidebar'" />
</template>
