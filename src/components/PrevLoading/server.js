import Vue from 'vue'
import PageLoading from './index.vue'

let instance = null

export default {
  open() {
    if (instance) {
      instance.show = true
      return
    }
    instance = new (Vue.extend(PageLoading))({
      el: document.createElement('div'),
      propsData: {
        show: true,
        index: 9999
      }
    })
    document.body.append(instance.$el)
  },
  close() {
    if (instance) {
      instance.show = false
    }
  }
}
