<template>
  <div class="home">
    <v-row class="text-center" justify="center">
      <v-col cols="12">
        <h2 class="font-weight-bold text-h5 primary--text">
          Which financing option do you prefer?
        </h2>
      </v-col>
      <v-col cols="11" sm="7" md="6">
        <p class="caption">Select the type of funding you would like to apply for, and we’ll help you get started on the process.</p>
      </v-col>
    </v-row>
    <v-row class="mx-0 mx-sm-12 mx-md-7 mx-lg-5">
      <v-col cols="12" sm="6" md="4" lg="4" xl="3" v-for="(option, i) in finance_options" :key="i">
        <v-card flat :disabled="!option.to" :ripple="!!option.to"
                :class="{'coming_soon': !option.to, 'elevation-7': !!option.to}"
                @click="goToNewApplication(option)"
        >
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
      <v-col cols="12" sm="6" md="4" lg="4" xl="3" >
        <v-card min-height="210" outlined color="blue-grey lighten-5" style="border: 1px dashed #969696 !important;">
          <v-card-text class="align-center justify-center text-center mt-16">
            <p class="mt-5 font-weight-bold primary--text">View More</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog max-width="420" v-model="pendingApplicationModal">
      <v-card>
        <v-card-title class="primary--text">
          Pending Application
        </v-card-title>
        <v-card-text>
          It seems you already have a pending application in progress
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn @click="newApplication" depressed color="secondary">start over</v-btn>
          <v-btn @click="continueApplication" depressed color="primary">continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        pendingApplicationModal: false,
        selectedOption: {},
        finance_options: [
          { name: 'Business Loans',
            icon: require('../assets/img/loan_icon.svg'), desc: '',
            to: {name: 'loan-application'},
            type: 'LOAN'
          },
          { name: 'Grants & Aid', icon: require('../assets/img/growth.svg'), desc: ''},
          { name: 'Government Funds', icon: require('../assets/img/gov.svg'), desc: ''},
          { name: 'Venture Capital', icon: require('../assets/img/loan_icon.svg'), desc: ''},
          { name: 'Angel Investing', icon: require('../assets/img/loan_icon.svg'), desc: ''},
        ]
      }
    },
    methods:{
      goToNewApplication(option){
        let pendingApplication = this.$store.getters['new_application/has_pending']
        if(pendingApplication){
          this.pendingApplicationModal = true
          this.selectedOption = option
        }else{
          this.$store.commit('new_application/setApplicationType', option.type)
          this.$router.push(option.to)
        }
      },
      newApplication(){
        this.$store.commit('new_application/resetApplication')
        this.$store.commit('new_application/setApplicationType', this.selectedOption.type)
        this.$router.push(this.selectedOption.to)
      },
      continueApplication(){
        this.$router.push(this.selectedOption.to)
      }
    }
}
</script>
<style scoped>
  .coming_soon{
    background-image: url("../assets/img/Coming_soon_tag.svg");
  }
</style>