import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/Index.vue')
  },
  {
    path: '/design',
    name: 'BigScreenDesign',
    component: () => import(/* webpackChunkName: "about" */ '@/views/designer')
  },
  {
    path: '/preview',
    name: 'PreviewBigscreen',
    component: () => import(/* webpackChunkName: "about" */ '@/views/preview')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
