<template>
  <v-container>
    <v-row justify="center">
      <Timeboard/>
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
                  <v-img :src="'./images/headphones.jpg'" width="300px" class="rounded-l fill-height" position="center center"></v-img>
                </div>
                <div class="d-flex flex-column justify-center">
                  <v-card-title class="pt-0">
                    計畫名稱
                  </v-card-title>
                  <v-card-subtitle>
                    計畫說明
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
            <v-btn text @click="$router.replace('headphones')">
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
            <v-radio-group
              v-model="show"
              column
            >
              <v-radio
                label="信用卡付款"
                color="amber"
                :value="true"
              ></v-radio>
              <h1 v-if="show">信用卡</h1>
              <v-radio
                label="ATM 機器轉帳或銀行臨櫃繳款"
                color="amber"
                :value="false"
              ></v-radio>
              <h1 v-if="!show">ATM</h1>
            </v-radio-group>
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
            <form>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="name"
                    :error-messages="nameErrors"
                    :counter="10"
                    label="姓名"
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                    color="white"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="phone"
                    :error-messages="phoneErrors"
                    :counter="10"
                    label="聯絡電話"
                    @input="$v.phone.$touch()"
                    @blur="$v.phone.$touch()"
                    color="white"
                  ></v-text-field>
                </v-col>
              </v-row>
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="電子信箱"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            color="white"
          ></v-text-field>
          <v-select
            v-model="fundAmount"
            :items="items"
            :error-messages="fundAmountErrors"
            label="贊助金額"
            @change="$v.fundAmount.$touch()"
            @blur="$v.fundAmount.$touch()"
            color="white"
          ></v-select>
          <v-checkbox
            v-model="checkbox"
            :error-messages="checkboxErrors"
            label="我同意隱私權條款"
            @change="$v.checkbox.$touch()"
            @blur="$v.checkbox.$touch()"
            color="white"
            class="mb-4"
          ></v-checkbox>

          <v-btn
            class="mr-4 black--text"
            @click="submit"
            color="amber"
          >
            送出
          </v-btn>
          <v-btn text @click="e6 = 2">
            返回
          </v-btn>
            </form>
          </v-stepper-content>

          </v-stepper>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Timeboard from '../../components/Timeboard.vue'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'Payment',
  components: {
    Timeboard
  },

  // 表單驗證
  validations: {
    name: { required, maxLength: maxLength(10) },
    phone: { required, maxLength: maxLength(10) },
    email: { email },
    fundAmount: { required },
    checkbox: {
      checked (val) {
        return val
      }
    }
  },
  data () {
    return {
      e6: 1,
      show: true,
      name: '',
      phone: '',
      email: '',
      fundAmount: null,
      items: [
        '$1000',
        '$2000',
        '$3000',
        '$4000',
        '$5000'
      ],
      checkbox: false
    }
  },

  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('請輸入 10 個字以下')
      !this.$v.name.required && errors.push('必填欄位')
      return errors
    },
    phoneErrors () {
      const errors = []
      if (!this.$v.phone.$dirty) return errors
      !this.$v.phone.maxLength && errors.push('請輸入 10 個字以下')
      !this.$v.phone.required && errors.push('必填欄位')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('請輸入有效電子郵件')
      return errors
    },
    fundAmountErrors () {
      const errors = []
      if (!this.$v.fundAmount.$dirty) return errors
      !this.$v.fundAmount.required && errors.push('必填欄位')
      return errors
    },
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('必須勾選')
      return errors
    }
  },

  methods: {
    submit () {
      this.$v.$touch()
      if (this.$v.$invalid) return

      alert('表單已送出')
      this.$router.replace('headphones')
    }
  }
}
</script>
