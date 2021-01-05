<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="2">
        <v-sheet rounded="lg">
          <v-list>
            <v-list-item
              v-for="n in 5"
              :key="n"
              link
            >
              <v-list-item-content>
                <v-list-item-title>
                  List Item {{ n }}
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

      <v-col cols="12" sm="8">
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

    }
  }
}
</script>
