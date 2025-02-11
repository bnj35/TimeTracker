// src/stores/widgetStore.js
import { defineStore } from "pinia";
import {ref, shallowRef} from "vue";
import { useLocalStorage } from "@vueuse/core";

export const useWidgetStore = defineStore(
    "widget",
    () => {
        // const openWidgets = useLocalStorage('widgets', []);
        const openWidgets = ref([]);
        const zIndexCounter = ref(0);

        function getWidget(name) {
            return openWidgets.value.find(w => w.componentEntry.name === name);
        }

        function toggleWidget(componentEntry,  { x= 100, y= 100, width= 300, height= 200 }) {
            const currentWidget = openWidgets.value.find(w => w.componentEntry.name === componentEntry.name);
            if (currentWidget) {
                removeWidget(currentWidget.componentEntry.name);
            } else {
                addWidget(componentEntry, { x, y, width, height });
            }
        }
        function addWidget(componentEntry, defaultPosition = { x: 100, y: 100, width: 300, height: 200 }) {
            if (!openWidgets.value.find(w => w.name === name)) {
                const zIndex = Math.max(0, ...openWidgets.value.map(w => w.zIndex)) + 1;
                openWidgets.value.push({ componentEntry: {name: componentEntry.name, component: componentEntry.component}, ...defaultPosition, zIndex });
            } else {
                bringToFront(componentEntry.name);
            }
        }

        function removeWidget(name) {
            openWidgets.value = openWidgets.value.filter(w => w.componentEntry.name !== name);
        }

        function bringToFront(name) {
            const maxZ = Math.max(0, ...openWidgets.value.map(w => w.zIndex)) + 1;
            const window = openWidgets.value.find(w => w.componentEntry.name === name);
            if (window) window.zIndex = maxZ;
        }

        function updateWidgetPosition(name, left, top) {
            const index = openWidgets.value.findIndex((w) => w.componentEntry.name === name);
            if (index !== -1) {
                openWidgets.value[index].x = left;
                openWidgets.value[index].y = top;
                openWidgets.value[index].zIndex = zIndexCounter.value++;
            }
        }

        function updateWidget(name, updates) {
            const widget = openWidgets.value.find(w => w.componentEntry.name === name);
            if (widget) Object.assign(widget, updates);
        }

        return {
            openWidgets,
            getWidget,
            toggleWidget,
            bringToFront,
            addWidget,
            removeWidget,
            updateWidget,
            updateWidgetPosition,
            zIndexCounter,
        };
    }
);