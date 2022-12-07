import { defaultCoreMiddlewares } from './adapter'
import { resultError } from './utils'
import { Onion } from './Onion'
export class BaseRequest {
  constructor(config) {
    const core = config.coreMiddlewares || defaultCoreMiddlewares
    this.onion = new Onion([core])
    this.config = config
  }
  /**添加中间件 */
  use(fn) {
    this.onion.use(fn)
    return this
  }
  useMids(list) {
    for (let item of list) {
      this.onion.use(item)
    }
  }
  /**请求入口 */
  async main(url, options, ctr) {
    const o = Object.assign({}, this.config, options, ctr)
    const ctx = {
      req: { url, options: o },
      res: null,
      state: 'pending'
    }
    try {
      await this.onion.execute(ctx)
    } catch (error) {
      console.error(error)
      resultError(ctx, 'error', '请求异常')
    }
    if (ctx.state === 'success') return ctx.res
    return Promise.reject(ctx.res)
  }
}
