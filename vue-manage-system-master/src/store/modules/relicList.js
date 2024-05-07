import { getRelicAll } from "../../api/collection"

export default {
  namespaced: true,
  state() {
    return {
      relicList: []
    }
  },
  mutations: {
    setrelicList (state, newList) {
      state.relicList = newList
    }
  },
  actions: {
    async getrelicList(context) {
      const res = await getRelicAll();
        console.log(res)
      context.commit('setrelicList' , res.data)
    }
  },
  getters: {
    
  }
}