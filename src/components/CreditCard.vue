<template>
  <v-card max-width="600">
    <v-card-title class="blue-grey white--text font-weight-black">
    PAYMENT<br>
    DETAILS<v-spacer></v-spacer>
    <v-img
      aspect-ratio="3.075" max-height="40" :src="visaImage" position="right" contain
    />
    </v-card-title>

    <v-card-text class="pb-10" style="color:black;">
    <v-row>
      <v-col cols="6">
        <v-subheader class="black--text pl-0 subheader">持卡人</v-subheader>
        <v-text-field
          single-line outlined hide-details color="blue-grey" label="黃珈崎"
        />
      </v-col>

      <v-col cols="6">
        <v-subheader class="black--text pl-0 subheader">信用卡卡號</v-subheader>
          <v-text-field
            single-line outlined mask="credit-card" hide-details label="4478 6322 9923 8990" color="blue-grey"
          />
      </v-col>

      <v-col col="4">
        <v-subheader class="black--text pl-0 subheader">有效期限</v-subheader>
        <v-text-field
          single-line outlined hide-details color="blue-grey" label="04"
        />
      </v-col>

      <v-col col="4">
        <v-subheader class="grey--text text--lighten-1 pl-0 subheader"></v-subheader>
        <v-text-field
          single-line outlined hide-details color="blue-grey" label="2025"
        />
      </v-col>

      <v-col col="4">
        <v-subheader class="black--text pl-0 subheader">CVV</v-subheader>
        <v-text-field single-line outlined hide-details label="487" color="blue-grey"/>
      </v-col>

    </v-row>
    </v-card-text>

  </v-card>
</template>

<script>
export default {
  name: 'CreditCard',
  data () {
    return {
      visaImage: 'https://i.imgur.com/lY1wk82.png',
      valueOfCardNumber: '4478 6322 9923 8990',
      mask: 'credit-card'
    }
  }
}
</script>
