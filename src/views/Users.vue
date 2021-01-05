<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="8">
        <v-card class="elevation-24">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" md="8" class="pa-sm-16">
                  <v-card-text class="mt-8">
                    <h1 class="display-2 text-center font-weight-black grey--text text--lighten-5">登入</h1>
                    <v-form class="mt-8" @submit.prevent="login">
                      <v-text-field
                        v-model="account"
                        label="帳號"
                        name="account"
                        type="text"
                        required
                        color="blue-grey lighten-5"
                      >
                      </v-text-field>
                      <v-text-field
                        v-model="password"
                        label="密碼"
                        name="password"
                        type="password"
                        required
                        color="blue-grey lighten-5"
                      >
                      </v-text-field>
                      <div class="text-center mt-8">
                        <v-btn
                        type="submit"
                        large
                        rounded
                        color="blue-grey"
                        dark
                        class="pa-7"
                        >
                        <span class="subtitle-1">登入</span>
                        </v-btn>
                      </div>
                    </v-form>
                  </v-card-text>
                </v-col>
                <v-col cols="12" md="4" class="blue-grey d-flex align-center justify-center">
                  <div>
                    <v-card-text class="display-1 text-center white--text">
                      <h5>還沒建立帳號嗎？</h5>
                    </v-card-text>
                    <div class="text-center mt-md-4">
                        <v-btn rounded outlined class="pa-6" dark @click="step++"><span class="subtitle-1">註冊</span></v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row>
                <v-col cols="12" md="4" class="blue-grey d-flex align-center justify-center">
                  <div>
                    <v-card-text class="display-1 text-center white--text">
                      <h5>已經註冊過了？</h5>
                    </v-card-text>
                    <div class="text-center mt-md-4">
                        <v-btn rounded outlined="" class="pa-6" dark @click="step++"><span class="subtitle-1">登入</span></v-btn>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" md="8" class="pa-sm-16">
                  <v-card-text class="mt-8">
                    <h1 class="display-2 text-center font-weight-black grey--text text--lighten-5">註冊</h1>
                    <v-form class="mt-8" @submit.prevent="register">
                      <v-text-field
                        v-model="account"
                        label="帳號"
                        name="account"
                        type="text"
                        color="blue-grey lighten-5"
                      >
                      </v-text-field>
                      <v-text-field
                        v-model="password"
                        label="密碼"
                        name="password"
                        type="password"
                        color="blue-grey lighten-5"
                      >
                      </v-text-field>
                      <div class="text-center mt-8">
                        <v-btn large rounded color="blue-grey" dark type="submit" class="pa-7"><span class="subtitle-1">註冊</span></v-btn>
                      </div>
                    </v-form>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Users',
  data () {
    return {
      step: 0,
      account: '',
      password: ''
    }
  },
  watch: {
    step (value) {
      if (value === 1) {
        this.$router.replace({ params: { action: 'login' } }).catch(() => {})
      } else {
        this.$router.replace({ params: { action: 'register' } }).catch(() => {})
      }
    }
  },
  methods: {
    register () {
      this.axios.post(process.env.VUE_APP_API + '/users/register', { account: this.account, password: this.password })
        .then(res => {
          if (res.data.success) {
            alert('註冊成功')
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    },
    login () {
      this.axios.post(process.env.VUE_APP_API + '/users/login', { account: this.account, password: this.password })
        .then(res => {
          // console.log(res)
          if (res.data.success) {
            this.$store.commit('login', res.data.result)
            alert('登入成功')
            this.$router.push('/')
          }
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    }
  },
  props: {
    source: String
  },
  mounted () {
    if (this.$route.params.action === 'login') {
      this.step = 1
    } else if (this.$route.params.action === 'register') {
      this.step = 2
    }
  }
}
</script>
