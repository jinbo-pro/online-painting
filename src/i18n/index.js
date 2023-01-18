import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { local } from '@/utils/storage'
Vue.use(VueI18n)

/**
 * element-ui
 * see: https://element.eleme.cn/#/zh-CN/component/i18n
 */
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'
// app
import nextZhcn from './lang/zh-CN'
import nextEn from './lang/en'

export const localeList = [
  { locale: 'zh-CN', title: '简体中文', value: { ...zhLocale, ...nextZhcn } },
  { locale: 'en', title: 'English', value: { ...enLocale, ...nextEn } }
]

/**i18n */
export const i18n = new VueI18n({
  locale: local.get('i18n-locale') || 'en',
  messages: localeList.reduce((p, c) => {
    p[c.locale] = c.value
    return p
  }, {})
})

ElementLocale.i18n((key, value) => i18n.t(key, value))
