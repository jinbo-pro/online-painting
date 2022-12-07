/**
 * 请求缓存类
 */
export default class ApiCache {
  constructor(expires = 0) {
    this.expires = expires
    this.cacheList = new Map()
  }
  /**删除缓存数据 */
  deleteCache(key) {
    this.cacheList.delete(key)
  }
  /**获取缓存数据 */
  getCache(key) {
    if (!this.cacheList.has(key)) return null
    let cache = this.cacheList.get(key)
    if (!cache) return null
    const expire = cache.expires
    if (expire && expire > 0) {
      if (expire * 1000 < Date.now() - cache.time) {
        console.info(key, '自动删除过期的数据')
        this.deleteCache(key)
        return null
      }
    }
    return JSON.parse(cache.data)
  }
  /**设置缓存数据 */
  setCache(key, value, expires = 0) {
    this.cacheList.set(key, {
      data: JSON.stringify(value),
      time: Date.now(),
      expires: expires ? expires : this.expires
    })
  }
}
