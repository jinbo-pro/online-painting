import { resultSuccess, resultError } from '../utils'
import { local } from '@/utils/storage'
import { MessageBox } from 'element-ui'

/**响应数据处理中间件 */
export const resultHandelMid = async function (ctx, next) {
  const options = ctx.req.options
  /**
   * 添加请求token
   */
  const token = {
    auth: local.get('token') || ''
  }
  // 为请求添加统一参数
  if (options.headers) {
    options.headers = Object.assign({}, options.headers, token)
  } else {
    options.headers = token
  }

  try {
    await next()
  } catch (error) {
    console.error(error)
    resultError(ctx, 'error', '服务器异常')
    return
  }

  const response = ctx.res
  if (response.statusCode != 200) {
    resultError(ctx, 'error', '服务器异常')
    return
  }
  const res = response.data
  const code = res.status
  // 判断 code 然后返回
  if (code === 0) {
    return resultSuccess(ctx, res.result || res.data)
  } else if (res.result.code == 10000) {
    return MessageBox.alert('登录失效请重新登录').then(() => {
      local.clear()
      location.reload()
    })
  } else {
    let message = res.result.message || res.msg || '请求失败'
    return resultError(ctx, 'fail', message)
  }
}
