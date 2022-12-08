import { Loading } from 'element-ui'

/**
 * 清除空的键
 * @param {object} data
 * @returns
 */
export function clearEmptyKey(data) {
  let result = {}
  for (let key in data) {
    if (data[key]) {
      result[key] = data[key]
    }
  }
  return result
}
/**
 * 页面加载样式
 * @param {any} options
 * @returns
 */
export function pageLoading(options) {
  const defaultOption = {
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  }
  options = Object.assign({}, defaultOption, options)
  return Loading.service(options)
}
