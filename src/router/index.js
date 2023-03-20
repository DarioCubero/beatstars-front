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
    path: '/myBeats',
    name: 'myBeats',  
    component: () => import('../views/MyBeatsView.vue')
  },
  {
    path: '/beat/:id',
    name: 'beat',
    component: () => import('../views/BeatDetail.vue')
  },
  // {
  //   path: '/profile',
  //   name: 'profile',
  //   component: () => import('../views/ProfileView.vue')
  // },
  {
    path: '/notfound',
    name: 'notfound',
    component: () => import('../views/NotFoundView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
