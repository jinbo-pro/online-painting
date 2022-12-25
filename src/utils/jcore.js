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
