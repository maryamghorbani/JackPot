import axios from "axios";
import {LoginBody, LoginRequest, PlayData, RegisterRequest, ReturnedUser, User} from "../../stores/type";

const url = import.meta.env.VITE_JACK_POT_SERVICE_URL as string;

class AuthService {
  public tokenBalance = {
    balance: 1,
    updated_at: "2024-10-25T07:14:01.279002Z"
  };

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

  login = async (user: LoginRequest): Promise<LoginBody> => {
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

  getTokenBalance = async (): Promise<Record<string, string|number>> => {
    return this.tokenBalance;
  };

  getPlayData = async (): Promise<PlayData> => {
    return this.playData;
  };
}

export default new AuthService();
