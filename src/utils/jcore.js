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
