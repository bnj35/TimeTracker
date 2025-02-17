<script setup lang="js">
import { ref } from 'vue';
import Panel from 'primevue/panel';
import { Form } from '@primevue/forms';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useProjectsStore } from '@/stores/projectsStore';
import { useToast } from 'primevue/usetoast';


const toast = useToast();

const projectsStore = useProjectsStore();

const resolver = (values) => {
    return {
        values,
        errors: {}
    };
};

const values = ref({
    name: '',
    description: ''
});

const createProjects = async () => {
    try {
        const response = await projectsStore.addProjects(values.value.name, values.value.description);
        if (response.error) {
            toast.add({ severity: 'error', summary: 'Error', detail: response.error.message, life: 3000 });
        } else {
            toast.add({ severity: 'success', summary: 'Success', detail: 'Projects created', life: 3000 });
            console.log('Projects created:', response.data);
            projectsStore.fetchProjects();
        }

    }
    catch (e) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error during form submission', life: 3000 });
        console.error('Error during form submission:', e);
    }

    projectsStore.fetchProjects();
};


</script>



<template>
    <Panel header="Nouveaux Projets" >
        <Form @submit="createProjects" :resolver="resolver" :initialValues="values">
            <div class="p-fluid">
                <div class="p-field">
                    <InputText id="nom" type="text" v-model="values.name" placeholder="Nom" required="" />
                </div>
                <div class="p-field">
                    <InputText id="description" type="text" v-model="values.description" placeholder="Description" />
                </div>
                <Button label="Créer" type="submit" />
            </div>
        </Form>
    </Panel>
</template>
