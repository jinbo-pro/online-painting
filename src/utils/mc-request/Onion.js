/**中间件执行器 */
export function compose(middlewares) {
  return function wrapMiddlewares(ctx) {
    function dispatch(i) {
      const fn = middlewares[i]
      if (!fn) return Promise.resolve()
      return Promise.resolve(fn(ctx, () => dispatch(i + 1)))
    }
    return dispatch(0)
  }
}
/**洋葱中间件 */
export class Onion {
  constructor(coreMiddlewares) {
    this.middlewares = []
    this.coreMiddlewares = coreMiddlewares
  }
  /**存储中间件 */
  use(newMiddleware) {
    this.middlewares.push(newMiddleware)
  }
  /**执行中间件 */
  execute(params) {
    const fn = compose([...this.middlewares, ...this.coreMiddlewares])
    return fn(params)
  }
}
