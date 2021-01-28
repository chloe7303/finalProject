import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index.js'

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
    path: '/add',
    name: 'Add',
    component: () => import(/* webpackChunkName: "add" */ '../views/Projects/Add.vue'),
    meta: {
      title: '木沐 | 新增計畫',
      needLogin: true
    }
  },
  {
    path: '/projects/:id',
    name: 'Headphones',
    component: () => import(/* webpackChunkName: "headphones" */ '../views/Projects/Headphones.vue'),
    meta: {
      title: '木沐 | 計畫內容',
      needLogin: false
    }
  },
  {
    path: '/payment/:id',
    name: 'Payment',
    component: () => import(/* webpackChunkName: "payment" */ '../views/Projects/Payment.vue'),
    meta: {
      title: '木沐 | 付款頁面',
      needLogin: true
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
    component: () => import(/* webpackChunkName: "member" */ '../views/Member.vue'),
    meta: {
      needLogin: true
    },
    children: [
      {
        path: '',
        name: 'FundRecords',
        component: () => import(/* webpackChunkName: "fundRecords" */ '../views/Member/FundRecords.vue'),
        meta: {
          title: '木沐 | 贊助紀錄',
          needLogin: true
        }
      },
      {
        path: 'wishlists',
        name: 'Wishlists',
        component: () => import(/* webpackChunkName: "wishlists" */ '../views/Member/Wishlists.vue'),
        meta: {
          title: '木沐 | 收藏清單',
          needLogin: true
        }
      },
      {
        path: 'addRecords',
        name: 'AddRecords',
        component: () => import(/* webpackChunkName: "addRecords" */ '../views/Member/AddRecords.vue'),
        meta: {
          title: '木沐 | 新增紀錄',
          needLogin: true
        }
      },
      {
        path: 'msgRecords',
        name: 'MsgRecords',
        component: () => import(/* webpackChunkName: "msgRecords" */ '../views/Member/MsgRecords.vue'),
        meta: {
          title: '木沐 | 留言紀錄',
          needLogin: true
        }
      }
    ]
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
    path: '/admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    meta: {
      needLogin: true
    },
    children: [
      {
        path: '',
        name: 'adminProjects',
        component: () => import(/* webpackChunkName: "projects" */ '../views/Admin/Projects.vue'),
        meta: {
          title: '木沐 | 所有計畫',
          needLogin: true
        }
      },
      {
        path: 'users',
        name: 'adminUsers',
        component: () => import(/* webpackChunkName: "users" */ '../views/Admin/Users.vue'),
        meta: {
          title: '木沐 | 會員管理',
          needLogin: true
        }
      }
    ]
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

router.beforeEach((to, from, next) => {
  if (to.meta.needLogin && !store.state.user.id) {
    next('/users/login')
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
