<template>
    <v-container>
        <v-data-table :items="cryptocurrencies" class="elevation-1" hide-default-footer>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Moneda</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in cryptocurrencies" :key="item.id">
                        <td>{{ index + 1 }}</td>
                        <td class="d-flex align-center">
                            <v-avatar size="48" class="mr-2"> <!-- Ajusta el tamaño aquí -->
                                <img :src="item.urlImage" alt="Cryptocurrency Image" class="avatar-image">
                            </v-avatar>
                            <span @click="viewDetails(item)" class="clickable-text">
                                <strong>{{ item.name }}</strong> {{ item.symbol }}
                            </span>
                        </td>
                        <td>
                            <v-btn color="black" @click="openConfirmDialog(item)">Eliminar</v-btn>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-data-table>

        <!-- Modal de Confirmación -->
        <v-dialog v-model="confirmDialogVisible" max-width="500">
            <v-card>
                <v-card-title class="headline">Confirmar Eliminación</v-card-title>
                <v-card-text>¿Estás seguro de que deseas eliminar esta criptomoneda?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="confirmDialogVisible = false">Cancelar</v-btn>
                    <v-btn color="red darken-1" text @click="confirmRemoveCurrency">Eliminar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import api from "@/services/api";  // Importar el servicio API

export default {
    data() {
        return {
            cryptocurrencies: [],
            confirmDialogVisible: false,
            selectedCurrencyId: null,
        };
    },
    methods: {
        openConfirmDialog(item) {
            this.selectedCurrencyId = item.id;
            this.confirmDialogVisible = true;
        },
        async confirmRemoveCurrency() {
            try {
                await api.delete(`/FavoriteCryptocurrencies/${this.selectedCurrencyId}`);
                this.cryptocurrencies = this.cryptocurrencies.filter(currency => currency.id !== this.selectedCurrencyId);
                this.confirmDialogVisible = false;
                this.selectedCurrencyId = null;
            } catch (error) {
                console.error("Error al eliminar la criptomoneda:", error);
            }
        },
        viewDetails(item) {
            console.log("Ver detalles de:", item);
            this.$router.push({ name: 'CurrencyDetails', params: { id: item.name.toLowerCase() } });
        },
        async fetchCryptocurrencies() {
            try {
                const response = await api.get('/FavoriteCryptocurrencies');
                this.cryptocurrencies = response.data.map(crypto => ({
                    id: crypto.id,
                    name: crypto.name,
                    symbol: crypto.symbol.toUpperCase(),
                    urlImage: crypto.urlImage,
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
    /* Ajusta cómo la imagen se adapta dentro del contenedor */
}
</style>
