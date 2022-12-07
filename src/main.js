import Vue from 'vue'
import App from './App.vue'
import './elementui/index'
import './styles/index.scss'
import 'normalize.css/normalize.css'
import router from './router/index'

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
