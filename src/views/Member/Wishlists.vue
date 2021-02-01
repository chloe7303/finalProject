<template>
<div id="wishlists">
  <h1 class="font-weight-bold mb-6">收藏清單</h1>
  <h3 class="font-weight-bold mb-2">共 {{ wishlists.length }} 筆資料</h3>
  <v-row>
    <v-col cols="12" md="6" v-for="(wishlist, i) in wishlists" :key="wishlist._id">
      <v-card
        max-width="100%"
        outlined
        class="mb-5"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline">
              {{ wishlist.project.title }}
            </v-list-item-title>
            <v-list-item-subtitle class="subtitle-1">
              {{ wishlist.project.subtitle }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar
            tile
            size="120"
          >
            <v-img :src="wishlist.project.image"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-card-actions class="mb-3">
          <v-btn
            color="blue-grey"
            rounded
            large
            class="ml-2 px-3"
            :to="'/projects/' + wishlist.project._id"
          >
            進入計畫
          </v-btn>
          <v-btn
          color="red"
          rounded
          large
          outlined
          class="ml-3 px-3 font-weight-bold"
          @click="del(wishlist, i)"
        >
          取消收藏
        </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</div>
</template>

<script>
export default {
  name: 'Wishlists',
  data: () => ({
    wishlists: []
  }),
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    del (wishlist, i) {
      this.axios.patch(`${process.env.VUE_APP_API}/users/delwishlists/${this.user.id}/${wishlist.project._id}`)
        .then(res => {
          if (res.data.success) {
            this.wishlists.splice(i, 1)
          } else {
            this.$swal({
              icon: 'error',
              title: res.data.message,
              confirmButtonColor: '#607D8B',
              confirmButtonText: '確定'
            })
          }
        })
        .catch(err => {
          this.$swal({
            icon: 'error',
            title: err.response.data.message,
            confirmButtonColor: '#607D8B',
            confirmButtonText: '確定'
          })
        })
    }
  },
  mounted () {
    this.axios.get(`${process.env.VUE_APP_API}/users/wishlists/${this.user.id}`)
      .then(res => {
        if (res.data.success) {
          this.wishlists = res.data.wishlists.map(wishlist => {
            wishlist.project.image = `${process.env.VUE_APP_API}/projects/image/${wishlist.project.image}`
            return wishlist
          })
        } else {
          this.$swal({
            icon: 'error',
            title: res.data.message,
            confirmButtonColor: '#607D8B',
            confirmButtonText: '確定'
          })
        }
      })
      .catch(err => {
        this.$swal({
          icon: 'error',
          title: err.response.data.message,
          confirmButtonColor: '#607D8B',
          confirmButtonText: '確定'
        })
      })
  }
}
</script>
