<script setup>
import RegisterForm from "@/components/RegisterForm.vue";
import {useUserStore} from "@/stores/userStore.js";

const userStore = useUserStore();

</script>

<template>
  <main>
    {{ userStore.user.mail }}
    {{ userStore.user.username }}
    <RegisterForm />


  </main>
</template>
