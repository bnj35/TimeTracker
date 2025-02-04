<script setup>
import { computed, defineProps } from "vue";
import {FloatLabel} from "primevue";
import {Form} from "@primevue/forms";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import {useUserStore} from "@/stores/userStore.js";
import {useObjectiveStore} from "@/stores/objectivesStore.js";
import Panel from 'primevue/panel';
import Fluid from 'primevue/fluid';
import Message from 'primevue/message';
import { useToast } from 'primevue/usetoast';
import {useAPI} from "@/composables/useAPI.js";
import Textarea from 'primevue/textarea';


const toast = useToast();
const api = useAPI();
const emit = defineEmits(['submit']);
const objectiveStore = useObjectiveStore();
const props = defineProps({
  objectif: {
    type: {
      id: String | null,
      name: String | null,
      content: String | null,
    },
    required: false,
    default: () => ({
      id: null,
      name: '',
      content: '',
    }),
  }
});

import { ref } from 'vue';

const resolver = (values) => {
  return {
    values,
    errors: {}
  };
};

const initialValues = ref({
  name: props.objectif.name ?? '',
  content: props.objectif.content ?? '',
});

const onFormSubmit = async () => {
  if (props.objectif.id){
    try {
      await objectiveStore.update(props.objectif.id, initialValues.value);
      await objectiveStore.fetch();
      initialValues.value = {
        name: '',
        content: '',
      };
      toast.add({severity:'success', summary: 'Success', detail: 'Objectif mis à jour', life: 3000});
    } catch (error) {
      toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
    }
  }
  else{
    try {
      objectiveStore.create(initialValues.value);
      await objectiveStore.fetch();
      initialValues.value = {
        name: '',
        content: '',
      };
      toast.add({severity:'success', summary: 'Success', detail: 'Objectif créer', life: 3000});
    } catch (error) {
      toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
    }
  }
  emit('submit');
};

const buttonLabel = computed(() => {
  return props.objectif.id ? "Mettre à jour l'objectif" : "Ajouter l'objectif";
});

</script>

<template>
  <Panel :class="props.objectif.id? '!border-0' : '' " class="w-sm flex items-center flex-col" :header="props.objectif.id ? 'Modifier l\'objectif' : 'Ajouter un objectif'">
    <Fluid>
      <Form v-slot="$form" :resolver="resolver" :initialValues @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
        <div class="flex flex-col gap-1">
          <FloatLabel variant="on">
            <InputText id="on_label" v-model="initialValues.name" />
            <label for="on_label">Nom</label>
          </FloatLabel>
          <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">{{ $form.name.error?.message }}</Message>
        </div>
        <div class="flex flex-col gap-1">
          <FloatLabel variant="on">
            <Textarea v-model="initialValues.content" rows="2" cols="24"/>
            <label for="on_label">Description</label>
          </FloatLabel>
          <Message v-if="$form.content?.invalid" severity="error" size="small" variant="simple">{{ $form.content.error?.message }}</Message>
        </div>
        <Button type="submit" severity="primary" :label="buttonLabel" />
      </Form>
    </Fluid>
  </Panel>
</template>

<style scoped>


</style>