<template>
  <div id="adminUsers">
    <h1 class="font-weight-bold mb-6">會員管理</h1>
    <h3 class="font-weight-bold mb-2">共 {{ users.length }} 筆資料</h3>
    <v-card
      max-width="100%"
      outlined
      v-for="user in users"
      :key="user._id"
      class="mb-5"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            會員帳號：{{ user.account }}
          </v-list-item-title>
          <v-expansion-panels accordion>
            <v-expansion-panel>
              <v-expansion-panel-header class="body-1">贊助紀錄</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card
                  max-width="100%"
                  outlined
                  v-for="fund in user.funds"
                  :key="fund._id"
                  class="mb-4"
                >
                  <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="title mb-3">
                      {{ fund.project.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="subtitle-1 amber--text">$ 贊助金額：{{ fund.fundAmount }}</v-list-item-subtitle>
                    <v-list-item-subtitle>贊助人：{{ fund.name }}</v-list-item-subtitle>
                    <v-list-item-subtitle>連絡電話：{{ fund.phone }}</v-list-item-subtitle>
                    <v-list-item-subtitle>電子信箱：{{ fund.email }}</v-list-item-subtitle>
                  </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header class="body-1">新增紀錄</v-expansion-panel-header>
              <v-expansion-panel-content>
                <!-- code -->
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-list-item-content>
        <v-btn text large class="ma-2" color="red" @click="del(user, i)">
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'adminUsers',
  data () {
    return {
      users: []
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    del (user, i) {
      this.$swal({
        title: '確定刪除使用者?',
        icon: 'warning',
        iconColor: '#FFC107',
        showCancelButton: true,
        confirmButtonColor: '#607D8B',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.delete(`${process.env.VUE_APP_API}/users/del/${user._id}`)
            .then(res => {
              if (res.data.success) {
                this.users.splice(i, 1)
              } else {
                this.$swal({
                  icon: 'error',
                  title: res.data.message,
                  confirmButtonColor: '#607D8B',
                  confirmButtonText: '確定'
                })
              }
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
  },
  mounted () {
    this.axios.get(`${process.env.VUE_APP_API}/users`)
      .then(res => {
        if (res.data.success) {
          this.users = res.data.result
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
</script>
