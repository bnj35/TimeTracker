<script setup>

import NavbarComponnent from '@/components/NavbarComponnent.vue';
import Window from "@/components/Window.vue";
import { useWidgetStore } from '@/stores/widgetStore.js';

const widgetStore = useWidgetStore();

</script>

<template>
  <NavbarComponnent />
  <div class="h-full w-full relative" >
    <Window v-for="widget in widgetStore.openWidgets" :key="widget.componentEntry.name" :widgetName="widget.componentEntry.name" :x="widget.x" :y="widget.y" :zIndex="widget.zIndex" :title="widget.title" toggleable>
      <component v-if="widget.componentEntry" :is="widget.componentEntry.component" />
    </Window>
  </div>
</template>
