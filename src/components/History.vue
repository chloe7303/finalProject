<template>
  <v-sheet rounded="lg" min-height="268" class="pa-8 pa-sm-10">
    <h1 class="font-weight-bold">結束募資</h1>
    <v-row justify="center">
      <v-col>
        <v-hover v-slot="{ hover }">
          <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
            <v-img src="../../public/smartlock.jpg" class="rounded-l fill-height" position="center center" height="100px">
              <v-card-title class="title fill-height">
                <v-row class="fill-height" justify="center" align="center">
                  <span class="body-1">智慧宅 | 無限監控電子鎖</span>
                </v-row>
              </v-card-title>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
export default {
  name: 'History',
  data: () => ({
    title: '募資計畫一'
  })
}
</script>

<style scoped>
.v-card {
  transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
