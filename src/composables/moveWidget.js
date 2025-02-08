import { ref } from "vue";
import { useWidgetStore } from "@/stores/widgetStore.js";

export function useMoveWidget() {
  const isDragging = ref(false);
  const dragStartX = ref(0);
  const dragStartY = ref(0);
  const widgetStartX = ref(0);
  const widgetStartY = ref(0);
  const widgetStore = useWidgetStore();

  const onMouseDown = (event, widget) => {
    if (!widget) {
      console.error("Widget is undefined");
      return;
    }
    isDragging.value = true;
    dragStartX.value = event.clientX;
    dragStartY.value = event.clientY;
    widgetStartX.value = widget.offsetLeft;
    widgetStartY.value = widget.offsetTop;
    widget.style.zIndex = widgetStore.zIndexCounter;
    widgetStore.zIndexCounter++;
    const onMouseMove = (event) => {
      if (!isDragging.value) return;
      const deltaX = event.clientX - dragStartX.value;
      const deltaY = event.clientY - dragStartY.value;
      const newLeft = Math.max(
        0,
        Math.min(
          widgetStartX.value + deltaX,
          window.innerWidth - widget.offsetWidth
        )
      );
      const newTop = Math.max(
        0,
        Math.min(
          widgetStartY.value + deltaY,
          window.innerHeight - widget.offsetHeight
        )
      );
      widget.style.left = `${newLeft}px`;
      widget.style.top = `${newTop}px`;
      widgetStore.updateWidgetPosition(widget, newLeft, newTop);
    };
    const onMouseUp = () => {
      isDragging.value = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return {
    onMouseDown,
  };
}
