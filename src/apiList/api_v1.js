import { createRequest } from '../utils/mc-request/index'
import { getProxyPath } from '../config/proxyPath'
const request = createRequest({ prefix: getProxyPath('work') })

/**
 * connect
 */
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
/**获取话题 */
export function getPromptByTopic(data) {
  return request.postJson('/prompt/getPromptByTopic', data)
}
/**设置话题 */
export function setPrompt(data) {
  return request.postJson('/connect/setPrompt', data)
}
/**提交连接 */
export function connectSubmit(data) {
  return request.postJson('/connect/submit', data)
}
/**保存连接 */
export function connectSave(data) {
  return request.postJson('/connect/save', data)
}
/**获取连接状态 */
export function getConnectState(data) {
  return request.postJson('/connect/getCurrentStatus', data)
}

/**
 * greet
 */
/**获取首页数据 */
export function getStatistics(data) {
  return request.postJson('/greet/getStatistics', data)
}
/**获取分类列表数据 */
export function getListByType(data) {
  return request.postJson('/greet/getListByType', data)
}
/**保存greet */
export function greetSave(data) {
  return request.postJson('/greet/save', data)
}
/**提交greet */
export function greetSubmit(data) {
  return request.postJson('/greet/submit', data)
}
/**赠送 */
export function greetUpdateNotes(data) {
  return request.postJson('/greet/updateNotes', data)
}
/**获取商城配置 */
export function getShopSetting(data) {
  return request.postJson('/greet/getShopSetting', data)
}
/**通过id获取greet详情 */
export function greetGetById(data) {
  return request.postJson('/greet/getGreetById', data)
}
/**修改单位状态是否可见 */
export function updateIsView(data) {
  return request.postJson('/draw/updateIsView', data)
}
/**获取一级分类 */
export function getPromptL1(data) {
  return request.postJson('/prompt/getPromptL1', data)
}
/**根据一级获取二级 */
export function getActivityByTopic(data) {
  return request.postJson('/prompt/getActivityByTopic', data)
}
/**根据二级获取 Activity */
export function getPromptByActivity(data) {
  return request.postJson('/prompt/getPromptByActivity', data)
}
/**获取二级主题 Topic */
export function getReflectPromptByTopic(data) {
  return request.postJson('/prompt/getReflectPromptByTopic', data)
}

/**
 * reflect
 */
/**获取话题统计 */
export function getReflectIndex(data) {
  return request.postJson('/reflectView/getIndex', data)
}
/**获取话题列表 */
export function getReflectList(data) {
  return request.postJson('/reflectView/getList', data)
}
/**获取每周记录 */
export function getWeek(data) {
  return request.postJson('/reflectView/getWeek', data)
}

/**
 * 聊天室
 */
/**获取聊天列表 */
export function getChatList(data) {
  return request.postJson('/connectMessage/getList', data)
}
/**发送聊天消息 */
export function sendChatMessage(data) {
  return request.postJson('/connectMessage/sendMessage', data)
}

/**
 * 首次登录
 */
/**根据邀请码获取用户信息 */
export function inviteByUser(data) {
  return request.postJson('/login/inviteByUser', data)
}
/**根据邀请码修改密码 */
export function initUser(data) {
  return request.postJson('/login/initUser', data)
}
/**根据邀请码修改用户信息 */
export function initUserAndGroup(data) {
  return request.postJson('/login/initUserAndGroup', data)
}
