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
/**定时器控制 */
export class SetTimr {
  constructor(count) {
    this.initCount = count
    this.count = count
    this.timr = null
  }
  start(callBack) {
    this.clearTimr()
    this.timr = setInterval(() => {
      if (typeof callBack == 'function') {
        callBack(this.count)
      }
      if (this.count <= 0) {
        this.clearTimr()
        return
      }
      this.count--
    }, 1000)
  }
  reset() {
    this.clearTimr()
    this.count = this.initCount
  }
  clearTimr() {
    if (this.timr) {
      clearInterval(this.timr)
      this.timr = null
    }
  }
}
/**生成随机数 */
function ra(max) {
  return max * Math.random()
}
/**
 * 生成重叠的点
 * @param {number} w 容器最大宽度
 * @param {number} h 容器最大高度
 * @param {number} count 生成数量
 * @param {number} domW dom 大小
 */
export function createPoint(w, h, count, domW) {
  const pointList = []
  const maxCount = (w / domW) * (h / domW) * 0.6
  if (count > maxCount) {
    count = maxCount
    console.log(`建议最大数量：${maxCount}`)
  }
  // 检测点是否与其他点发生重叠
  const checkPointOverlap = (x, y) => {
    for (let item of pointList) {
      const p2 = (x - item.x) ** 2 + (y - item.y) ** 2
      const L = Math.sqrt(p2, 2)
      if (L <= domW) return true
    }
    return false
  }
  while (pointList.length < count) {
    const x = ra(w)
    const y = ra(h)
    if (checkPointOverlap(x, y)) continue
    // 检测点是否超出边界
    if (x + domW > w || y + domW > h) continue
    pointList.push({ x, y })
  }
  return pointList
}
