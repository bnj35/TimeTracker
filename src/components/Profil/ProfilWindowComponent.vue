<script setup>
import ProfilComponnent from './ProfilComponnent.vue';
import StatsComponnent from './StatsComponnent.vue';
import Panel from 'primevue/panel';

</script>

<template>
    <Panel class="flex flex-row gap-4  w-full h-full">

        <ProfilComponnent />
        <StatsComponnent />
    </Panel>

</template>