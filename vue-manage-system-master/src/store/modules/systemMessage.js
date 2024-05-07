export default {
  namespaced: true,
  state() {
    return {
      unread : [
        {
          date: "2018-04-19 20:00:00",
          title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
        },
        {
            date: "2018-04-19 21:00:00",
            title: "【系统通知】今晚12点整发大红包，先到先得",
        },
      ],
      read: [
        {
          date: "2018-04-19 20:00:00",
          title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
        },
      ],
      recycle:[
        {
          date: "2018-04-19 20:00:00",
          title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
        },
      ]
    }
  },
  mutations: {
    updateUnReadList (state, newList) {
      state.unread = newList
      localStorage.setItem('unreadList', JSON.stringify(state.unread))
      console.log('ok');
    },
    setUnReadList (state) {
      state.unread =  JSON.parse(localStorage.getItem('unreadList'));
    },
    setReadList () {
      
    },
    setRecycleList() {

    }
  },
  actions: {
    
  },
  getters: {
    
  }
}