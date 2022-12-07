import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/pages/home.vue'),
    meta: { title: '首页' }
  },
  {
    path: '*',
    redirect: '/home'
  }
]

const router = new Router({
  routes: constantRoutes
})

export default router
