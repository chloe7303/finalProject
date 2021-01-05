<template>
  <div id="crowdfundingCard">
    <v-row justify="center">
      <v-card
      min-width="320" max-width="320" elevation="24" color="blue-grey"
      v-for="project in $store.state.projects" :key="project.id" class="ma-5" :to="project.link"
      >
        <v-img :src="project.file" height="210">
          <v-btn icon large color="red" absolute bottom right @click.prevent="addToList">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </v-img>
        <v-card-title
          primary-title class="pa-5 py-5 flex-column align-start"
          style="background: white"
        >
          <h1 class="headline mb-3 black--text font-weight-black">{{ project.title}}</h1>
          <span class="body-1 grey--text text--darken-1">{{ project.description }}</span>
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
              <v-btn text dark class="font-weight-black headline">$ {{ project.raisedFund }}</v-btn>
            </v-col>
            <v-col cols='6'>
              <v-row no-gutters justify='space-between'>
                <v-col cols='auto'>
                  <v-divider vertical color="#BDBDBD"></v-divider>
                </v-col>
                <v-col cols='auto'>
                  <v-sheet tile class="text-lowercase white--text pl-3 text-left" color='transparent'>目標金額</v-sheet>
                  <v-btn text dark class="font-weight-black headline">$ {{ project.targetFund }}</v-btn>
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
    }
  },
  methods: {
    addToList (index) {
      this.$store.commit('addItemToList', { itemId: index })
      this.$store.commit('updateSnackbar', true)
    }
  }
}
</script>
