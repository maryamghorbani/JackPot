import routes from '@/router/routes';
import { defineAsyncComponent } from 'vue';

const Login = defineAsyncComponent(() => import('@/app/AuthLogin.vue'));

const route = {
  path: '/login',
  meta: {
    requiresPublic: true,
  },
  component: Login,
};

export default route;
