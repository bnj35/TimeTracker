// stores/useUserStore.ts
import { defineStore } from 'pinia'
import piniaPersist from 'pinia-plugin-persist';
import {useAPI} from "@/composables/useAPI.js";
import {ref, watch} from "vue";
import {useLocalStorage} from "@vueuse/core";

export const useUserStore = defineStore('user', () => {

    const api = useAPI()

    const user = ref(
        useLocalStorage('user', {
            name: '',
            mail: '',
            token: '',
        })
    )

    async function login(name, mail){
        try {
            const response = await api.post('/api/apikeys', {
                name: name,
                email: mail,
            })
            if (!response.error) {
                user.value.mail = response.data.email;
                user.value.name = response.data.name;
                user.value.token = response.data.key;
            }
            return  response
        }catch (error){
            throw new Error(error)
        }
    }

    async function logout(){

    }

    async function fetchUserWithToken(token){
    }

    return {
        login,
        logout,
        fetchUserWithToken,
        user,
    }
},{
    persist: true,
})