<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useWidgetStore } from "@/stores/widgetStore.js";
import Button from 'primevue/button';

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

//const widgetData = computed(() => widgetStore.openWidgets.find(w => w.componentEntry.name === props.widgetName));
const widgetData = widgetStore.getWidget(props.widgetName);

const startDrag = (event) => {
  isDragging.value = true;
  widgetStore.bringToFront(props.widgetName);
  dragOffset.value = { x: event.clientX - widgetData.x, y: event.clientY - widgetData.y };
};

const onDrag = (event) => {
  if (isDragging.value) {
    widgetStore.updateWidgetPosition(props.widgetName,
      event.clientX - dragOffset.value.x,
      event.clientY - dragOffset.value.y
    );
  }
};

const stopDrag = () => (isDragging.value = false);

const closeWindow = () => {
  widgetStore.removeWidget(props.widgetName);
};

const maxWindow = () => {
  widgetStore.maximizeWidget(props.widgetName);
};

const startResize = (event, direction) => {
  isResizing.value = true;
  document.body.classList.add('select-none');
  resizeDirection.value = direction;
};

const onResize = (event) => {
  if (!isResizing.value) return;

  let { x, y, width, height } = widgetData;

  if (resizeDirection.value.includes("right")) {
    width = Math.max(200, event.clientX - x);
  }
  if (resizeDirection.value.includes("left")) {
    const delta = event.clientX - x;
    x += delta;
    width = Math.max(200, width - delta);
  }
  if (resizeDirection.value.includes("bottom")) {
    console.log('bottom: ', event.clientY, y);
    height = Math.max(150, event.clientY - y);
  }
  if (resizeDirection.value.includes("top")) {
    const delta = event.clientY - y;
    y += delta;
    height = Math.max(150, height - delta);
  }
  widgetStore.updateWidget(props.widgetName, { x, y, width, height });
};

const stopResize = () => {
  isResizing.value = false;
  document.body.classList.remove('select-none');
};

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
  <div v-if="widgetData" class="absolute p-panel p-1 shadow-lg border border-gray-300 rounded-xl flex flex-col" :style="{
    top: widgetData.y + 'px',
    left: widgetData.x + 'px',
    width: widgetData.width + 'px',
    height: widgetData.height + 'px',
    zIndex: widgetData.zIndex,
  }">
    <div class="text-white p-1 cursor-move flex justify-between items-center rounded-t-lg" @mousedown="startDrag">
      <span>{{ title }}</span>
      <div class="flex space-x-1">
        <span @click="maxWindow"
        class="text-primary-950 hover:bg-red-500 hover:text-primary-50 transition-all aspect-square h-6 w-6 flex items-center justify-center rounded-full cursor-pointer">
        <i class="pi pi-window-maximize !text-xs"></i>
      </span>
      <span @click="closeWindow"
        class="text-primary-950 hover:bg-red-500 hover:text-primary-50 transition-all aspect-square h-6 w-6 flex items-center justify-center rounded-full cursor-pointer">
        <i class="pi pi-times !text-xs"></i>
      </span>
    </div>

      <!--      <Button icon="pi pi-times"-->
      <!--              severity="danger"-->
      <!--              size="small"-->
      <!--              variant="text"-->
      <!--              rounded-->
      <!--              aria-label="Close"-->
      <!--              @click="closeWindow"-->
      <!--              class="!p-0 !h-6 !w-6"/>-->

    </div>
    <div class="overflow-y-scroll h-full">
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
  left: -5px;
  height: calc(100% - 10px);
  cursor: ew-resize;
}
.right {
  right: -5px;
  height: calc(100% - 10px);
  cursor: ew-resize;
}
.top {
  top: -5px;
  width: calc(100% - 10px);
  cursor: ns-resize;
}
.bottom {
  bottom: -5px;
  width: calc(100% - 10px);
  cursor: ns-resize;
}
</style>