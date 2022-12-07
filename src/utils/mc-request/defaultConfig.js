import { debounceMid } from './middleware/debounceMid'
import { apiCountMid } from './middleware/apiCountMid'
import { dataCacheMid } from './middleware/dataCacheMid/index'
import { resultTipsMid } from './middleware/resultTipsMid'
import { resultHandelMid } from './middleware/resultHandelMid'
/**默认配置 */
export const defaultOptions = {
  prefix: '',
  timeout: 8000
}
/**默认请求 */
export const apiControl = {
  okTip: false,
  errorTip: true,
  auth: false,
  loading: false,
  apiCount: false,
  debounce: false,
  dataCache: false
}
/**默认中间件组合 */
export const defaultMidList = [
  /**温馨提示: 中间件的顺序很重要 */
  debounceMid,
  apiCountMid,
  dataCacheMid,
  resultTipsMid,
  resultHandelMid
]
