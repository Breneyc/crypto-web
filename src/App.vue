<template>
  <v-app>
    <!-- NavBar -->
    <NavBar />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
// Importa tu NavBar
import NavBar from '@/components/NavBarComponent.vue';

export default {
  name: 'App',

  components: {
    NavBar,
  },

  data: () => ({
    //
  }),
}
</script>
