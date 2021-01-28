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
          <h1 class="font-weight-bold pb-6">付款流程</h1>
          <v-stepper
          v-model="e6"
          vertical
          style="background: transparent;"
        >
          <v-stepper-step
            :complete="e6 > 1"
            step="1"
            color="blue-grey"
          >
            確認募資計畫
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-card
              class="mb-12"
              height="200px"
              light
            >
              <div class="d-flex fill-height">
                <div>
                  <v-img :src="project.image" width="300px" class="rounded-l fill-height" position="center center"></v-img>
                </div>
                <div class="d-flex flex-column justify-center">
                  <v-card-title class="pt-0">
                    {{ project.title }}
                  </v-card-title>
                  <v-card-subtitle>
                    {{ project.subtitle }}
                  </v-card-subtitle>
                </div>
              </div>
            </v-card>
            <v-btn
              color="blue-grey"
              @click="e6 = 2"
            >
              下一步
            </v-btn>
            <v-btn text :to="'/projects/' + project._id">
              返回
            </v-btn>
          </v-stepper-content>

          <v-stepper-step
            :complete="e6 > 2"
            step="2"
            color="blue-grey"
          >
            付款方式
          </v-stepper-step>

          <v-stepper-content step="2">
            <v-theme-provider light>
              <v-radio-group
                v-model="show"
                column
              >
                <v-radio
                  label="信用卡付款"
                  color="amber"
                  :value="true"
                  class="mb-5"
                  dark
                ></v-radio>
                  <v-expand-transition>
                    <CreditCard v-if="show"/>
                  </v-expand-transition>
                <v-radio
                  label="ATM 機器轉帳或銀行臨櫃繳款"
                  color="amber"
                  :value="false"
                  class="mt-10"
                  dark
                ></v-radio>
                <span v-if="!show" class="white--text">
                  虛擬帳號轉帳因要等待銀行於工作天回傳，限量的選項可能會在入帳前售罄並造成贊助失敗。<br>
                  臨櫃繳款的截止期限，必須在週一至週五（不含例假日）的下午三點半前完成，週六的郵局轉帳將會造成交易失敗。
                </span>
              </v-radio-group>
            </v-theme-provider>
            <v-btn
              color="blue-grey"
              @click="e6 = 3"
            >
              下一步
            </v-btn>
            <v-btn text @click="e6 = 1">
              返回
            </v-btn>
          </v-stepper-content>

          <v-stepper-step
            :complete="e6 > 3"
            step="3"
            color="blue-grey"
          >
            基本資料
          </v-stepper-step>

          <v-stepper-content step="3">
            <v-form @submit.prevent="submit" ref="form">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    :counter="10"
                    label="姓名"
                    color="white"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="phone"
                    :rules="phoneRules"
                    :counter="10"
                    label="聯絡電話"
                    color="white"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="電子信箱"
                    color="white"
                    class="mb-10"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="11">
                  <v-slider
                    v-model="fundAmount"
                    label="贊助金額"
                    max="10000"
                    min="0"
                    step="1000"
                    thumb-label="always"
                    thumb-size="35"
                    ticks
                    color="blue-grey"
                  ></v-slider>
                </v-col>
                <v-col cols="12" md="1">
                  <v-text-field v-model="fundAmount" :rules="fundAmountRules" prefix="$"></v-text-field>
                </v-col>
              </v-row>
          <v-checkbox
            v-model="checkbox"
            :rules="checkboxRules"
            label="我同意隱私權條款"
            color="white"
            class="mb-4"
          ></v-checkbox>

          <v-btn
            type="submit"
            class="mr-4 black--text"
            color="amber"
          >
            送出
          </v-btn>
          <v-btn text @click="e6 = 2">
            返回
          </v-btn>
            </v-form>
          </v-stepper-content>

          </v-stepper>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreditCard from '../../components/CreditCard.vue'

export default {
  name: 'Payment',
  components: {
    CreditCard
  },
  data () {
    return {
      project: '',
      e6: 1,
      show: true,
      // 表單資料
      name: '',
      phone: '',
      email: '',
      fundAmount: '1000',
      checkbox: false,
      // 表單驗證
      nameRules: [
        v => !!v || '必填欄位',
        v => v.length <= 10 || '請輸入 10 個字以下'
      ],
      phoneRules: [
        v => !!v || '必填欄位',
        v => v.length === 10 || '請輸入正確手機號碼'
      ],
      emailRules: [
        v => /.+@.+/.test(v) || '請輸入有效電子郵件'
      ],
      fundAmountRules: [
        v => !!v || '必填欄位'
      ],
      checkboxRules: [
        v => !!v || '必填欄位'
      ]
    }
  },

  computed: {
    user () {
      return this.$store.state.user
    }
  },

  methods: {
    submit () {
      if (!this.$refs.form.validate()) return

      this.axios.patch(process.env.VUE_APP_API + '/users/' + this.user.id + '/' + this.$route.params.id, { name: this.name, phone: this.phone, email: this.email, fundAmount: this.fundAmount })
        .then(res => {
          if (res.data.success) {
            this.$swal({
              icon: 'success',
              iconColor: '#FFC107',
              title: '完成募資訂單',
              confirmButtonColor: '#607D8B',
              confirmButtonText: '確定'
            })
            // 清空表單
            this.$refs.form.reset()
            // 回計畫頁面
            this.$router.push('/projects/' + this.$route.params.id)
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
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/projects?id=' + this.$route.params.id)
      .then(res => {
        if (res.data.success) {
          this.project = res.data.result[0]
          this.project.image = process.env.VUE_APP_API + '/projects/image/' + this.project.image
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
