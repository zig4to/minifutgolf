import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Storitve from '../views/Storitve.vue'
import PredstavitevProg from '../views/PredstavitevProg.vue'
import ONas from '../views/ONas.vue'
import Kontakt from '../views/Kontakt.vue'

const routes = [
  { path: '/', name: 'domov', component: Home },
  { path: '/storitve', name: 'storitve', component: Storitve },
  { path: '/predstavitev-prog', name: 'predstavitev-prog', component: PredstavitevProg },
  { path: '/onas', name: 'onas', component: ONas },
  { path: '/kontakt', name: 'kontakt', component: Kontakt },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
