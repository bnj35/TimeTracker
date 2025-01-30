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
  username: '',
  mail: ''
});

const onFormSubmit = async () => {
  try {
    console.log('Form submitted');
    const response = await userStore.login(initialValues.value.username, initialValues.value.mail);
    if (response.error){
      toast.add({severity:'error', summary: 'Error', detail: response.error.message, life: 3000});
    } else {
      toast.add({severity:'success', summary: 'Success', detail: 'Login successful', life: 3000});
    }
  } catch (error) {
    toast.add({severity:'error', summary: 'Error', detail: 'Error during form submission', life: 3000});
    console.error('Error during form submission:', error);
  }
};


</script>

<template>
  <Panel class="w-sm flex items-center flex-col" header="Login">
    <Fluid>
      <Form v-slot="$form" :resolver="resolver" :initialValues @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
          <div class="flex flex-col gap-1">
            <FloatLabel variant="on">
              <InputText id="on_label" v-model="initialValues.username" />
              <label for="on_label">Username</label>
            </FloatLabel>
            <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error?.message }}</Message>
          </div>
          <div class="flex flex-col gap-1">
            <FloatLabel variant="on">
              <InputText id="on_label" v-model="initialValues.mail" />
              <label for="on_label">Email</label>
            </FloatLabel>
            <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.mail.error?.message }}</Message>
          </div>
          <Button type="submit" severity="secondary" label="Login" />
      </Form>
    </Fluid>
  </Panel>

</template>

<style scoped>

</style>