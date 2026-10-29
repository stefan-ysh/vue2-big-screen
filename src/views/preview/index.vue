<template>
  <div class="big-screen-view-bg" :style="convertStyle('bg')">
    <div class="big-screen-view-wrap" :style="convertStyle('wrap')">
      <transition-group appear name="bounce">
        <template v-for="item in designCache.components">
          <div :key="item.id" class="cpt-item" :style="convertStyle('cpt', item)" @click="handleCptClick(item)">
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
      containerScale: [],
      // fit 模式下的居中偏移
      fitMarginLeft: 0,
      fitMarginTop: 0
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
            // fit 模式：bg 作为画布外底色铺满整个窗口；其余模式 bg 即画布尺寸
            width: this.windowWidth + 'px',
            height: this.designCache.previewScaleType === 'fit' ? this.windowHeight + 'px' : this.conHeight + 'px',
            backgroundColor: this.designCache.bgColor,
            backgroundImage: this.designCache.bgImg ? 'url(' + this.designCache.bgImg + ')' : 'none'
          }
        case 'wrap':
          return {
            width: this.windowWidth + 'px',
            height: this.conHeight + 'px',
            transform: 'scale(' + this.containerScale.join(',') + ')',
            marginLeft: this.fitMarginLeft + 'px',
            marginTop: this.fitMarginTop + 'px'
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

    // 交互处理：跳转 + 联动刷新
    handleCptClick(item) {
      const interaction = item.configProps && item.configProps.interaction
      if (!interaction || !interaction.interactable) return
      if (interaction.clickAble && interaction.url) {
        const url = interaction.params
          ? interaction.url + (interaction.url.includes('?') ? '&' : '?') + interaction.params
          : interaction.url
        window.open(url, '_blank')
      }
      const linkageIds = interaction.linkageIds
      if (Array.isArray(linkageIds) && linkageIds.length > 0) {
        linkageIds.forEach(id => {
          const ref = this.cptRefs.get(id)
          if (ref && ref.refreshCptData) {
            ref.refreshCptData()
          }
        })
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
      this.cptRefs.forEach(k => {
        k.refreshCptData && k.refreshCptData()
      })
    },
    // 加载数据
    async loadData() {
      let bigscreenData = null;

      // 获取路由参数
      const { type, id } = this.$route.params;

      // 1. 尝试从模板加载数据
      if (type && id) {
        try {
          // 导入模板数据（await 保证异常能被捕获）
          const templatesModule = await import('../designer/templates');
          const templateList = templatesModule.default[type] || [];
          const template = templateList.find(t => t.id === id);

          if (template) {
            bigscreenData = template;
            this.renderData(bigscreenData);
          } else {
            // 模板未命中时，尝试本地大屏（自定义模板 / 已创建大屏）
            const { findScreenById } = await import('@/api/bigscreen');
            const localScreen = findScreenById(id);
            if (localScreen) {
              this.renderData(localScreen);
            } else {
              // 本地也没有，尝试从缓存加载
              this.loadFromCache();
            }
          }
        } catch (err) {
          this.loadFromCache();
        }
      } else {
        // 无参数时从缓存加载
        this.loadFromCache();
      }
    },
    // 从缓存加载数据
    loadFromCache() {
      try {
        const cacheData = localStorage.getItem('designCache');
        if (!cacheData) {
          this.$message.warning('暂无可预览的大屏数据');
          return;
        }

        const bigscreenData = JSON.parse(Base64.decode(cacheData));
        this.renderData(bigscreenData);
      } catch (err) {
        this.$message.warning('缓存数据解析失败，无法预览');
      }
    },
    // 渲染数据
    renderData(bigscreenData) {
      if (!bigscreenData) {
        return;
      }

      // 权限检查
      if (!bigscreenData.isPublic) {
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
          .then(() => {
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
      }

      // 显示器标题
      document.title = bigscreenData.title || bigscreenData.name;

      // 渲染数据赋值
      this.$store.dispatch('bigScreen/initViewBigScreenData', bigscreenData);
      this.loadSize();

      // 初始化组件参数与引用
      this.initComponents();
    },
    // 初始化组件
    initComponents() {
      const components = this.designCache.components || []
      // 将组件需要的接口参数存储起来
      components.forEach(cpt => {
        const id = cpt.id;
        if (cpt.configProps && cpt.configProps.cptDataForm) {
          try {
            const params = JSON.parse(cpt.configProps.cptDataForm.reqParams || '{}');
            this.$store.dispatch('bigScreen/changeReqParams', { id, params });
          } catch (e) {
            // reqParams 解析失败时忽略该组件的请求参数
          }
        }

        this.$nextTick(() => {
          if (this.$refs[id] && this.$refs[id][0]) {
            // 全局注册组件引用
            const ref = this.$refs[id][0];
            this.$store.commit('bigScreen/ADD_BIG_SCREEN_CPT_REF', { id, ref });
          }
        });
      });
    },
    // 加载窗口
    loadSize() {
      this.windowWidth = document.documentElement.clientWidth
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
        // 按比例自适应：等比缩放并居中显示，保证画布不变形
        case 'fit': {
          const scaleX = this.windowWidth / this.designCache.screenWidth
          const scaleY = this.windowHeight / this.designCache.screenHeight
          // 取较小比例，确保画布完整可见
          const fitScale = Math.min(scaleX, scaleY)
          this.containerScale = [Math.round(fitScale * 100) / 100]
          // 缩放后的实际画布尺寸
          this.conHeight = this.designCache.screenHeight * this.containerScale[0]
          // 计算居中偏移量（外层 transform-origin: 0 0，需手动补 margin）
          this.fitMarginLeft = Math.max(0, (this.windowWidth - this.designCache.screenWidth * this.containerScale[0]) / 2)
          this.fitMarginTop = Math.max(0, (this.windowHeight - this.conHeight) / 2)
          break
        }
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
