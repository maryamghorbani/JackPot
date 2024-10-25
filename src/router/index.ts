import { createRouter, createWebHistory } from 'vue-router';
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Play from "../components/Play.vue";
import ShowBarcode from "../components/ShowBarcode.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      meta: {
        requiresPublic: true,
      },
      component: Login,
    },
    {
      path: '/register',
      meta: {
        requiresPublic: true,
      },
      component: Register,
    },
    {
      path: '/play',
      name: 'play',
      meta: {
        requiresPublic: true,
      },
      component: Play,
    },
    {
      path: '/show-barcode',
      name: 'ShowBarcode',
      component: ShowBarcode,
    },
  ],
});

export default router
