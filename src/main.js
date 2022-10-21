import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/reset.css'
import './utils/RegisterMap'
import rightContext from './utils/big-screen/rightMenu'
import './assets/icons'
// 注册大屏设计器相关组件
import bigScreenCpt from '@/components/register/index.js'
import * as echarts from 'echarts'
import dataV from '@jiaminghi/data-view'
Vue.use(rightContext)
Vue.use(bigScreenCpt)
Vue.prototype.$echarts = echarts
Vue.use(dataV)
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
