import { resultSuccess } from '../../utils'
import ApiCache from './ApiCache'
/**
 * 文本hash运算
 * @param str 文本内容
 * @returns
 */
export function textHash(str) {
  for (var i = 0, num = 0, len = str.length; i < len; i++) {
    num += str.charCodeAt(i) / (i + 1.3)
  }
  return (+String(num).replace('.', '') - 0).toString(36)
}
export const cache = new ApiCache()
function getCacheKey(ctx) {
  const o = ctx.req.options
  const data = ctx.req.options.method == 'post' ? o.data : o.params
  return textHash(`${ctx.req.url}-${JSON.stringify(data)}`)
}
/**响应缓存中间件 */
export const dataCacheMid = async function (ctx, next) {
  if (!ctx.req.options.dataCache) {
    return next()
  }
  const key = getCacheKey(ctx)
  const cacheData = cache.getCache(key)
  if (cacheData) {
    console.log(key, ctx.req.url, '调用缓存数据')
    resultSuccess(ctx, cacheData)
    return
  }
  await next()
  cache.setCache(key, ctx.res)
}
