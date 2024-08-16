<template>
    <v-container>
        <v-data-table :items="cryptocurrencies" class="elevation-1" hide-default-footer>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Moneda</th>
                        <th>Capitalización de Mercado</th>
                        <th>Precio</th>
                        <th>Añadir a Favoritos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in cryptocurrencies" :key="item.id">
                        <td>{{ item.market_cap_rank }}</td>
                        <td class="d-flex align-center">
                            <v-avatar size="48" class="mr-2">
                                <img :src="item.urlImage" alt="Cryptocurrency Image" class="avatar-image">
                            </v-avatar>
                            <span @click="viewDetails(item)" class="clickable-text">
                                <strong>{{ item.name }}</strong> {{ item.symbol }}
                            </span>
                        </td>
                        <td>{{ formatCurrency(item.market_cap) }}</td>
                        <td>{{ formatCurrency(item.current_price) }}</td>
                        <td>
                            <v-icon small color="yellow darken-2" @click="openFavoriteDialog(item)">
                                {{ item.favorite ? 'mdi-star' : 'mdi-star-outline' }}
                            </v-icon>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-data-table>

        <v-dialog v-model="favoriteDialogVisible" max-width="500">
            <v-card>
                <v-card-title class="headline">Confirmar</v-card-title>
                <v-card-text>¿Quieres agregar esta criptomoneda a tus favoritos?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="favoriteDialogVisible = false">Cancelar</v-btn>
                    <v-btn color="yellow darken-2" text @click="confirmAddFavorite">Añadir</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbarVisible" :timeout="3000" top right>
            {{ snackbarMessage }}
            <v-btn color="green" text @click="snackbarVisible = false">Cerrar</v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
import api from "@/services/api";  

export default {
    data() {
        return {
            cryptocurrencies: [],
            favoriteDialogVisible: false,
            selectedCurrency: null,
            snackbarVisible: false,
            snackbarMessage: '',
        };
    },
    methods: {
        formatCurrency(value) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(value);
        },
        openFavoriteDialog(item) {
            this.selectedCurrency = item;
            this.favoriteDialogVisible = true;
        },
        async confirmAddFavorite() {
            try {
                await api.post('/FavoriteCryptocurrencies', {
                    id: this.selectedCurrency.id,
                    name: this.selectedCurrency.name,
                    symbol: this.selectedCurrency.symbol,
                    urlImage: this.selectedCurrency.urlImage,
                });

                this.selectedCurrency.favorite = true;
                this.favoriteDialogVisible = false;

                this.snackbarMessage = 'Criptomoneda agregada a favoritos correctamente.';
                this.snackbarVisible = true;
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    this.snackbarMessage = 'La criptomoneda ya está en favoritos.';
                    this.snackbarVisible = true;
                } else {
                    console.error("Error al agregar la criptomoneda a favoritos:", error);
                }
            }
        },
        viewDetails(item) {
            console.log("Ver detalles de:", item);
            this.$router.push({ name: 'CurrencyDetails', params: { id: item.id } });
        },
        async fetchCryptocurrencies() {
            try {
                const response = await api.get('/CryptoCoinGeckoApi', {
                    params: {
                        vs_currency: 'usd',
                        order: 'market_cap_desc',
                        per_page: 10, 
                        page: 1,
                        sparkline: false,
                    }
                });
                this.cryptocurrencies = response.data.map(crypto => ({
                    id: crypto.id,
                    name: crypto.name,
                    symbol: crypto.symbol.toUpperCase(),
                    urlImage: crypto.image,
                    market_cap: crypto.market_cap,
                    current_price: crypto.current_price,
                    market_cap_rank: crypto.market_cap_rank,
                    favorite: false 
                }));
            } catch (error) {
                console.error("Error al obtener las criptomonedas:", error);
            }
        }
    },
    mounted() {
        this.fetchCryptocurrencies();
    }
};
</script>

<style scoped>
.clickable-text {
    cursor: pointer;
    color: inherit;
    text-decoration: none;
}

.clickable-text:hover {
    text-decoration: none;
}

.avatar-image {
    width: 100%;
    height: auto;
    object-fit: contain;
}
</style>
