<template>
  <v-container >
    <v-row justify="center">
      <Timeboard/>
      <v-col
        cols="12"
        xl="8"
      >
        <v-sheet
          min-height="70vh"
          rounded="lg"
          class="pa-8 pa-sm-10"
        >
        <div class="d-flex mb-2">
          <h1 class="font-weight-bold d-inline-block">募資計畫</h1>
          <v-btn v-if="user.id.length" class="ml-auto mr-8 black--text" fab color="amber" to="/add">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
          <CrowdfundingCard/>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Timeboard from '../components/Timeboard.vue'
import CrowdfundingCard from '../components/CrowdfundingCard.vue'
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    Timeboard,
    CrowdfundingCard
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>
