import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    meta: { title: 'main' },
    redirect: '/greetDashboard'
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
        meta: { title: 'Swag' }
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
        meta: { title: 'inbox' }
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
        meta: { title: 'Profile Settings' }
      },
      {
        path: '/myOrders',
        component: () => import('@/pages/profile/myOrders.vue'),
        meta: { title: 'My Orders' }
      }
    ]
  },
  // 我的连接
  {
    path: '/connect',
    component: () => import('@/pages/main-layout.vue'),
    meta: { title: 'Connect' },
    redirect: '/connectDashboard',
    children: [
      {
        path: '/connectDashboard',
        component: () => import('@/pages/connect/dashboard.vue'),
        meta: { title: 'Dashboard' }
      },
      {
        path: '/moreConnect',
        component: () => import('@/pages/connect/moreConnect.vue'),
        meta: { title: 'More Connect' }
      },
      {
        path: '/myConnect',
        component: () => import('@/pages/connect/myConnect.vue'),
        meta: { title: 'My Connect' }
      },
      {
        path: '/createNewPainting',
        component: () => import('@/pages/connect/createNewPainting.vue'),
        meta: { title: 'New Connect' }
      },
      {
        path: '/editDraftPainting',
        component: () => import('@/pages/connect/editDraftPainting.vue'),
        meta: { title: 'Mission Complete' }
      },
      {
        path: '/drawDoneDiscuss',
        component: () => import('@/pages/connect/drawDoneDiscuss.vue'),
        meta: { title: 'Mission Complete' }
      }
    ]
  },
  // 打招呼
  {
    path: '/greet',
    component: () => import('@/pages/main-layout.vue'),
    meta: { title: 'Greet' },
    redirect: '/greetDashboard',
    children: [
      {
        path: '/greetDashboard',
        component: () => import('@/pages/greet/greetDashboard.vue'),
        meta: { title: 'Dashboard' }
      },
      {
        path: '/receivedBlessing',
        component: () => import('@/pages/greet/receivedBlessing.vue'),
        meta: { title: 'Received' }
      },
      {
        path: '/sendBlessing',
        component: () => import('@/pages/greet/receivedBlessing.vue'),
        meta: { title: 'Sent' }
      },
      {
        path: '/swagBlessing',
        component: () => import('@/pages/greet/swagBlessing.vue'),
        meta: { title: 'Swag' }
      },
      {
        path: '/detailDrawingPage',
        component: () => import('@/pages/greet/detailDrawingPage.vue'),
        meta: { title: 'Detail Drawing Page' }
      },
      {
        path: '/individualGreetComplete',
        component: () => import('@/pages/greet/individualGreetComplete.vue'),
        meta: { title: 'New Individual' }
      },
      {
        path: '/individualGreetMode',
        component: () => import('@/pages/greet/individualGreetMode.vue'),
        meta: { title: 'Individual' }
      },
      {
        path: '/drawingBoard',
        component: () => import('@/pages/greet/drawingBoard.vue'),
        meta: { title: 'Individual' }
      }
    ]
  },
  // 话题
  {
    path: '/reflect',
    component: () => import('@/pages/main-layout.vue'),
    meta: { title: 'Reflect' },
    redirect: '/myReflections',
    children: [
      {
        path: '/myReflections',
        component: () => import('@/pages/reflect/myReflections.vue'),
        meta: { title: 'My Reflections' }
      },
      {
        path: '/selectReflectionMode',
        component: () => import('@/pages/reflect/selectReflectionMode.vue'),
        meta: { title: 'Create New' }
      },
      {
        path: '/createNewReflection',
        component: () => import('@/pages/reflect/createNewReflection.vue'),
        meta: { title: 'Create New' }
      },
      {
        path: '/reflectBoard',
        component: () => import('@/pages/reflect/reflectBoard.vue'),
        meta: { title: 'Create' }
      },
      {
        path: '/reflectComplete',
        component: () => import('@/pages/reflect/reflectComplete.vue'),
        meta: { title: 'Complete' }
      }
    ]
  },
  // 画廊
  {
    path: '/gallery',
    component: () => import('@/pages/main-layout.vue'),
    meta: { title: 'Gallery' },
    redirect: '/galleriesPreview',
    children: [
      {
        path: '/galleriesPreview',
        component: () => import('@/pages/gallery/galleriesPreview.vue'),
        meta: { title: 'Galleries Preview' }
      },
      {
        path: '/allGalleries',
        component: () => import('@/pages/gallery/allGalleries.vue'),
        meta: { title: 'All Galleries' }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/pages/sys/login.vue'),
    meta: { title: 'Login' }
  },
  {
    path: '/firstLogin',
    component: () => import('@/pages/sys/firstLogin.vue'),
    meta: { title: 'First Login' }
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
