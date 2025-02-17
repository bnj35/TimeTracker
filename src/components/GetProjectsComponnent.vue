<script setup lang="js">
import { ref, onMounted, computed } from 'vue';
import { useProjectsStore } from '@/stores/projectsStore';
import { useToast } from 'primevue/usetoast';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import Panel from 'primevue/panel';
import ColorPicker from 'primevue/colorpicker';

const toast = useToast();

const projectsStore = useProjectsStore();
const projects = ref([]);
const visibleModifyDialog = ref(false);
const selectedProjects = ref({ id: null, name: '', description: '' });

const GetProjects = async () => {
    try {
        const response = await projectsStore.fetchProjects();
        if (response.error) {
            toast.add({ severity: 'error', summary: 'Error', detail: response.error.message, life: 3000 });
        } else {
            projects.value = response.data;
        }
    } catch (e) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error during fetching projects', life: 3000 });
        console.error('Error during fetching projects:', e);
    }
};

const closeProjects = async (id) => {
    try {
        const response = await projectsStore.closeProjects(id);
        if (response.error) {
            toast.add({ severity: 'error', summary: 'Error', detail: response.error.message, life: 3000 });
        } else {
            toast.add({ severity: 'success', summary: 'Success', detail: 'Projects closed', life: 3000 });
            await GetProjects();
        }
    } catch (e) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error during form submission', life: 3000 });
        console.error('Error during form submission:', e);
    }
};

const openProjects = async (id) => {
    try {
        const response = await projectsStore.openProjects(id);
        if (response.error) {
            toast.add({ severity: 'error', summary: 'Error', detail: response.error.message, life: 3000 });
        } else {
            toast.add({ severity: 'success', summary: 'Success', detail: 'Projects opened', life: 3000 });
            GetProjects();
        }
    } catch (e) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error during form submission', life: 3000 });
        console.error('Error during form submission:', e);
    }
};

const modifyProjects = async () => {
    try {
        const response = await projectsStore.modifyProjects(selectedProjects.value.id, selectedProjects.value.name, selectedProjects.value.description);
        if (response.error) {
            toast.add({ severity: 'error', summary: 'Error', detail: response.error.message, life: 3000 });
        } else {
            toast.add({ severity: 'success', summary: 'Success', detail: 'Projects modified', life: 3000 });
            visibleModifyDialog.value = false;
            await GetProjects();
        }
    } catch (e) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error during form submission', life: 3000 });
        console.error('Error during form submission:', e);
    }
};

const openModifyDialog = (projects) => {
    selectedProjects.value = { ...projects };
    visibleModifyDialog.value = true;
};


onMounted(() => {
    GetProjects();
});
</script>

<template>
    <Panel header="Vos Projets" class="h-full">
        <Toast />
        <DataTable :value="projects" stripedRows :paginator="true" :rows="5" :rowsPerPageOptions="[5, 7, 10]">
            <Column field="name" header="Nom"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="id" header="Modifier">
                <template #body="{ data }">
                    <Button @click="() => openModifyDialog(data)" label="modifier" type="button" />
                </template>
            </Column>

            <Column field="is_enabled" header="state">
                <template #body="{ data }">
                    <span v-if="data.is_enabled" class="text-green-500">Ouvert</span>
                    <span v-else class="text-red-500">Fermé</span>
                </template>
            </Column>
        </DataTable>
        <Dialog v-model:visible="visibleModifyDialog" modal header="Edit Projects" :style="{ width: '25rem' }">
            <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your projects.</span>
            <div v-if="selectedProjects">
                <div class="flex items-center gap-4 mb-4">
                    <label for="name" class="font-semibold w-24">Name</label>
                    <InputText id="name" v-model="selectedProjects.name" class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex items-center gap-4 mb-8">
                    <label for="description" class="font-semibold w-24">Description</label>
                    <InputText id="description" v-model="selectedProjects.description" class="flex-auto"
                        autocomplete="off" />
                </div>
                <div v-if="selectedProjects.is_enabled" class="flex items-center gap-4 mb-8">
                    <label for="is_enabled" class="font-semibold w-24">Desacctiver</label>
                    <Button type="button" label="Fermer" @click="() => closeProjects(selectedProjects.id)"></Button>
                </div>
                <div v-else class="flex items-center gap-4 mb-8">
                    <label for="is_enabled" class="font-semibold w-24">Activer</label>
                    <Button type="button" label="Ouvrir" @click="() => openProjects(selectedProjects.id)"></Button>
                </div>
                <div class="flex justify-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary"
                        @click="visibleModifyDialog = false"></Button>
                    <Button type="button" label="Save" @click="modifyProjects"></Button>
                </div>
            </div>
        </Dialog>
    </Panel>
</template>
