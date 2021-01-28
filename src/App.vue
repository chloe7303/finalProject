<template>
  <v-app id="inspire">
    <NavbarAdmin v-if="user.name === 'admin'"/>
    <Navbar v-else/>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
import NavbarAdmin from './components/NavbarAdmin.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    NavbarAdmin
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    heartbeat () {
      this.axios.get(process.env.VUE_APP_API + '/users/heartbeat')
        .then((res) => {
          // vuex 登入中但後端已登出
          if (this.user.id.length > 0) {
            if (!res.data) {
              alert('登入時效已過')
              this.$store.commit('logout')
              if (this.$route.path !== '/') {
                this.$router.push('/')
              }
            }
          }
        })
        .catch(() => {
          alert('發生錯誤')
          this.$store.commit('logout')
          if (this.$route.path !== '/') {
            this.$router.push('/')
          }
        })
    }
  },
  mounted () {
    this.heartbeat()
    setInterval(() => {
      this.heartbeat()
    }, 10000)
  }
}
</script>
