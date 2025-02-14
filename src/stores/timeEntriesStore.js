import { defineStore } from "pinia";
import { ref } from "vue";
import { useAPI } from "@/composables/useAPI.js";

export const useTimeEntriesStore = defineStore("timeEntries", () => {
    const api = useAPI();

    const currentTimeEntries = ref(null);

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

    return {
        currentTimeEntries,
        startTimeEntries,
        closeTimeEntries
    };


});