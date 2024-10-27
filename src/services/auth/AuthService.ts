import axios from "axios";
import {LoginBody, PlayData, ReturnedUser, User} from "../../stores/type";

const url = import.meta.env.VITE_JACK_POT_SERVICE_URL as string;

class AuthService {
  public loggedUser ={
    token: {
      access: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI5ODQyNzYwLCJpYXQiOjE3Mjk4NDE4NjAsImp0aSI6IjU4NzA3YjAwMTUyNDQ5MmNiOGEyOGY2OWNmMzc0NWY4IiwidXNlcl9pZCI6NTJ9.Ko5OxuxrOxcMsa_1U9UB0OSctSWF-4rH9dPoh9CU5nLXoKuQQ92yCO2Cma83KY4oIi620TRy5Rsuu1nMIwk8lBF9l2q2id2k6D53wh-Bit8AfW5cqPDjfLIIT9n06_YbuLrfSQa8PV4MtCyRxEd8NQEbVukYQEZVzzGMkMfw87NQgVahF4OPk3az7Dr9CP9xu21bZMPaZihu8yjDKiJCouL5MGncENuy6GWZr66Y3Pkn_95h242ErduD1XR9oYqq1Iuyt48mIFF7x1Oq2ryzh71HqbU5LDwO3_78NeqcXt5EClaJl3xBIuiJEfSnEPBKsRjBQdSyHMI5tVOPBuZULA",
      refresh: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyOTkyODI2MCwiaWF0IjoxNzI5ODQxODYwLCJqdGkiOiJjYWViMGU4NmQzZDU0YzFiOWIyNTNkOTQ2N2I4ZjBjMSIsInVzZXJfaWQiOjUyfQ.bL-qIBYhDSwQQO849fMKoMjmSVDG9GHrYDW5zpAav2sf-px5W9dTjqgeV05uMrG5dLH4djERRxTkhl6UJp9Rl4_ZcTnt6N3KBKWqehqfLaGfH5E2-4tWeE-BQkRu5206npTr7cAxwu3DAYMJ-X6ZeM5njgAoumIhsVg0PvrmRwC8NTD1oQxTXCtL5nXL0gWHXktxLjMmeQ7HXSJm9o6h4WB3kN_HFIAeU26josc1-FHhug37NbrSGLqhQfXSoqIfBYhHB559Z-cVJKM3PfTdzUAX5p6IezH4hN1abNidh_pUsl5ww-WdNyl_dfY0R0CbFwbPqIrQAiWIW7QoFIk-CQ"
    },
    user: {
      email: "ali58@gmail.com",
      name: "Ali",
      birthdate: "2024-12-12"
    }
  };

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

  login = async (): Promise<LoginBody> => {
    return this.loggedUser;
  };

  register = async (userData: User): Promise<ReturnedUser> => {
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
