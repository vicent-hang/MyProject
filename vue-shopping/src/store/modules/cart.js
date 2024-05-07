import { deletCart, getCartList, getUpdadeCart } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: [] // 购物车列表

    }
  },
  mutations: {
    setCarList (state, newList) {
      state.cartList = newList
    },
    toggleCheck (state, id) {
      const goods = state.cartList.find(item => item.goods_id === id)
      goods.isChecked = !goods.isChecked
    },
    toggleAllCheck (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    changeCount (state, obj) {
      const { goodsId, goodsNum } = obj
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  actions: {
    async getCarListAction (context) {
      const { data } = await getCartList()
      // console.log(res)
      // 后台返回的数据中 ， 不包括复选框的选中状态 ， 为了实现将来的功能
      // 需要手动位数数据， 给每一项添加一个 isChecked状态 （标记当前商品是否选中）
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCarList', data.list)
    },
    async changeCountAction (context, obj) {
      const { goodsNum, goodsId, goodsSkuId } = obj
      // 先本地修改
      context.commit('changeCount', { goodsId, goodsNum })
      // 再同步到后台
      await getUpdadeCart(goodsId, goodsNum, goodsSkuId)
      // context.commit('changeCount', res)
      // console.log(res)
    },
    async delSelectAction (context) {
      // 获取选中的商品
      const selectedItems = context.getters.selCheckedItem
      // 获取选中商品的id集合
      const cartIds = selectedItems.map(item => item.id)
      await deletCart(cartIds)
      Toast('删除成功')
      // console.log(res)

      // 重新拉取新的购物车列表
      context.dispatch('getCarListAction')
    }
  },
  getters: {
    // 商品总数
    totalCart (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品
    selCheckedItem (state) {
      return state.cartList.filter(item => item.isChecked === true)
    },
    // 选中的商品数
    selCount (state, getters) {
      return getters.selCheckedItem.reduce((sum, item) => sum + item.goods_num, 0)
    },

    // 选中的商品总价
    selPrice (state, getters) {
      return getters.selCheckedItem.reduce((sum, item) => {
        return sum + item.goods_num * item.goods.goods_price_min
      }, 0).toFixed(2) // 保留两位小数
    },
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
