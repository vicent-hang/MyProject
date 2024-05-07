import { getWorkList } from "../../api/empwork"

export default {
  namespaced: true,
  state() {
    return {
      positionList: []
    }
  },

  mutations: {
    setList (state , newList) {
      state.positionList = newList
    }
  },

  actions: {
    async getpositionList (context) {
      const res = await getWorkList()
      // console.log(res);
      context.commit('setList', res.data)
    }

  },

  getters: {
    
  },

}