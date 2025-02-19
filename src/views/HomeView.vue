<script setup>

import NavbarComponnent from '@/components/NavbarComponnent.vue';
import Window from "@/components/Window.vue";
import { useWidgetStore } from '@/stores/widgetStore.js';
import Button from 'primevue/button';

const widgetStore = useWidgetStore();

const toggleProjects = () => {
  widgetStore.toggleWidget({ name: 'GetProjectsComponnent', component: "GetProjectsComponnent" }, {width: 800, height: 500});
};

const toggleActivities = ()=>{
  widgetStore.toggleWidget({ name: 'GetActiviteComponnent', component: "GetActiviteComponnent" }, {width: 800, height: 500});
}

</script>

<template>
  <NavbarComponnent />
 <!-- <button @click="toggleWindows">Toggle Projects</button>
  <Button label="Toggle Projects" @click="toggleProjects" />
  <Button label="Toggle Activities" @click="toggleActivities" /> -->
  <div class="h-full w-full relative">
    <Window v-for="widget in widgetStore.openWidgets" :key="widget.componentEntry.name" :widgetName="widget.componentEntry.name" :x="widget.x" :y="widget.y" :zIndex="widget.zIndex" :title="widget.title">
      <component v-if="widget.componentEntry" :is="widget.componentEntry.component" />
    </Window>
  </div>
</template>
