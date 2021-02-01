<template>
  <div id="crowdfundingCard">
    <v-row class="mx-auto">
      <v-card
      min-width="320" max-width="320" elevation="24" color="blue-grey"
      v-for="(project, i) in projects" :key="project.
      _id" class="ma-5" :to="'/projects/' + project._id"
      >
        <v-img :src="project.image" height="210">
          <v-btn v-if="project.favorite" icon large color="red" absolute bottom right @click.prevent="delWishlist(project, i)">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn v-else icon large color="red" absolute bottom right @click.prevent="addWishlist(project, i)">
            <v-icon>mdi-heart-outline</v-icon>
          </v-btn>
          <v-snackbar
            v-model="addSnackbar.show"
            right top timeout="1500" color="red"
          >
            {{ addSnackbar.message }}
          </v-snackbar>
          <v-snackbar
            v-model="delSnackbar.show"
            right top timeout="1500" color="red"
          >
            {{ delSnackbar.message }}
          </v-snackbar>
        </v-img>
        <v-card-title
          primary-title class="pa-5 py-5 flex-column align-start"
          style="background: white"
        >
          <h1 class="headline mb-3 black--text font-weight-black">{{ project.title}}</h1>
          <span class="body-1 grey--text text--darken-1">{{ project.subtitle }}</span>
        </v-card-title>
        <v-progress-linear
          v-model="project.progress"
          color="yellow accent-4"
          height="15"
          style="background: white"
        >
        </v-progress-linear>

        <v-card-actions class="py-5">
          <v-row class='flex-nowrap' no-gutters>
            <v-col cols='6'>
              <v-sheet tile class="text-lowercase white--text pl-3" color='transparent'>已募集</v-sheet>
              <v-btn text dark class="font-weight-black headline">$ {{ new Intl.NumberFormat().format(project.raisedAmount) }}</v-btn>
            </v-col>
            <v-col cols='6'>
              <v-row no-gutters justify='space-between'>
                <v-col cols='auto'>
                  <v-divider vertical color="#BDBDBD"></v-divider>
                </v-col>
                <v-col cols='auto'>
                  <v-sheet tile class="text-lowercase white--text pl-3 text-left" color='transparent'>目標金額</v-sheet>
                  <v-btn text dark class="font-weight-black headline">$ {{ new Intl.NumberFormat().format(project.targetAmount) }}</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'CrowdfundingCard',
  data: () => ({
    projects: [],
    wishlists: [],
    addSnackbar: {
      show: false,
      message: '加入收藏清單！'
    },
    delSnackbar: {
      show: false,
      message: '取消收藏'
    }
  }),
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    addWishlist (project, i) {
      if (!this.user.id) {
        this.$swal({
          icon: 'warning',
          iconColor: '#FFC107',
          title: '請先登入',
          confirmButtonColor: '#607D8B',
          confirmButtonText: '確定'
        })
        return
      }
      this.axios.patch(`${process.env.VUE_APP_API}/users/wishlists/${this.user.id}/${project._id}`)
        .then(res => {
          if (res.data.success) {
            this.wishlists = res.data.wishlists
            this.projects[i].favorite = true
            this.addSnackbar.show = true
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
    },
    delWishlist (project, i) {
      this.axios.patch(`${process.env.VUE_APP_API}/users/delwishlists/${this.user.id}/${project._id}`)
        .then(res => {
          if (res.data.success) {
            this.wishlists = res.data.wishlists
            this.projects[i].favorite = false
            this.delSnackbar.show = true
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
  async mounted () {
    // 未登入時
    if (!this.user.id) {
      const res = await this.axios.get(`${process.env.VUE_APP_API}/projects`)
      if (res.data.success) {
        this.projects = res.data.result.map(project => {
          project.image = `${process.env.VUE_APP_API}/projects/image/${project.image}`
          project.progress = Math.ceil((project.raisedAmount / project.targetAmount) * 100)
          return project
        })
      } else {
        this.$swal({
          icon: 'error',
          title: res.data.message,
          confirmButtonColor: '#607D8B',
          confirmButtonText: '確定'
        })
      }
      return
    }
    // 有登入時
    try {
      let res = await this.axios.get(`${process.env.VUE_APP_API}/users/wishlists/${this.user.id}`)
      if (res.data.success) {
        this.wishlists = res.data.wishlists
      } else {
        this.$swal({
          icon: 'error',
          title: res.data.message,
          confirmButtonColor: '#607D8B',
          confirmButtonText: '確定'
        })
      }

      res = await this.axios.get(`${process.env.VUE_APP_API}/projects`)
      if (res.data.success) {
        this.projects = res.data.result.map(project => {
          project.image = `${process.env.VUE_APP_API}/projects/image/${project.image}`
          project.progress = Math.ceil((project.raisedAmount / project.targetAmount) * 100)
          project.favorite = this.wishlists.some(whishlist => {
            return whishlist.project._id === project._id
          })
          return project
        })
      } else {
        this.$swal({
          icon: 'error',
          title: res.data.message,
          confirmButtonColor: '#607D8B',
          confirmButtonText: '確定'
        })
      }
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: error.response.data.message,
        confirmButtonColor: '#607D8B',
        confirmButtonText: '確定'
      })
    }
  }
}
</script>
