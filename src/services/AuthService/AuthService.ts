import axios from "axios";
import { LoggedUser, LoginRequest, PlayData, RegisterRequest, ReturnedUser } from "../../stores/type";

const url = import.meta.env.VITE_AUTH_SERVICE_URL as string;

class AuthService {

  login = async (user: LoginRequest): Promise<LoggedUser> => {
    try {
      const response = await axios.post(`${url}/users/login/`, user);
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  register = async (userData: RegisterRequest): Promise<ReturnedUser> => {
    try {
      const response = await axios.post(`${url}/users/register/`, userData);
      return response.data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  logout = async (): Promise<void> => {
    console.log('user logged out');
  };
}

export default new AuthService();
