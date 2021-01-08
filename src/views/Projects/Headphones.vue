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
                    :src="'./images/headphones.jpg'"
                    height="400px"
                  ></v-img>

                  <v-card-title>
                    SUDO | 最輕薄的耳機
                  </v-card-title>
                  <v-card-subtitle class="subtitle-1 black--text">
                    耳機界的頂級規格，以最高CP值打造零噪音之聆聽環境，讓喜歡享受音樂的你有更好的體驗。
                  </v-card-subtitle>
                  <v-card-text>
                    SUDO 無線耳機結合各種獨家技術，在任何環境皆清晰無比的通話品質、耐用材質以及舒適貼合的設計，提供您絕對的無線自由。結合 TriPort 技術與 Active EQ 功能的 SoundLink 無線耳機，在任何音量都能呈現清脆震撼的音效。想要帶著音樂隨處走，就要有能夠跟上您腳步的耳機。本產品結合防撞材質、玻璃纖維尼龍和抗腐蝕不鏽鋼，能滿足行動生活中的各種挑戰。
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4" class="mt-8">
                <div class="mb-16">
                  <h1 class="mb-2">SUDO | 最輕薄的耳機</h1>
                  <h3>耳機界的頂級規格，以最高CP值打造零噪音之聆聽環境，讓喜歡享受音樂的你有更好的體驗。</h3>
                </div>
                <div class="mb-12">
                  <h3>提案人： </h3>
                  <h3>目標金額： </h3>
                  <h3 class="mb-4">已募資金額： </h3>
                  <v-progress-linear
                  v-model="progress"
                  color="amber"
                  height="15"
                  >
                    <strong class="blue-grey--text text--darken-2">{{ Math.ceil(progress) }}%</strong>
                  </v-progress-linear>
                </div>
                <div>
                  <v-btn
                    color="amber"
                    x-large
                    to="/projects/payment"
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
