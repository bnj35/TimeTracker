<script setup>
import { ref, computed, defineProps } from 'vue';
import {useWidgetStore} from "@/stores/widgetStore.js";
import Dialog from 'primevue/dialog';

const widgetStore = useWidgetStore();

const props = defineProps({
  widgetName: String,
  x: Number,
  y: Number,
  zIndex: Number,
  title: String,
});

const isDragging = ref(false);
// const isResizing = ref(false);
// const startPos = ref({ x: 0, y: 0, width: 0, height: 0 });
const offset = ref({ x: 0, y: 0 });
const windowData = computed(() => widgetStore.openWidgets.find(w => w.id === props.id));


const startDrag = (event) => {
  isDragging.value = true;
  widgetStore.bringToFront(props.widgetName);
  offset.value = { x: event.clientX - windowData.value.x, y: event.clientY - windowData.value.y };
};

const onDrag = (event) => {
  if (isDragging.value) {
    widgetStore.updateWidget(props.widgetName, { x: event.clientX - offset.value.x, y: event.clientY - offset.value.y });
  }
};

const closeWindow = () => {
  widgetStore.removeWidget(props.widgetName);
};

</script>

<template>
  <Dialog v-if="windowData"
          :maximizable="true"
          :visible="true"
          :style="{ left: x + 'px', top: y + 'px', zIndex: zIndex }"
          :header="title"
          :modal="false"
          :draggable="true"
          :resizable="true"
          @hide="closeWindow"
          @dragstart="startDrag"
          @drag="onDrag">
    <template #header>
      <div>
        <span>{{ title }}</span>
      </div>
    </template>
    <slot></slot>
  </Dialog>

</template>

<style scoped>
.window-container {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  resize: both;
  overflow: hidden;
}
</style>