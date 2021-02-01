<template>
  <div id="adminProjects">
    <h1 class="font-weight-bold mb-6">所有計畫</h1>
    <h3 class="font-weight-bold mb-2">共 {{ projects.length }} 筆資料</h3>
    <v-card
      max-width="100%"
      outlined
      v-for="(project, i) in projects"
      :key="project._id"
      class="mb-5"
    >
      <v-list-item three-line>
        <v-list-item-content v-if="project.edit" class="d-block mt-2">
          <v-form ref="form">
            <v-text-field
              label="計畫標題"
              v-model="project.titleModel"
              :rules="titleRules"
              counter="15"
              color="blue-grey"
              outlined
              clearable
            ></v-text-field>

            <v-text-field
              label="副標題"
              v-model="project.subtitleModel"
              :rules="subtitleRules"
              counter="50"
              color="blue-grey"
              outlined
              clearable
            ></v-text-field>

            <v-textarea
              label="計畫說明"
              v-model="project.descriptionModel"
              :rules="descriptionRules"
              counter="300"
              color="blue-grey"
              outlined
              clearable
            ></v-textarea>
          </v-form>
        </v-list-item-content>

        <v-list-item-content v-else>
          <v-list-item-title class="headline">
            {{ project.title }}
          </v-list-item-title>
          <v-list-item-subtitle class="subtitle-1">{{ project.subtitle }}</v-list-item-subtitle>
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
          v-if="!project.edit"
          color="blue-grey"
          rounded
          large
          class="ml-2 px-3"
          :to="'/projects/' + project._id"
        >
          進入計畫
        </v-btn>
        <v-btn
          v-if="!project.edit"
          color="blue-grey"
          rounded
          large
          class="ml-2 px-3"
          @click="edit(project)"
        >
          編輯計畫
        </v-btn>
        <v-btn
          v-if="project.edit"
          color="amber"
          rounded
          large
          class="ml-2 px-3 black--text"
          @click="save(project)"
        >
          保存編輯
        </v-btn>
        <v-btn
          v-if="project.edit"
          color="red"
          rounded
          large
          outlined
          class="ml-2 px-3 font-weight-bold"
          @click="cancel(project)"
        >
          取消編輯
        </v-btn>
        <v-btn
          v-if="!project.edit"
          color="red"
          rounded
          large
          outlined
          class="ml-3 px-3 font-weight-bold"
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
  name: 'adminProjects',
  data: () => ({
    projects: [],
    titleRules: [
      v => !!v || '必填欄位',
      v => v.length <= 15 || '請輸入 15 個字以下',
      v => v.length >= 4 || '請輸入 4 個字以上'
    ],
    subtitleRules: [
      v => v.length <= 50 || '請輸入 50 個字以下'
    ],
    descriptionRules: [
      v => !!v || '必填欄位',
      v => v.length <= 300 || '請輸入 300 個字以下'
    ]
  }),
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    del (project, i) {
      this.axios.delete(`${process.env.VUE_APP_API}/projects/${project._id}`)
        .then(res => {
          if (res.data.success) {
            this.projects.splice(i, 1)
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
    edit (project) {
      project.edit = true
      project.titleModel = project.title
      project.subtitleModel = project.subtitle
      project.descriptionModel = project.description
    },
    cancel (project) {
      project.edit = false
      project.titleModel = project.model
      project.subtitleModel = project.subtitle
      project.descriptionModel = project.description
    },
    save (project, i) {
      if (!this.$refs.form[0].validate()) return

      this.axios.patch(`${process.env.VUE_APP_API}/projects/${project._id}`, { title: project.titleModel, subtitle: project.subtitleModel, description: project.descriptionModel })
        .then(res => {
          if (res.data.success) {
            project.edit = false
            project.title = project.titleModel
            project.subtitle = project.subtitleModel
            project.description = project.descriptionModel
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
    this.axios.get(`${process.env.VUE_APP_API}/projects`)
      .then(res => {
        if (res.data.success) {
          this.projects = res.data.result.map(project => {
            project.image = `${process.env.VUE_APP_API}/projects/image/${project.image}`
            project.edit = false
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
