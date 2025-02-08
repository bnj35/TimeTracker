// src/stores/widgetStore.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";

export const useWidgetStore = defineStore(
    "widget",
    () => {
        const openWidgets = useLocalStorage('widgets', []);
        const zIndexCounter = ref(0);

        function toggleWidget(name, widget, defaultPosition = { x: 100, y: 100, width: 300, height: 200 }) {
            const currentWidget = openWidgets.value.find(w => w.name === widget.name);
            if (currentWidget) {
                removeWidget(currentWidget.name);
            } else {
                addWidget(name, widget, defaultPosition);
            }
        }

        function addWidget(component, defaultPosition = { x: 100, y: 100, width: 300, height: 200 }) {
            if (!openWidgets.value.find(w => w.name === name)) {
                const zIndex = Math.max(0, ...openWidgets.value.map(w => w.zIndex)) + 1;
                openWidgets.value.push({ name: component.name, component: component.component, ...defaultPosition, zIndex });
            } else {
                bringToFront(component.name);
            }
        }

        function removeWidget(name) {
            openWidgets.value = openWidgets.value.filter(w => w.name !== name);
        }

        function bringToFront(name) {
            const maxZ = Math.max(0, ...openWidgets.value.map(w => w.zIndex)) + 1;
            const window = openWidgets.value.find(w => w.name === name);
            if (window) window.zIndex = maxZ;
        }

        function updateWidgetPosition(widget, left, top) {
            const index = openWidgets.value.findIndex((w) => w.name === widget.name);
            if (index !== -1) {
                openWidgets.value[index].left = left;
                openWidgets.value[index].top = top;
                openWidgets.value[index].zIndex = zIndexCounter.value++;
            }
        }

        function updateWidget(name, updates) {
            const window = openWidgets.value.find(w => w.name === name);
            if (window) Object.assign(window, updates);
        }

        return {
            openWidgets,
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