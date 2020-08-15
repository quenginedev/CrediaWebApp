<template>
    <v-row class="fill-height" justify="center" align="center">
        <v-col cols="11" sm="10" md="7" lg="5">
            <v-card>
                <v-card-title class="justify-center">
                    <v-col class=" text-center" cols="12">
                        <img height="46px" src="../assets/img/credia-logo.svg">
                    </v-col>

                    <p class="text-h5 primary--text">Guarantor’s Form</p>
                </v-card-title>
                <v-card-text class="justify-center text-center">
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                    label="First Name"
                                    outlined
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-text-field
                                    label="Last Name"
                                    outlined
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-text-field
                            label="Phone Number"
                            outlined
                    ></v-text-field>
                    <v-text-field
                            label="Email Address"
                            outlined
                    ></v-text-field>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                    label="Relationship"
                                    outlined
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" class="">
<!--                            <input style="display: none" ref="cac_reg_input" @change="uploadPic" type="file" placeholder="asdasd"/>-->
<!--                            <p class="subtitle-1">Financial Statement (6months atleast) </p>-->
                            <v-btn depressed x-large block class="secondary">
                                <v-icon left>mdi-plus</v-icon>
                                CAV Statement
<!--                                <template v-slot:loader>-->
<!--                                    <span>{{uploadProgress}}%</span>-->
<!--                                </template>-->
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-checkbox color="green" label="By clicking ‘Submit’, you agree to Credia’s terms and conditions"></v-checkbox>
                    <v-btn min-width="120" depressed color="secondary" large>submit</v-btn>
                </v-card-text>
                <v-card-actions class="justify-center text-center">
                    <span class="subtitle-2">Join over 1000 SMEs using Credia to unlock business finance.
                        <span class="secondary--text">Sign Up</span>
                    </span>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "Guarantor"
    }
</script>

<style scoped>

</style>