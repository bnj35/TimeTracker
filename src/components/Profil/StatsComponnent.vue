<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { Chart } from 'chart.js';
import PrimeVue from 'primevue/config';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import { useAPI } from '@/composables/useAPI';


const api = useAPI();

const toast = useToast();
const startDate = ref(new Date());
const endDate = ref(new Date());
const totalTimeWorked = ref(0);
const projectDistribution = ref(null);
const activityDistribution = ref(null);
const projectsCount = ref(0);
const selectedProject = ref(null);
const timeEntries = ref([]);

const fetchData = async () => {
try {
    const response = await api.get('/stats', {
        params: {
            startDate: startDate.value.toISOString(),
            endDate: endDate.value.toISOString(),
        },
    });

    totalTimeWorked.value = response.data.totalTimeWorked;
    projectDistribution.value = response.data.projectDistribution;
    activityDistribution.value = response.data.activityDistribution;
    projectsCount.value = response.data.projectsCount;
    timeEntries.value = response.data.timeEntries;

    // Update charts
    const projectChartCtx = document.getElementById('projectChart').getContext('2d');
    new Chart(projectChartCtx, {
        type: 'pie',
        data: projectDistribution.value,
    });

    const activityChartCtx = document.getElementById('activityChart').getContext('2d');
    new Chart(activityChartCtx, {
        type: 'pie',
        data: activityDistribution.value,
    });
  } catch (error) {
    toast.error('An error occurred while fetching data');
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div>
    <h2>Statistics</h2>
    <div class="filters">
      <Calendar v-model="startDate" placeholder="Start Date" />
      <Calendar v-model="endDate" placeholder="End Date" />
      <Button label="Apply Filters" @click="fetchData" />
    </div>
    <div class="statistics">
      <p>Total Time Worked: {{ totalTimeWorked }} hours</p>
      <p>Number of Projects: {{ projectsCount }}</p>
      <canvas id="projectChart"></canvas>
      <canvas id="activityChart"></canvas>
    </div>
    <div class="time-entries">
      <h3>Time Entries</h3>
      <ul>
        <li v-for="entry in timeEntries" :key="entry.id">{{ entry }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 1rem;
}
.statistics {
  margin-top: 2rem;
}
.time-entries {
  margin-top: 2rem;
}
</style> 