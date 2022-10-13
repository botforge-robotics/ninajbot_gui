import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import configView from '../views/ConfigView.vue'
import DisconnectedView from '../views/DisconnectedView.vue'
import MappingView from '../views/MappingView.vue'
import NavigationView from '../views/NavigationView.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/mapping',
    name: 'mapping',
    component: MappingView
  },
  {
    path: '/navigation',
    name: 'navigation',
    component: NavigationView
  },
  {
    path: '/config',
    name: 'config',
    component: configView
  },
  {
    path: '/',
    name: 'diconnected',
    component: DisconnectedView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: "/"
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
