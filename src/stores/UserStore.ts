import { defineStore } from 'pinia';
import authService from '../services/AuthService/AuthService';
import type { LoggedUser, Status, LoginRequest, RegisterRequest } from './type';


export const useUserStore = defineStore('user', {
  state: (): {
    status: Status
    loggedUser: LoggedUser | null
    totpDevice: string,
    message: string,
  } => ({
    status: 'logout',
    loggedUser: JSON.parse(localStorage.getItem('loggedUser') as string) || null,
    totpDevice: '',
    message: '',
  }),
  actions:{
    setStatus(status: Status) {
      this.status = status;
      },
    async login(userData: LoginRequest) {
      this.setStatus('login');
      return await authService.login(userData);
    },
    async register(userData: RegisterRequest) {
      this.setStatus('register');
      return await authService.register(userData);
    },
    async logout() {
      this.setStatus('logout');
      await authService.logout();
      this.clearUser();
    },
    setUser(value) {
      this.loggedUser = value;
      localStorage.setItem('loggedUser', JSON.stringify(value));
    },
    setTotpDevice(value) {
      this.totpDevice = value;
    },
    setMessage(value) {
      this.message = value;
    },
    clearUser() {
      this.loggedUser = null;
      localStorage.removeItem('loggedUser');
    },
  },
});
