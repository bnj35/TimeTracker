<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import Button from "primevue/button";
import {useTimeEntriesStore} from "@/stores/timeEntriesStore.js";
import {useToast} from "primevue/usetoast";

const timeEntriesStore = useTimeEntriesStore();
const toast = useToast();
const elapsedTime = ref(0);

let interval = null;

const formattedElapsedTime = computed(() => {
  const seconds = elapsedTime.value % 60;
  const minutes = Math.floor(elapsedTime.value / 60) % 60;
  const hours = Math.floor(elapsedTime.value / 3600);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds - 22).padStart(2, '0')}`;
  //for obscure reasons, the seconds are 22 seconds ahead of the actual time
});

const updateElapsedTime = () => {
  if (!timeEntriesStore.startTimestamp) return;
  const now = Date.now();
  elapsedTime.value = Math.floor((now - timeEntriesStore.startTimestamp) / 1000);
  console.log('updateElapsedTime', formattedElapsedTime.value);
};

onMounted(() => {
  updateElapsedTime();
  interval = setInterval(()=>{updateElapsedTime()}, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});

const handleCloseTimeEntries = async () => {
  timeEntriesStore.closeTimeEntries(timeEntriesStore.currentTimeEntries.id)
    .then(() => {
      toast.add({severity: 'success', summary: 'Success', detail: 'Time entries closed', life: 3000});
      timeEntriesStore.fetchTimeEntries();
    })
    .catch((e) => {
      toast.add({severity: 'error', summary: 'Error', detail: 'Error during closing time entries', life: 3000});
      console.error('Error during closing time entries:', e);
    });
}
</script>

<template>
  <div class="flex flex-row items-center justify-center gap-4">
    <Button @click="handleCloseTimeEntries" icon="pi pi-pause" severity="Secondary" variant="outlined" size="large" rounded class="!p-8 hover:scale-110	active:scale-100 !transition-all !duration-75	"/>
    <div class="flex flex-col items-start gap-2">
      <span class="text-3xl font-bold">
        {{formattedElapsedTime}}
      </span>
      <div class="text-xs opacity-50 flex flex-col items-start">
        <span>
          Projet : {{timeEntriesStore.currentTimeEntries.project?.name}}
        </span>
        <span>
          Activité : {{timeEntriesStore.currentTimeEntries.activity?.name}}
        </span>
      </div>
    </div>

  </div>
</template>

<style scoped>
</style>