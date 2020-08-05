<template>
  <div class="home">
    <v-row class="text-center" justify="center">
      <v-col cols="12">
        <h2 class="font-weight-bold text-h5 primary--text">
          Which financing option do you prefer?
        </h2>
      </v-col>
      <v-col cols="11" sm="7" md="6">
        <p class="caption">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus morbi lectus eleifend diam rhoncus ut viverra id. Justo, fusce quis tortor, lacus.</p>
      </v-col>
    </v-row>
    <v-row class="mx-0 mx-sm-12 mx-md-7 mx-lg-5">
      <v-col cols="12" sm="6" md="4" lg="4" v-for="(option, i) in finance_options" :key="i">
        <v-card :disabled="option.coming_soon" :ripple="!option.coming_soon" :class="{'coming_soon': option.coming_soon}">
          <v-row justify="end">
            <v-icon class="mr-5 mt-2">mdi-information-outline</v-icon>
          </v-row>
          <v-card-text class="text-center pt-5">
            <v-avatar  size="86" color="blue-grey lighten-5">
              <v-img contain height="54" :src="option.icon"></v-img>
            </v-avatar>
            <p class="mt-5 font-weight-bold black--text">{{option.name}}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  // @ is an alias to /src
  import AddNewApplication from "../components/AddNewApplication";

  export default {
  name: 'Home',
  components: {
    AddNewApplication
  },
  computed:{
    userHasApplication(){
      return this.$store.getters['new_application/has_pending']
    }
  },
    data(){
      return {
        finance_options: [
          { name: 'Business Loans', icon: require('../assets/img/loan_icon.svg'), desc: '' },
          { name: 'Grants & Aid', icon: require('../assets/img/growth.svg'), desc: '', coming_soon: true },
          { name: 'Government Funds', icon: require('../assets/img/gov.svg'), desc: '', coming_soon: true },
          { name: 'Venture Capital', icon: require('../assets/img/loan_icon.svg'), desc: '', coming_soon: true },
          { name: 'Angel Investing', icon: require('../assets/img/loan_icon.svg'), desc: '', coming_soon: true },
        ]
      }
    }
}
</script>
<style scoped>
  .coming_soon{
    background-image: url("../assets/img/Coming_soon_tag.svg");
  }
</style>