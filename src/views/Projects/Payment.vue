<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        xl="2"
        class="d-none d-xl-block"
      >
        <v-sheet
          rounded="lg"
          min-height="268"
          class="pa-8 pa-sm-10"
        >
          <h1 class="font-weight-bold pb-8">倒數募資</h1>
          <Timeboard/>
        </v-sheet>
      </v-col>

      <v-col
        cols="12"
        xl="8"
      >
        <v-sheet
          min-height="70vh"
          rounded="lg"
          class="pa-8 pa-sm-10"
        >
          <h1 class="font-weight-bold pb-8">付款流程</h1>
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
                  <v-img :src="'./images/headphones.jpg'" width="200px"></v-img>
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
            <v-btn text @click="e6 = 1">
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
                    v-model="ex7"
                    column
                  >
                    <v-radio
                      @change="update"
                      label="信用卡付款"
                      color="amber"
                      value="信用卡付款"
                    ></v-radio>
                    <h1 v-if="show">hello</h1>
                    <v-radio
                      label="ATM 機器轉帳或銀行臨櫃繳款"
                      color="amber"
                      value="ATM 機器轉帳或銀行臨櫃繳款"
                    ></v-radio>
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
                <v-col sm="6">
                  <v-text-field
                    v-model="name"
                    :error-messages="nameErrors"
                    :counter="10"
                    label="姓名"
                    required
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col sm="6">
                  <v-text-field
                    v-model="phone"
                    :error-messages="nameErrors"
                    :counter="10"
                    label="聯絡電話"
                    required
                    @input="$v.phone.$touch()"
                    @blur="$v.phone.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
          <v-select
            v-model="select"
            :items="items"
            :error-messages="selectErrors"
            label="Item"
            required
            @change="$v.select.$touch()"
            @blur="$v.select.$touch()"
          ></v-select>
          <v-checkbox
            v-model="checkbox"
            :error-messages="checkboxErrors"
            label="我同意隱私權條款"
            required
            @change="$v.checkbox.$touch()"
            @blur="$v.checkbox.$touch()"
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

export default {
  name: 'Payment',
  components: {
    Timeboard
  },
  data () {
    return {
      e6: 1,
      show: false
    }
  },
  methods: {
    update () {
      this.show = !this.show
    }
  }
}
</script>
