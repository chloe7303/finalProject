<template>
  <div id="addRecords">
    <h1 class="font-weight-bold mb-6">新增紀錄</h1>
    <v-card
      max-width="100%"
      outlined
      v-for="project in projects"
      :key="project._id"
      class="mb-5"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline">
            {{ project.title }}
          </v-list-item-title>
          <v-list-item-subtitle class="subtitle-1">{{ project.subTitle }}</v-list-item-subtitle>
          <v-list-item-subtitle>{{ project.description }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar
          tile
          size="120"
        >
          <v-img :src="project.image"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions class="mb-3">
        <v-btn
          color="blue-grey"
          rounded
          large
          class="ml-2 px-3"
          :to="'/projects/' + project._id"
        >
          進入計畫
        </v-btn>
        <v-btn
          color="red"
          rounded
          large
          outlined
          class="ml-3 px-3"
          @click="del(project, i)"
        >
          刪除計畫
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'AddRecords',
  data () {
    return {
      projects: []
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    del (project, i) {
      this.axios.delete(process.env.VUE_APP_API + '/projects/' + project._id)
        .then(res => {
          if (res.data.success) {
            this.projects.splice(i, 1)
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/projects?user=' + this.user.id)
      .then(res => {
        if (res.data.success) {
          this.projects = res.data.result.map(project => {
            project.image = process.env.VUE_APP_API + '/projects/image/' + project.image
            return project
          })
        } else {
          alert(res.data.message)
        }
      })
      .catch(err => {
        alert(err.response.data.message)
      })
  }
}
</script>
