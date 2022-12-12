import Mock from 'mockjs'

/**
 * 模拟数据列表
 * @param {number|string} count
 * @returns
 */
export function listData(count = '2-5') {
  const res = Mock.mock({
    [`data|${count}`]: [
      {
        stars: '@integer(1, 9999)',
        title: '@word()',
        userName: '@name()',
        'userImg|+3': 1,
        content: '@sentence()',
        createTime: '@date(dd/MM/yyyy)',
        'cover|+1': 1,
        'userList|2-5': ['@name()'],
        'tagList|3': [{ title: '@word()', bgc: '@color()' }]
      }
    ]
  })
  const list = res.data
  for (let item of list) {
    item.cover = `http://www.ruanyifeng.com/images_pub/pub_${item.cover}.jpg`
    item.userImg = `http://www.ruanyifeng.com/images_pub/pub_${item.userImg}.jpg`
  }
  return list
}
