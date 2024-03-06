<template>
  <div class="big-screen-view-bg" :style="convertStyle('bg')">
    <div class="big-screen-view-wrap" :style="convertStyle('wrap')">
      <transition-group appear name="bounce">
        <template v-for="item in designCache.components">
          <div :key="item.id" class="cpt-item" :style="convertStyle('cpt', item)">
            <component
              :is="item.componentName"
              :ref="item.id"
              :cptId="item.id"
              :class="convertAnimation(item.configProps.animation)"
              :width="Math.round(item.cptWidth)"
              :height="Math.round(item.cptHeight)"
              :configProps="item.configProps"
              @reload="loadData"
              @refreshCpt="refreshCpt"
              @refreshAllCpts="refreshAllCpts"
            />
          </div>
        </template>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { Base64 } from 'js-base64'
export default {
  name: 'PreviewIndex',
  data() {
    return {
      windowWidth: 0,
      windowHeight: 0,
      conHeight: 0,
      containerScale: []
    }
  },
  computed: {
    cptRefs() {
      return this.$store.state.bigScreen.cptRefs
    },
    designCache() {
      return this.$store.state.bigScreen.viewData
    }
  },
  beforeMount() {
    this.loadData()
    this.$store.commit('bigScreen/CLEAR_BIG_SCREEN_CPT_REF')
    window.removeEventListener('resize', this.loadSize)
  },
  mounted() {
    window.addEventListener('resize', this.loadSize)
  },
  methods: {
    convertAnimation(animation) {
      if (animation) {
        const { name, speed, repeat, delay } = animation
        return `animate__animated animate__${name} ${speed} ${repeat} ${delay}`
      }
    },
    convertStyle(type, item) {
      switch (type) {
        case 'bg':
          return {
            'background-size': this.designCache.previewScaleType === 'fit' ? 'contain' : '',
            'background-repeat': this.designCache.previewScaleType === 'fit' ? 'no-repeat' : '',
            'background-position': this.designCache.previewScaleType === 'fit' ? 'top' : '',
            width: this.windowWidth + 'px',
            height: this.conHeight + 'px',
            backgroundColor: this.designCache.bgColor,
            backgroundImage: this.designCache.bgImg ? 'url(' + this.designCache.bgImg + ')' : 'none'
          }
        case 'wrap':
          return {
            width: this.windowWidth + 'px',
            height: this.conHeight + 'px',
            transform: 'scale(' + this.containerScale.join(',') + ')'
          }
        case 'cpt':
          return {
            width: Math.round(item.cptWidth) + 'px',
            height: Math.round(item.cptHeight) + 'px',
            top: Math.round(item.cptY) + 'px',
            left: Math.round(item.cptX) + 'px',
            zIndex: item.cptZ,
            opacity: item.opacity,
            transform: `rotateX(${item.rotateX}deg) rotateY(${item.rotateY}deg) rotateZ(${item.rotateZ}deg)`,
            visibility: !item.hidden ? '' : 'hidden'
          }

        default:
          break
      }
    },

    // 刷新部分数据
    refreshCpt(ids) {
      ids.forEach(id => {
        this.cptRefs.get(id).refreshCptData()
      })
    },
    // 刷新所有组件数据
    refreshAllCpts() {
      this.cptRefs.forEach((k, v) => {
        k.refreshCptData && k.refreshCptData()
      })
    },
    // 加载数据
    async loadData() {
      const cacheData = localStorage.getItem('designCache')
      const bigscreenData = JSON.parse(Base64.decode(cacheData))
      if (!bigscreenData.isPublic) {
        console.log('[ 非公开 ] >')
        const pattern = bigscreenData.password
        const regex = new RegExp('^' + pattern + '$')
        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: regex,
          showClose: false,
          showCancelButton: false,
          closeOnClickModal: false,
          closeOnPressEscape: false,
          closeOnHashChange: false,
          inputErrorMessage: '访问密码不正确，请重新输入'
          // inputType: 'password'
        })
          .then(({ value }) => {
            this.$message({
              type: 'success',
              message: '密码输入成功'
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            })
          })
      } else {
        console.log('[ 可公开访问的页面 ] ')
      }
      // 显示器标题
      document.title = bigscreenData.title
      // 渲染数据赋值
      this.$store.dispatch('bigScreen/initViewBigScreenData', bigscreenData)
      this.loadSize()
      // 将组件需要的接口参数存储起来
      this.designCache.components.forEach(cpt => {
        const id = cpt.id
        if (cpt.configProps.cptDataForm) {
          // if (!cpt.configProps.cptDataForm.reqParams) {
          //   console.warn(cpt.layerName + '未设置参数')
          //   return
          // }
          const params = JSON.parse(cpt.configProps.cptDataForm.reqParams || '{}')
          this.$store.dispatch('bigScreen/changeReqParams', { id, params })
        }
        this.$nextTick(() => {
          // 全局注册组件引用
          const ref = this.$refs[id][0]
          this.$store.commit('bigScreen/ADD_BIG_SCREEN_CPT_REF', { id, ref })
        })
      })
    },
    // 加载窗口
    loadSize() {
      this.windowWidth = this.width || document.documentElement.clientWidth
      this.windowHeight = document.documentElement.clientHeight
      switch (this.designCache.previewScaleType) {
        case 'fill':
          // 拉伸填充
          this.containerScale = [
            Math.round((this.windowWidth / this.designCache.screenWidth) * 100) / 100,
            Math.round((this.windowHeight / this.designCache.screenHeight) * 100) / 100
          ]
          this.conHeight = this.designCache.screenHeight * this.containerScale[1]
          break
        case 'scrollY':
          // y 滚动
          this.containerScale = [Math.round((this.windowWidth / this.designCache.screenWidth) * 100) / 100]
          this.conHeight = this.designCache.screenHeight * this.containerScale[0]
          break
        case 'scrollX':
          // x 滚动
          this.containerScale = [Math.round((this.windowHeight / this.designCache.screenHeight) * 100) / 100]
          this.windowWidth = this.designCache.screenWidth * this.containerScale[0]
          this.conHeight = this.designCache.screenHeight * this.containerScale[0]
          break
        // todo 按照比例自适应
        // case "fit":
        //   const arr = [Math.round(
        //       (this.windowWidth / this.designCache.screenWidth) * 100
        //     ) / 100,Math.round(
        //       (this.windowHeight / this.designCache.screenHeight) * 100
        //     ) / 100]
        //     const max = Math.min(...arr)
        //   this.containerScale = [max,max];
        //   this.conHeight = this.windowHeight
        //   break;
        default:
          this.containerScale = [Math.round((this.windowWidth / this.designCache.screenWidth) * 100) / 100]
          this.conHeight = this.designCache.screenHeight
          break
      }
    }
  }
}
</script>

<style scoped lang="less">
.big-screen-view-bg {
  background-size: 100% 100%;
  background-color: #2b3340;
  overflow: hidden;
  .big-screen-view-wrap {
    position: relative;
    transform-origin: 0 0;
    .cpt-item {
      position: absolute;
    }
  }
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
