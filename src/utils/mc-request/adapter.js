import axios from 'axios'
import { RequestError } from './utils'

/**axios 请求内核中间件 */
export const defaultCoreMiddlewares = async function (ctx, next) {
  const options = ctx.req.options
  const response = await axios({
    url: options.prefix + ctx.req.url,
    ...options
  })
  if (response.status == 200) {
    ctx.state = 'success'
    ctx.res = {
      headers: response.headers,
      statusCode: response.status,
      statusText: response.statusText,
      data: response.data
    }
    return next()
  }
  throw new RequestError(response.statusText, ctx.req)
}
