import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import BeatsView from '../views/BeatsView.vue'

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
    component: BeatsView
  },
  {
    path: '/mis-beats',
    name: 'mis-beats',  
    component: () => import('../views/MyBeatsView.vue')
  },
  {
    path: '/beat/:id',
    name: 'beat',
    component: () => import('../views/BeatDetailView.vue'),
  },
  {
    path: '/pedidos',
    name: 'pedidos', 
    component: () => import('../views/OrdersView.vue')
  },
  {
    path: '/payment',
    name: 'payment', 
    component: () => import('../views/PaymentView.vue')
  },
  {
    path: '/pedidos/:id',
    name: 'pedido', 
    component: () => import('../views/OrderDetailView.vue')
  },
  {
    path: '/subir-beat',
    name: 'upload-beat', 
    component: () => import('../views/FormBeatView.vue')
  },
  {
    path: '/update-beat/:id',
    name: 'update-beat',
    component: () => import('../views/FormBeatView.vue')
  },
  {
    path: '/update-user/:id',
    name: 'update-user',
    component: () => import('../views/ProfileAdminView.vue')
  },
  {
    path: '/carrito',
    name: 'carrito', 
    component: () => import('../views/CartView.vue')
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue')
  },
  {
    path: '/admin-user/:id',
    name: 'admin-user',
    component: () => import('../views/AdminUserView.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/NotFoundView.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
