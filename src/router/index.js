import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    meta: { title: 'main' },
    redirect: '/connectDashboard'
  },
  // swag
  {
    path: '/swag',
    component: () => import('@/pages/main-layout.vue'),
    meta: { title: 'swag' },
    redirect: '/shoppingMall',
    children: [
      {
        path: '/shoppingMall',
        component: () => import('@/pages/swag/shoppingMall.vue'),
        meta: { title: '商城' }
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
        path: '/sendBlessing',
        component: () => import('@/pages/greet/sendBlessing.vue'),
        meta: { title: '发送的祝福' }
      },
      {
        path: '/swagBlessing',
        component: () => import('@/pages/greet/sendBlessing.vue'),
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
