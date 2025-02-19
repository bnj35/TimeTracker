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
        try {
            const response = await api.delete("/api/time-entries/" + id);
            timeEntries.value = timeEntries.value.filter((timeEntry) => timeEntry.id !== id);
            return response;
        } catch (error) {
            if (error.isAxiosError) {
                console.error(`Failed to delete time entry: ${error.message}`);
                throw new Error(`Failed to delete time entry: ${error.message}`);
            } else {
                console.error(error);
                throw error;
            }
        }
    }

    async function fetchTimeEntriesStats(startDate, endDate, projectId = null) {
        const response = await api.get("/api/time-entries");
        const timeEntriesData = response.data;

        const projectsResponse = await api.get("/api/projects");
        const projectsData = projectsResponse.data;

        const activitiesResponse = await api.get("/api/activities");
        const activitiesData = activitiesResponse.data;

        const filteredEntries = timeEntriesData.filter(entry => {
            const entryDate = new Date(entry.start);
            return entryDate >= startDate && entryDate <= endDate && (!projectId || entry.project_id === projectId);
        });

        const totalTimeWorked = filteredEntries.reduce((total, entry) => {
            const start = new Date(entry.start).getTime();
            const end = new Date(entry.end).getTime();
            return total + (end - start);
        }, 0) / (1000 * 60 * 60); // Convert milliseconds to hours

        const projectDistribution = {};
        const activityDistribution = {};

        filteredEntries.forEach(entry => {
            const projectName = projectsData.find(project => project.id === entry.project_id)?.name || entry.project_id;
            const activityName = activitiesData.find(activity => activity.id === entry.activity_id)?.name || entry.activity_id;

            if (!projectDistribution[projectName]) {
                projectDistribution[projectName] = 0;
            }
            projectDistribution[projectName] += new Date(entry.end).getTime() - new Date(entry.start).getTime();

            if (!activityDistribution[activityName]) {
                activityDistribution[activityName] = 0;
            }
            activityDistribution[activityName] += new Date(entry.end).getTime() - new Date(entry.start).getTime();
        });

        const projectsCount = Object.keys(projectDistribution).length;

        return {
            totalTimeWorked,
            projectDistribution: {
                labels: Object.keys(projectDistribution),
                datasets: [{
                    data: Object.values(projectDistribution).map(time => time / (1000 * 60 * 60)), // Convert milliseconds to hours
                    backgroundColor: Object.keys(projectDistribution).map(() => '#' + Math.floor(Math.random()*16777215).toString(16)) // Random colors
                }]
            },
            activityDistribution: {
                labels: Object.keys(activityDistribution),
                datasets: [{
                    data: Object.values(activityDistribution).map(time => time / (1000 * 60 * 60)), // Convert milliseconds to hours
                    backgroundColor: Object.keys(activityDistribution).map(() => '#' + Math.floor(Math.random()*16777215).toString(16)) // Random colors
                }]
            },
            projectsCount,
            timeEntries: filteredEntries
        };
    }

    return {
        currentTimeEntries,
        startTimestamp,
        timeEntries,
        fetchTimeEntries,
        startTimeEntries,
        updateTimeEntries,
        deleteTimeEntries,
        closeTimeEntries,
        fetchTimeEntriesStats
    };


});