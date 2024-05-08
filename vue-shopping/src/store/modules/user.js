import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      // 从本地获取
      userInfo: getInfo()
    }
  },
  mutations: {
    // 所有mutations方法第一个参数默认为 state
    setUserInfo (state, obj) {
      this.userInfo = obj
      // 存入本地
      setInfo(obj)
    }
  },
  actions: {
    logout (context) {
      context.commit('setUserInfo', {})
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {

  }
}
