<template>
    <v-row>
        <v-col cols="12">
            <v-btn @click="$router.go(-1)">Back</v-btn>
        </v-col>
        <v-col cols="12">
            <v-card>
                <v-card-text class="row">
                    <v-col cols="12" md="7">
                        <v-row>
                            <v-col cols="5" sm="3">
                                <v-avatar style="border: 1px solid #C4C4C4" class="pa-3" size="120">
                                    <v-img contain src="../../assets/lenders/hmb.png"></v-img>
                                </v-avatar>
                            </v-col>
                            <v-col cols="7" sm="">
                                <p class="ma-0">REF ID:  123456789</p>
                                <p class="text-h5 ma-0 font-weight-bold">Hackman Microfinance Bank</p>
                            </v-col>
                        </v-row>
                        <p class="text-h5 primary--text mt-7">About</p>
                        <p class="">Hackman MicroFinance Bank Nigeria Limited is tomorrow’s Bank today.
                            Regulated by the Central Bank of Nigeria and based in Lagos, Hackman MFB leverages on its mobile agents to provide micro financial services to small and medium customers. We are truly the peoples’ bank leveraging on technology and the power of aggregation to bridge the gap between the rich and the poor in Nigeria.
                        </p>
                        <p class="text-h5 primary--text mt-7">Loan Requirements</p>
                        <p class="">
                            Be between 22 years of age and above.
                            6 months’ bank statement.
                            Proof of address (Driver’s license, PHCN bill, DSTV bill, Waste management bill, rental agreement, etc)
                            Valid Government-issued ID card
                            Fully completed Loan and guarantor’s Application form
                            One passport photograph for both applicant and guarantor
                            BVN of both Applicant & Guarantor
                            Applicant’s post-dated cheques to cover for the tenor of the facility
                            Guarantor’s post-dated cheques
                        </p>
                    </v-col>
                    <v-col class="text-right mt-15" cols="12" md="5">
                        <p class="text-h4 primary--text">15% - 20%</p>
                        <v-btn @click="$router.push({name: 'all-applications'})" depressed color="secondary">Apply for loan</v-btn>
                        <div class="primary white--text mt-5 px-5 py-5" style="border-radius: 3px">
                            <p class="text-h5 text-center"  >Schedule a Meeting</p>
                            <v-text-field
                                    dense
                                solo
                                outlined
                                label="Full Name"
                            ></v-text-field>
                            <v-text-field
                                    dense
                                    solo
                                    outlined
                                    label="Phone Number"
                            ></v-text-field>
                            <v-text-field
                                    dense
                                    solo
                                    outlined
                                    label="Email Address"
                            ></v-text-field>
                            <v-text-field
                                    dense
                                    solo
                                    outlined
                                    label="Date"
                            ></v-text-field>
                            <v-text-field
                                    dense
                                    solo
                                    outlined
                                    label="Available Time"
                            ></v-text-field>
                            <v-btn depressed color="secondary">
                                Book Now
                            </v-btn>
                        </div>
                    </v-col>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "ApplicationLenderBio"
    }
</script>

<style scoped>

</style>