<template>
    <v-row justify="center">
        <v-col class="text-center" cols="12" sm="12" md="11" lg="11" xl="10">
            <p class="text-h5 primary--text font-weight-medium ">
                Compare Lenders
            </p>
            <p class="caption" >You’ve been matched with these Lenders, you can find out more information about them before submitting your application</p>
            <v-card flat>
                <v-card-text>
                    <v-row justify="space-around">
                        <v-col v-for="(header, i) in headers" :key="i">
                            {{header.text}}
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
            <v-card class="mt-5" v-for="(lender , i) in data" :key="i" flat>
                <div v-if="lender.recommended" class="pa-0 mb-n3 green white--text">Recommended</div>
                <v-card-text>
                    <v-row justify="space-around">
                        <v-col>
                            <v-img contain aspect-ratio="2" :src="lender.cover_img" alt="Cover Img"></v-img>
                        </v-col>
                        <v-col>
                            {{lender.type}}
                        </v-col>
                        <v-col>
                            {{lender.range}}
                        </v-col>
                        <v-col>
                            {{lender.rate}}
                        </v-col>
                        <v-col>
                            {{lender.tenor}}
                        </v-col>
                        <v-col>
                            <v-btn @click="$router.push({
                                name: 'application-lenders-bio',
                                params: {
                                    id: $route.params.id,
                                    lender_id: '121d1d2d12d21d12d12d'
                                }
                            })" depressed color="secondary">
                                View more
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "ApplicationLendersList",
        data(){
            return {
                headers: [
                    { text: 'Lender', value: 'cover_img', align: 'center'},
                    { text: 'Lender Type', value: 'type', align: 'center' },
                    { text: 'Loan Range', value: 'range', align: 'center' },
                    { text: 'Interest Rate', value: 'rate', align: 'center' },
                    { text: 'Loan Tenor', value: 'tenor' , align: 'center'},
                    { text: '', value: 'actions' }
                ],
                data: [
                    { cover_img: require('../../assets/lenders/hmb.png'), type: 'Micro Finance', range: '250,000 - 500,000', rate: '15% - 20%', tenor: '6 months', recommended: true },
                    { cover_img: require('../../assets/lenders/add.jpg'), type: 'Micro Finance', range: '250,000 - 500,000', rate: '15% - 20%', tenor: '6 months' },
                    { cover_img: require('../../assets/lenders/boi.jpg'), type: 'Micro Finance', range: '250,000 - 500,000', rate: '15% - 20%', tenor: '6 months' },
                    { cover_img: require('../../assets/lenders/stan.jpg'), type: 'Micro Finance', range: '250,000 - 500,000', rate: '15% - 20%', tenor: '6 months' },
                    { cover_img: require('../../assets/lenders/zed.jpg'), type: 'Micro Finance', range: '250,000 - 500,000', rate: '15% - 20%', tenor: '6 months' },

                ]
            }
        }
    }
</script>

<style scoped>
    .recommended{
        background-image: url("../../assets/img/reccomended_bg.svg");
        background-size: 60px;
    }
</style>