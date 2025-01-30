<script setup>
import { Form } from '@primevue/forms';
import InputText from 'primevue/inputtext';

</script>

<template>
  <main>
    helloooooo

    <FloatLabel variant="on">
      <InputText id="on_label" v-model="value3" />
      <label for="on_label">On Label</label>
    </FloatLabel>

    <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
      <div class="flex flex-col gap-1">
        <InputText name="username" type="text" placeholder="Username" fluid />
        <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error?.message }}</Message>
      </div>
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>

  </main>
</template>
