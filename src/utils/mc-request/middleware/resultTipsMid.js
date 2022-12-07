import { Message } from 'element-ui'

/**响应信息提示中间件 */
export const resultTipsMid = async function (ctx, next) {
  await next()
  const res = ctx.res
  const state = ctx.state
  const options = ctx.req.options
  switch (state) {
    case 'success':
      options.okTip && Message.error(res.message || res.msg || '请求成功')
      break
    case 'fail':
    case 'error':
      options.errorTip && Message.error(res.message)
      break
  }
}
