<template>
  <v-container >
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
          <h1 class="font-weight-bold pb-8">募資計畫</h1>
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
  }
}
</script>
