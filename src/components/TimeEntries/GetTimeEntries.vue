<script setup>

import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Button from "primevue/button";
import {useTimeEntriesStore} from "@/stores/timeEntriesStore.js";
import {useProjectsStore} from "@/stores/projectsStore.js";
import {useActivityStore} from "@/stores/activityStore.js";
import {onMounted} from "vue";

const timeEntriesStore = useTimeEntriesStore();
const projectsStore = useProjectsStore();
const activityStore = useActivityStore();

onMounted(()=>{
  timeEntriesStore.fetchTimeEntries();
  projectsStore.fetchProjects();
  activityStore.fetchActivities();
})


</script>

<template>
  <DataTable :value="timeEntriesStore.timeEntries" stripedRows :paginator="true" :rows="5" :rowsPerPageOptions="[5, 7, 10]">
    <Column field="activity" header="Activité">
      <template #body="{ data }">
        <div class="flex flex-row items-center gap-2">
          <div :style="{backgroundColor: '#' + activityStore.activities.find(activity => activity.id === data.activity_id).color,}" class="w-2 h-2 rounded-full"></div>
          {{ activityStore.activities.find(activity => activity.id === data.activity_id).name }}
        </div>
      </template>
    </Column>
    <Column field="project" header="Projet">
      <template #body="{ data }">
        {{ projectsStore.projects.find(project => project.id === data.project_id).name }}
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
    <Column field="edit" header="edit">
      <template #body="{ data }">
        <Button label="edit" />
      </template>
    </Column>
  </DataTable>
</template>

<style scoped>

</style>