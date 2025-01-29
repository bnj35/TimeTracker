import type { UseFetchOptions } from 'nuxt/app'
import { useUserStore} from "~/stores/userStore";

export function useAPI<T>(
    url: string,
) {

    const userStore = useUserStore();
    const token = userStore.user?.token.token
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase

    //create $fetch with base url and api token
    const api = $fetch.create({
        baseURL: apiBase,
        onRequest({ request, options: fetchOptions, error }) {
            // // Merge provided options with default options
            // Object.assign(fetchOptions, options);

            if (token) {
                fetchOptions.headers.set('Authorization', `Bearer ${token}`);
            }
        },
        async onResponseError({ response }) {
            if (response.status === 401) {
                navigateTo('/login')
            }
        }
    })
    return api(url)
}