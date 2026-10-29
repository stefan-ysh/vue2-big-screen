import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    meta: { title: '首页' },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "index" */ '@/views/Index.vue')
  },
  {
    path: '/list/:type?',
    name: 'BigScreenList',
    meta: { title: '大屏列表' },
    component: () => import(/* webpackChunkName: "list" */ '@/views/bigscreen/List.vue'),
    props: true
  },
  {
    path: '/design/:type/:id?',
    name: 'BigScreenDesign',
    meta: { title: '大屏设计' },
    component: () => import(/* webpackChunkName: "designer" */ '@/views/designer'),
    props: true
  },
  {
    path: '/preview/:type/:id',
    name: 'PreviewBigscreen',
    meta: { title: '大屏预览' },
    component: () => import(/* webpackChunkName: "preview" */ '@/views/preview'),
    props: true
  },
  {
    path: '/template/:type',
    name: 'TemplateList',
    meta: { title: '模板中心' },
    component: () => import(/* webpackChunkName: "template" */ '@/views/bigscreen/Template.vue'),
    props: true
  },
  // 404页面
  {
    path: '*',
    name: 'NotFound',
    meta: { title: '页面不存在' },
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
