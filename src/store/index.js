import Vue from 'vue'
import Vuex from 'vuex'
import Persistedstate from 'vuex-persistedstate'
import projects from '../projects.js'

Vue.use(Vuex)

export default new Vuex.Store({
  // production 時要關閉 strict mode
  strict: true,
  state: {
    projects,
    snackbar: {
      show: false,
      message: '加入收藏清單！'
    },
    list: [],
    user: {
      name: '',
      id: ''
    }
  },
  mutations: {
    addItemToList (state, { itemId }) {
      const idx = state.list.findIndex((project) => {
        return project.itemId === itemId
      })
      if (idx === -1) {
        state.list.push({ itemId })
      }
    },
    updateSnackbar (state, settings) {
      state.snackbar.show = settings
    },
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
