<template>
    <v-container v-if="!loading && cryptoDetails" :key="$route.fullPath">
        <CryptoHeader :cryptoDetails="cryptoDetails" />
        <CryptoMarketData :cryptoDetails="cryptoDetails" />
        <CryptoHistoricalData :cryptoDetails="cryptoDetails" />
    </v-container>
    <v-container v-else>
        <v-alert type="warning">Cargando datos...</v-alert>
    </v-container>
</template>

<script>
import api from "@/services/api";
import CryptoHeader from '@/components/CryptoHeader.vue';
import CryptoMarketData from '@/components/CryptoMarketData.vue';
import CryptoHistoricalData from '@/components/CryptoHistoricalData.vue';

export default {
    data() {
        return {
            cryptoDetails: null,
            loading: true,
        };
    },
    async beforeMount() {
        await this.fetchCryptoDetails();
    },
    watch: {
        '$route.params.id': {
            handler: 'fetchCryptoDetails',
            immediate: true
        }
    },
    methods: {
        async fetchCryptoDetails() {
            const cryptoId = this.$route.params.id;
            try {
                const response = await api.get(`/CryptoCoinGeckoApi/${cryptoId}`);
                this.cryptoDetails = response.data;
                console.log(this.cryptoDetails.marketData)
                this.loading = false;
            } catch (error) {
                console.error("Error al obtener los detalles de la criptomoneda:", error);
            }
        }
    },
    components: {
        CryptoHeader,
        CryptoMarketData,
        CryptoHistoricalData
    }
};
</script>
