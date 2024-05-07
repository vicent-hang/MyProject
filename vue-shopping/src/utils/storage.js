// 约定一个通用的键名
const INFO_KEY = 'wen_shopping_info'
const HISTORY_KEY = 'wen_search_history'

export const getInfo = () => {
  // 默认空对象
  const defualtObj = { token: '', userId: '' }
  const res = localStorage.getItem(INFO_KEY)
  // 在本地存储的是字符串
  // 将字符串转换对象JSON.parse()
  return res ? JSON.parse(res) : defualtObj
}

export const setInfo = (obj) => {
  // 将对象转换为字符串存储
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}

export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 获取搜索历史
export const getSearchHistory = () => {
  const res = localStorage.getItem(HISTORY_KEY)
  return res ? JSON.parse(res) : []
}
// 存入历史到本地
export const setSearchHistory = (history) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}
