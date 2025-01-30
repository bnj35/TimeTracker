import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip';
import Aura from '@primevue/themes/aura';


import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: { 
            prefix: 'p',
            darkModeSelector:'system',
            cssLayer: false}
    }
})

app.directive('tooltip', Tooltip);

app.mount('#app')
