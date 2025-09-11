import { createWebHistory, createRouter } from "vue-router";

import AuthPage from "@/views/AuthPage.vue";
import CreateOrderPage from "@/views/CreateOrderPage.vue";
import HomePage from "@/views/HomePage.vue";
import ListOrdersPage from "@/views/ListOrdersPage.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthPage
  },
  
  {
    path: '/createOrder',
    name: 'createOrder',
    component: CreateOrderPage
  },
  {
    path: '/listOrders',
    name: 'listOrders',
    component: ListOrdersPage
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router