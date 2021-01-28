<template>
  <div id="msgRecords">
    <h1 class="font-weight-bold mb-6">留言紀錄</h1>
    <h3 class="font-weight-bold mb-2">共 {{ msgBoards.length }} 筆資料</h3>
    <v-card
      max-width="100%"
      outlined
      v-for="(item, i) in msgBoards"
      :key="item.msgBoard._id"
      class="mb-5"
    >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline mb-3">
          {{ item.title }}
        </v-list-item-title>
        <v-list-item-subtitle class="subtitle-1 amber--text mb-2">留言內容：{{ item.msgBoard.message }}</v-list-item-subtitle>
          <div class="d-flex">
            <v-list-item-subtitle class="subtitle-1 d-inline">留言時間：{{ new Date(item.msgBoard.date).toLocaleString() }}</v-list-item-subtitle>
            <v-card-actions class="mt-n8">
              <v-btn
                color="blue-grey"
                rounded
                large
                class="ml-2 px-3"
                :to="'/projects/' + item._id"
              >
                進入計畫
              </v-btn>
              <v-btn color="red" rounded outlined large class="ml-3 px-3 font-weight-bold" @click="del(item, i)">刪除留言</v-btn>
            </v-card-actions>
          </div>
      </v-list-item-content>
    </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'MsgRecords',
  data () {
    return {
      msgBoards: []
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    del (item, i) {
      this.axios.patch(`${process.env.VUE_APP_API}/users/msgboard/${this.user.id}/${item.msgBoard._id}`)
        .then(res => {
          if (res.data.success) {
            this.msgBoards.splice(i, 1)
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
    this.axios.get(`${process.env.VUE_APP_API}/users/msgboard/${this.user.id}`)
      .then(res => {
        if (res.data.success) {
          this.msgBoards = res.data.result
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
