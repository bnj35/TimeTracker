<script setup>
import Panel from "primevue/panel";
import NewTimeEntrie from "@/components/TimeEntries/NewTimeEntrie.vue";
import TimeViewer from "@/components/TimeEntries/TimeViewer.vue";

</script>

<template>
  <Panel>
    <div>
      <NewTimeEntrie />
      <TimeViewer />
    </div>

    <div>
      <span>Dernier entrées</span>

    </div>



  </Panel>
</template>

<style scoped>

</style>