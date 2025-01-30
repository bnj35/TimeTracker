<script setup>
import { ref } from 'vue';
import { getLabels } from '@/utils/graphUtils';
import Select from 'primevue/select';

const filter = ref();

// Valeur de test pour graphique par projets :
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

</script>

<template>
  <div>
    <h2>Filtre :</h2>
    <Select v-model="filter" :options="getLabels(projectsGraphData)" placeholder="Selectionner un projet"/>
    <!--Ajouter une option pour reset le select-->
  </div>
</template>

<style scoped>
</style>