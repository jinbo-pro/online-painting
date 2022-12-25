import Vue from 'vue'
import App from './App.vue'
import './styles/index.scss'
import 'normalize.css/normalize.css'
import router from './router/index'
import './router/permission'
import { i18n } from './i18n'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import * as filters from './utils/filters'
// iconfont 字体图标
import './styles/fonts/iconfont.css'
import elCascaderMulti from 'el-cascader-multi'
Vue.use(elCascaderMulti)

Vue.config.productionTip = false
Vue.use(Element, {
  size: 'small',
  i18n: (key, value) => i18n.t(key, value)
})
// 注册全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
new Vue({
  i18n,
  router,
  render: (h) => h(App)
}).$mount('#app')
