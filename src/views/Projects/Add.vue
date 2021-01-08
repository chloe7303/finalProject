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
          <h1 class="font-weight-bold">新增計畫</h1>
          <form class="pa-6">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="title"
                  :error-messages="titleErrors"
                  :counter="15"
                  label="標題"
                  @input="$v.title.$touch()"
                  @blur="$v.title.$touch()"
                  color="white"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="proposer"
                  :error-messages="proposerErrors"
                  label="提案人"
                  @input="$v.proposer.$touch()"
                  @blur="$v.proposer.$touch()"
                  color="white"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-text-field
              v-model="subTitle"
              :error-messages="subTitleErrors"
              :counter="50"
              label="副標題"
              @input="$v.subTitle.$touch()"
              @blur="$v.subTitle.$touch()"
              color="white"
            ></v-text-field>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="targetAmount"
                  :error-messages="targetAmountErrors"
                  label="目標金額"
                  @input="$v.targetAmount.$touch()"
                  @blur="$v.targetAmount.$touch()"
                  color="white"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-file-input
                  v-model="images"
                  :error-messages="imagesErrors"
                  show-size
                  counter
                  multiple
                  label="上傳圖片"
                  color="white"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-textarea
              v-model="description"
              :error-messages="descriptionErrors"
              :counter="300"
              label="計畫說明"
              @input="$v.description.$touch()"
              @blur="$v.description.$touch()"
              color="white"
              class="mb-4"
            ></v-textarea>

          <v-btn
            class="mr-4 black--text"
            @click="submit"
            color="amber"
          >
            新增
          </v-btn>
          <v-btn text @click="e6 = 2">
            返回
          </v-btn>
          </form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, minLength, maxLength, numeric } from 'vuelidate/lib/validators'

export default {
  name: 'Add',
  // 表單驗證
  validations: {
    title: { required, minLength: minLength(4), maxLength: maxLength(15) },
    subTitle: { maxLength: maxLength(50) },
    proposer: { required },
    targetAmount: { required, numeric },
    description: { maxLength: maxLength(300) },
    images: { required }
  },
  data () {
    return {
      title: '',
      subTitle: '',
      proposer: '',
      targetAmount: '',
      images: [],
      description: ''
    }
  },

  computed: {
    titleErrors () {
      const errors = []
      if (!this.$v.title.$dirty) return errors
      !this.$v.title.minLength && errors.push('請輸入 4 個字以上')
      if (!this.$v.title.$dirty) return errors
      !this.$v.title.maxLength && errors.push('請輸入 15 個字以下')
      !this.$v.title.required && errors.push('必填欄位')
      return errors
    },
    subTitleErrors () {
      const errors = []
      if (!this.$v.subTitle.$dirty) return errors
      !this.$v.subTitle.maxLength && errors.push('請輸入 50 個字以下')
      return errors
    },
    proposerErrors () {
      const errors = []
      if (!this.$v.proposer.$dirty) return errors
      !this.$v.proposer.required && errors.push('必填欄位')
      return errors
    },
    targetAmountErrors () {
      const errors = []
      if (!this.$v.targetAmount.$dirty) return errors
      !this.$v.targetAmount.numeric && errors.push('請輸入數字')
      !this.$v.targetAmount.required && errors.push('必填欄位')
      return errors
    },
    imagesErrors () {
      const errors = []
      if (!this.$v.images.$dirty) return errors
      !this.$v.images.required && errors.push('必填欄位')
      return errors
    },
    descriptionErrors () {
      const errors = []
      if (!this.$v.description.$dirty) return errors
      !this.$v.description.maxLength && errors.push('請輸入 300 個字以下')
      return errors
    }
  },

  methods: {
    submit () {
      this.$v.$touch()
      if (this.$v.$invalid) return

      alert('以新增計畫')
      this.$router.push('/')
    }
  }
}
</script>
