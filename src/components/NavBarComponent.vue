<template>
    <v-app-bar app color="black" dark>
        <v-container>
            <v-row align="center">
                <v-col cols="auto" class="d-flex align-center">
                    <span class="company-name ml-2">ASCBMONEY</span>
                    <v-tabs v-model="tab" color="transparent" dark class="ml-4">
                        <v-tab value="destacado">Lo más destacado</v-tab>
                        <v-tab value="favoritas">Mis favoritas</v-tab>
                    </v-tabs>
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>

    <v-main>
        <v-card flat>
            <v-card-text>
                <v-tabs-items v-model="tab">
                    <v-tab-item value="destacado">
                        <TopCryptocurrencies v-if="tab === 'destacado'" />
                    </v-tab-item>

                    <v-tab-item value="favoritas">
                        <FavoritesCryptocurrencies v-if="tab === 'favoritas'" />
                    </v-tab-item>
                </v-tabs-items>
            </v-card-text>
        </v-card>
    </v-main>
</template>

<script>
import TopCryptocurrencies from '@/components/TopCryptocurrencies.vue';
import FavoritesCryptocurrencies from '@/components/FavoritesCryptocurrencies.vue';

export default {
    components: {
        TopCryptocurrencies,
        FavoritesCryptocurrencies,
    },
    data() {
        return {
            tab: 'destacado',
        };
    },
};
</script>

<style scoped>
.v-app-bar {
    padding: 0;
}

.company-name {
    font-size: 22px;
    font-weight: bold;
    color: white;
}

.v-tabs {
    border-bottom: none;
}

.v-tab {
    font-weight: bold;
    color: white !important;
    position: relative;
}

.v-tab::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: transparent;
    transition: background-color 0.3s ease;
}
</style>
