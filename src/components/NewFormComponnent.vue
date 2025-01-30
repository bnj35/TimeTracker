<script setup lang="js">
import { ref } from 'vue';
import Panel from 'primevue/panel';
import { Form } from '@primevue/forms';
import InputText from 'primevue/inputtext';
import ColorPicker from 'primevue/colorpicker';
import Button from 'primevue/button';

const name = ref('');
const color = ref('');
const activity = ref('');

function createActivity() {
    console.log(name.value);
    console.log(color.value);
    activity.value = {
        name: name.value,
        color: color.value
    }
    console.log(activity.value);
    
}

</script>



<template>
    <div id="test">
        <Panel header="Nouvelle Activité">
            <Form @submit="createActivity">
                <div class="p-fluid">
                    <div class="p-field">
                        <InputText id="nom" type="text" v-model="name" placeholder="Nom" required="" />
                    </div>
                    <div class="p-field">
                        <label for="Color">Color Picker</label>
                            <ColorPicker id="Color" v-model="color" />
                    </div>
                    <Button label="Créer" type="submit"/>
                </div>
            </Form>
        </Panel>

    </div>
</template>

<style scoped>

#test {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
    z-index: 999;
}   

h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

</style>