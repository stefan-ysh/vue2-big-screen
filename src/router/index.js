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
    component: () => import(/* webpackChunkName: "index" */ '@/views/Index.vue')
  },
  {
    path: '/list/:type?',
    name: 'BigScreenList',
    component: () => import(/* webpackChunkName: "list" */ '@/views/bigscreen/List.vue'),
    props: true
  },
  {
    path: '/design/:type/:id?',
    name: 'BigScreenDesign',
    component: () => import(/* webpackChunkName: "designer" */ '@/views/designer'),
    props: true
  },
  {
    path: '/preview/:type/:id',
    name: 'PreviewBigscreen',
    component: () => import(/* webpackChunkName: "preview" */ '@/views/preview'),
    props: true
  },
  {
    path: '/template/:type',
    name: 'TemplateList',
    component: () => import(/* webpackChunkName: "template" */ '@/views/bigscreen/Template.vue'),
    props: true
  },
  // 404页面
  {
    path: '*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "404" */ '@/views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  // base: '/vue2-big-screen',
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  const defaultTitle = '大屏设计系统';
  
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} - ${defaultTitle}`;
  } else {
    document.title = defaultTitle;
  }
  
  next();
})

export default router
