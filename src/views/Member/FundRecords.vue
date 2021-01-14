<template>
  <div id="fundRecords">
    <h1 class="font-weight-bold mb-6">募資紀錄</h1>
    <v-row>
      <v-col cols="12" md="6">
        <v-card
          max-width="100%"
          outlined
          class="mb-5"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline">
                我是募資計畫的標題
              </v-list-item-title>
              <v-list-item-subtitle class="subtitle-1">姓名</v-list-item-subtitle>
              <v-list-item-subtitle>電話</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="120"
            >
              <v-img></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions class="mb-3">
            <v-btn
              color="blue-grey"
              rounded
              large
              class="ml-2 px-3"
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
      // data
    }
  }
}
</script>
