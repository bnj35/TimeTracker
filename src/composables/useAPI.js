import axios from 'axios';
import { useUserStore } from "../stores/userStore.js";
import { useRouter } from 'vue-router';

export function useAPI() {

    const userStore = useUserStore();
    const token = userStore.user?.token;
    const apiBase = import.meta.env.VITE_API_URL
    const router = useRouter();
    const apikey = import.meta.env.VITE_API_KEY

    // create an axios call
    const api = axios.create({
        baseURL: apiBase,
        headers: {
            'Content-Type': 'application/json',
            // ...(token && { 'Authorization': `key=${token}` })
            'Authorization': `key=${apikey}`
        }
    });

    return api;
}