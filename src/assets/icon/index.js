// 引入 Vue
import Vue from 'vue'
// 引入 BSvgIcon 组件
import BSvgIcon from '@/components/BSvgIcon'
// 将 BSvgIcon 组件 变为 vue 全局组件
Vue.component('BSvgIcon', BSvgIcon)
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
console.log(requireAll)
requireAll(req)
