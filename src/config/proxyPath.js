// 代理地址 [head 代理头] [local 本地] [network 网络]

const proxyPathMap = {
  // 绘画
  work: {
    local: 'http://34.221.33.86/drawClient',
    // local: 'http://114.115.209.57:9000/drawClient',
    network: '/drawClient'
  }
}

/**
 * 获取代理地址
 * @param {string} key
 * @returns
 */
function getProxyPath(key) {
  const path = proxyPathMap[key]
  if (!path) {
    console.warn('未找到对应的地址配置')
    return ''
  }
  const env = process.env.NODE_ENV
  if (env === 'development') {
    return `/${key}`
  } else {
    return path.network
  }
}

/**创建代理 */
function createProxy() {
  const proxy = {}
  for (const key in proxyPathMap) {
    const item = proxyPathMap[key]
    const target = item.local
    proxy[`/${key}`] = {
      target,
      changeOrigin: true,
      pathRewrite: { [`^/${key}`]: '' }
    }
  }
  return proxy
}

module.exports = {
  getProxyPath,
  createProxy
}
