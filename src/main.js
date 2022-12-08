import Vue from 'vue'
import App from './App.vue'
import './styles/index.scss'
import 'normalize.css/normalize.css'
import router from './router/index'
import './router/permission'
import { i18n } from './i18n'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(Element, {
  size: 'small',
  i18n: (key, value) => i18n.t(key, value)
})

new Vue({
  i18n,
  router,
  render: (h) => h(App)
}).$mount('#app')
