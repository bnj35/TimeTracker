// stores/useUserStore.ts
import { defineStore, skipHydrate } from 'pinia'
import piniaPersist from 'pinia-plugin-persist';

export const useUserStore = defineStore('user', () => {

    const user = ref({
        name: '',
        email: '',
        token: '',
    })

    async function login(email, password){

        //Get the Back url from nuxt.config.ts
        const apiBase = config.public.apiBase

        //first call the backend login route
        const response: User = await $fetch(`${apiBase}/api/user/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                device_name: 'web'
            }),
        })
        if (response.errors && response.errors.length > 0) {
            throw new Error(response.message);
        }
        const userData: User = {
            token: response.token,
            id: response.id,
            fullName: response.fullName,
            email: response.email,
            created_at: response.createdAt,
            updated_at: response.updatedAt,
        }
        user.value = userData
    }

    async function logout():Promise<void>{
        const config = useRuntimeConfig()
        const apiBase = config.public.apiBase
        try {
            await $fetch(`${apiBase}/api/user/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${user.value?.token.token}`
                },
            })
        }catch (error){
            console.error(error)
        }
        user.value = null
    }

    async function fetchUserWithToken(token: string):Promise<void>{
        const config = useRuntimeConfig()
        const apiBase = config.public.apiBase
        const response: User = await $fetch(`${apiBase}/api/user/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        console.log(response.token)
        response.token.token = token
        const userData: User = {
            token: response.token,
            id: response.id,
            fullName: response.fullName,
            email: response.email,
            created_at: response.createdAt,
            updated_at: response.updatedAt,
        }
        user.value = userData
        // if(response.message){
        //     throw new Error(response.message)
        // }
    }

    return {
        login,
        logout,
        fetchUserWithToken,
        user: skipHydrate(user),
    }
})