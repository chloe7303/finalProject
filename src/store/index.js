import Vue from 'vue'
import Vuex from 'vuex'
import Persistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // production 時要關閉 strict mode
  // strict: true,
  state: {
    user: {
      name: '',
      id: ''
    }
  },
  mutations: {
    login (state, data) {
      state.user.name = data.account
      state.user.id = data._id
    },
    logout (state) {
      state.user.name = ''
      state.user.id = ''
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [Persistedstate({
    // localstorage 只存user資料
    paths: ['user']
  })]
})
