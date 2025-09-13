import { createWebHistory, createRouter } from "vue-router";



const routes = [
  
  { 
    path: '/',
    name: 'my',
    component: () => import ("@/views/MyPage.vue"),
    redirect: {name: 'home'},
    children: [
      {
    path: 'home',
    name: 'home',
    component: () => import ("@/views/HomePage.vue")
  },
  {
    path: 'createOrder',
    name: 'createOrder',
    component: () => import ("@/views/CreateOrderPage.vue")
  },
  {
    path: 'listOrders',
    name: 'listOrders',
    component: () => import ("@/views/ListOrdersPage.vue")
  },
  ]
  },
  
  {
    path: '/auth',
    name: 'auth',
    component: () => import ("@/views/AuthPage.vue")
  },
  {
    path:  '/:pathMatch(.*)*',
    name: 'не найдено',
    component: () => import ("@/views/NotFoundPage.vue")
  },
 ]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router