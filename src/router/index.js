import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/beats',
    name: 'beats',
    component: () => import('../views/BeatsView.vue')
  },
  {
    path: '/mis-beats',
    name: 'mis-beats',  
    component: () => import('../views/MyBeatsView.vue')
  },
  // {
  //   path: '/mispedidos',
  //   name: 'mis-pedidos', 
  //   component: () => import('../views/MisPedidos.vue')
  // },
  {
    path: '/beat/:id',
    name: 'beat',
    component: () => import('../views/BeatDetail.vue'),
    // beforeEnter(to) {
    //   const id = parseInt(to.params.id);
    //   const local
    // }
  },
  // {
  //   path: '/profile',
  //   name: 'profile',
  //   component: () => import('../views/ProfileView.vue')
  // },
  {
    path: '*',
    name: '404',
    component: () => import('../views/NotFoundView.vue')
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'not-found',
  //   component: () => import('../views/NotFoundView.vue')
  // },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
