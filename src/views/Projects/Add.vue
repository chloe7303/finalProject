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
          <v-form class="pa-6" @submit.prevent="submit" ref="form">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="title"
                  :rules="titleRules"
                  :counter="15"
                  label="標題"
                  color="white"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="proposer"
                  :rules="proposerRules"
                  label="提案人"
                  color="white"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-text-field
              v-model="subtitle"
              :rules="subtitleRules"
              :counter="50"
              label="副標題"
              color="white"
            ></v-text-field>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="targetAmount"
                  :rules="targetAmountRules"
                  label="目標金額"
                  color="white"
                  outlined
                  append-icon="mdi-currency-twd"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-file-input
                  type="file"
                  accept="image/*"
                  v-model="image"
                  :rules="imageRules"
                  show-size
                  counter
                  label="上傳圖片"
                  color="white"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-textarea
              v-model="description"
              :rules="descriptionRules"
              :counter="300"
              label="計畫說明"
              color="white"
              class="mb-4"
            ></v-textarea>
            <!-- date picker -->
            <v-row class="mb-6">
              <v-col
                cols="12"
                md="6"
              >
                <v-date-picker
                  v-model="dates"
                  range
                  color="blue-grey"
                  :first-day-of-week="0"
                  locale="zh-cn"
                  :landscape="true"
                  min="2020-01-20"
                ></v-date-picker>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  :value="dateRangeText"
                  label="計畫期間"
                  prepend-icon="mdi-calendar"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          <v-btn
            type="submit"
            class="mr-4 black--text"
            color="amber"
          >
            新增
          </v-btn>
          <v-btn text to="/">
            返回
          </v-btn>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Add',
  data: () => ({
    title: '',
    subtitle: '',
    proposer: '',
    targetAmount: '',
    image: [],
    description: '',
    // 表單驗證
    titleRules: [
      v => !!v || '必填欄位',
      v => v.length >= 4 || '請輸入 4 個字以上',
      v => v.length <= 15 || '請輸入 15 個字以下'
    ],
    proposerRules: [
      v => !!v || '必填欄位'
    ],
    subtitleRules: [
      v => !!v || '必填欄位',
      v => v.length <= 15 || '請輸入 50 個字以下'
    ],
    targetAmountRules: [
      v => !!v || '必填欄位',
      v => !isNaN(v) || '請輸入數字'
    ],
    imageRules: [
      v => !!v || '請上傳圖片'
    ],
    descriptionRules: [
      v => !!v || '必填欄位',
      v => v.length <= 300 || '請輸入 300 個字以下'
    ],
    // 日期
    dates: [new Date().toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)]
  }),

  computed: {
    dateRangeText () {
      return this.dates.join(' ~ ')
    }
  },

  methods: {
    submit () {
      if (!this.$refs.form.validate()) return

      if (this.image.size > 1024 * 1024) {
        this.$swal({
          icon: 'warning',
          iconColor: '#FFC107',
          title: '圖片請小於 1MB',
          confirmButtonColor: '#607D8B',
          confirmButtonText: '確定'
        })
      } else if (!this.image.type.includes('image')) {
        this.$swal({
          icon: 'warning',
          iconColor: '#FFC107',
          title: '檔案格式錯誤',
          confirmButtonColor: '#607D8B',
          confirmButtonText: '確定'
        })
      } else {
        const formData = new FormData()
        formData.append('image', this.image)
        formData.append('title', this.title)
        formData.append('subtitle', this.subtitle)
        formData.append('proposer', this.proposer)
        formData.append('targetAmount', this.targetAmount)
        formData.append('description', this.description)
        formData.append('begin', this.dates[0])
        formData.append('finish', this.dates[1])

        this.axios.post(process.env.VUE_APP_API + '/projects/add', formData)
          .then(res => {
            if (res.data.success) {
              this.$swal({
                icon: 'success',
                iconColor: '#FFC107',
                title: '已新增計畫',
                confirmButtonColor: '#607D8B',
                confirmButtonText: '確定'
              })
              // 清空表單
              this.$refs.form.reset()
              // 回主頁
              this.$router.push('/')
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
}
</script>
