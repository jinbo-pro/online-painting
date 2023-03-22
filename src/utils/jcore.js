/**
 * 复制文字到剪切板
 * @param {string} text
 * @returns
 */
export function copyText(text) {
  if (!text) {
    console.info('没有要复制的内容')
    return
  }
  document.execCommand('Copy')
  var inputZ = document.createElement('input')
  inputZ.setAttribute('id', 'inputCopy')
  inputZ.value = text
  document.body.appendChild(inputZ)
  document.getElementById('inputCopy').select()
  document.execCommand('Copy')
  document.body.removeChild(inputZ)
}
/**
 * 生成全局唯一标识符 guid
 * @param {boolean} line 是否带横线
 * @param {string} head 自定义标识
 * @returns
 */
export function guid(line = false, head = '') {
  const _ = line ? '-' : ''
  const S = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return `${head}${S()}${S()}${_}${S()}${_}${S()}${_}${S()}${_}${S()}${S()}${S()}`
}
/**
 * 时间格式化
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return ''
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      time = time.replace(/-/g, '/')
    }
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || '0'
  })
  return time_str
}

/**
 * 获取时间距离[做倒计时很好用]
 * @param {(Object|string|number)} timeStart
 * @param {(Object|string|number)} timeEnd
 * @param {string} cFormat
 * @returns {string}
 */
export function getTimeDistance(timeStart, timeEnd, cFormat = '{d}:{h}:{m}:{s}') {
  const format = cFormat
  var s = new Date(parseTime(timeStart))
  var e = new Date(timeEnd)
  var usedTime = Math.abs(s - e)
  var leavel = usedTime % (24 * 3600 * 1000)
  var leavel2 = leavel % (3600 * 1000)
  var leavel3 = leavel2 % (60 * 1000)
  const formatObj = {
    d: Math.floor(usedTime / (24 * 3600 * 1000)),
    h: Math.floor(leavel / (3600 * 1000)),
    m: Math.floor(leavel2 / (60 * 1000)),
    s: Math.floor(leavel3 / 1000)
  }
  const time_str = format.replace(/{(d|h|m|s)+}/g, (result, key) => {
    let value = formatObj[key]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
/**
 * 转换时间格式
 * @param {number} date 日期
 * @param {number} time 时间
 * @returns {string}
 */
export function timeNumberFormat(date, time) {
  if (!date) return ''
  date = String(date)
  if (date.length == 11) {
    return parseTime(date)
  }
  date = String(date).replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3')
  if (!time) return date
  let result = []
  let list = [1000, 100, 100, 100]
  for (let item of list) {
    let t = parseInt(time % item)
    result.push(t < 10 ? '0' + t : '' + t)
    time /= item
  }
  time = result.reverse().slice(0, -1).join(':')
  return date + ' ' + time
}
/**倒计时 */
export function timeDistance(sD, sT, eD, eT, f = '{d} day {h} hours {m} mins') {
  if (!sD || !eD) return ''
  const s = timeNumberFormat(sD, sT)
  const e = timeNumberFormat(eD, eT)
  const result = getTimeDistance(s, e, f)
  return result.split(' 00')[0]
}
/**px转vw */
export function pxToView(px) {
  return (px / 13.66).toFixed(3) + 'vw'
}
/**base64/buffer 解析 */
export function fileParseToReader(file, type = 'base64') {
  return new Promise((resolve) => {
    let fileRead = new FileReader()
    if (type === 'base64') {
      fileRead.readAsDataURL(file)
    } else if (type === 'buffer') {
      fileRead.readAsArrayBuffer(file)
    }
    fileRead.onload = (ev) => {
      resolve(ev.target.result)
    }
  })
}
