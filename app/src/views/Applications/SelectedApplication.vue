<template>
    <v-row justify="center">
        <v-col class="text-center" cols="12" sm="8" md="10" lg="8">
<!--            <span class="text-h5">100%</span>-->
<!--            <v-progress-linear-->
<!--                    rounded-->
<!--                    value="100"-->
<!--                    color="light-green accent-4"-->
<!--                    height="15"-->
<!--                    ></v-progress-linear>-->
            <p class="text-h5 mt-7 primary--text font-weight-medium mt-5">
                Get Reference within your Network
            </p>
            <p class="caption" >Connect other business owners within your social network to endorse your application. </p>
            <v-card>
                <v-snackbar v-model="toast.show" :color="toast.color">
                    {{toast.message}}
                </v-snackbar>
                <v-card-title>
                    <v-text-field
                            v-clipboard="guarantorLink"
                            @success="handleCopied"
                            dense
                            outlined
                            readonly
                            hide-details
                            append-icon="mdi-content-copy"
                            :value="guarantorLink"
                    >
<!--                        <v-icon @click="shareLink" slot="append-outer">mdi-share-variant</v-icon>-->
                    </v-text-field>
                    <v-col v-if="$vuetify.breakpoint.smAndDown" class="px-0 text-right" cols="12">
                        <v-btn
                                @click="shareLink"
                                min-width="120"
                                outlined color="secondary"
                                depressed
                        >share</v-btn>
                    </v-col>
                </v-card-title>
                <v-card-text class="mt-5">
                    <p class="text-h5">Currently you have no guarantors for this application</p>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="$router.push({
                        name: 'application-lenders',
                        params: { id: $route.params.id }
                    })" color="secondary" block large>
                        View recommended lenders
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import {web} from '../../configs'
    export default {
        name: "SelectedApplication",
        computed:{
            guarantorLink(){
                return `${this.webURL}/guarantor/${this.$route.params.id}`
            }
        },
        data(){
            return {
                toast: {
                    show: false,
                    color: '',
                    message: ''
                },
                webURL: web.url,
            }
        },
        methods: {
            handleCopied(){
                this.toast = {
                    show: true,
                    color: 'light-green accent-4',
                    message: 'Link copied'
                }
            },
            shareLink(){
                if (navigator.share) {
                    navigator.share({
                        title: 'Credia Guarantor',
                        text: "You have been selected by a business to be a guarantor",
                        url: this.guarantorLink,
                    })
                        .then(() => console.log('Successful share'))
                        .catch((error) => console.log('Error sharing', error));
                }
            }
        }
    }
</script>

<style scoped>

</style>