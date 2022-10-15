
// 参数：
// directory: 说明需要检索的目录
// useSubdirectories: 是否检索子目录
// regExp: 匹配文件的正则表达式, 一般是文件名

// 函数有三个属性：resolve 、keys、id
// resolve: 是一个函数，他返回的是被解析模块的id ，接受一个参数request。
// keys: 也是一个函数，他返回的是一个数组，该数组是由所有可能被上下文模块解析的请求对象组成
// id：上下文模块的id

// 查找背景图片素材
const requireImgModule = require.context(
  '@/assets/images',
  false,
  /\.(jpg|svg|png)$/
)

// 查找图片素材
const requireBgImgModule = require.context(
  '@/assets/bgImg',
  false,
  /\.(jpg|svg|png)$/
)

// 图片数组
const ImgList = []
// 图片素材
for (let i = 0; i < requireImgModule.keys().length; i++) {
  const src = requireImgModule.keys()[i].substr(2, requireImgModule.keys()[i].length)
  ImgList.push({
    title: i + 1,
    id: `img${i}`,
    type: 'img',
    src: require('@/assets/images/' + src)
  })
}
// 背景图片
for (let i = 0; i < requireBgImgModule.keys().length; i++) {
  const src = requireBgImgModule.keys()[i].substr(2, requireBgImgModule.keys()[i].length)
  ImgList.push({
    title: i + 1,
    id: `bg${i}`,
    type: 'bg',
    src: require('@/assets/bgImg/' + src)
  })
}
export default ImgList
