import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
// import DetailsCryptocurrencies from "@/views/DetailsCryptocurrencies.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    children: [
      {
        path: "top",
        component: () => import("@/components/TopCryptocurrencies.vue"),
      },
      {
        path: "favorites",
        component: () => import("@/components/FavoritesCryptocurrencies.vue"),
      },
    ],
  },
  {
    path: "/details/:id",
    name: "CurrencyDetails",
    component: () => import("@/views/DetailsCryptocurrencies.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
