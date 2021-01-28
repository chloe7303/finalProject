<template>
  <div id="navbarAdmin">
    <v-app-bar
      app
      flat
    >
      <v-avatar
        color="amber"
        size="35"
      >
      <span class="black--text font-weight-black">木</span>
      </v-avatar>

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
        v-if="user.id.length"
        color="grey"
        class="subtitle-1"
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
          title: '管理者頁面',
          path: '/admin'
        }
      ]
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    logout () {
      this.axios.delete(process.env.VUE_APP_API + '/users/logout')
        .then(res => {
          if (res.data.success) {
            this.$swal({
              icon: 'success',
              iconColor: '#FFC107',
              title: '登出成功',
              confirmButtonColor: '#607D8B',
              confirmButtonText: '確定'
            })
            this.$store.commit('logout')

            if (this.$route.path !== '/') {
              this.$router.push('/')
            }
          } else {
            this.$swal({
              icon: 'error',
              title: res.data.message,
              confirmButtonColor: '#607D8B',
              confirmButtonText: '確定'
            })
          }
        })
        .catch(err => {
          this.$swal({
            icon: 'error',
            title: err.response.data.message,
            confirmButtonColor: '#607D8B',
            confirmButtonText: '確定'
          })
        })
    }
  }
}
</script>
