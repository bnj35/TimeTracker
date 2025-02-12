import { defineStore } from "pinia";
import { useAPI } from "@/composables/useAPI.js";

export const useTimeEntriesStore = defineStore("timeEntries", () => {
    const api = useAPI();


});