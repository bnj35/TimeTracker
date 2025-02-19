import { defineStore } from "pinia";
import { useAPI } from "@/composables/useAPI.js";
import {computed, ref} from "vue";

export const useActivityStore = defineStore("activity", () => {
  const api = useAPI();

  const activities = ref([]);

  async function fetchActivities() {
    const response = await api.get("/api/activities");
    if (!response.error) {
      activities.value = response.data;
    }
    return response;
  }


  const enabledActivities = computed(() => {
    return activities.value.filter(activity => activity.is_enabled === 1);
  });

  async function addActivity(name, color) {
    const response = await api.post("/api/activities", {
      name: name,
      color: color,
    });
    if (!response.error) {
      activities.value = response.data;
    }
    return response;
  }

  async function modifyActivity(id, name, color) {
    const response = await api.put("/api/activities/" + id, {
      name: name,
      color: color,
    });
    if (!response.error) {
      const index = activities.value.findIndex(
        (activity) => activity.id === id
      );
      if (index !== -1) {
        activities.value[index] = response.data;
      }
    }
    return response;
  }

  async function closeActivity(id) {
    const response = await api.patch("/api/activities/" + id + "/disable");
    if (!response.error) {
      activities.value = activities.value.filter(
        (activity) => activity.id !== id
      );
    }
    return response;
  }

  async function openActivity(id) {
    const response = await api.patch("/api/activities/" + id + "/enable");
    if (!response.error) {
      activities.value = activities.value.filter(
        (activity) => activity.id !== id
      );
    }
    return response;
  }

  return {
    fetchActivities,
    addActivity,
    modifyActivity,
    closeActivity,
    openActivity,
    activities,
    enabledActivities
  };
});
