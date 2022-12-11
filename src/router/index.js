import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/pages/main-layout.vue'),
    meta: { title: 'main' },
    redirect: '/myHome',
    children: [
      {
        path: '/myHome',
        component: () => import('@/pages/home.vue'),
        meta: { title: '我的主页' }
      },
      {
        path: '/drawingInfo',
        component: () => import('@/pages/myHome/drawingInfo.vue'),
        meta: { title: '画作详情' }
      },
      {
        path: '/selectDrawMode',
        component: () => import('@/pages/myHome/selectDrawMode.vue'),
        meta: { title: '选择作画模式' }
      },
      {
        path: '/drawSubject',
        component: () => import('@/pages/myHome/personalDraw/drawSubject.vue'),
        meta: { title: '个人作画题目' }
      },
      {
        path: '/connectTeam',
        component: () => import('@/pages/myHome/teamDraw/connectTeam.vue'),
        meta: { title: '匹配团队' }
      },
      {
        path: '/businessGalleryHome',
        component: () => import('@/pages/gallery/businessGalleryHome.vue'),
        meta: { title: '公司画廊首页' }
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
