<script setup>
import { ref, onMounted, watch } from 'vue';
import PrimeVue from 'primevue/config';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { useToast } from 'primevue';
import { useTimeEntriesStore } from '@/stores/timeEntriesStore';
import { useAPI } from '@/composables/useAPI';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const toast = useToast();
const api = useAPI();
const startDate = ref(new Date());
const endDate = ref(new Date());
const totalTimeWorked = ref(0);
const projectDistribution = ref(null);
const activityDistribution = ref(null);
const projectsCount = ref(0);
const selectedProject = ref(null);
const timeEntries = ref([]);
const projects = ref([{ id: null, name: 'All Projects' }]);

const timeEntriesStore = useTimeEntriesStore();

let projectChart = null;
let activityChart = null;

const fetchProjects = async () => {
  try {
    const response = await api.get("/api/projects");
    projects.value = [{ id: null, name: 'All Projects' }, ...response.data];
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Error fetching projects', life: 3000 });
  }
};

const fetchData = async () => {
  try {
    const stats = await timeEntriesStore.fetchTimeEntriesStats(startDate.value, endDate.value, selectedProject.value?.id);
    totalTimeWorked.value = stats.totalTimeWorked;
    projectDistribution.value = stats.projectDistribution;
    activityDistribution.value = stats.activityDistribution;
    projectsCount.value = stats.projectsCount;
    timeEntries.value = stats.timeEntries;

    // Update charts
    if (projectChart) {
      projectChart.destroy();
    }
    if (activityChart) {
      activityChart.destroy();
    }

    if (!selectedProject.value) {
      const projectChartCtx = document.getElementById('projectChart').getContext('2d');
      projectChart = new Chart(projectChartCtx, {
          type: 'pie',
          data: projectDistribution.value,
      });
    } else {
      const activityChartCtx = document.getElementById('activityChart').getContext('2d');
      activityChart = new Chart(activityChartCtx, {
          type: 'pie',
          data: activityDistribution.value,
      });
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Error during fetch data', life: 3000 });
  }
};

onMounted(() => {
  fetchProjects();
  fetchData();
});

watch([startDate, endDate, selectedProject], fetchData);
</script>

<template>
  <div class="w-full h-full flex space-x-4 mt-8">
    <h2>Statistics</h2>
    <div class="filters flex flex-col space-y-2">
      <Calendar v-model="startDate" placeholder="Start Date" />
      <Calendar v-model="endDate" placeholder="End Date" />
      <Dropdown v-model="selectedProject" :options="projects" optionLabel="name" placeholder="Select a Project" />
      <Button label="Apply Filters" @click="fetchData" />
    </div>
    <div class="statistics">
      <p>Total Time Worked: {{ totalTimeWorked }} hours</p>
      <p v-if="!selectedProject">Number of Projects: {{ projectsCount }}</p>
      <div class="chart">
      <canvas id="projectChart" v-if="!selectedProject && projectDistribution" width="100" height="100"></canvas>
      <canvas id="activityChart" v-if="selectedProject && activityDistribution" width="100" height="100"></canvas>
    </div>
    </div>
  </div>
</template>

<style scoped>
canvas {
  display: none;
}
canvas[v-if] {
  display: block;
}

.chart{
  height: 30vh;
  width: 30vw;
  margin: 0 auto;
}
</style>
