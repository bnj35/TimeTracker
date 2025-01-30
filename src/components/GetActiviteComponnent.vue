<script setup lang="js">
import { ref, onMounted } from 'vue';
import Panel from 'primevue/panel';
import Button from 'primevue/button';
import { useActivityStore } from '@/stores/activityStore';
import { useToast } from 'primevue/usetoast';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const toast = useToast();
const activityStore = useActivityStore();
const activities = ref([]);

const GetActivity = async () => {
    try {
        const response = await activityStore.fetchActivities();
        if (response.error) {
            toast.add({severity:'error', summary: 'Error', detail: response.error.message, life: 3000});
        } else {
            toast.add({severity:'success', summary: 'Success', detail: 'Activities fetched', life: 3000});
            activities.value = response.data;
        }
    } catch (e) {
        toast.add({severity:'error', summary: 'Error', detail: 'Error during fetching activities', life: 3000});
        console.error('Error during fetching activities:', e);
    }

    console.log(activities.value);
};



onMounted(() => {
    GetActivity();
});
</script>

<template>
        <Panel header="Vos activités">
            <Button @click="GetActivity" label="Récupérer" type="button"/>
            <DataTable :value="activities" stripedRows :paginator="true" :rows="10">
                <Column field="name" header="Nom"></Column>
                <Column field="color" header="Couleur"></Column>
            </DataTable>
        </Panel>
</template>

