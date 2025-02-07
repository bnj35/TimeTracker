import { defineStore } from "pinia";
import { ref } from "vue";

export const useWidgetStore = defineStore("widget", () => {
  const widgets = ref([]);
  const zIndexCounter = ref(0);

  function addWidget(widget) {
    widget.zIndex = zIndexCounter.value++;
    widgets.value.push(widget);
  }

  function removeWidget(widget) {
    const index = widgets.value.indexOf(widget);
    if (index !== -1) {
      widgets.value.splice(index, 1);
    }
  }

  function updateWidgetPosition(widget, left, top) {
    const index = widgets.value.findIndex(w => w.id === widget.id);
    if (index !== -1) {
      widgets.value[index].left = left;
      widgets.value[index].top = top;
    }
  }

  function bringToFront(widget) {
    const index = widgets.value.findIndex(w => w.id === widget.id);
    if (index !== -1) {
      widgets.value[index].zIndex = zIndexCounter.value++;
    }
  }

  return {
    widgets,
    addWidget,
    removeWidget,
    updateWidgetPosition,
    bringToFront,
    zIndexCounter
  };
}, {
  persist: {
    enabled: true,
    strategies: [
      {
        key: "widgetStore",
        storage: localStorage,
        paths: ["widgets"],
      },
    ],
  },
});

