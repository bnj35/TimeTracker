<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Dock } from 'primevue';
import {Menubar} from 'primevue';
import 'primeicons/primeicons.css'
import { RouterLink } from 'vue-router';
import { Dialog } from 'primevue';
import { Tree } from 'primevue';
import {useToast} from "primevue/usetoast";
import {useWidgetStore} from "@/stores/widgetStore.js";
import TerminalService from 'primevue/terminalservice';
import  Terminal  from 'primevue/terminal';
import { useUserStore } from '@/stores/userStore';

const toast = useToast()
const widgetStore = useWidgetStore()


const displayFinder = ref(false);
const displayTerminal = ref(false);

const commandHandler = (text) => {
    let response;
    let argsIndex = text.indexOf(' ');
    let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

    switch(command) {
        case "date":
            response = 'Today is ' + new Date().toDateString();
            break;

        case "greet":
            response = 'Hola ' + text.substring(argsIndex + 1);
            break;

        case "random":
            response = Math.floor(Math.random() * 100);
            break;

        default:
            response = "Unknown command: " + command;
    }

    TerminalService.emit('response', response);
};

const items = ref([
    {
        label: 'Finder',
        icon: "https://primefaces.org/cdn/primevue//images/dock/finder.svg",
        command: () => {
            displayFinder.value = true;
        }
    },
    {
        label: 'terminal',
        icon: "https://primefaces.org/cdn/primevue//images/dock/terminal.svg",
        command: () => {
            displayTerminal.value = true;
        }
    },
    {
      label: 'Activitées',
      icon: 'https://primefaces.org/cdn/primevue/images/dock/appstore.svg',
      command: () => {
          widgetStore.toggleWidget({ name: 'getActivite', component: "getActiviteComponnent" }, {width: '100%', height: '100%'});
      }
    },
    {
      label: 'Projects',
      icon: 'https://primefaces.org/cdn/primevue/images/dock/photos.svg',
      command: () => {
          widgetStore.toggleWidget({ name: 'getProjects', component: "getProjectsComponnent" }, {width: '100%', height: '100%'});
      }
    },
    {
      label: 'Suivi de l\'activité',
      icon: "https://help.apple.com/assets/65D68AF113D1B1E17703918B/65D68AF23650BFC92E07378A/fr_FR/381483cc8993a6ee5a017db0d5036117.png",
      command: () => {
          widgetStore.toggleWidget({ name: 'TimeEntries', component: "TimeEntries" }, {width: '100%', height: '100%'});
      }
    },
    {
        label: 'GitHub',
        icon: "https://primefaces.org/cdn/primevue//images/dock/github.svg",
        command: () => {
            window.open('https://github.com/bnj35/TimeTracker', '_blank');
    },
    },
    {
      label: 'Trash',
      icon: "https://primefaces.org/cdn/primevue//images/dock/trash.png",
      command: () => {
          toast.add({ severity: 'info', summary: 'Empty Trash', life: 3000 });
      }
    }
]);

const menubarItems = ref([
{
        label:'Profil',
        icon: 'pi pi-fw pi-user',
        // command: () => {
        //     widgetStore.toggleWidget({ name: 'profile', component: "profileComponnent" }, {width: '100%', height: '100%'});
        // }
        items: [
            {
                label: 'Connexion',
                icon: 'pi pi-fw pi-sign-in',
                command: () => {
                    widgetStore.toggleWidget({ name: 'Login', component: "LoginComponent" }, {width: '100%', height: '100%'});
                }
            },
            {
                label: 'Inscription',
                icon: 'pi pi-fw pi-user-plus',
                command: () => {
                    widgetStore.toggleWidget({ name: 'Register', component: "RegisterComponent" }, {width: '100%', height: '100%'});
                }
            },
            {
                label: 'Profil',
                icon: 'pi pi-fw pi-user',
                command: () => {
                    widgetStore.toggleWidget({ name: 'Profile', component: "ProfilWindowComponent" }, {width: '100%', height: '100%'});
                }
            },
            {
                label: 'Déconnexion',
                icon: 'pi pi-fw pi-power-off',
                command: () => {
                    useUserStore().logout();
                }
            },
        ]
    },
    {
        label: 'Projets',
        class: 'menubar-root',
        items: [
            {
                label: 'Nouveau',
                icon: 'pi pi-fw pi-plus',
                command: () => {
                    widgetStore.toggleWidget({ name: 'newProjects', component: "newProjectsComponnet" }, {width: '100%', height: '100%'});
                }
            },
        ]
    },
    {
        label: 'Activitées',
        items: [
            {
                label: 'Nouvelle',
                icon: 'pi pi-fw pi-plus',
                command: () => {
                widgetStore.toggleWidget({ name: 'newActivite', component: "newActiviteComponnent" }, {width: '100%', height: '100%'});
                }
            }
        ]
    }
]);

const responsiveOptions = ref([
    {
        breakpoint: '1024px',
        numVisible: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
]);

const onDockItemClick = (event, item) => {
    if (item.command) {
        item.command();
    }

    event.preventDefault();
};

onBeforeUnmount(() => {
    TerminalService.off('command', commandHandler);
})

onMounted(() => {
    TerminalService.on('command', commandHandler);
})

</script>

<template>

        <div class="card dock-demo">
                <Dock :model="items">
                    <template #item="{ item }">
                        <a v-tooltip.top="item.label" href="#" class="p-dock-item-link" @click="onDockItemClick($event, item)">
                            <img :alt="item.label" :src="item.icon" style="width: 100%" />
                        </a>
                    </template>
                </Dock>

                <Dialog v-model:visible="displayTerminal" header="Terminal" :breakpoints="{ '960px': '50vw' }" :style="{ width: '40vw' }" :maximizable="true">
                    <Terminal welcomeMessage="Welcome to PrimeVue(cmd: 'date', 'greet {0}' and 'random')" prompt="primevue $" />
                </Dialog>

                <Dialog v-model:visible="displayFinder" header="Finder" :breakpoints="{ '960px': '50vw' }" :style="{ width: '40vw' }" :maximizable="true">
                </Dialog>

                <Menubar :model="menubarItems">
                <template #start class="menubar-start">
                    <RouterLink :to="{ name: 'home' }"><i class="pi pi-apple px-2 text-primary-950"></i></RouterLink> 
                </template>
                <template #end class="menubar-end">
                    <i class="pi pi-video px-2"/>
                    <i class="pi pi-wifi px-2"/>
                    <i class="pi pi-volume-up px-2"/>
                </template>
            </Menubar>

            </div>
</template>