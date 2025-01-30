// stores/useUserStore.ts
import { defineStore } from 'pinia'
import piniaPersist from 'pinia-plugin-persist';
import {useAPI} from "@/composables/useAPI.js";
import {ref} from "vue";

export const useUserStore = defineStore('user', () => {

    const api = useAPI()

    const user = ref({
        name: '',
        mail: '',
        token: '',
    })



    async function login(name, mail){

        const response = await api.post('/api/apikeys', {
            name: name,
            email: mail,
        })
        // if the response is successful, set the user token
        if (!response.error) {
            user.value.mail = response.data.email;
            user.value.name = response.data.name;
            user.value.token = response.data.key;
        }
        return  response
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
})