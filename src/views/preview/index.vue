<template>
  <div
    class="big-screen-view"
    :style="{
      width: windowWidth + 'px',
      height: conHeight + 'px',
      backgroundColor: designCache.bgColor,
      backgroundImage: designCache.bgImg ? 'url(' + designCache.bgImg + ')' : 'none'
    }"
  >
    <div
      style="position: relative; transform-origin: 0 0"
      :style="{
        width: windowWidth + 'px',
        height: conHeight + 'px',
        transform: 'scale(' + containerScale + ')'
      }"
    >
      <transition-group appear name="bounce">
        <template v-for="item in designCache.components">
          <div
            v-if="!item.hidden"
            :key="item.id"
            style="position: absolute"
            :style="{
              width: Math.round(item.cptWidth) + 'px',
              height: Math.round(item.cptHeight) + 'px',
              top: Math.round(item.cptY) + 'px',
              left: Math.round(item.cptX) + 'px',
              zIndex: item.cptZ,
              transform: `rotate(${item.cptRotate}deg)`
            }"
          >
            <component
              :is="item.componentName"
              :ref="item.id"
              :width="Math.round(item.cptWidth)"
              :height="Math.round(item.cptHeight)"
              :configProps="item.configProps"
              :rotateDeg="{
                transform: `rotateX(${item.rotateX}deg) rotateY(${item.rotateY}deg) rotateZ(${item.rotateZ}deg)`
              }"
              @changeCptHiddenStatus="changeCptHiddenStatus"
              @reload="loadData"
              @refreshCpt="refreshCpt"
            />
          </div>
        </template>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreviewIndex',
  data() {
    return {
      designCache: {},
      windowWidth: 0,
      windowHeight: 0,
      conHeight: 0,
      containerScale: 1
    }
  },
  beforeMount() {
    window.removeEventListener('resize', this.loadSize)
  },
  mounted() {
    this.loadData()
    window.addEventListener('resize', this.loadSize)
  },
  methods: {
    // 更改组件显隐
    changeCptHiddenStatus(id) {
      const res = this.designCache.components.find(_c => {
        return _c.id === id
      })
      if (res) {
        res.hidden = !res.hidden
      }
    },
    // 刷新组件数据
    refreshCpt(id) {
      this.$refs[id][0].refreshCptData()
    },
    // 加载数据
    loadData() {
      const id = this.$route.query.id
      // 设计师的预览，加载本地缓存数据
      if (this.$route.name === 'BigScreenDesign') {
        const data = JSON.parse(localStorage.getItem('designCache'))
        // 显示器标题
        document.title = data.title
        // 渲染数据赋值
        this.designCache = data
        this.loadSize()
      } else if (this.$route.name === '/big-screen-view') {
        // 运行时进行接口请求真实数据进行渲染
        if (!id) {
          return this.$message.info('未发现 id 参数，请检查后重试')
        }
        // todo 接口获取数据渲染
        // todo 分别对公开和非公开的大屏进行处理，公开直接显示，非公开则需要输入密码后才可查看内容
      }
    },
    // 加载窗口
    loadSize() {
      this.windowWidth = document.documentElement.clientWidth
      this.windowHeight = document.documentElement.clientHeight
      this.containerScale = Math.round((this.windowWidth / this.designCache.scaleX) * 100) / 100
      this.conHeight = this.designCache.scaleY
    }
  }
}
</script>

<style scoped>
.big-screen-view {
  background-size: 100% 100%;
  background-color: #2b3340;
  overflow: hidden;
}
.bounce-enter-active {
  transition: all 1s;
  /*animation: bounce-in 1s;*/
}
.bounce-enter {
  opacity: 0;
  transform: scale(0.5);
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  25% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
