import'./assets/main.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip';
import Aura from '@primevue/themes/aura';


import App from './App.vue'
import router from './router'
import { updatePrimaryPalette } from '@primevue/themes';

const app = createApp(App)

app.use(createPinia())
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
