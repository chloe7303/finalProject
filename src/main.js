import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

// 傳送請求時 一起傳送認證資訊
axios.defaults.withCredentials = true

Vue.use(VueAxios, axios)
Vue.use(Vuelidate)
Vue.use(VueSweetalert2)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
