<template>
    <v-row>
        <v-col cols="12">
            <v-text-field
                    v-model="details.first_name"
                    autofocus
                    label="First Name"
                    outlined
                    required
                    :rules="[v=> !!v || 'First name required']"
            ></v-text-field>
            <v-text-field
                    v-model="details.last_name"
                    label="Last Name"
                    outlined
                    required
                    :rules="[v=> !!v || 'Last name required']"
            ></v-text-field>
            <v-text-field
                    v-model="details.email"
                    label="Email Address"
                    outlined
                    required
                    :rules="[v=> !!v || 'Email required']"
            ></v-text-field>
            <v-text-field
                    type="tel"
                    v-model="details.phone_number"
                    label="Phone Number"
                    outlined
                    required
                    :rules="[v=> !!v || 'Phone required']"
            ></v-text-field>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-select
                            v-model="details.gender"
                            :items="genders"
                            label="Gender"
                            outlined
                            required
                            :rules="[v=> !!v || 'Gender required']"
                    ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-menu
                        v-model="dob_picker"
                        :close-on-content-click="false"
                    >
                        <template v-slot:activator="{on, attrs}">
                            <v-text-field
                                    v-model="details.date_of_birth"
                                    label="Date of Birth"
                                    outlined
                                    readonly
                                    v-on="on"
                                    v-bind="attrs"
                                    required
                                    :rules="[v=> !!v || 'Date of Birth required']"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                                color="secondary"
                                v-model="details.date_of_birth"
                        >
                            <v-btn block color="secondary" large @click="dob_picker = false">Continue</v-btn>
                        </v-date-picker>
                    </v-menu>

                </v-col>
            </v-row>
            <v-text-field
                    v-model="details.nationality"
                    label="Nationality"
                    outlined
                    required
                    :rules="[v=> !!v || 'Nationality required']"
            ></v-text-field>
            <v-text-field
                    v-model="details.social_handle"
                    label="Your Instagram url"
                    outlined
            ></v-text-field>

        </v-col>
        <v-col>
            <p class="text-left primary--text font-weight-bold">
                <v-icon left>mdi-chevron-down</v-icon>
                Next of Kin
            </p>
            <v-divider/>
        </v-col>
        <v-col cols="12">
            <v-text-field
                    v-model="details.kin_name"
                    label="Full Name"
                    outlined
                    required
                    :rules="[v=> !!v || 'Next of kin full name required']"
            ></v-text-field>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-text-field
                            v-model="details.kin_phone"
                            label="Phone Number"
                            outlined
                            required
                            :rules="[v=> !!v || 'Next of kin full phone number required']"
                    ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field
                            v-model="details.kin_relation"
                            label="Relationship"
                            outlined
                            required
                            :rules="[v=> !!v || 'Next of kin relationship required']"
                    ></v-text-field>
                </v-col>
            </v-row>
            <slot :updatedDetails="updatedDetails"></slot>
        </v-col>
    </v-row>
</template>
<script>
    export default {
        name: 'PersonalDetails',
        props:{
            details: {
                type: Object
            }
        },
        computed:{
           updatedDetails(){
               let updatedDetails = {...this.details}
               delete updatedDetails.__typename
               delete updatedDetails.id
               return updatedDetails
           }
        },
        data(){
            return {
                dob_picker: false,
                updateLoader: false,
                genders: [
                    {text: 'Male', value: 'MALE'},
                    {text: 'Female', value: 'FEMALE'},
                ]
            }
        },
        created() {
            if(Object.keys(this.details).length === 0){
                this.details = this.$store.getters['user/getDetails']
            }
        }
    }
</script>