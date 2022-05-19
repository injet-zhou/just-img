import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const global: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/upload/Upload.vue'),
  },
]

const routes = global
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
