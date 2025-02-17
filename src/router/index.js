import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfilComponnent from '@/components/Profil/ProfilComponnent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    //exemple de nested route (pas utilisé dans le projet)
    // {
    //   path: '/profil',
    //   name: 'profil',
    //   component:ProfilComponnent,
    //   children: [
    //     {
    //       path: '/stats',
    //       name: 'stats',
    //       component: statsComponnent ,
    //     },
    //   ]
      
    // }
  ],
})

export default router
