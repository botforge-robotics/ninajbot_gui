import { createRouter, createWebHistory } from 'vue-router'
import TeleopView from '../views/TeleopView.vue'
import DisconnectedView from '../views/DisconnectedView.vue'
import MappingView from '../views/MappingView.vue'
import NavigationView from '../views/NavigationView.vue'
import AuxilaryView from '../views/AuxilaryView.vue'
import NtsView from '../views/NtsView.vue'
import ParamsView from '../views/ParamsView.vue'
import LogView from '../views/LogView.vue'
import ThreeDView from '../views/ThreeDView.vue'
import store from '../store/index.js'

const routes = [
  {
    path: '/teleop',
    name: 'teleop',
    component: TeleopView,
    beforeEnter:(to,from,next)=>{
      if(store.getters.isRoboConnected) next()
      else next({path:'/'})
    }
  },
  {
    path: '/aux',
    name: 'aux',
    component: AuxilaryView,
    beforeEnter:(to,from,next)=>{
      if(store.getters.isRoboConnected) next()
      else next({path:'/'})
    }
  },
  {
    path: '/nts',
    name: 'nts',
    component: NtsView,
    beforeEnter:(to,from,next)=>{
      if(store.getters.isRoboConnected) next()
      else next({path:'/'})
    }
  },{
    path: '/log',
    name: 'log',
    component: LogView,
    beforeEnter:(to,from,next)=>{
      if(store.getters.isRoboConnected) next()
      else next({path:'/'})
    }
  },
  {
    path: '/params',
    name: 'params',
    component: ParamsView,
    beforeEnter:(to,from,next)=>{
      if(store.getters.isRoboConnected) next()
      else next({path:'/'})
    }
  },
  {
    path: '/3d',
    name: '3d',
    component: ThreeDView,
    beforeEnter:(to,from,next)=>{
      if(store.getters.isRoboConnected) next()
      else next({path:'/'})
    }
  },
  {
    path: '/mapping',
    name: 'mapping',
    component: MappingView,
    beforeEnter:(to,from,next)=>{
      if(store.getters.isRoboConnected) next()
      else next({path:'/'})
    }
  },
  {
    path: '/navigation',
    name: 'navigation',
    component: NavigationView,
    beforeEnter:(to,from,next)=>{
      if(store.getters.isRoboConnected) next()
      else next({path:'/'})
    }
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
