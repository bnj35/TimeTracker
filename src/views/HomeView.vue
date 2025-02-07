<script setup>
import NavbarComponnent from '@/components/NavbarComponnent.vue';
import NewActiviteComponnent from '@/components/NewActiviteComponnent.vue';
import GetActiviteComponnent from '@/components/GetActiviteComponnent.vue';
import GetProjectsComponnent from '@/components/GetProjectsComponnent.vue';
import NewProjectsComponent from '@/components/NewProjectsComponent.vue';

</script>

<template>
  <NavbarComponnent />
  <div class="flex row w-full items-center justify-center gap-4 ">
  <NewActiviteComponnent />
  <GetActiviteComponnent />
  <GetProjectsComponnent />
  <NewProjectsComponent />
</div>

  <main>

  </main>
</template>
