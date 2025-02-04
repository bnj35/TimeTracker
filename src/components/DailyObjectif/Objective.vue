<script setup>
import {ref} from "vue";
import {computed} from "vue";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import Menu from 'primevue/menu';
import {useObjectiveStore} from "@/stores/objectivesStore.js";
import Dialog from "primevue/dialog";

import 'primeicons/primeicons.css'
import DailyObjectiveForm from "@/components/DailyObjectif/DailyObjectiveForm.vue";
const props = defineProps(["objectif"]);
const objectiveStore = useObjectiveStore();

const modelValue = computed({
  get() {
    return props.objectif.done === 1;
  },
  set(value) {
    props.objectif.done = value ? 1 : 0;
  }
});
const emit = defineEmits(["status-changed"]);


const textClass = computed(() => ({
  'line-through': modelValue.value
}));

const change = () => {
  emit('status-changed', {
    id: props.objectif.id,
    done: modelValue.value
  });
};

const deleteObjective = () => {
  console.log('delete', props.objectif.id);
  objectiveStore.deleteObjective(props.objectif.id);
};

const dialogVisible = ref(false);

const openEditDialog = () => {
  dialogVisible.value = true;
};

const items = [
  {
    label: 'Edit',
    icon: 'pi pi-pencil',
    command: openEditDialog
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: deleteObjective
  }
];

const menu = ref(null);

const toggle = (event) => {
  menu.value.toggle(event);
};


</script>

<template>
  <div class="flex flex-row items-center justify-between gap-2 p-3">
    <div class="flex flex-row items-center gap-2">
      <Checkbox v-model="modelValue" binary @change="change" />
      <div class="flex flex-col items-start">
        <span :class="textClass">
          {{ props.objectif.name }}
        </span>
        <span :class="['text-muted-color', 'text-xs', textClass]">
          {{ props.objectif.content }}
        </span>
      </div>
    </div>
<!--    <Button icon="pi pi-ellipsis-h" severity="secondary" size="small" aria-label="Options" @click="toggle" />-->
<!--    <Popover ref="popover" class="!p-0">-->
<!--      <Menu :model="items" ref="menu" class="!border-0 !p-0" />-->
<!--    </Popover>-->

    <Button type="button" icon="pi pi-ellipsis-v" severity="secondary" size="small" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" class="!aspect-square !p-1 !text-xs" />
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
    <Dialog v-model:visible="dialogVisible" modal>
      <DailyObjectiveForm :objectif="props.objectif" @submit="dialogVisible = false" />
    </Dialog>
  </div>
</template>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>