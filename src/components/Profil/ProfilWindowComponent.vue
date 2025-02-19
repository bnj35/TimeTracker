<script setup>
import ProfilComponnent from './ProfilComponnent.vue';
import StatsComponnent from './StatsComponnent.vue';
import Panel from 'primevue/panel';

</script>

<template>
    <Panel class="flex flex-col w-full h-full p-0" header="Profil">
        <ProfilComponnent />
        <StatsComponnent />
    </Panel>

</template>
