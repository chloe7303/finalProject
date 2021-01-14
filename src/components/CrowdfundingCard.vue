<template>
  <div id="crowdfundingCard">
    <v-row justify="center">
      <v-card
      min-width="320" max-width="320" elevation="24" color="blue-grey"
      v-for="project in projects" :key="project.
      _id" class="ma-5" :to="'/projects/' + project._id"
      >
        <v-img :src="project.image" height="210">
          <v-btn icon large color="red" absolute bottom right @click.prevent="addToList">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </v-img>
        <v-card-title
          primary-title class="pa-5 py-5 flex-column align-start"
          style="background: white"
        >
          <h1 class="headline mb-3 black--text font-weight-black">{{ project.title}}</h1>
          <span class="body-1 grey--text text--darken-1">{{ project.subTitle }}</span>
        </v-card-title>
        <v-progress-linear
          v-model="project.progress"
          color="yellow accent-4"
          height="15"
          style="background: white"
        >
        </v-progress-linear>

        <v-card-actions class="pa-5">
          <v-row class='flex-nowrap' no-gutters>
            <v-col cols='6'>
              <v-sheet tile class="text-lowercase white--text pl-3" color='transparent'>已募集</v-sheet>
              <v-btn text dark class="font-weight-black headline">$ {{ project.raisedAmount }}</v-btn>
            </v-col>
            <v-col cols='6'>
              <v-row no-gutters justify='space-between'>
                <v-col cols='auto'>
                  <v-divider vertical color="#BDBDBD"></v-divider>
                </v-col>
                <v-col cols='auto'>
                  <v-sheet tile class="text-lowercase white--text pl-3 text-left" color='transparent'>目標金額</v-sheet>
                  <v-btn text dark class="font-weight-black headline">$ {{ project.targetAmount }}</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'CrowdfundingCard',
  data () {
    return {
      projects: []
    }
  },
  computed: {
  },
  methods: {
    addToList (index) {
      this.$store.commit('addItemToList', { itemId: index })
      this.$store.commit('updateSnackbar', true)
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/projects')
      .then(res => {
        if (res.data.success) {
          this.projects = res.data.result.map(project => {
            project.image = process.env.VUE_APP_API + '/projects/image/' + project.image
            project.progress = Math.ceil((project.raisedAmount / project.targetAmount) * 100)
            return project
          })
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
