<script setup>
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
import { Form } from '@primevue/forms';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const userStore = useUserStore();

const user = ref(userStore.user);

function updateUser() {
    userStore.UpdateProfile(user.value.name, user.value.mail);
}

</script>

<template>
    <div class="p-grid p-fluid w-full h-full">
        <div class="p-col-12">
            <div class="p-grid p-fluid flex flex-col space-y-3">
                <h1 class="text-primary-950 text-4xl">Bonjour {{ user.name }}</h1>
                <p class="text-primary-800 ">Vous pouvez modifier vos informations personnelles ici.</p>
                <Form @submit="updateUser" class="p-fluid p-grid flex flex-col space-y-3">
                    <label for="mail">mail</label>
                    <InputText v-model="user.mail"/>
                    <label for="name">name</label>
                    <InputText v-model="user.name"/>

                    <Button type="submit" severity="primary" label="Modifier" class="w-fit-content"/>
                </Form>
            </div>
        </div>
    </div>
</template>