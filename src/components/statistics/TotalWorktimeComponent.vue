<script setup>
import { defineProps } from 'vue';

defineProps({
  totalWorktime: {
    type: String,
    required: true
  },
  totalProjects: {
    type: Number,
    required: true
  }
});
</script>

<template>
  <div>
    <h2>Temps total travaillé :</h2>
    <span>{{ totalWorktime }}</span>
    <h2>Nombre de projets :</h2>
    <span>{{ totalProjects }}</span>
  </div>
</template>

<style scoped>
/* Ajoutez vos styles ici */
</style>