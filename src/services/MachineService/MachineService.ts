import axios from "axios";
import {PlayData} from "../../stores/type";
import router from "../../router";
import {useUserStore} from "../../stores/UserStore";

const url = import.meta.env.VITE_MACHINE_SERVICE_URL as string;

export const getPlayData = async (): Promise<PlayData> => {
    try {
        const accessToken = useUserStore().loggedUser.token.access;
        const response = await axios.get(`${url}/slot-machine/play/`,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch play data:", error);
        if (error.response && error.response.status === 401) {
            console.log('User is not authenticated')
            await router.push({ name: 'login' });
        }
        throw error;
    }
};

