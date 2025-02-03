<script setup>
import { ref, onMounted, watch } from "vue";
import Panel from 'primevue/panel';
import Fluid from 'primevue/fluid';
import {useAPI} from "@/composables/useAPI.js";
import Objective from "@/components/DailyObjectif/Objective.vue";
import { useObjectiveStore } from "@/stores/objectivesStore.js";
import {useToast} from "primevue/usetoast";

const objectiveStore = useObjectiveStore();
const toast = useToast();

// computed to use store objectifs and keep it reactive
// const objectifs = computed(() => objectiveStore.objectives);

onMounted(async () => {
  await objectiveStore.fetch();
});

const updateObjectiveStatus = async ({ id, done }) => {
  try {
    await objectiveStore.update(id, done ? 1 : 0);
  } catch (error) {
    toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
    console.error(`Failed to update objective ${id}:`, error);
  }
};

</script>

<template>
  <Panel header="Vos objectifs quotidiens" class="w-md">
    <Fluid>
      <h3>A faire</h3>
        <transition-group name="list" tag="ul">
          <li v-if="objectiveStore.todoList.length > 0" v-for="(objectif, index) in objectiveStore.todoList" :key="objectif.id">
            <Objective :objectif="objectif" v-model="objectif.done" @status-changed="updateObjectiveStatus"/>
          </li>
          <span v-else class="text-muted-color p-3 text-sm">
            Aucun objectif à faire
          </span>
        </transition-group>
      <h3>Fait</h3>
      <transition-group name="list" tag="ul">
          <li v-if="objectiveStore.doneList.length > 0" v-for="(objectif, index) in objectiveStore.doneList" :key="objectif.id">
            <Objective :objectif="objectif" v-model="objectif.done" @status-changed="updateObjectiveStatus"/>
          </li>
          <span v-else class="text-muted-color p-3 text-sm">
            Aucun objectif fait
          </span>
      </transition-group>
    </Fluid>
  </Panel>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

.list-enter-active,
.list-move {
  transition: .5s all ease-in-out;
}

.list-enter, .list-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.list-leave-active {
  transition: .5s all ease-in-out;
  position: absolute;
}
</style>
