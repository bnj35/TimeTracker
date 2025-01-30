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
  <Chart type="bar" :data="chartData" :options="chartOptions" />

  <div id="activities_list"></div>

</template>

<style scoped>

</style>