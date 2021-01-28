<template>
  <v-sheet rounded="lg" min-height="268" class="pa-8 pa-sm-10">
    <h1 class="font-weight-bold pb-8">結束募資</h1>
    <h2 class="font-weight-medium">{{ title }}</h2>
    <v-row justify="center">
      <v-card
        class="mb-12"
        height="100px"
        light
      >
        <div class="d-flex fill-height">
          <div>
            <v-img src="" width="300px" class="rounded-l fill-height" position="center center"></v-img>
          </div>
          <div class="d-flex flex-column justify-center">
            <v-card-title class="pt-0">
              <!-- code -->
            </v-card-title>
            <v-card-subtitle>
              <!-- code -->
            </v-card-subtitle>
          </div>
        </div>
      </v-card>
    </v-row>
  </v-sheet>
</template>

<script>
export default {
  name: 'History',
  data () {
    return {
      title: '募資計畫一'
    }
  }
}
</script>
