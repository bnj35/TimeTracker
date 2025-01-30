<script setup>
import { onMounted, ref } from 'vue';
import {getDatasetData, getLabels, insertActivitiesList, insertDatasetsData} from '@/utils/graphUtils';
import TotalWorktimeComponent from '@/components/statistics/TotalWorktimeComponent.vue';
import WorktimeGraphComponent from "@/components/statistics/ActivityWorktimeGraphComponent.vue";
import ActivityTypeWorktimeComponentGraph from "@/components/statistics/ActivityTypeWorktimeGraphComponent.vue";
import ActivityFilterComponent from "@/components/statistics/ActivityFilterComponent.vue";

const totalWorktime = ref('08:30:00'); //A récupérer depuis le store

/////////////////////////////////////////////////////////
//Valeur de test pour graphique par projets :
const projectsGraphData = ref({
  labels: ['Projet 1', 'Projet 2', 'Projet 3', 'Projet 4', 'Projet 5', 'Projet 6', 'Projet 7'],
  datasets: [
    {
      label: 'Temps de travail',
      backgroundColor: '#42A5F5',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
});
const projectsGraphOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom'
    },
  }
});
/////////////////////////////////////////////////////////
//Valeurs de test pour graphique par type d'activité :
const activityTypeGraphData = ref({
  labels: ['Type 1', 'Type 2', 'Type 3', 'Type 4', 'Type 5'],
  datasets: [
    {
      label: 'Temps de travail',
      backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#29B6F6', '#FF7043'],
      data: [65, 59, 80, 81, 56]
    }
  ]
});
const activityTypeGraphOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom'
    },
  }
});
/////////////////////////////////////////////////////////

//Fonctions de test :


onMounted(() => {
  insertActivitiesList(getLabels(projectsGraphData.value));
  insertDatasetsData(getDatasetData(projectsGraphData.value.datasets[0]));
});

</script>

<template>
  <div>
    <h1>StatisticView</h1>
    <p>Bienvenue sur votre page de statistiques</p>

    <TotalWorktimeComponent :totalWorktime="totalWorktime" :totalProjects="7"/>

    <h2>Graphique :</h2>
    <WorktimeGraphComponent :chartData="projectsGraphData" :chartOptions="projectsGraphOptions"/>
    <ActivityFilterComponent/>

    <h2>Graphique par type d'activité :</h2>
    <ActivityTypeWorktimeComponentGraph :chartData="activityTypeGraphData" :chartOptions="activityTypeGraphOptions"/>

  </div>
</template>

<style scoped>
</style>