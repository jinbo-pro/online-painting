import { resultError } from '../utils'
/**请求状态管理 */
const requestState = new Map()
/**请求防抖中间件 */
export const debounceMid = async function (ctx, next) {
  if (!ctx.req.options.debounce) {
    return next()
  }
  const key = ctx.req.url
  if (requestState.has(key) && requestState.get(key) === 'pending') {
    resultError(ctx, 'debounce', '防抖中')
    return
  }
  requestState.set(key, 'pending')
  await next()
  requestState.set(key, 'success')
}
