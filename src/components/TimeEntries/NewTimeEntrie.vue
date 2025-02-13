<script setup>
import {ref, onMounted} from "vue";

import Button from "primevue/button";
import Select from 'primevue/select';
import {useActivityStore} from "@/stores/activityStore.js";
import {useProjectsStore} from "@/stores/projectsStore.js";

const activityStore = useActivityStore();
const projectsStore = useProjectsStore();

const selectedProject = ref(null)
const selectedActivity = ref(null)


onMounted(()=>{
  activityStore.fetchActivities();
  projectsStore.fetchProjects();
})


</script>

<template>
  <div>
    <div class="font-bold text-lg">Démarrer le suivi d'activité</div>
    <div class="flex flex-col items-center gap-5">
      <div>
        <Button icon="pi pi-play" severity="Secondary" variant="outlined" size="large" rounded class="!p-8 hover:scale-110	active:scale-100 !transition-all"/>
      </div>
      <div class="select-group flex flex-row items-center gap-2">
          <div class="card flex justify-center">
            <Select v-model="selectedProject" :options="projectsStore.projects" filter optionLabel="name" placeholder="Choisir un projet" class="w-full md:w-56">
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
        <div class="card flex justify-center">
          <Select v-model="selectedProject" :options="activityStore.activities" filter optionLabel="name" placeholder="Choisir une activité" class="w-full md:w-56">
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
  </div>

</template>

<style scoped>

</style>