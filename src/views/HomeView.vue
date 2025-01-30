<script setup>
import RegisterForm from "@/components/RegisterForm.vue";
import {useUserStore} from "@/stores/userStore.js";
import LoginForm from "@/components/LoginForm.vue";

const userStore = useUserStore();

</script>

<template>
  <main>
    {{ userStore.user.mail }}
    {{ userStore.user.username }}
    <RegisterForm />
    <LoginForm />


  </main>
</template>
