export const countList = new Map()
/**添加统计 */
export function addCount(key, state) {
  const cur = countList.get(key)
  if (cur) {
    cur.count++
    const num = cur.stateCount.get(state)
    if (num) {
      cur.stateCount.set(state, num + 1)
    }
    countList.set(key, cur)
  } else {
    const now = Date.now()
    const s = {
      count: 1,
      time: now,
      lastTime: now,
      stateCount: new Map()
    }
    s.stateCount.set(state, 1)
    countList.set(key, s)
  }
}
/**请求统计中间件 */
export const apiCountMid = async function (ctx, next) {
  if (!ctx.req.options.apiCount) {
    return next()
  }
  const key = ctx.req.url
  await next()
  addCount(key, ctx.state)
}
