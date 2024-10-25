import { User } from "../../stores/type";

class AuthService {
  private initialized = false;
  private account?:User;
  public accessToken: string;
  login = async (loginRequest): Promise<void> => {
    console.log('loginRequest', loginRequest);
  };

  register = async (registerForm): Promise<void> => {
    console.log('registerForm', registerForm);
  };

  initialize = async (): Promise<void> => {
    if (this.initialized) return;
    this.initialized = true;
  };

  logout = async (): Promise<void> => {
    console.log('user logged out');
  };

  getToken = async (): Promise<string> => {
    await this.initialize();
    // Try to grab account from storage if present
    if (!this.account) {
    }
    // If account found start auth process
    if (this.account) {
      // Acquiring token
    }
    return this.accessToken;
  };
}

export default new AuthService();
