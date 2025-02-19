<script setup>

import {FloatLabel} from "primevue";
import {Form} from "@primevue/forms";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import {useUserStore} from "@/stores/userStore.js";
import Panel from 'primevue/panel';
import Fluid from 'primevue/fluid';
import Message from 'primevue/message';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const userStore = useUserStore();
import { ref } from 'vue';

const resolver = (values) => {
  return {
    values,
    errors: {}
  };
};

const initialValues = ref({
  token: '',
});

const onFormSubmit = async () => {
  try {
    await userStore.login(initialValues.value.username, initialValues.value.mail);
    toast.add({severity:'success', summary: 'Success', detail: 'Login successful', life: 3000});
  } catch (error) {
    console.error('Error during form submission:', error);
    toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
  }
};


</script>

<template>
  <Panel class="w-full h-full flex items-center flex-col" header="Register">
    <Fluid>
      <Form v-slot="$form" :resolver="resolver" :initialValues @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
          <div class="flex flex-col gap-1">
            <FloatLabel variant="on">
              <InputText id="on_label" v-model="initialValues.token" />
              <label for="on_label">Clé d'Api</label>
            </FloatLabel>
            <Message v-if="$form.token?.invalid" severity="error" size="small" variant="simple">{{ $form.token.error?.message }}</Message>
          </div>
          <div class="flex flex-col gap-1">
            <FloatLabel variant="on">
              <InputText id="on_label" v-model="initialValues.mail" />
              <label for="on_label">Email</label>
            </FloatLabel>
            <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.mail.error?.message }}</Message>
          </div>
          <Button type="submit" severity="primary" label="Créer un compte" />
      </Form>
    </Fluid>
  </Panel>

</template>

<style scoped>

</style>