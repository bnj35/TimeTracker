import { defineStore } from 'pinia'
// import piniaPersist from 'pinia-plugin-persist';
import {useAPI} from "@/composables/useAPI.js";
import {ref} from "vue";

export const useActivityStore = defineStore('activity', () => {

    const api = useAPI()

    const activities = ref({
        name: '',
        color: '',
    })


    async function fetchActivities(){
        const response = await api.get('/api/activities')
        if (!response.error) {
            activities.value = response.data;
        }
        return response
    }

    async function addActivity(name, color){
        const response = await api.post('/api/activities', {
            name: name,
            color: color,
        })
        if (!response.error) {
            activities.value = response.data;
        }
        return response
    }

    async function modifyActivity(id){
        const response = await api.put('/api/activities/' + id)
        if (!response.error) {
            activities.value = activities.value.filter(activity => activity.id !== id);
        }
        return response
    }

    async function closeActivity(id){
        const response = await api.patch('/api/activities/' + id+ '/disable')
        if (!response.error) {
            activities.value = activities.value.filter(activity => activity.id !== id);
        }
        return response
    }

    return {
        fetchActivities,
        addActivity,
        modifyActivity,
        closeActivity,
        activities,
    }
}
);