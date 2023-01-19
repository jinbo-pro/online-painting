import { createRequest } from '../utils/mc-request/index'
import { getProxyPath } from '../config/proxyPath'
const request = createRequest({ prefix: getProxyPath('work') })

/**获取首页列表 */
export function getIndexData(data) {
  return request.postJson('/connect/getIndex', data)
}
/**获取首页列表 */
export function getTotail(data) {
  return request.postJson('/connect/getTotail', data)
}
/**获取用户语言列表 */
export function getLanguageList(data) {
  return request.postJson('/user/getLanguageList', data)
}
/**获取一级分类 */
export function getPromptL1(data) {
  return request.postJson('/prompt/getPromptL1', data)
}
/**获取所有部门 */
export function getOfficeList(data) {
  return request.postJson('/office/getList', data)
}
/**获取连接配置 */
export function getConnectSetting(data) {
  return request.postJson('/connectSetting/getSetting', data)
}
/**保存连接配置 */
export function saveConnectSetting(data) {
  return request.postJson('/connectSetting/save', data)
}
/**获取当前连接 */
export function currentConnect(data) {
  return request.postJson('/connect/currentConnect', data)
}