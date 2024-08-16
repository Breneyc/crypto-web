<template>
    <v-container v-if="cryptoDetails">
        <CryptoHeader :cryptoDetails="cryptoDetails" />
        <CryptoMarketData :cryptoDetails="cryptoDetails" />
        <CryptoHistoricalData :cryptoDetails="cryptoDetails" />
    </v-container>
    <v-container v-else>
        <v-alert type="warning">Loading...</v-alert>
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
        };
    },
    methods: {
        async fetchCryptoDetails() {
            const cryptoId = this.$route.params.id;
            try {
                const response = await api.get(`/CryptoCoinGeckoApi/${cryptoId}`);
                this.cryptoDetails = response.data;
            } catch (error) {
                console.error("Error al obtener los detalles de la criptomoneda:", error);
            }
        }
    },
    mounted() {
        this.fetchCryptoDetails();
    },
    components: {
        CryptoHeader,
        CryptoMarketData,
        CryptoHistoricalData
    }
};
</script>
