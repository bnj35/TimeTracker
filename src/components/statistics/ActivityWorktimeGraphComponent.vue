<script setup>
  import Chart from 'primevue/chart';

  defineProps({
    chartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      required: true
    }
  });
</script>

<template>
  <div>
    <Chart type="bar" :data="chartData" :options="chartOptions" />

    <p>Liste des projets :</p>
    <div id="activities_list"></div>
  </div>
</template>

<style scoped>

</style>