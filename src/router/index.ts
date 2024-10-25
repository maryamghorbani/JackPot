import { createRouter, createWebHistory } from 'vue-router';
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Play from "../components/Play.vue";
import { useUserStore } from "../stores/UserStore";
import authService from "../services/auth/authService";

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
      meta: {
        requiresPublic: true,
      },
      component: Play,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const { user } = userStore;

  // Check token and restore session
  if (!authService.accessToken) {
    await userStore.restoreSession();
  }
});

export default router
