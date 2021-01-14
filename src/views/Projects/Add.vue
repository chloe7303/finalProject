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
          <form class="pa-6" @submit.prevent="submit">
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
                  append-icon="mdi-currency-twd"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-file-input
                  v-model="image"
                  :error-messages="imageErrors"
                  show-size
                  counter
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
            type="submit"
            color="amber"
          >
            新增
          </v-btn>
          <v-btn text to="/">
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
    image: { required }
  },
  data () {
    return {
      title: '',
      subTitle: '',
      proposer: '',
      targetAmount: '',
      image: '',
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
    imageErrors () {
      const errors = []
      if (!this.$v.image.$dirty) return errors
      !this.$v.image.required && errors.push('必填欄位')
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

      if (this.image.size > 1024 * 1024) {
        alert('圖片請小於 1MB')
      } else if (!this.image.type.includes('image')) {
        alert('檔案格式錯誤')
      } else {
        const formData = new FormData()
        formData.append('image', this.image)
        formData.append('title', this.title)
        formData.append('subTitle', this.subTitle)
        formData.append('proposer', this.proposer)
        formData.append('targetAmount', this.targetAmount)
        formData.append('description', this.description)

        this.axios.post(process.env.VUE_APP_API + '/projects/add', formData)
          .then(res => {
            if (res.data.success) {
              alert('已新增計畫')
              // 清空表單
              this.title = ''
              this.subTitle = ''
              this.proposer = ''
              this.targetAmount = ''
              this.image = ''
              this.description = ''
              this.$v.$reset()
              // 回主頁
              this.$router.push('/')
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
}
</script>
