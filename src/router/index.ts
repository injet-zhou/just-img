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
      {
        path: '/admin/picture-list',
        name: 'admin_picture_list',
        component: () => import('@/components/admin/picture/picture-list.vue'),
      },
      {
        path: '/admin/user-list',
        name: 'admin_user_list',
        component: () => import('@/components/admin/user/user-list.vue'),
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
