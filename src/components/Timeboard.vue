<template>
  <v-sheet rounded="lg" min-height="260" class="pa-8 pa-sm-10">
    <h1 class="font-weight-bold pb-4">倒數募資</h1>
    <h3 class="font-weight-medium">{{ title }}</h3>
    <v-row justify="center">
      <v-card
        height="100" color="blue-grey darken-3" elevation="24"
        class="py-4 px-5" width="600" dark
      >
        <v-card-text class="py-1">
          <v-row no-gutters>
            <v-col cols="12">
              <v-row no-gutters>
                <v-col cols="4" class="text-center">
              <span class="display-1 font-weight-bold amber--text">11</span><br>
              <span class="caption grey--text font-weight-bold">DAYS</span>
                </v-col>
                <v-col cols="4" class="d-flex justify-center align-center headline font-weight-bold">:</v-col>
                <v-col cols="4" class="text-center">
              <span class="display-1 font-weight-bold amber--text">21</span><br>
              <span class="caption grey--text font-weight-bold">HOURS</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <h3 class="body-1 pa-5">在 2021/12/31 23:59 募資結束前，您都可以持續贊助此計畫。</h3>
    </v-row>
  </v-sheet>
</template>

<script>
export default {
  name: 'Timeboard',
  data () {
    return {
      title: 'JOJ | 簡約藍牙音響'
    }
  }
}
</script>
