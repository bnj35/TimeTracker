<script setup lang="js">
import { ref, onMounted, computed } from 'vue';
import Panel from 'primevue/panel';
import Button from 'primevue/button';
import { useActivityStore } from '@/stores/activityStore';
import { useToast } from 'primevue/usetoast';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';

const toast = useToast();

const activityStore = useActivityStore();
const activities = ref([]);
const visibleModifyDialog = ref(false);
const visibleCloseDialog = ref(false);
const selectedActivity = ref({
    id: null,
    name: '',
    color: ''
});

const GetActivity = async () => {
    try {
        const response = await activityStore.fetchActivities();
        if (response.error) {
            toast.add({ severity: 'error', summary: 'Error', detail: response.error.message, life: 3000 });
        } else {
            toast.add({ severity: 'success', summary: 'Success', detail: 'Activities fetched', life: 3000 });
            activities.value = response.data;
        }
    } catch (e) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error during fetching activities', life: 3000 });
        console.error('Error during fetching activities:', e);
    }
};

const closeActivity = async (id) => {
    try {
        const response = await activityStore.closeActivity(id);
        if (response.error) {
            toast.add({ severity: 'error', summary: 'Error', detail: response.error.message, life: 3000 });
        } else {
            toast.add({ severity: 'success', summary: 'Success', detail: 'Activity closed', life: 3000 });
        }
        GetActivity();
    } catch (e) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error during form submission', life: 3000 });
        console.error('Error during form submission:', e);
    }
};

const modifyActivity = async () => {
    try {
        const response = await activityStore.modifyActivity(selectedActivity.value.id, selectedActivity.value.name, selectedActivity.value.color);
        if (response.error) {
            toast.add({ severity: 'error', summary: 'Error', detail: response.error.message, life: 3000 });
        } else {
            toast.add({ severity: 'success', summary: 'Success', detail: 'Activity modified', life: 3000 });
            visibleModifyDialog.value = false;
            GetActivity();
        }
    } catch (e) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error during form submission', life: 3000 });
        console.error('Error during form submission:', e);
    }
};

const openModifyDialog = (activity) => {
    selectedActivity.value = activity;
    visibleModifyDialog.value = true;
};

const openCloseDialog = (activity) => {
    selectedActivity.value = activity;
    visibleCloseDialog.value = true;
};

const filteredActivities = computed(() => {
    return activities.value.filter(activity => activity.is_enabled);
});

onMounted(() => {
    GetActivity();
});
</script>

<template>
    <Panel header="Vos activités">
        <DataTable :value="filteredActivities" stripedRows :paginator="true" :rows="5" :rowsPerPageOptions="[5, 7, 10]">
            <Column field="name" header="Nom"></Column>
            <Column field="color" header="Couleur">
                <template #body="{ data }">
                    <div :style="{
                        backgroundColor: '#' + data.color,
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                    }"></div>
                </template>
            </Column>
            <Column field="id" header="Action">
                <template #body="{ data }">
                    <Button @click="openModifyDialog(data)" label="modifier" type="button" />
                    <Dialog v-model:visible="visibleModifyDialog" modal header="Edit Activity" :style="{ width: '25rem' }">
                        <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your activity.</span>
                        <div class="flex items-center gap-4 mb-4">
                            <label for="name" class="font-semibold w-24">Name</label>
                            <InputText id="name" v-model="selectedActivity.value.name" class="flex-auto" autocomplete="off" />
                        </div>
                        <div class="flex items-center gap-4 mb-8">
                            <label for="color" class="font-semibold w-24">Color</label>
                            <InputText id="color" v-model="selectedActivity.value.color" class="flex-auto" autocomplete="off" />
                        </div>
                        <div class="flex justify-end gap-2">
                            <Button type="button" label="Cancel" severity="secondary" @click="visibleModifyDialog = false"></Button>
                            <Button type="button" label="Save" @click="modifyActivity"></Button>
                        </div>
                    </Dialog>
                </template>
            </Column>
            <Column field="id" header="Action">
                <template #body="{ data }">
                    <Button @click="openCloseDialog(data)" label="X" type="button" />
                    <Dialog v-model:visible="visibleCloseDialog">
                        <template #content>
                            <p>Are you sure you want to close this activity?</p>
                        </template>
                        <template #footer>
                            <Button @click="closeActivity(selectedActivity.value.id)" label="Yes" type="button" />
                            <Button @click="visibleCloseDialog = false" label="No" type="button" />
                        </template>
                    </Dialog>
                </template>
            </Column>
        </DataTable>
    </Panel>
</template>
