<template>
  <v-app id="inspire">
    <Navbar/>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-snackbar
      v-model="$store.state.snackbar.show"
      :right="true" :top="true" :timeout="1500" light
    >
      {{ $store.state.snackbar.message }}
    </v-snackbar>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>
