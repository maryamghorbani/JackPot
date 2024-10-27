import axios from "axios";
import { LoggedUser, LoginRequest, PlayData, RegisterRequest, ReturnedUser } from "../../stores/type";

const url = import.meta.env.VITE_AUTH_SERVICE_URL as string;

class AuthService {

  public playData = {
    play: {
      slot_machine: {
        name: "A2",
        jackpot: 0
      },
      result: [
        "🍒",
        "🍒",
        "🍒",
        "🍒"
      ],
      won: false,
      played_at: "2024-10-25T09:48:52.604016Z"
    },
    balance: 11
  }

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

  getPlayData = async (): Promise<PlayData> => {
    return this.playData;
  };
}

export default new AuthService();
