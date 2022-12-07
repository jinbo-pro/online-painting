/**请求异常 */
export class RequestError extends Error {
  constructor(text, request, type = 'RequestError') {
    super(text)
    this.name = 'RequestError'
    this.request = request
    this.type = type
  }
}
/**
 * 创建响应错误信息
 * @param ctx 上下文
 * @param type 错误类型
 * @param message 错误信息
 * @returns
 */
export function createError(ctx, type, message = '请求错误') {
  const res = ctx.res
  return {
    name: 'error',
    response: res,
    request: ctx.req,
    type,
    message
  }
}
/**
 * 返回成功
 * @param ctx 上下文
 * @param data 返回体
 */
export function resultSuccess(ctx, data) {
  ctx.state = 'success'
  ctx.res = data
  return ctx
}
/**
 * 返回失败
 * @param ctx 上下文
 * @param type 错误类型
 * @param message 错误信息
 */
export function resultError(ctx, type, message = '请求错误') {
  ctx.state = type
  ctx.res = createError(ctx, type, message)
  return ctx
}
/**queryString */
export function queryString(json) {
  if (!json) return ''
  return Object.keys(json)
    .map((key) => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
    .join('&')
}
/**超时处理 */
export function timeout2Throw(msec, request) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new RequestError(`timeout of ${msec}ms exceeded`, request, 'Timeout'))
    }, msec)
  })
}
