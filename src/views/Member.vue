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
              exact
              :to="'/member' + list.path"
            >
              <v-list-item-content>
                <v-list-item-title>
                  {{ list.name }}
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
          class="pa-8 pa-sm-10"
        >
          <router-view></router-view>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AddRecords',
  data () {
    return {
      lists: [
        {
          name: '募資紀錄',
          path: ''
        },
        {
          name: '收藏清單',
          path: '/wishlists'
        },
        {
          name: '新增紀錄',
          path: '/addRecords'
        }
      ]
    }
  }
}
</script>
