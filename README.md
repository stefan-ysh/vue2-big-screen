# vue2-big-screen

![示例图片](./src/assets/docs/demo.png)
![示例图片](./src/assets/docs/2.png)

> 基于 vue2 进行搭建的大屏设计器项目，后续会陆续推出 vue3 版本 、react版本等

## Features

- [x] 拖拽配置
- [x] 支持静态数据
- [x] 支持接口数据
- [x] 支持 sql 语句查询
- [x] 支持加密/公开
- [x] 支持背景图选择
- [x] 丰富的图片素材库
- [x] 预览

## [Live Demo](https://stefan-ysh.github.io/vue2-big-screen/)

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

## 组件开发流程
1. 增加配置文件

   增加配置文件后，运行时会自动读取相关文件生成大屏组件列表，无需额外配置注册，文件分别是：
- `meta.js`：组件的元信息文件，包括分组、标题、默认数据等
- `main.vue`：组件的UI文件，为最终呈现方式
- `setter.vue`：组件属性设置器文件，对组件的各项属性进行配置


2. 数据获取
   
   通过调用大屏工具方法并传入当前组件的`数据配置`(如请求地址、是否轮询、轮询间隔等)来实现数据获取
    ```js
    import { getDataJson, pollingRefresh } from '@/utils/big-screen'
    import { v1 as uuidv1 } from 'uuid'
    export default {
        props: {
            // 当前组件的配置属性
            configProps: Object
        },

        created() {
            this.uuid = uuidv1()
        },

        mounted() {
            // 刷新数据
            this.refreshCptData()
        },
        methods: {
            refreshCptData() {
                // 刷新数据，传输当前数据配置，内部会根据具体属性进行操作，如是否轮询、加载数据等
                pollingRefresh(this.uuid, this.configProps.cptDataForm, this.loadData)
            },
            loadData() {
                getDataJson(this.configProps.cptDataForm, this.cptId).then(res => {
                    // res 为当前数据，可以进行渲染操作
                })
            }
        }
    }
    ```
