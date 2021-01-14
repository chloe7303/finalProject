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
          <h1 class="font-weight-bold pb-6">計畫內容</h1>
            <v-row>
              <v-col cols="12" md="8">
                <v-card
                  max-width="100%"
                  light
                >
                  <v-img
                    :src="project.image"
                    height="400px"
                  ></v-img>

                  <v-card-title>
                    {{ project.title }}
                  </v-card-title>
                  <v-card-subtitle class="subtitle-1 black--text">
                    {{ project.subTitle }}
                  </v-card-subtitle>
                  <v-card-text>
                    {{ project.description }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4" class="mt-8">
                <div class="mb-16">
                  <h1 class="mb-2">{{ project.title }}</h1>
                  <h3>{{ project.subTitle }}</h3>
                </div>
                <div class="mb-12">
                  <h3>提案人： {{ project.proposer }}</h3>
                  <h3>目標金額： {{ project.targetAmount }}</h3>
                  <h3 class="mb-4">已募資金額： {{ project.raisedAmount }}</h3>
                  <v-progress-linear
                  v-model="progress"
                  color="amber"
                  height="20"
                  >
                    <strong class="blue-grey--text text--darken-2">{{ Math.ceil(progress) }}%</strong>
                  </v-progress-linear>
                </div>
                <div>
                  <v-btn
                    color="amber"
                    x-large
                    :to="'/payment/' + project._id"
                    class="mr-4"
                  >
                    <h2 class="blue-grey--text text--darken-2">贊助專案</h2>
                  </v-btn>
                  <v-btn outlined color="red" x-large @click="addToList">
                    <v-icon left>mdi-heart</v-icon>
                    <h2 class="red--text">收藏專案</h2>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Timeboard from '../../components/Timeboard.vue'

export default {
  name: 'Headphones',
  components: {
    Timeboard
  },
  data () {
    return {
      show: false,
      project: ''
    }
  },
  computed: {
    progress () {
      const result = (this.project.raisedAmount / this.project.targetAmount) * 100
      return result
    }
  },
  methods: {
    addToList (index) {
      this.$store.commit('addItemToList', { itemId: index })
      this.$store.commit('updateSnackbar', { show: true })
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/projects?id=' + this.$route.params.id)
      .then(res => {
        if (res.data.success) {
          this.project = res.data.result[0]
          this.project.image = process.env.VUE_APP_API + '/projects/image/' + this.project.image
        } else {
          alert(res.data.message)
        }
      })
      .catch(err => {
        alert(err.response.data.message)
      })
  }
}
</script>
