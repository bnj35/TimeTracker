<script setup lang="js">
import { ref } from 'vue';
import Panel from 'primevue/panel';
import { Form } from '@primevue/forms';
import InputText from 'primevue/inputtext';
import ColorPicker from 'primevue/colorpicker';
import Button from 'primevue/button';
import { useActivityStore } from '@/stores/activityStore';
import { useToast } from 'primevue/usetoast';


const toast = useToast();

const activityStore = useActivityStore();

const resolver = (values) => {
    return {
        values,
        errors: {}
    };
};

const values = ref({
    name: '',
    color: ''
});

const createActivity = async () => {
    try{
        const response = await activityStore.addActivity(values.value.name, values.value.color);
        if (response.error){
            toast.add({severity:'error', summary: 'Error', detail: response.error.message, life: 3000});
        } else {
            toast.add({severity:'success', summary: 'Success', detail: 'Activity created', life: 3000});
            console.log('Activity created:', response.data);
            activityStore.fetchActivities();
        }

    }
    catch(e){
        toast.add({severity:'error', summary: 'Error', detail: 'Error during form submission', life: 3000});
        console.error('Error during form submission:', e);
    }

    activityStore.fetchActivities();
};


</script>



<template>
        <Panel header="Nouvelle Activité">
            <Form @submit="createActivity" :resolver="resolver" :initialValues="values">
                <div class="p-fluid">
                    <div class="p-field">
                        <InputText id="nom" type="text" v-model="values.name" placeholder="Nom" required="" />
                    </div>
                    <div class="p-field">
                        <label for="Color">Color Picker</label>
                            <ColorPicker id="Color" v-model="values.color" />
                    </div>
                    <Button label="Créer" type="submit"/>
                </div>
            </Form>
        </Panel>
</template>
