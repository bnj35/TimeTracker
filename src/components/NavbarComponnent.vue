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

const toast = useToast()
const widgetStore = useWidgetStore()


const displayFinder = ref(false);

const items = ref([
    {
        label: 'Finder',
        icon: "https://primefaces.org/cdn/primevue//images/dock/finder.svg",
        command: () => {
            displayFinder.value = true;
        }
    },
    {
      label: 'App Store',
      icon: 'https://primefaces.org/cdn/primevue/images/dock/appstore.svg'
    },
    {
      label: 'Photos',
      icon: 'https://primefaces.org/cdn/primevue/images/dock/photos.svg'
    },
    {
      label: 'Trash',
      icon: "https://primefaces.org/cdn/primevue//images/dock/trash.png",
      command: () => {
          toast.add({ severity: 'info', summary: 'Empty Trash', life: 3000 });
      }
    },
    {
      label: 'Suivi de l\'activité',
      icon: "https://help.apple.com/assets/65D68AF113D1B1E17703918B/65D68AF23650BFC92E07378A/fr_FR/381483cc8993a6ee5a017db0d5036117.png",
      command: () => {
          widgetStore.toggleWidget({ name: 'TimeEntries', component: "TimeEntries" }, {width: 800, height: 500});
      }
    }
]);

const menubarItems = ref([
    {
        label: 'Projets',
        class: 'menubar-root',
        items: [
            {
                label: 'Nouveau',
                icon: 'pi pi-fw pi-plus',
                items: [
                    {
                        label: 'Bookmark',
                        icon: 'pi pi-fw pi-bookmark'
                    },
                    {
                        label: 'Video',
                        icon: 'pi pi-fw pi-video'
                    },

                ]
            },
            {
                separator: true
            },
            {
                label: 'Supprimer',
                icon: 'pi pi-fw pi-trash'
            }
        ]
    },
    {
        label: 'Activitées',
        items: [
            {
                label: 'Nouvelle',
                icon: 'pi pi-fw pi-plus'
            },
            {
                label: 'Supprimer',
                icon: 'pi pi-fw pi-align-right'
            },
            {
                label: 'Rechercher',
                icon: 'pi pi-fw pi-search',
                items: [
                    {
                        label: 'Filtrer',
                        icon: 'pi pi-fw pi-filter'
                    },
                    {
                        icon: 'pi pi-fw pi-bars',
                        label: 'Liste'
                    }
                ]
            }

        ]
    },
    {
        label: 'Profil',
        items: [
            {
                label: 'Modifer',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {
                        label: 'Save',
                        icon: 'pi pi-fw pi-calendar-plus'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-calendar-minus'
                    }
                ]
            },
            {
                label: 'Archive',
                icon: 'pi pi-fw pi-calendar-times',
                items: [
                    {
                        label: 'Remove',
                        icon: 'pi pi-fw pi-calendar-minus'
                    }
                ]
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

                <Dialog v-model:visible="displayFinder" header="Finder" :breakpoints="{ '960px': '50vw' }" :style="{ width: '40vw' }" :maximizable="true">
                    <Tree :value="nodes" />
                </Dialog>

                <Menubar :model="menubarItems">
                <template #start class="menubar-start">
                    <RouterLink :to="{ name: 'home' }"><i class="pi pi-apple px-2"></i></RouterLink> 
                </template>
                <template #end class="menubar-end">
                    <i class="pi pi-video px-2"/>
                    <i class="pi pi-wifi px-2"/>
                    <i class="pi pi-volume-up px-2"/>
                </template>
            </Menubar>

            </div>
</template>