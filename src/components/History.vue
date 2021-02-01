<template>
  <v-sheet rounded="lg" min-height="268" class="pa-8 pa-sm-10">
    <h1 class="font-weight-bold">成功募資</h1>
    <v-row justify="center">
      <v-col v-for="project in projects" :key="project._id">
        <v-hover v-slot="{ hover }">
          <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
            <v-img :src="project.image" class="rounded-l fill-height" position="center center" height="100px">
              <v-card-title class="title fill-height">
                <v-row class="fill-height" justify="center" align="center">
                  <span class="body-1">{{ project.title }}</span>
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
    projects: []
  }),
  mounted () {
    this.axios.get(`${process.env.VUE_APP_API}/projects`)
      .then(res => {
        if (res.data.success) {
          // 如果募資成功
          this.projects = res.data.result.filter(project => project.raisedAmount >= project.targetAmount)
          this.projects = this.projects.map(project => {
            project.image = `${process.env.VUE_APP_API}/projects/image/${project.image}`
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
