import { local } from '@/utils/storage'
import router from './index'

/**路由白名单 */
const ignorePath = ['/login']

router.beforeEach(async (to, from, next) => {
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
})
