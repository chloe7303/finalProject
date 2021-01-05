<template>
  <div id="navbar">
    <v-app-bar
      app
      flat
    >
      <v-avatar
        :color="'grey light-1'"
        size="32"
      ></v-avatar>

      <v-tabs
        centered
        class="ml-n9"
        color="white"
      >
        <v-tab
          v-for="link in links"
          :key="link.tab"
          :to="link.path"
          class="subtitle-1"
        >
          {{ link.title }}
        </v-tab>
        <v-tabs-slider color="amber"></v-tabs-slider>
      </v-tabs>
      <v-btn
        :color="'grey light-1'"
        size="32"
        text
        @click="logout"
      >登出</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      links: [
        {
          tab: 1,
          title: '募資計畫',
          path: '/'
        },
        {
          tab: 2,
          title: '關於木沐',
          path: '/about'
        },
        {
          tab: 3,
          title: '個人頁面',
          path: '/member'
        },
        {
          tab: 4,
          title: '登入/註冊',
          path: '/users/login'
        }
      ]
    }
  },
  methods: {
    logout () {
      this.axios.delete(process.env.VUE_APP_API + '/users/logout')
        .then(res => {
          if (res.data.success) {
            alert('登出成功')
            this.$store.commit('logout')

            if (this.$route.path !== '/') {
              this.$router.push('/')
            }
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    }
  }
}
</script>
