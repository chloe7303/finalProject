<template>
  <v-container>
    <v-row>
      <v-col
      xl="8"
      class="mx-auto"
    >
      <v-sheet
        min-height="70vh"
        rounded="lg"
        class="pa-8 pa-sm-16"
      >
        <h1 class="font-weight-bold pb-8">關於我們，木沐募資</h1>
        <h3 class="font-weight-medium pb-16">木。來自原始，在這裡有原創性的提案。<br>
        沐。讓創意點子融入生活，帶給大眾更便利的日常。<br>
        <br>
        木沐募資，目的在於解決日常生活中的大小問題，<br>
        透過你的力量，才能讓每個提案能順利成功！</h3>

        <h2 class="font-weight-bold pb-10">木沐紀錄</h2>
        <v-timeline>
          <v-timeline-item
            v-for="(year, i) in years"
            :key="i"
            :color="year.color"
            small
          >
            <template v-slot:opposite>
              <span
                :class="`headline font-weight-bold ${year.color}--text`"
                v-text="year.year"
              ></span>
            <div class="py-4">
              <h3
                :class="`font-weight-bold mb-4 ${year.color}--text`"
                v-text="year.title"
              ></h3>
              <div v-text="year.description">
              </div>
            </div>
            </template>
          </v-timeline-item>
        </v-timeline>
      </v-sheet>
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'About',
  data: () => ({
    years: [
      {
        color: 'blue-grey',
        year: '2000',
        title: '成立木沐募資',
        description: ''
      },
      {
        color: 'blue-grey',
        year: '2010',
        title: '贊助總金額 NT$500,000,000'
      },
      {
        color: 'blue-grey',
        year: '2013',
        title: '總贊助人次 NT$1,000,000'
      },
      {
        color: 'blue-grey',
        year: '2018',
        title: '總成功計畫數 2,000 件'
      },
      {
        color: 'yellow',
        year: '2020',
        title: '木沐募資 20 周年'
      }
    ]
  })
}
</script>
