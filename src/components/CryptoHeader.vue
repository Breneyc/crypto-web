<template>
    <v-row v-if="cryptoDetails">
        <v-col cols="12">
            <v-avatar left>
                <v-img :src="cryptoDetails.image?.large"></v-img>
            </v-avatar>
            <h1>{{ cryptoDetails.name }} ({{ cryptoDetails.symbol?.toUpperCase() }})</h1>
            <span>#{{ cryptoDetails.market_data?.market_cap_rank }}</span>
        </v-col>
    </v-row>
    <v-row v-else>
        <v-col cols="12">
            <v-alert type="warning">Loading...</v-alert>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: ['cryptoDetails']
};
</script>
