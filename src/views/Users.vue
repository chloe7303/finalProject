<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8">
        <v-card class="elevation-24">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" md="8" class="pa-sm-16">
                  <v-card-text class="mt-8">
                    <h1 class="display-2 text-center font-weight-black">登入</h1>
                    <v-form class="pa-8 px-xl-16 mt-8" @submit.prevent="login">
                      <v-text-field
                        v-model="loginForm.account"
                        :error-messages="loginAccountErrors"
                        :counter="10"
                        label="帳號"
                        type="text"
                        color="white"
                        @input="$v.loginForm.account.$touch()"
                        @blur="$v.loginForm.account.$touch()"
                      >
                      </v-text-field>
                      <v-text-field
                        v-model="loginForm.password"
                        :error-messages="loginPasswordErrors"
                        :counter="10"
                        label="密碼"
                        type="password"
                        color="white"
                        @input="$v.loginForm.password.$touch()"
                        @blur="$v.loginForm.password.$touch()"
                      >
                      </v-text-field>
                      <div class="text-center mt-8">
                        <v-btn type="submit" large rounded color="amber" class="pa-7">
                          <span class="subtitle-1 black--text">登入</span>
                        </v-btn>
                      </div>
                    </v-form>
                  </v-card-text>
                </v-col>
                <v-col cols="12" md="4" class="blue-grey d-flex align-center justify-center">
                  <div>
                    <v-card-text class="display-1 text-center">
                      <h5>還沒建立帳號嗎？</h5>
                    </v-card-text>
                    <div class="text-center my-4">
                        <v-btn rounded outlined class="pa-6" @click="step++">
                          <span class="subtitle-1">註冊</span>
                        </v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row>
                <v-col cols="12" md="4" class="blue-grey d-flex align-center justify-center">
                  <div>
                    <v-card-text class="display-1 text-center">
                      <h5>已經註冊過了？</h5>
                    </v-card-text>
                    <div class="text-center my-4">
                        <v-btn rounded outlined class="pa-6" @click="step++">
                          <span class="subtitle-1">登入</span>
                        </v-btn>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" md="8" class="pa-sm-16">
                  <v-card-text class="mt-8">
                    <h1 class="display-2 text-center font-weight-black">註冊</h1>
                    <v-form class="pa-8 px-xl-16 mt-8" @submit.prevent="register">
                      <v-text-field
                        v-model="registerForm.account"
                        :error-messages="registerAccountErrors"
                        :counter="10"
                        label="帳號"
                        type="text"
                        color="white"
                        @input="$v.registerForm.account.$touch()"
                        @blur="$v.registerForm.account.$touch()"
                      >
                      </v-text-field>
                      <v-text-field
                        v-model="registerForm.password"
                        :error-messages="registerPasswordErrors"
                        :counter="10"
                        label="密碼"
                        type="password"
                        color="white"
                        @input="$v.registerForm.password.$touch()"
                        @blur="$v.registerForm.password.$touch()"
                      >
                      </v-text-field>
                      <v-text-field
                        v-model="registerForm.repeatPassword"
                        :error-messages="repeatPasswordErrors"
                        :counter="10"
                        label="確認密碼"
                        type="password"
                        color="white"
                        @input="$v.registerForm.repeatPassword.$touch()"
                        @blur="$v.registerForm.repeatPassword.$touch()"
                      >
                      </v-text-field>
                      <div class="text-center mt-8">
                        <v-btn large rounded color="amber" type="submit" class="pa-7">
                          <span class="subtitle-1 black--text">註冊</span>
                        </v-btn>
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
import { required, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'Users',

  // 表單驗證
  validations: {
    loginForm: {
      account: { required, minLength: minLength(4) },
      password: { required, minLength: minLength(6) }
    },
    registerForm: {
      account: { required, minLength: minLength(4) },
      password: { required, minLength: minLength(6) },
      repeatPassword: { sameAsPassword: sameAs('password') }
    }
  },
  data: () => ({
    step: 0,
    loginForm: {
      account: '',
      password: ''
    },
    registerForm: {
      account: '',
      password: '',
      repeatPassword: ''
    }
  }),
  computed: {
    user () {
      return this.$store.state.user
    },
    loginAccountErrors () {
      const errors = []
      if (!this.$v.loginForm.account.$dirty) return errors
      !this.$v.loginForm.account.minLength && errors.push('請輸入 4 個字以上')
      !this.$v.loginForm.account.required && errors.push('必填欄位')
      return errors
    },
    loginPasswordErrors () {
      const errors = []
      if (!this.$v.loginForm.password.$dirty) return errors
      !this.$v.loginForm.password.minLength && errors.push('請輸入 6 個字以上')
      !this.$v.loginForm.password.required && errors.push('必填欄位')
      return errors
    },
    registerAccountErrors () {
      const errors = []
      if (!this.$v.registerForm.account.$dirty) return errors
      !this.$v.registerForm.account.minLength && errors.push('請輸入 4 個字以上')
      !this.$v.registerForm.account.required && errors.push('必填欄位')
      return errors
    },
    registerPasswordErrors () {
      const errors = []
      if (!this.$v.registerForm.password.$dirty) return errors
      !this.$v.registerForm.password.minLength && errors.push('請輸入 6 個字以上')
      !this.$v.registerForm.password.required && errors.push('必填欄位')
      return errors
    },
    repeatPasswordErrors () {
      const errors = []
      if (!this.$v.registerForm.repeatPassword.$dirty) return errors
      !this.$v.registerForm.repeatPassword.sameAsPassword && errors.push('請輸入相同密碼')
      // !this.$v.registerForm.repeatPassword.required && errors.push('必填欄位')
      return errors
    }
  },
  watch: {
    step (value) {
      if (value === 1) {
        this.$router.replace({ params: { action: 'login' } }).catch(() => {})
        this.$v.registerForm.$reset()
      } else {
        this.$router.replace({ params: { action: 'register' } }).catch(() => {})
        this.$v.loginForm.$reset()
      }
    }
  },
  methods: {
    register () {
      this.$v.registerForm.$touch()
      if (this.$v.registerForm.$invalid) return

      this.axios.post(`${process.env.VUE_APP_API}/users/register`, { account: this.registerForm.account, password: this.registerForm.password })
        .then(res => {
          if (res.data.success) {
            this.$swal({
              icon: 'success',
              iconColor: '#FFC107',
              title: '註冊成功',
              confirmButtonColor: '#607D8B',
              confirmButtonText: '確定'
            })
            this.step--
            this.registerForm.account = ''
            this.registerForm.password = ''
            this.registerForm.repeatPassword = ''
            this.$v.registerForm.$reset()
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
          this.registerForm.account = ''
          this.registerForm.password = ''
          this.registerForm.repeatPassword = ''
          this.$v.registerForm.$reset()
        })
    },
    login () {
      this.$v.loginForm.$touch()
      if (this.$v.loginForm.$invalid) return

      this.axios.post(`${process.env.VUE_APP_API}/users/login`, { account: this.loginForm.account, password: this.loginForm.password })
        .then(res => {
          // console.log(res)
          if (res.data.success) {
            this.$store.commit('login', res.data.result)
            this.$swal({
              icon: 'success',
              iconColor: '#FFC107',
              title: '登入成功',
              showConfirmButton: false,
              timer: 2000
            })
            if (this.loginForm.account === 'admin') {
              this.$router.push('/admin')
            } else {
              this.$router.push('/')
            }
            this.loginForm.account = ''
            this.loginForm.password = ''
            this.loginForm.repeatPassword = ''
            this.$v.loginForm.$reset()
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
          this.loginForm.account = ''
          this.loginForm.password = ''
          this.loginForm.repeatPassword = ''
          this.$v.loginForm.$reset()
        })
    }
  },
  props: {
    source: String
  },
  mounted () {
    if (this.user.id) {
      this.$swal({
        icon: 'warning',
        iconColor: '#FFC107',
        title: '已登入',
        showConfirmButton: false,
        timer: 2000
      })
      this.$router.push('/')
    }
    if (this.$route.params.action === 'login') {
      this.step = 1
    } else if (this.$route.params.action === 'register') {
      this.step = 2
    }
  }
}
</script>
