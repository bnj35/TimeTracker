<script setup>
import {ref, onMounted} from "vue";

import Button from "primevue/button";
import Select from 'primevue/select';
import Panel from 'primevue/panel';
import {useActivityStore} from "@/stores/activityStore.js";
import {useProjectsStore} from "@/stores/projectsStore.js";
import {useTimeEntriesStore} from "@/stores/timeEntriesStore.js";

const activityStore = useActivityStore();
const projectsStore = useProjectsStore();
const timeEntriesStore = useTimeEntriesStore();

const selectedProject = ref(null)
const selectedActivity = ref(null)

const startPressed = ref(false)

const handleNewActivity = () => {
  startPressed.value = true
  if(selectedProject.value && selectedActivity.value) {
    timeEntriesStore.startTimeEntries(selectedProject.value.id, selectedActivity.value.id)
  }
}


onMounted(()=>{
  activityStore.fetchActivities();
  projectsStore.fetchProjects();
})


</script>

<template>
  <div>
    {{activityStore.openActivities}}
    <Panel>
        <template #header>
          <div class="flex w-full flex-row items-center justify-center gap-2">
            <div class="text-lg font-bold">Démarrer le suivi d'activité</div>
          </div>
        </template>
        <div class="flex flex-col items-center gap-5">
        <div>
          <Button @click="handleNewActivity" icon="pi pi-play" severity="Secondary" variant="outlined" size="large" rounded class="!p-8 hover:scale-110	active:scale-100 !transition-all !duration-75	"/>
        </div>
        <div class="select-group flex flex-row items-center justify-center gap-2 flex-wrap w-full">
            <div class="flex justify-center">
              <Select v-model="selectedProject" :options="projectsStore.projects.filter(project => project.is_enabled)" :invalid="!selectedProject && startPressed > 0" filter optionLabel="name" placeholder="Choisir un projet" class="w-full md:w-56">
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex items-center">
                    <div>{{ slotProps.value.name }}</div>
                  </div>
                  <span v-else>
                        {{ slotProps.placeholder }}
                    </span>
                </template>
                <template #option="slotProps">
                  <div class="flex items-center">
                    <div>{{ slotProps.option.name }}</div>
                  </div>
                </template>
              </Select>
            </div>
          <div class="flex flex- justify-center">
            <Select v-model="selectedActivity" :options="activityStore.enabledActivities" :invalid="!selectedActivity && startPressed > 0" filter optionLabel="name" placeholder="Choisir une activité" class="w-full md:w-56">
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex items-center">
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                        {{ slotProps.placeholder }}
                    </span>
              </template>
              <template #option="slotProps">
                <div class="flex items-center flex-row justify-start gap-2">
                  <div :style="{
                            backgroundColor: '#' + slotProps.option.color,
                        }" class="w-5 h-5 rounded-md"></div>
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
            </Select>
          </div>
        </div>
      </div>
    </Panel>
  </div>
</template>

<style scoped>

</style>