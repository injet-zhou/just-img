import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const global: Array<RouteRecordRaw> = [
  { path: '/', name: 'home', component: () => import('@/views/home/Home.vue') },
]

const routes = global
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
