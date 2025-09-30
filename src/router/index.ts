import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'my',
    component: () => import('@/views/MyPage.vue'),
    redirect: { name: 'home' },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/HomePage.vue'),
      },
      {
        path: 'createOrder',
        name: 'createOrder',
        component: () => import('@/views/CreateOrderPage.vue'),
      },
      {
        path: 'listOrders',
        name: 'listOrders',
        component: () => import('@/views/OrdersPage.vue'),
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/UsersPage.vue'),
      },
      {
        path: '/user/:id',
        name: 'oneUser',
        component: () => import('@/views/OneUser.vue'),
      },
      {
        path: '/dogs',
        name: 'dogs',
        component: () => import('@/views/DogsPage.vue'),
      },
    ],
  },

  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/AuthPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/NotFoundPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
