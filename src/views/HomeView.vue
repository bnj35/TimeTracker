<script setup>
// import NewActiviteComponnent from '@/components/NewActiviteComponnent.vue';
// import GetActiviteComponnent from '@/components/GetActiviteComponnent.vue';
// import GetProjectsComponnent from '@/components/GetProjectsComponnent.vue';
// import NewProjectsComponent from '@/components/NewProjectsComponent.vue';
// import { useMoveWidget } from '@/composables/moveWidget.js';
// import { useWidgetStore } from '@/stores/widgetStore.js';
//
// const { onMouseDown } = useMoveWidget();
// const widgetStore = useWidgetStore();
//
// const newActiviteRef = ref(null);
// const getActiviteRef = ref(null);
// const getProjectsRef = ref(null);
// const newProjectsRef = ref(null);
//
// const setRandomPosition = (element, widgetId) => {
//   if (!element) return;
//   const widget = widgetStore.widgets.find(w => w.id === widgetId);
//   if (widget) {
//     element.style.left = `${widget.left}px`;
//     element.style.top = `${widget.top}px`;
//     element.style.zIndex = widget.zIndex;
//   } else {
//     const x = Math.random() * (window.innerWidth - element.offsetWidth);
//     const y = Math.random() * (window.innerHeight - element.offsetHeight);
//     element.style.left = `${x}px`;
//     element.style.top = `${y}px`;
//     element.style.zIndex = widgetStore.zIndexCounter.value;
//     widgetStore.addWidget({ id: widgetId, left: x, top: y, zIndex: widgetStore.zIndexCounter });
//     widgetStore.zIndexCounter++;
//   }
// };
//
// onMounted(() => {
//   if (newActiviteRef.value) setRandomPosition(newActiviteRef.value, 'newActivite');
//   if (getActiviteRef.value) setRandomPosition(getActiviteRef.value, 'getActivite');
//   if (getProjectsRef.value) setRandomPosition(getProjectsRef.value, 'getProjects');
//   if (newProjectsRef.value) setRandomPosition(newProjectsRef.value, 'newProjects');
// });

import { ref, onMounted, resolveComponent} from 'vue';
import NavbarComponnent from '@/components/NavbarComponnent.vue';
import Window from "@/components/Window.vue";
import GetProjectsComponnent from "@/components/GetProjectsComponnent.vue";
import { useWidgetStore } from '@/stores/widgetStore.js';
import Button from 'primevue/button';

const widgetStore = useWidgetStore();

const toggleWindows = () => {
  console.log('toggleWindows');
  widgetStore.toggleWidget({ name: 'GetProjectsComponnent', component: "GetProjectsComponnent" }, {width: 800, height: 600});
};

</script>

<template>
  <NavbarComponnent />
<!--  <button @click="toggleWindows">Toggle Projects</button>-->
  <Button label="Toggle Projects" @click="toggleWindows" />
  <div class="h-full w-full relative">
    <Window v-for="widget in widgetStore.openWidgets" :key="widget.componentEntry.name" :widgetName="widget.componentEntry.name" :x="widget.x" :y="widget.y" :zIndex="widget.zIndex" :title="widget.title">
      <component v-if="widget.componentEntry" :is="widget.componentEntry.component" />
    </Window>
  </div>

<!--  <div class="h-full w-full relative">-->
<!--    <div ref="newActiviteRef" @mousedown="onMouseDown($event, $event.target)"-->
<!--      class="w-fit absolute bg-gray-200 pt-4 cursor-move rounded-md">-->
<!--      <NewActiviteComponnent />-->
<!--    </div>-->
<!--    <div ref="getActiviteRef" @mousedown="onMouseDown($event, $event.target)"-->
<!--      class="w-fit absolute bg-gray-200 pt-4 cursor-move rounded-md">-->
<!--      <GetActiviteComponnent />-->
<!--    </div>-->
<!--    <div ref="getProjectsRef" @mousedown="onMouseDown($event, $event.target)"-->
<!--      class="w-fit absolute bg-gray-200 pt-4 cursor-move rounded-md">-->
<!--      <GetProjectsComponnent />-->
<!--    </div>-->
<!--    <div ref="newProjectsRef" @mousedown="onMouseDown($event, $event.target)"-->
<!--      class="w-fit absolute bg-gray-200 pt-4 cursor-move rounded-md">-->
<!--      <NewProjectsComponent />-->
<!--    </div>-->
<!--  </div>-->
</template>
