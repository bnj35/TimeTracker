<script setup>
import Panel from "primevue/panel";
import NewTimeEntrie from "@/components/TimeEntries/NewTimeEntrie.vue";
import TimeViewer from "@/components/TimeEntries/TimeViewer.vue";
import {useTimeEntriesStore} from "@/stores/timeEntriesStore.js";
import GetTimeEntries from "@/components/TimeEntries/GetTimeEntries.vue";

const timeEntriesStore = useTimeEntriesStore();

</script>

<template>
  <Panel>
    <transition name="slide-fade" mode="out-in">
      <div v-if="timeEntriesStore.currentTimeEntries" key="viewer">
        <TimeViewer />
      </div>
      <div v-else>
        <NewTimeEntrie />
      </div>
    </transition>

    <div>
      <GetTimeEntries />
<!--      <span>Dernier entrées {{timeEntriesStore.currentTimeEntries}}</span>-->

    </div>



  </Panel>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from{
  transform: translatey(-20px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translatey(20px);
  opacity: 0;
}

</style>