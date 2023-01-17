import { local } from '@/utils/storage'
import router from './index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import PrevLoading from '@/components/PrevLoading/server'

// 加载 loading
PrevLoading.open()

// 延迟关闭进度条
export function delayNProgressDone(time = 100) {
  setTimeout(() => {
    NProgress.done()
  }, time)
}

/**路由白名单 */
const ignorePath = ['/login']

router.beforeEach(async (to, from, next) => {
  NProgress.configure({ showSpinner: false })
  NProgress.start()
  const token = local.get('token')
  if (!token) {
    if (ignorePath.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  } else if (token && to.path == '/login') {
    next('/')
  } else {
    next()
  }
  delayNProgressDone()
})

// 路由加载后
router.afterEach(() => {
  PrevLoading.close()
  delayNProgressDone()
})
