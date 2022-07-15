import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const global: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/home.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: {
      name: 'admin_home',
    },
    component: () => import('@/views/admin/admin.vue'),
    children: [
      {
        path: '/admin/home',
        name: 'admin_home',
        component: () => import('@/views/admin/admin-home.vue'),
      },
    ],
  },
]

const routes = global
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = 'just-img'
  next()
})

export default router
