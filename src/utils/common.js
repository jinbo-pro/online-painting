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
  const maxCount = (w / domW) * (h / domW) * 0.5
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
/**
 * 函数防抖
 * @param {Function} func 函数
 * @param {number} wait 延时
 * @param {boolean} immediate 是否立即执行
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result
  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp
    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }
  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}
function getBase64Name(base64) {
  const [n] = base64.split(';')
  return n.replace(/:/, '_').replace(/\//, '.')
}
function downFileByUrl(imgUrl, fileName) {
  const a = document.createElement('a')
  a.href = imgUrl
  // 默认截取 url 末尾为文件名
  a.download = fileName || imgUrl.split('/').slice(-1)[0]
  a.click()
}
/**
 * base64 图片下载
 * @param {string} base64
 */
export function base64FileDown(base64) {
  let arr = base64.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  const blob = new Blob([u8arr], { type: mime })
  const fileUrl = URL.createObjectURL(blob)
  downFileByUrl(fileUrl, getBase64Name(base64))
}
