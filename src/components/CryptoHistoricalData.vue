<template>
    <v-row>
        <v-col cols="12" md="6">
            <h3>ETH Historical Price</h3>
            <v-list dense>
                <v-list-item>
                    <v-list-item-content>24h Range:</v-list-item-content>
                    <v-list-item-action>{{ formatCurrency(cryptoDetails.marketData?.low24H?.usd) || 'N/A' }} - {{
                        formatCurrency(cryptoDetails.marketData?.high24H?.usd) || 'N/A' }}</v-list-item-action>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>All-Time High:</v-list-item-content>
                    <v-list-item-action>{{ formatCurrency(cryptoDetails.marketData?.ath?.usd) || 'N/A' }}
                        <span
                            :class="{ 'text-success': cryptoDetails.marketData?.athChangePercentage?.usd > 0, 'text-danger': cryptoDetails.marketData?.athChangePercentage?.usd < 0 }">
                            {{ cryptoDetails.marketData?.athChangePercentage?.usd?.toFixed(2) || 'N/A' }}%
                        </span></v-list-item-action>
                    <v-list-item-subtitle>{{ formatDate(cryptoDetails.marketData?.athDate?.usd) || 'Invalid Date'
                        }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>All-Time Low:</v-list-item-content>
                    <v-list-item-action>{{ formatCurrency(cryptoDetails.marketData?.atl?.usd) || 'N/A' }}
                        <span
                            :class="{ 'text-success': cryptoDetails.marketData?.atlChangePercentage?.usd > 0, 'text-danger': cryptoDetails.marketData?.atlChangePercentage?.usd < 0 }">
                            {{ cryptoDetails.marketData?.atlChangePercentage?.usd?.toFixed(2) || 'N/A' }}%
                        </span></v-list-item-action>
                    <v-list-item-subtitle>{{ formatDate(cryptoDetails.marketData?.atlDate?.usd) || 'Invalid Date'
                        }}</v-list-item-subtitle>
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
        },
        formatDate(date) {
            if (!date || isNaN(new Date(date).getTime())) {
                return 'Invalid Date';
            }
            return new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
    }
};
</script>
