import axios from "axios";
import { useUserStore } from "../../stores/UserStore";
import router from "../../router";

const url = import.meta.env.VITE_TOKEN_SERVICE_URL as string;

export const getTokenBalance = async (): Promise<Record<string, string|number>> => {
    try {
        const accessToken = useUserStore().loggedUser.token.access;

        const response = await axios.get(`${url}/tokens/balance/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch token balance:", error);

        if (error.response && error.response.status === 401) {
            await router.push({ name: 'login' });
        }

        throw error;
    }
};
