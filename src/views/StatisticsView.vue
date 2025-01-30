<script setup>
import { ref } from 'vue';
import Message from 'primevue/message';

const value = ref('');
</script>

<template>
    <div>
      <h1>StatisticView</h1>
      <p>Bienvenue sur votre page de statistiques</p>

      <message severity="info">test</message>
    </div>
</template>

<style scoped>

</style>