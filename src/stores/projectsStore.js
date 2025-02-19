import { defineStore } from "pinia";
import { useAPI } from "@/composables/useAPI.js";
import {computed, ref} from "vue";

export const useProjectsStore = defineStore("projects", () => {
  const api = useAPI();

  const projects = ref([]);


  async function fetchProjects() {
    const response = await api.get("/api/projects");
    if (!response.error) {
      projects.value = response.data;
    }
    return response;
  }

  async function addProjects(name, description) {
    const response = await api.post("/api/projects", {
      name: name,
      description: description,
    });
    if (!response.error) {
      projects.value = response.data;
    }
    return response;
  }

  async function modifyProjects(id, name, description) {
    const response = await api.put("/api/projects/" + id, {
      name: name,
      description: description,
    });
    if (!response.error) {
      const index = projects.value.findIndex((projects) => projects.id === id);
      if (index !== -1) {
        projects.value[index] = response.data;
      }
    }
    return response;
  }

  async function closeProjects(id) {
    const response = await api.patch("/api/projects/" + id + "/disable");
    if (!response.error) {
      projects.value = projects.value.filter((projects) => projects.id !== id);
    }
    return response;
  }

  async function openProjects(id) {
    const response = await api.patch("/api/projects/" + id + "/enable");
    if (!response.error) {
      projects.value = projects.value.filter((projects) => projects.id !== id);
    }
    return response;
  }

  return {
    fetchProjects,
    addProjects,
    modifyProjects,
    closeProjects,
    openProjects,
    projects,
  };
});
