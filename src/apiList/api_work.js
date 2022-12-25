import { createRequest } from '../utils/mc-request/index'
import { getProxyPath } from '../config/proxyPath'
const request = createRequest({ prefix: getProxyPath('work') })

/**登录 */
export function userLogin(data) {
  return request.postJson('/login/login', data)
}
/**退出登录 */
export function userLogout(data) {
  return request.postJson('/login/logout', data)
}

/**
 * 画作
 */
/**列表 */
export function getMyDrawList(data) {
  return request.postJson('/draw/getMyDrawList', data)
}
/**获取主题 */
export function getTheme(data) {
  return request.postJson('/theme/getTheme', data)
}

/**
 * 消息
 */
/**接收的列表 */
export function getIrecipientList(data) {
  return request.postJson('/message/getIrecipientList', data)
}
/**发送的列表 */
export function getIsendList(data) {
  return request.postJson('/message/getIsendList', data)
}

/**
 * 多人作画小队
 */
/**创建房间 */
export function addTeam(data) {
  return request.postJson('/team/addTeam', data)
}
/**加入房间 */
export function addTeamUser(teamId) {
  return request.postJson('/team/addTeamUser', { teamId })
}
/**离开房间 */
export function leaveTeam(teamId) {
  return request.postJson('/team/leaveTeam', { teamId })
}
/**获取人员房间状态 */
export function getTeamId(data) {
  return request.postJson('/team/getTeamId', data)
}
/**查看所有的房间 */
export function getTeamList(data) {
  return request.postJson('/team/getTeamList', data)
}
/**查看房间所有人 */
export function getTeamUser(teamId) {
  return request.postJson('/team/getTeamUser', { teamId })
}
/**小队准备 */
export function teamUserReady(teamId) {
  return request.postJson('/team/teamUserReady', { teamId })
}
/**小队取消准备 */
export function teamUserCancelReady(teamId) {
  return request.postJson('/team/teamUserCancelReady', { teamId })
}
/**小队开始 */
export function teamUserStart(teamId) {
  return request.postJson('/team/teamUserStart', { teamId })
}

/**
 * 画廊
 */
/**列表 */
export function getGalleryList(data) {
  return request.postJson('/gallery/getGalleryList', data)
}
/**新增 */
export function addGallery(data) {
  return request.postJson('/gallery/addGallery', data)
}
