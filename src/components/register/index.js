// import '../assets/style/animation.scss'
import '@/assets/style/element-ui-reset.less'
export default {
  install(Vue, options) {
    // 1.读取lib文件夹下的文件
    // requeire.context('路径', 是否读取子文件夹, /正则匹配/)
    const files = require.context('../components', true, /\.vue$/)
    // files 是一个 function 函数（传入读取文件路径后可导入文件）
    files.keys().forEach(item => {
      const fileName = item.substr(item.lastIndexOf('/') + 1)
      // 注册入口文件及设置器文件
      if (['setter.vue', 'main.vue'].includes(fileName)) {
        // files(item).default == 导入了该文件路径
        const cpt = files(item).default
        const cptName = cpt.name
        // 全局注册
        Vue.component(cptName, cpt)
      }
    })
  }
}
