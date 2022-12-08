import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/pages/main-layout.vue'),
    meta: { title: 'main' },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/pages/home.vue'),
        meta: { title: '我的主页' }
      },
      {
        path: '/drawingInfo',
        component: () => import('@/pages/drawingInfo.vue'),
        meta: { title: '画作详情' }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/pages/sys/login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '*',
    component: () => import('@/pages/sys/error-page/404.vue')
  }
]

const router = new Router({
  routes: constantRoutes
})

export default router
