/**响应数据处理包装中间件 - 将返回包装成统一格式 */
export const resultHandelWrapMid = async function (ctx, next) {
  await next()
  ctx.res.data = {
    code: 0,
    data: ctx.res.data,
    message: '请求成功'
  }
}
