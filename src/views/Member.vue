<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="2">
        <v-sheet rounded="lg">
          <v-list>
            <v-list-item
              v-for="list in lists"
              :key="list.name"
              link
            >
              <v-list-item-content>
                <v-list-item-title>
                  {{ list.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider class="my-2"></v-divider>

            <v-list-item
              link
              color="grey lighten-4"
            >
              <v-list-item-content>
                <v-list-item-title>
                  Refresh
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>

      <v-col cols="12" md="8">
        <v-sheet
          min-height="70vh"
          rounded="lg"
        >
          <!--  -->
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Member',
  data () {
    return {
      lists: [
        { name: '募資紀錄' },
        { name: '收藏清單' }
      ]
    }
  }
}
</script>
