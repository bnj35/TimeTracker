import { createApp, watch} from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip';
import Aura from '@primevue/themes/aura';
import './assets/main.css'
import ToastService from 'primevue/toastservice';


import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: { 
            prefix: 'p',
            darkModeSelector:'system',
            cssLayer: false
        }
    }
})

//make user store persistent
// if (localStorage.getItem('userState')) {
//     pinia.state.value.user = JSON.parse(localStorage.getItem('userState'));
// }
//
// watch(
//     ()=> pinia.state.value.user,
//     (value) => {
//         localStorage.setItem('userState', JSON.stringify(value));
//     },
//     {deep: true}
// );

app.use(ToastService);


app.directive('tooltip', Tooltip);

app.mount('#app')
