import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import StorageManager from '@/utils/storage'

const global: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/upload/upload.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
  },
]

const routes = global
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    console.log('login')
  }
  next()
})

export default router
