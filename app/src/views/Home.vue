<template>
  <div class="home">
    <h2 class="mb-3 font-weight-regular">Applications</h2>
    <v-card flat color="accent" dark>
      <v-card-text class="">
        <v-row align="center">
          <v-col cols="12" sm="7" lg="9">
            <span class="subtitle-2 white--text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel ullamcorper.
            </span>
          </v-col>
          <v-col cols="12" sm="5" lg="3">
            <v-btn block depressed large color="secondary">Start you Application</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
