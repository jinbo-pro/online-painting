import Vue from 'vue'
import App from './App.vue'
import './elementui/index'
import './styles/index.scss'
import 'normalize.css/normalize.css'
import router from './router/index'
import './router/permission'
import { i18n } from './i18n'

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  render: (h) => h(App)
}).$mount('#app')
