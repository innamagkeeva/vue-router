import { createWebHistory, createRouter } from "vue-router";

import AuthPage from "@/views/AuthPage.vue";
import CreateOrderPage from "@/views/CreateOrderPage.vue";
import HomePage from "@/views/HomePage.vue";
import ListOrdersPage from "@/views/ListOrdersPage.vue";

const routes = [
  {
    path: '/Auth',
    component: AuthPage
  },
  {
    path: '/home',
    component: HomePage
  },
  {
    path: '/createOrder',
    component: CreateOrderPage
  },
  {
    path: '/listOrders',
    component: ListOrdersPage
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router