import App from "./App.vue";
import router from "./router";
import { createApp, watch } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";
import Aura from "@primevue/themes/aura";
import { definePreset } from "@primevue/themes";
import "./assets/main.css";
import ToastService from "primevue/toastservice";
import GetProjectsComponnent from "@/components/GetProjectsComponnent.vue";
import GetActiviteComponnent from "@/components/GetActiviteComponnent.vue";
import TimeEntries from "@/components/TimeEntries/TimeEntries.vue";
import NewActiviteComponnent from "./components/NewActiviteComponnent.vue";
import NewProjectsComponent from "./components/NewProjectsComponent.vue";
import LoginComponent from "./components/Profil/LoginComponent.vue";
import RegisterComponent from "./components/Profil/RegisterComponent.vue";
import ProfilWindowComponent from "./components/Profil/ProfilWindowComponent.vue";


const app = createApp(App);


const MyPreset = definePreset(Aura, {
  semantic: {
      primary: {
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}'
      }
  }
});

const pinia = createPinia();
pinia.use(piniaPersist);
app.use(pinia);
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      prefix: "p",
      darkModeSelector: "system",
      cssLayer: false,
    },
    
  },
});
//need to register all component here in order to use them in the widget store
//otherwise they trigger warnings
app.component("GetProjectsComponnent", GetProjectsComponnent);
app.component("GetActiviteComponnent", GetActiviteComponnent);
app.component("newActiviteComponnent", NewActiviteComponnent);
app.component("newProjectsComponnet", NewProjectsComponent);
app.component("LoginComponent", LoginComponent);
app.component("RegisterComponent", RegisterComponent);  
app.component("TimeEntries", TimeEntries);
app.component("ProfilWindowComponent", ProfilWindowComponent);

//--------------------
app.use(ToastService);
app.directive("tooltip", Tooltip);

app.mount("#app");
