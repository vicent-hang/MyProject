import { searchuserall } from "../../api/user"

export default {
  namespaced: true,
  state() {
    return {
      userList: []
    }
  },
  mutations: {
    setUserList (state, newList) {
      state.userList = newList
    }
  },
  actions: {
    async getUserList(context) {
      const res = await searchuserall()
        // console.log(res)
      context.commit('setUserList' , res.data)
    }
  },
  getters: {
    
  }
}