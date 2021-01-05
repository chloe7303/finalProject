<template>
  <v-container>
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
          <h1 class="font-weight-bold pb-8">計畫內容</h1>
            <v-row>
              <v-col cols="12" sm="8">
                <v-card
                  max-width="100%"
                  color="white"
                >
                  <v-img
                    :src="'./images/headphones.jpg'"
                    height="400px"
                  ></v-img>

                  <v-card-title class="black--text">
                    Top western road trips
                  </v-card-title>

                  <v-card-subtitle class="black--text">
                    1,000 miles of wonder
                  </v-card-subtitle>

                  <v-card-actions>
                    <v-btn
                      color="orange lighten-2"
                      text
                    >
                      Explore
                    </v-btn>

                    <v-spacer></v-spacer>

                    <v-btn
                      icon
                      @click="show = !show"
                    >
                      <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                    </v-btn>
                  </v-card-actions>

                  <v-expand-transition>
                    <div v-show="show">
                      <v-divider></v-divider>

                      <v-card-text>
                        I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                      </v-card-text>
                    </div>
                  </v-expand-transition>
                </v-card>
              </v-col>
              <v-col cols="12" sm="4">
                <h2>SUDO | 最輕薄的無線耳機</h2>
                <h3>零感延遲技術 X 臨場環繞音效 今年不可錯過的完美體驗</h3>
                <h5>耳機界的頂級規格，以最高CP值打造零噪音之聆聽環境。搭載台製絡達藍牙5.0晶片， 兼具『無損高音質、極低功耗、連線穩定』， 讓喜歡享受音樂的你有更好的體驗。
                </h5>
                <v-btn
                  color="yellow darken-1"
                  elevation="4"
                  x-large
                  to="/projects/payment"
                >
                  <h2 class="blue-grey--text text--darken-2">贊助專案</h2>
                </v-btn>

                <v-btn outlined color="red" large @click="addToList">
                  <v-icon left>mdi-heart</v-icon>
                  <h2 class="red--text">收藏專案</h2>
                </v-btn>
                <v-progress-linear
                  v-model="progress"
                  color="yellow accent-4"
                  height="15"
                >
                  <strong class="blue-grey--text">{{ Math.ceil(progress) }}%</strong>
                </v-progress-linear>
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
      progress: 75
    }
  },
  methods: {
    addToList (index) {
      this.$store.commit('addItemToList', { itemId: index })
      this.$store.commit('updateSnackbar', { show: true })
    }
  }
}
</script>
