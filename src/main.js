import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import plugins from './plugins'
// 引入动画
import 'animate.css/animate.min.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/reset.css'
import './utils/RegisterMap'
import rightContext from './utils/rightMenu'
import '@/assets/icon'
// 注册大屏设计器相关组件
import bigScreenCpt from '@/components/register/index.js'
import * as echarts from 'echarts'
import dataV from '@jiaminghi/data-view'
Vue.use(rightContext)
Vue.use(bigScreenCpt)
Vue.use(dataV)
Vue.use(ElementUI)
Vue.use(plugins)

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

const _vue = new Vue({
  el: '#app',
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  store,
  render: h => h(App)
})
export default _vue
