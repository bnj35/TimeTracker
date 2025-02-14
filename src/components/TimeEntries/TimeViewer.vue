<script setup>

import Button from "primevue/button";
import {useTimeEntriesStore} from "@/stores/timeEntriesStore.js";
import {useToast} from "primevue/usetoast";


const timeEntriesStore = useTimeEntriesStore();
const toast = useToast();

const handleCloseTimeEntries = () => {
  timeEntriesStore.closeTimeEntries("9dd89c03-dee1-4cb9-b13f-ea9f7eae5c11")
    .then(() => {
      toast.add({severity: 'success', summary: 'Success', detail: 'Time entries closed', life: 3000});
    })
    .catch((e) => {
      toast.add({severity: 'error', summary: 'Error', detail: 'Error during closing time entries', life: 3000});
      console.error('Error during closing time entries:', e);
    });
}


</script>

<template>

  <Button @click="handleCloseTimeEntries" icon="pi pi-play" severity="Secondary" variant="outlined" size="large" rounded class="!p-8 hover:scale-110	active:scale-100 !transition-all !duration-75	"/>

</template>

<style scoped>

</style>