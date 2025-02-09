<script setup>
import { ref, computed, defineProps, onMounted, onUnmounted } from 'vue';
import {useWidgetStore} from "@/stores/widgetStore.js";

const widgetStore = useWidgetStore();

const props = defineProps({
  widgetName: String,
  x: Number,
  y: Number,
  zIndex: Number,
  title: String,
});

const isDragging = ref(false);
const isResizing = ref(false);
const dragOffset = ref({ x: 0, y: 0 });
const resizeDirection = ref(null);

const widgetData = computed(() => widgetStore.openWidgets.find(w => w.componentEntry.name === props.widgetName));


const startDrag = (event) => {
  isDragging.value = true;
  widgetStore.bringToFront(props.widgetName);
  dragOffset.value = { x: event.clientX - widgetData.value.x, y: event.clientY - widgetData.value.y };
};

const onDrag = (event) => {
  console.log('onDrag');
  if (isDragging.value) {
    widgetStore.updateWidgetPosition(props.widgetName, {
      x: event.clientX - dragOffset.value.x,
      y: event.clientY - dragOffset.value.y,
    });
    console.log('✌️✌️✌️ x: ', event.clientX - dragOffset.value.x, ' y: ', event.clientY - dragOffset.value.y);
  }
};

const stopDrag = () => (isDragging.value = false);

const closeWindow = () => {
  widgetStore.removeWidget(props.widgetName);
};

const startResize = (event, direction) => {
  isResizing.value = true;
  resizeDirection.value = direction;
};

const onResize = (event) => {
  if (!isResizing.value) return;

  let { x, y, width, height } = widgetData.value;

  if (resizeDirection.value.includes("right")) {
    width = Math.max(200, event.clientX - x);
  }
  if (resizeDirection.value.includes("left")) {
    const delta = event.clientX - x;
    x += delta;
    width = Math.max(200, width - delta);
  }
  if (resizeDirection.value.includes("bottom")) {
    height = Math.max(150, event.clientY - y);
  }
  if (resizeDirection.value.includes("top")) {
    const delta = event.clientY - y;
    y += delta;
    height = Math.max(150, height - delta);
  }

  widgetStore.updateWidget(props.widgetName, { x, y, width, height });
};

const stopResize = () => (isResizing.value = false);


onMounted(() => {
  window.addEventListener("mousemove", onDrag);
  window.addEventListener("mouseup", stopDrag);
  window.addEventListener("mousemove", onResize);
  window.addEventListener("mouseup", stopResize);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", onDrag);
  window.removeEventListener("mouseup", stopDrag);
  window.removeEventListener("mousemove", onResize);
  window.removeEventListener("mouseup", stopResize);
});

</script>

<template>
  <div>
    <div
        class="bg-gray-700 text-white p-2 cursor-move flex justify-between items-center rounded-t-lg"
        @mousedown="startDrag"
    >
      <span>{{ title }}</span>
      <button class="text-red-400 hover:text-red-600" @click="store.removeWindow(id)">✖</button>
    </div>
    <div>
      <slot></slot>
    </div>

    <div class="resize-handle top-left" @mousedown="startResize($event, 'top left')"></div>
    <div class="resize-handle top-right" @mousedown="startResize($event, 'top right')"></div>
    <div class="resize-handle bottom-left" @mousedown="startResize($event, 'bottom left')"></div>
    <div class="resize-handle bottom-right" @mousedown="startResize($event, 'bottom right')"></div>
    <div class="resize-handle left" @mousedown="startResize($event, 'left')"></div>
    <div class="resize-handle right" @mousedown="startResize($event, 'right')"></div>
    <div class="resize-handle top" @mousedown="startResize($event, 'top')"></div>
    <div class="resize-handle bottom" @mousedown="startResize($event, 'bottom')"></div>
  </div>
</template>

<style scoped>
/* Style général */
.absolute {
  position: absolute;
  min-width: 200px;
  min-height: 150px;
}

/* Style des zones de redimensionnement */
.resize-handle {
  position: absolute;
  background: transparent;
  width: 10px;
  height: 10px;
}

/* Coins */
.top-left {
  top: -5px;
  left: -5px;
  cursor: nwse-resize;
}
.top-right {
  top: -5px;
  right: -5px;
  cursor: nesw-resize;
}
.bottom-left {
  bottom: -5px;
  left: -5px;
  cursor: nesw-resize;
}
.bottom-right {
  bottom: -5px;
  right: -5px;
  cursor: nwse-resize;
}

/* Côtés */
.left {
  top: 50%;
  left: -5px;
  height: 100%;
  cursor: ew-resize;
}
.right {
  top: 50%;
  right: -5px;
  height: 100%;
  cursor: ew-resize;
}
.top {
  left: 50%;
  top: -5px;
  width: 100%;
  cursor: ns-resize;
}
.bottom {
  left: 50%;
  bottom: -5px;
  width: 100%;
  cursor: ns-resize;
}
</style>