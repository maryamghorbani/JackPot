import { defineStore } from 'pinia';
import authService from '../services/auth/AuthService';
import type { User, Status, LoginRequest, RegisterRequest } from './type';


export const useUserStore = defineStore('user', {
  state: (): {
    status: Status
    user: User | null
    totpDevice: string,
    message: string,
  } => ({
    status: 'logout',
    user: null,
    totpDevice: '',
    message: '',
  }),
  actions:{
    setStatus(status: Status) {
      this.status = status;
      },
    async login() {
      this.setStatus('login');
      return await authService.login();
    },
    async register(userData: RegisterRequest) {
      this.setStatus('register');
      return await authService.register();
    },
    async logout() {
      this.setStatus('logout');
      await authService.logout();
    },
    setUser(value) {
      this.user = value;
    },
    setTotpDevice(value) {
      this.totpDevice = value;
    },
    setMessage(value) {
      this.message = value;
    },
  },
});
