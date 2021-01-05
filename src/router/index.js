import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '木沐 | 募資計畫',
      needLogin: false
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: '木沐 | 關於木沐',
      needLogin: false
    }
  },
  {
    path: '/member',
    name: 'Member',
    component: () => import(/* webpackChunkName: "member" */ '../views/Member.vue'),
    meta: {
      title: '木沐 | 個人頁面',
      needLogin: true
    }
  },
  {
    path: '/users/:action',
    name: 'Users',
    component: () => import(/* webpackChunkName: "users" */ '../views/Users.vue'),
    meta: {
      title: '木沐 | 登入/註冊',
      needLogin: false
    }
  },
  {
    path: '/projects/headphones',
    name: 'Headphones',
    component: () => import(/* webpackChunkName: "headphones" */ '../views/Projects/Headphones.vue'),
    meta: {
      title: 'SUDO | 最輕薄的無線耳機',
      needLogin: false
    }
  },
  {
    path: '/projects/payment',
    name: 'Payment',
    component: () => import(/* webpackChunkName: "payment" */ '../views/Projects/Payment.vue'),
    meta: {
      title: '木沐 | 付款頁面',
      needLogin: true
    }
  },
  {
    path: '*',
    name: 'Notfound',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/Notfound.vue'),
    meta: {
      title: '找不到頁面',
      needLogin: false
    }
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.needLogin && !store.state.user.id) {
//     next('/login')
//   } else {
//     next()
//   }
// })

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
