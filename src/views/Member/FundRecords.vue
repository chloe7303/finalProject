<template>
  <div id="fundRecords">
    <h1 class="font-weight-bold mb-6">贊助紀錄</h1>
    <h3 class="font-weight-bold mb-2">共 {{ funds.length }} 筆資料</h3>
    <v-row>
      <v-col cols="12" md="6" v-for="fund in funds" :key="fund._id">
        <v-card
          max-width="100%"
          outlined
          class="mb-5"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-3">
                {{ fund.project.title }}
              </v-list-item-title>
              <v-list-item-subtitle class="subtitle-1 amber--text">$ 贊助金額：{{ fund.fundAmount }}</v-list-item-subtitle>
              <v-list-item-subtitle>贊助人：{{ fund.name }}</v-list-item-subtitle>
              <v-list-item-subtitle>連絡電話：{{ fund.phone }}</v-list-item-subtitle>
              <v-list-item-subtitle>電子信箱：{{ fund.email }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="120"
            >
              <v-img :src="fund.project.image"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions class="mb-3">
            <v-btn
              color="blue-grey"
              rounded
              large
              class="ml-2 px-3"
              :to="'/projects/' + fund.project._id"
            >
              進入計畫
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'FundRecords',
  data () {
    return {
      funds: []
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  mounted () {
    this.axios.get(`${process.env.VUE_APP_API}/users/${this.user.id}`)
      .then(res => {
        if (res.data.success) {
          this.funds = res.data.funds.map(fund => {
            fund.project.image = `${process.env.VUE_APP_API}/projects/image/${fund.project.image}`
            return fund
          })
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
