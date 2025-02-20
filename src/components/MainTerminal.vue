<script setup>
import Terminal from 'primevue/terminal';
import TerminalService from 'primevue/terminalservice'
import {useUserStore} from "@/stores/userStore.js";
import {useProjectsStore} from "@/stores/projectsStore.js";
import {onMounted, onBeforeUnmount} from "vue";

const userStore = useUserStore()
const projectStore = useProjectsStore()


onMounted(() => {
  TerminalService.on('command', commandHandler);
  projectStore.fetchProjects();
})

onBeforeUnmount(() => {
  TerminalService.off('command', commandHandler);
})

const commandHandler = (text) => {
  let response;
  let argsIndex = text.indexOf(' ');
  let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

  switch(command) {
    case "projects":
      //print a table of projects with their name, description status and id
      response = projectStore.projects.map(project => {
        const name = project.name.padEnd(20, '-');
        const description = project.description.padEnd(30, 's');
        const id = project.id.toString().padEnd(5, '>');
        return `${name} ${description} ${id}`;
      }).join('\n');
      break;
    case "date":
      response = 'Today is ' + new Date().toDateString();
      break;

    case "greet":
      response = 'Hola ' + text.substring(argsIndex + 1);
      break;

    case "random":
      response = Math.floor(Math.random() * 100);
      break;

    default:
      response = "Unknown command: " + command;
  }

  TerminalService.emit('response', response);
}

</script>

<template>

  <div class="terminal-container">
    <Terminal
        welcomeMessage="😎Welcome on time-tracker terminal"
        :prompt="userStore.user.name+'@time-tracker $'"
        aria-label="PrimeVue Terminal Service"
    />
  </div>

</template>

<style scoped>
p-terminal {
  height: 100%;
  white-space: pre-wrap;
}
.terminal-container{
  font-family: "Courier New", Courier, monospace;
}

</style>