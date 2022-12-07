import { McRequest } from './McRequest'
import { defaultOptions, apiControl, defaultMidList } from './defaultConfig'
/*!
 * mc-request 使用参见
 * https://gitee.com/lijinbode/mc-request
 */
/**
 * 创建请求实例
 * @param config 基础配置
 * @returns
 */
export function createRequest(config, mids = defaultMidList) {
  const o = Object.assign({}, defaultOptions, apiControl, config)
  const server = new McRequest(o)
  server.useMids(mids)
  return server
}
const config = Object.assign({}, defaultOptions, apiControl)
const server = new McRequest(config)
export default server
