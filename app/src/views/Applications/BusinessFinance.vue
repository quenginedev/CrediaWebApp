<template>
    <v-col cols="12">
        <v-col>
            <p class="text-left primary--text font-weight-bold">
                <v-icon left>mdi-chevron-down</v-icon>
                Business Account Activity
            </p>
            <v-divider/>
        </v-col>
        <v-text-field
                prefix="₦"
                type="number"
                v-model.number="financials.avg_monthly_revenue"
                autofocus
                label="What is your Average Monthly Sales Revenue?"
                outlined
                required
                :rules="[v=> !!v || 'Sales revenue required']"
        ></v-text-field>
        <v-text-field
                prefix="₦"
                type="number"
                v-model.number="financials.avg_monthly_expense"
                label="What is your Average Monthly Expenses?"
                outlined
                required
                :rules="[v=> !!v || 'Expenses required']"
        ></v-text-field>
        <v-select
                v-model="financials.serving_loan"
                :items="[
                    {text: 'Yes', value: true},
                    {text: 'No', value: false},
                ]"
                label="Are you currently servicing a loan?"
                outlined
                required
                :rules="[v=> typeof v == 'boolean' || 'required']"
        ></v-select>
        <v-col>
            <p class="text-left primary--text font-weight-bold">
                <v-icon left>mdi-chevron-down</v-icon>
                Bank Account Details
            </p>
            <v-divider/>
        </v-col>
        <v-text-field
                v-model="financials.bank_account_name"
                label="Account Name"
                outlined
                required
                :rules="[v=> !!v || 'Account holder name required']"
        ></v-text-field>
        <v-row>
            <v-col cols="12" sm="6">
                <v-text-field
                        v-model="financials.bank_account_number"
                        label="Account Number"
                        outlined
                        required
                        type="number"
                        :rules="[v=> !!v || 'Bank account number required']"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field
                        v-model="financials.bank_name"
                        label="Bank"
                        outlined
                        required
                        :rules="[v=> !!v || 'Bank name required']"
                ></v-text-field>
            </v-col>
        </v-row>
        <slot></slot>
    </v-col>
</template>
<script>
    export default {
        name: 'BusinessFinance',
        props: {
            financials: {
                type: Object
            }
        }
    }
</script>