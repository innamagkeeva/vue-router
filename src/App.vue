<script setup lang="ts">
import { ref } from 'vue'
import AuthPage from '@/views/AuthPage.vue'
import SidebarPage from '@/views/HomePage.vue'
import ListOrders from '@/views/ListOrders.vue'
import CreateOrder from './views/CreateOrderPage.vue'

const currentPage = ref<'auth' | 'sidebar' | 'listOrders' | 'CreateOrder'>('auth')
</script>

<template>
  <header>
    <button @click="currentPage = 'auth'">Auth</button> |
    <button @click="currentPage = 'sidebar'">Sidebar</button> |
    <button @click="currentPage = 'listOrders'">listOrders</button> |
    <button @click="currentPage = 'CreateOrder'">CreateOrder</button> /
    {{ currentPage }}
  </header>
  <AuthPage v-if="currentPage === 'auth'" />
  <SidebarPage v-if="currentPage === 'sidebar'" />
  <ListOrders v-if="currentPage === 'listOrders'" />
  <CreateOrder v-if="currentPage === 'CreateOrder'" />
</template>
