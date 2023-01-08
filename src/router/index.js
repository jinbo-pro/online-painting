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
        path: '/shoppingMall',
        component: () => import('@/pages/myHome/shoppingMall.vue'),
        meta: { title: '我的商城' }
      },
      // 画廊
      {
        path: '/businessGalleryHome',
        component: () => import('@/pages/gallery/businessGalleryHome.vue'),
        meta: { title: '公司画廊首页' }
      },
      {
        path: '/busDrawingInfo',
        component: () => import('@/pages/gallery/busDrawingInfo.vue'),
        meta: { title: '公司画廊详细' }
      },
      {
        path: '/drawingSearch',
        component: () => import('@/pages/gallery/drawingSearch.vue'),
        meta: { title: '公司画廊搜索' }
      },
      {
        path: '/createDrawingPreview',
        component: () => import('@/pages/gallery/createDrawingPreview.vue'),
        meta: { title: '公司创建画廊' }
      },
      // 站内信
      {
        path: '/siteNoticeManage',
        component: () => import('@/pages/myHome/siteNoticeManage.vue'),
        meta: { title: '站内信管理' }
      }
    ]
  },
  // 我的连接
  {
    path: '/connect',
    component: () => import('@/pages/main-layout.vue'),
    meta: { title: 'connect' },
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: () => import('@/pages/connect/dashboard.vue'),
        meta: { title: '仪表台' }
      },
      {
        path: '/newConnect',
        component: () => import('@/pages/connect/newConnect.vue'),
        meta: { title: '新建连接' }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/pages/sys/login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/firstLogin',
    component: () => import('@/pages/sys/firstLogin.vue'),
    meta: { title: '首次登录' }
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
