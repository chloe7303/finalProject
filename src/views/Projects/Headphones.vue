<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        xl="8"
      >
        <v-sheet
          min-height="80vh"
          rounded="lg"
          class="pa-8 pa-sm-10"
        >
          <h1 class="font-weight-bold pb-6">計畫內容</h1>
            <v-row>
              <v-col cols="12" md="8">
                <v-card
                  max-width="100%"
                  light
                  class="mb-6"
                >
                  <v-img
                    :src="project.image"
                    height="400px"
                  ></v-img>

                  <v-card-title>
                    {{ project.title }}
                  </v-card-title>
                  <v-card-subtitle class="subtitle-1 black--text">
                    {{ project.subtitle }}
                  </v-card-subtitle>
                  <v-card-text>
                    {{ project.description }}
                  </v-card-text>
                </v-card>
                <!-- 留言板 -->
                <v-card>
                  <v-system-bar color="blue-grey"></v-system-bar>
                  <v-toolbar flat>
                    <v-toolbar-title class="font-weight-bold">留言板</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <div>
                      <v-switch
                        v-if="user.id"
                        v-model="showMsg"
                        label="新增留言"
                        hide-details
                        color="blue-grey"
                        class="font-weight-bold"
                      ></v-switch>
                      <v-switch v-else disabled label="新增留言請登入" class="mt-4"></v-switch>
                    </div>
                  </v-toolbar>
                  <v-banner
                    single-line
                    v-model="showMsg"
                  >
                    <v-row align="center">
                    <v-col cols="10">
                      <v-textarea
                        rows="1"
                        placeholder="請輸入內容..."
                        prepend-icon="mdi-comment"
                        color="blue-grey"
                        v-model="message"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="2">
                    <v-btn color="amber" small @click="addMsg">
                      <h4 class="blue-grey--text text--darken-2">送出</h4>
                    </v-btn>
                    </v-col>
                    </v-row>
                  </v-banner>
                  <v-sheet>
                  <v-card
                    class="mx-auto"
                    max-width="100%"
                    outlined
                    v-for="(message, i) in reversedMsg" :key="message._id"
                  >
                    <v-list-item>
                      <v-list-item-content>
                        <div class="overline">
                          {{ message.user.account }}
                        </div>
                        <v-list-item-title class="mb-1">
                          {{ message.message }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          {{ new Date(message.date).toLocaleString() }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-btn text large class="ma-2" color="red" v-if="user.id === message.user._id" @click="delMsg(message, i)">
                        <v-icon>mdi-trash-can</v-icon>
                      </v-btn>
                    </v-list-item>
                  </v-card>
                  </v-sheet>
                </v-card>
              </v-col>
              <v-col cols="12" md="4" class="mt-8">
                <div class="mb-16">
                  <h1 class="mb-2">{{ project.title }}</h1>
                  <h3>{{ project.subtitle }}</h3>
                </div>
                <div class="mb-12">
                  <h3>提案人： {{ project.proposer }}</h3>
                  <h3>目標金額： $ {{ new Intl.NumberFormat().format(project.targetAmount) }}</h3>
                  <h3 class="mb-4">已募資金額： $ {{ new Intl.NumberFormat().format(project.raisedAmount) }}</h3>
                  <v-progress-linear
                  :value="progress"
                  color="amber"
                  height="20"
                  >
                    <strong class="blue-grey--text text--darken-2">{{ Math.ceil(progress) }}%</strong>
                  </v-progress-linear>
                </div>
                <h3 class="mb-2">募資時間：{{ new Date(project.begin).toLocaleDateString() }} ~ {{ new Date(project.finish).toLocaleDateString() }}</h3>
                <div>
                  <v-btn
                    color="amber"
                    x-large
                    :to="'/payment/' + project._id"
                    class="mr-4"
                    :disabled="project.success"
                  >
                    <h2 class="blue-grey--text text--darken-2">贊助專案</h2>
                  </v-btn>
                  <v-btn v-if="favorite" outlined color="red" x-large @click="delWishlist">
                    <v-icon left>mdi-heart-outline</v-icon>
                    <h2 class="red--text">取消收藏</h2>
                  </v-btn>
                  <v-btn v-else outlined color="red" x-large @click="addWishlist">
                    <v-icon left>mdi-heart</v-icon>
                    <h2 class="red--text">收藏專案</h2>
                  </v-btn>
                  <v-snackbar
                    v-model="addSnackbar.show"
                    right top timeout="1500" color="red"
                  >
                    {{ addSnackbar.message }}
                  </v-snackbar>
                  <v-snackbar
                    v-model="delSnackbar.show"
                    right top timeout="1500" color="red"
                  >
                    {{ delSnackbar.message }}
                  </v-snackbar>
                </div>
              </v-col>
            </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Headphones',
  data: () => ({
    project: {},
    wishlists: [],
    showMsg: false,
    msgBoard: [],
    message: '',
    favorite: '',
    addSnackbar: {
      show: false,
      message: '加入收藏清單！'
    },
    delSnackbar: {
      show: false,
      message: '取消收藏'
    }
  }),
  computed: {
    user () {
      return this.$store.state.user
    },
    progress () {
      const result = (this.project.raisedAmount / this.project.targetAmount) * 100
      return result
    },
    reversedMsg () {
      return this.msgBoard.slice().reverse()
    }
  },
  methods: {
    addWishlist () {
      if (!this.user.id) {
        this.$swal({
          icon: 'warning',
          iconColor: '#FFC107',
          title: '請先登入',
          confirmButtonColor: '#607D8B',
          confirmButtonText: '確定'
        })
        return
      }
      this.axios.patch(`${process.env.VUE_APP_API}/users/wishlists/${this.user.id}/${this.project._id}`)
        .then(res => {
          if (res.data.success) {
            this.wishlists = res.data.wishlists
            this.favorite = true
            this.addSnackbar.show = true
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
    },
    delWishlist () {
      this.axios.patch(`${process.env.VUE_APP_API}/users/delwishlists/${this.user.id}/${this.project._id}`)
        .then(res => {
          if (res.data.success) {
            this.wishlists = res.data.wishlists
            this.favorite = false
            this.delSnackbar.show = true
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
    },
    addMsg () {
      if (!this.message) return
      this.axios.patch(`${process.env.VUE_APP_API}/projects/msgBoard/${this.$route.params.id}/${this.user.id}`, { message: this.message })
        .then(res => {
          if (res.data.success) {
            this.msgBoard = res.data.msgBoard
            this.message = ''
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
          console.log(err)
        })
    },
    delMsg (message, i) {
      this.axios.patch(`${process.env.VUE_APP_API}/users/msgboard/${this.user.id}/${message._id}`)
        .then(res => {
          if (res.data.success) {
            const idx = this.msgBoard.findIndex(msg => msg._id === message._id)
            this.msgBoard.splice(idx, 1)
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
          console.log(err)
          this.$swal({
            icon: 'error',
            title: err.response.data.message,
            confirmButtonColor: '#607D8B',
            confirmButtonText: '確定'
          })
        })
    }
  },
  async mounted () {
    // 未登入時
    if (!this.user.id) {
      const res = await this.axios.get(`${process.env.VUE_APP_API}/projects?id=${this.$route.params.id}`)
      if (res.data.success) {
        this.project = res.data.result[0]
        this.project.image = `${process.env.VUE_APP_API}/projects/image/${this.project.image}`
        return
      } else {
        this.$swal({
          icon: 'error',
          title: res.data.message,
          confirmButtonColor: '#607D8B',
          confirmButtonText: '確定'
        })
      }
    }
    try {
      // 1. 抓收藏清單資料
      let res = await this.axios.get(`${process.env.VUE_APP_API}/users/wishlists/${this.user.id}`)
      if (res.data.success) {
        this.wishlists = res.data.wishlists
      } else {
        this.$swal({
          icon: 'error',
          title: res.data.message,
          confirmButtonColor: '#607D8B',
          confirmButtonText: '確定'
        })
      }

      // 2. 抓計畫資料
      res = await this.axios.get(`${process.env.VUE_APP_API}/projects?id=${this.$route.params.id}`)
      if (res.data.success) {
        this.project = res.data.result[0]
        this.project.image = `${process.env.VUE_APP_API}/projects/image/${this.project.image}`
        this.favorite = this.wishlists.some(whishlist => {
          return whishlist.project._id === this.project._id
        })
      } else {
        this.$swal({
          icon: 'error',
          title: res.data.message,
          confirmButtonColor: '#607D8B',
          confirmButtonText: '確定'
        })
      }

      // 3. 抓留言板資料
      res = await this.axios.get(`${process.env.VUE_APP_API}/projects/msgBoard/${this.$route.params.id}`)
      if (res.data.success) {
        this.msgBoard = res.data.msgBoard
      } else {
        this.$swal({
          icon: 'error',
          title: res.data.message,
          confirmButtonColor: '#607D8B',
          confirmButtonText: '確定'
        })
      }
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: error.response.data.message,
        confirmButtonColor: '#607D8B',
        confirmButtonText: '確定'
      })
    }
  }
}
</script>
