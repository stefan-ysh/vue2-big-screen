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
    path: '/vue2-big-screen/design',
    name: 'BigScreenDesign',
    component: () => import(/* webpackChunkName: "about" */ '@/views/designer')
  },
  {
    path: '/vue2-big-screen/preview',
    name: 'PreviewBigscreen',
    component: () => import(/* webpackChunkName: "about" */ '@/views/preview')
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: '/vue2-big-screen',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    next('/404.html');
  } else {
    next();
  }
});
export default router
