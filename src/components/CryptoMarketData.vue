<template>
    <v-row>
        <v-col cols="12" md="6">
            <v-list dense>
                <v-list-item>
                    <v-list-item-content>Capitalización de mercado:</v-list-item-content>
                    <v-list-item-action>{{ formatCurrency(cryptoDetails.market_data?.market_cap['usd']) || 'N/A'
                        }}</v-list-item-action>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>Valoración totalmente diluida:</v-list-item-content>
                    <v-list-item-action>{{ formatCurrency(cryptoDetails.market_data?.fully_diluted_valuation['usd']) ||
                        'N/A' }}</v-list-item-action>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>Volumen de operaciones durante 24 horas:</v-list-item-content>
                    <v-list-item-action>{{ formatCurrency(cryptoDetails.market_data?.total_volume['usd']) || 'N/A'
                        }}</v-list-item-action>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>Suministro circulante:</v-list-item-content>
                    <v-list-item-action>{{ cryptoDetails.market_data?.circulating_supply || 'N/A'
                        }}</v-list-item-action>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>Oferta total:</v-list-item-content>
                    <v-list-item-action>{{ cryptoDetails.market_data?.total_supply || 'N/A' }}</v-list-item-action>
                </v-list-item>
            </v-list>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: ['cryptoDetails'],
    methods: {
        formatCurrency(value) {
            if (typeof value !== 'number') {
                return 'N/A';
            }
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(value);
        }
    }
};
</script>
