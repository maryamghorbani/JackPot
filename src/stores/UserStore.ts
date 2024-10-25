import { defineStore } from 'pinia';
import authService from '../services/auth/authService';
import type { User, Status, LoginRequest } from './type';

export const useUserStore = defineStore('user', {
  state: (): {
    status: Status
    user: User | null
  } => ({
    status: 'logout',
    user: null,
  }),
  actions:{
    setStatus(status: Status) {
      this.status = status;
      },
    async login(loginRequest: LoginRequest) {
      this.setStatus('login');
      await authService.login(loginRequest);
    },
    async register(registerForm: User) {
      this.setStatus('register');
      await authService.register(registerForm);
    },
    async logout() {
      this.setStatus('logout');
      await authService.logout();
    },
  },
});
