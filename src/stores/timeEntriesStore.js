import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useAPI } from "@/composables/useAPI.js";
import {useLocalStorage} from "@vueuse/core";

export const useTimeEntriesStore = defineStore("timeEntries", () => {
    const api = useAPI();

    const timeEntries = ref([]);

    const currentTimeEntries = ref(useLocalStorage('currentTimeEntries', null));

    const startTimestamp = computed(() => {
        if (!currentTimeEntries.value || !currentTimeEntries.value.start) return null;
        return new Date(currentTimeEntries.value.start).getTime();
    });

    async function startTimeEntries(projectId, activityId , options = {}) {
        const response = await api.post("/api/time-entries", {
            project_id: projectId,
            activity_id: activityId,
            ...options
            }
        )
        currentTimeEntries.value = response.data;
        return response;
    }

    async function closeTimeEntries(id) {
        const response = await api.patch("/api/time-entries/" + id + "/stop");
        currentTimeEntries.value = null;
        return response;
    }

    async function fetchTimeEntries() {
        const response = await api.get("/api/time-entries");
        if (!response.error) {
            timeEntries.value = response.data;
        }
        return response;
    }

    async function updateTimeEntries(timeEntry) {
        const response = await api.patch("/api/time-entries/" + timeEntry.id, timeEntry);
        return response;
    }

    async function deleteTimeEntries(id) {
        const response = await api.delete("/api/time-entries/" + id);
        return response;
    }

    return {
        currentTimeEntries,
        startTimestamp,
        timeEntries,
        fetchTimeEntries,
        startTimeEntries,
        updateTimeEntries,
        deleteTimeEntries,
        closeTimeEntries
    };


});