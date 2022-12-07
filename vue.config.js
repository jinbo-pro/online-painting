const { createProxy } = require('./src/config/proxyPath')

module.exports = {
  lintOnSave: true,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  productionSourceMap: false,
  devServer: {
    port: 9322,
    open: false,
    proxy: createProxy()
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      const os = require('os')
      const { BannerPlugin } = require('webpack')
      const rule = /app\.[\w]+\.js$/
      // 追加打包人信息-配置参考：https://doc.codingdict.com/webpack-cn-doc/plugins/banner-plugin/
      config.plugins.push(
        new BannerPlugin({
          raw: true,
          entryOnly: true,
          include: rule,
          banner: `console.log('build: ${os.hostname()} ${new Date().toLocaleString()}');`
        })
      )
    }
  }
}
