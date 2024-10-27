import { createRouter, createWebHistory } from 'vue-router';
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Play from "../views/Play.vue";
import ShowBarcode from "../views/ShowBarcode.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
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
