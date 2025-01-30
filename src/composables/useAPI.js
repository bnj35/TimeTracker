import axios from 'axios';
import { useUserStore } from "../stores/userStore.js";
import { useRouter } from 'vue-router';

export function useAPI() {

    const userStore = useUserStore();
    const token = userStore.user?.token;
    const apiBase = import.meta.env.VITE_API_URL;
    const router = useRouter();

    // create an axios call
    const api = axios.create({
        baseURL: apiBase,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `key=${token}` })
        }
    });

    api.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.status === 401) {
                router.push('/login').then(r => r);
            }
            return Promise.reject(error);
        }
    );

    return api;
}