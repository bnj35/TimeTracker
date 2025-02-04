import { defineStore } from 'pinia'
import {useAPI} from "@/composables/useAPI.js";
import {computed, onBeforeMount, ref} from "vue";
import {useLocalStorage} from "@vueuse/core";

export const useObjectiveStore = defineStore('objectives', () => {

    const api = useAPI()

    const objectives = ref(
        useLocalStorage('objectives', [])
    );

    const todoList = computed(() => {
        return objectives.value.filter(objective => !objective.done)
    });
    const doneList = computed(() => {
        return objectives.value.filter(objective => objective.done)
    });

    async function fetch(){
        try {
            const response = await api.get('/api/daily-objectives')
            objectives.value = response.data;
            return  response
        }catch (error){
            throw new Error(error)
        }
    }

    async function create(objective){
        try {
            const response = await api.post('/api/daily-objectives', {
                name: objective.name,
                content: objective.content,
            })
            objectives.value.push(response.data)
            return  response
        }catch (error){
            throw new Error(error)
        }
    }

    //function to update an objective status
    async function updateObjectiveStatus(id, status){
        if (status === true || status === 1){
            try {
                const response = await api.patch(`/api/daily-objectives/${id}/done`)
                return  response
            }catch (error){
                throw new Error(error)
            }
        }else{
            try {
                const response = await api.patch(`/api/daily-objectives/${id}/undone`)
                return  response
            }catch (error){
                throw new Error(error)
            }
        }
    }

    async function update(id, objective){
        try {
            const response = await api.put(`/api/daily-objectives/${id}`, {
                name: objective.name,
                content: objective.content,
            })
            objectives.value = objectives.value.map(objective => {
                if (objective.id === id){
                    objective.name = response.data.name
                    objective.content = response.data.content
                }
                return objective
            })
            return  response
        }catch (error){
            throw new Error(error)
        }
    }

    async function deleteObjective(id){
        try {
            const response = await api.delete(`/api/daily-objectives/${id}`)
            objectives.value = objectives.value.filter(objective => objective.id !== id)
            return  response
        }catch (error){
            throw new Error(error)
        }
    }

    onBeforeMount(async () => {
        await fetch();
    });

    return {
        objectives,
        todoList,
        doneList,
        fetch,
        create,
        update,
        updateObjectiveStatus,
        deleteObjective,
    }
})