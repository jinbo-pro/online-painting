import { createRequest } from '../utils/mc-request/index'
import { getProxyPath } from '../config/proxyPath'
const request = createRequest({ prefix: getProxyPath('work') })

/**
 * 首页数据
 */
/**列表 */
export function getHomeList(data) {
  return request.postForm('/getRegimeWarining', data)
}
