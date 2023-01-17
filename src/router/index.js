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
      }
    ]
  },
  // 站内信
  {
    path: '/notificationInbox',
    component: () => import('@/pages/main-layout.vue'),
    meta: { title: 'notificationInbox' },
    redirect: '/inbox',
    children: [
      {
        path: '/inbox',
        component: () => import('@/pages/notificationInbox/inbox.vue'),
        meta: { title: '查看站内信' }
      }
    ]
  },
  // 账户设置
  {
    path: '/profile',
    component: () => import('@/pages/main-layout.vue'),
    meta: { title: 'profile' },
    redirect: '/profileSettings',
    children: [
      {
        path: '/profileSettings',
        component: () => import('@/pages/profile/profileSettings.vue'),
        meta: { title: '账户设置' }
      },
      {
        path: '/myOrders',
        component: () => import('@/pages/profile/myOrders.vue'),
        meta: { title: '我的订单' }
      }
    ]
  },
  // 我的连接
  {
    path: '/connect',
    component: () => import('@/pages/main-layout.vue'),
    meta: { title: 'connect' },
    redirect: '/connectDashboard',
    children: [
      {
        path: '/connectDashboard',
        component: () => import('@/pages/connect/dashboard.vue'),
        meta: { title: '仪表台' }
      },
      {
        path: '/moreConnect',
        component: () => import('@/pages/connect/moreConnect.vue'),
        meta: { title: '更多连接' }
      },
      {
        path: '/myConnect',
        component: () => import('@/pages/connect/myConnect.vue'),
        meta: { title: '我的连接' }
      },
      {
        path: '/createNewPainting',
        component: () => import('@/pages/connect/createNewPainting.vue'),
        meta: { title: '新建画作' }
      },
      {
        path: '/editDraftPainting',
        component: () => import('@/pages/connect/editDraftPainting.vue'),
        meta: { title: '编辑草稿' }
      },
      {
        path: '/drawDoneDiscuss',
        component: () => import('@/pages/connect/drawDoneDiscuss.vue'),
        meta: { title: '作画完成交流' }
      }
    ]
  },
  // 打招呼
  {
    path: '/greet',
    component: () => import('@/pages/main-layout.vue'),
    meta: { title: 'greet' },
    redirect: '/greetDashboard',
    children: [
      {
        path: '/greetDashboard',
        component: () => import('@/pages/greet/greetDashboard.vue'),
        meta: { title: '打招呼首页' }
      },
      {
        path: '/receivedBlessing',
        component: () => import('@/pages/greet/receivedBlessing.vue'),
        meta: { title: '收到的祝福' }
      },
      {
        path: '/swagBlessing',
        component: () => import('@/pages/greet/receivedBlessing.vue'),
        meta: { title: '赠送的祝福' }
      },
      {
        path: '/detailDrawingPage',
        component: () => import('@/pages/greet/detailDrawingPage.vue'),
        meta: { title: '画作详情' }
      },
      {
        path: '/individualGreetComplete',
        component: () => import('@/pages/greet/individualGreetComplete.vue'),
        meta: { title: '新建祝福' }
      },
      {
        path: '/individualGreetMode',
        component: () => import('@/pages/greet/individualGreetMode.vue'),
        meta: { title: '个人祝福' }
      },
      {
        path: '/drawingBoard',
        component: () => import('@/pages/greet/drawingBoard.vue'),
        meta: { title: '新建祝福画板' }
      }
    ]
  },
  // 话题
  {
    path: '/reflect',
    component: () => import('@/pages/main-layout.vue'),
    meta: { title: 'greet' },
    redirect: '/myReflections',
    children: [
      {
        path: '/myReflections',
        component: () => import('@/pages/reflect/myReflections.vue'),
        meta: { title: '我的话题' }
      },
      {
        path: '/selectReflectionMode',
        component: () => import('@/pages/reflect/selectReflectionMode.vue'),
        meta: { title: '选择创建模式' }
      },
      {
        path: '/createNewReflection',
        component: () => import('@/pages/reflect/createNewReflection.vue'),
        meta: { title: '新建话题' }
      },
      {
        path: '/reflectBoard',
        component: () => import('@/pages/reflect/reflectBoard.vue'),
        meta: { title: '话题创作' }
      },
      {
        path: '/reflectComplete',
        component: () => import('@/pages/reflect/reflectComplete.vue'),
        meta: { title: '话题创作完成' }
      }
    ]
  },
  // 画廊
  {
    path: '/gallery',
    component: () => import('@/pages/main-layout.vue'),
    meta: { title: 'gallery' },
    redirect: '/allGalleries',
    children: [
      {
        path: '/allGalleries',
        component: () => import('@/pages/gallery/allGalleries.vue'),
        meta: { title: '画廊一览' }
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
