<script setup>
import { ref, watch } from 'vue';
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Button from "primevue/button";
import DatePicker from 'primevue/datepicker';
import {useTimeEntriesStore} from "@/stores/timeEntriesStore.js";
import {useProjectsStore} from "@/stores/projectsStore.js";
import {useActivityStore} from "@/stores/activityStore.js";
import {onMounted} from "vue";
import Dialog from "primevue/dialog";
import Select from "primevue/select";
import {useToast} from "primevue/usetoast";

const toast = useToast();

const timeEntriesStore = useTimeEntriesStore();
const projectsStore = useProjectsStore();
const activityStore = useActivityStore();
const visibleModifyDialog = ref(false);
const selectedTimeEntrie = ref(
  {
    id: null,
    project_id: null,
    activity_id: null,
    start: '',
    end: ''
  }
);
const modifiedProject = ref(null);
const modifiedActivity = ref(null);

const openModifyDialog = (timeEntrie) => {
  selectedTimeEntrie.value = timeEntrie;
  visibleModifyDialog.value = true;
}

const parseDate = (dateString) => {
  if (!dateString || typeof dateString !== 'string') return new Date(); // Sécurise contre les erreurs
  return new Date(dateString.replace(" ", "T"));
};

const startDate = ref(parseDate(selectedTimeEntrie.value.start));
const endDate = ref(parseDate(selectedTimeEntrie.value.end));


const formatDate = (date) => {
  if (!date) return null;
  return date.toISOString().slice(0, 19).replace("T", " "); // Date → "2025-02-14 02:08:10"
};

watch(startDate, (newVal) => {
  selectedTimeEntrie.value.start = formatDate(newVal);
});
watch(endDate, (newVal) => {
  selectedTimeEntrie.value.end = formatDate(newVal);
});

const handleUpdateTE = () => {
  timeEntriesStore.updateTimeEntries(
      {
        id: selectedTimeEntrie.value.id,
        project_id: modifiedProject.value.id,
        activity_id: modifiedActivity.value.id,
        start: selectedTimeEntrie.value.start,
        end: selectedTimeEntrie.value.end
      }
  ) ;
  visibleModifyDialog.value = false;
}

const handleDeleteTE = async () => {
  try {
    await timeEntriesStore.deleteTimeEntries(selectedTimeEntrie.value.id);
    visibleModifyDialog.value = false;
    toast.add({ severity: 'success', summary: 'Success', detail: 'Time entrie deleted', life: 3000 });
  }catch (e) {
    console.error(e.message);
    toast.add({severity: 'error', summary: 'Error', detail: `Cannot delete time entrie please try again ${e.message} `, life: 3000});
  }
}


onMounted(()=>{
  timeEntriesStore.fetchTimeEntries();
  projectsStore.fetchProjects();
  activityStore.fetchActivities();
})


</script>

<template>
  <DataTable :value="timeEntriesStore.timeEntries" stripedRows :paginator="true" :rows="5" :rowsPerPageOptions="[5, 7, 10]">

    <Column field="project" header="Projet">
      <template #body="{ data }" v-if="projectsStore.projects">
        {{ projectsStore.projects.find(project => project.id === data.project_id).name }}
      </template>
    </Column>

    <Column field="activity" header="Activité">
      <template #body="{ data }">
        <div class="flex flex-row items-center gap-2">
          <div :style="{backgroundColor: '#' + activityStore.activities.find(activity => activity.id === data.activity_id).color,}" class="w-2 h-2 rounded-full"></div>
          {{ activityStore.activities.find(activity => activity.id === data.activity_id).name }}
        </div>
      </template>
    </Column>

    <Column field="start" header="start">
      <template #body="{ data }">
        {{ data.start }}
      </template>
    </Column>
    <Column field="end" header="end">
      <template #body="{ data }">
        {{ data.end }}
      </template>
    </Column>
    <Column field="edit" header="">
      <template #body="{ data }">
        <Button icon="pi pi-pen-to-square" severity="secondary" aria-label="Edit"
        @click="() => openModifyDialog(data)"
        />
      </template>
    </Column>
  </DataTable>

  <Dialog v-model:visible="visibleModifyDialog" modal header="Edit Time Entrie">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your entrie.</span>
    <div v-if="selectedTimeEntrie" class="flex flex-col gap-4">
      <div class="flex flex-col items-center gap-4 mb-4">
        <div class="flex flex-row gap-2 w-full">
          <div class="flex flex-col items-start gap-2 w-full *:w-full">
            <label for="startDate" class="text-sm opacity-60 pl-2">Start</label>
              <DatePicker input-class="w-full" v-model="startDate" id="datepicker-24h" dateFormat="yy/mm/dd" showTime hourFormat="24" show-seconds input-id="startDate" />
          </div>
          <div class="flex flex-col items-start gap-2 w-full *:w-full">
            <label for="endDate" class="text-sm opacity-60 pl-2">End</label>
            <DatePicker v-model="endDate" id="datepicker-24h" dateFormat="yy/mm/dd" showTime hourFormat="24" fluid show-seconds input-id="endDate" />
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex flex-col items-start gap-2">
            <label for="project" class="text-sm opacity-60 pl-2">Projet</label>
            <Select v-model="modifiedProject" inputId="project" :options="projectsStore.projects" filter optionLabel="name" placeholder="Choisir un projet" class="w-full md:w-56">
              <template #value="slotProps">
                <span v-if="slotProps.value">
                  {{ slotProps.value.name }}
                </span>
                <div v-else-if="selectedTimeEntrie.project_id" class="flex items-center">
                  <div>{{ projectsStore.projects.find(project => project.id === selectedTimeEntrie.project_id).name }}</div>
                </div>
                <span v-else >
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex items-center">
                  <div>{{ slotProps.option.name}}</div>
                </div>
              </template>
            </Select>
          </div>

          <div class="flex flex-col items-start gap-2">
            <label for="activity" class="text-sm opacity-60 pl-2">Activity</label>
            <Select v-model="modifiedActivity" inputId="activity" :options="activityStore.activities" filter optionLabel="name" placeholder="Choisir un projet" class="w-full md:w-56">
              <template #value="slotProps">
                <span v-if="slotProps.value">
                  {{ slotProps.value.name }}
                </span>
                <div v-else-if="selectedTimeEntrie.project_id" class="flex items-center">
                  <div>{{ activityStore.activities.find(activity => activity.id === selectedTimeEntrie.activity_id).name }}</div>
                </div>
                <span v-else >
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex items-center">
                  <div>{{ slotProps.option.name}}</div>
                </div>
              </template>
            </Select>
          </div>
        </div>
      </div>
      <div class="flex justify-end w-full">
        <Button label="Delete this time entrie" severity="danger" icon="pi pi-trash" icon-pos="right" @click="handleDeleteTE" />
      </div>
      <div class="flex flex-row gap-2 *:w-full">
          <Button label="Cancel" @click="visibleModifyDialog = false" severity="secondary" />
          <Button label="Update" @click="handleUpdateTE" />
      </div>
    </div>
  </Dialog>
</template>

<style scoped>

</style>