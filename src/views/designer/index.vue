<template>
  <div class="bigscreen-designer">
    <!-- 顶部操作栏 -->
    <Toolbar
      :multipleCptPositions="multipleCptPositions"
      :multipleCpts="multipleCpts"
      @clearMultipleCpts="clearMultipleCpts"
    />
    <!-- 底部设计区 -->
    <div class="design-area" :style="designAreaStyle" @click.self="outBlur">
      <!-- 控制左右两边面板显隐 -->
      <!-- todo jsx 重构 -->
      <LeftPaneControlBar />
      <RightPaneControlBar />
      <!--左侧组件列表栏-->
      <div class="left-pane" :style="{ width: cptPaneWidth + 'px' }">
        <component-pane
          @setMultipleCpt="setMultipleCpt"
          @dragStart="dragStart"
          @showConfigPane="showConfigPane"
          @copyCpt="copyCpt"
          @delCpt="delCpt"
        />
      </div>
      <!-- 中间组件显示区 -->
      <div
        class="canvas-area"
        :style="{ width: windowWidth - cptPaneWidth - configPaneWidth + 'px', opacity: bgOpacity }"
        @click.self="outBlur"
      >
        <!-- todo 参数优化 -->
        <!-- <SketchRuler
          v-show="isShowRuler"
          :scale="containerScale"
          :width=" windowWidth - cptPaneWidth - configPaneWidth + -27"
          :height="windowHeight - 73"
        /> -->
        <div
          ref="webContainer"
          class="web-container"
          :style="{
            width: designData.screenWidth + 'px',
            height: designData.screenHeight + 'px',
            backgroundColor: designData.bgColor,
            backgroundImage: designData.bgImg ? 'url(' + designData.bgImg + ')' : 'none',
            transform: 'scale(' + containerScale + ')',
            transition: 'transform .5s',
            margin: '20px 0 0 20px'
          }"
          @dragover="dropOver"
          @drop="handleDrop"
          @click.self="outBlur"
        >
          <template v-if="cacheComponents.length > 0">
            <!-- 组件 -->
            <div
              v-for="(item, index) in cacheComponents"
              :key="item.id"
              :ref="'div' + item.componentName + index"
              class="cpt-div"
              :style="commonCptStyle(item, index)"
              tabindex="0"
              @mousedown="showConfigPane($event, item, index)"
              @contextmenu.prevent="handleContextMenu"
            >
              <!-- 组件坐标显示 -->
              <div v-if="isShowCoord" class="cpt-coordinate">({{ item.cptX }}, {{ item.cptY }})</div>
              <!--顶部辅助线-->
              <div v-show="currentCptIndex === index" class="x-auxiliary-line" />
              <!--左侧辅助线-->
              <div v-show="currentCptIndex === index" class="y-auxiliary-line" />
              <!-- 防止组件交互的时候造成不必要的事件触发以及性能问题，设计状态时此处使用模板覆盖 -->
              <!-- todo 探索其他解决方案 -->
              <div
                v-resize="'move'"
                class="active-mask"
                :data-index="index"
                :style="multipleCpts[item.id] ? { border: '1px solid #B6BFCE' } : {}"
              />
              <div class="cpt-wrap">
                <component
                  :is="item.componentName"
                  :ref="item.id"
                  :class="convertAnimation(item.configProps.animation)"
                  :cptId="item.id"
                  :width="Math.round(item.cptWidth)"
                  :height="Math.round(item.cptHeight)"
                  :configProps="item.configProps"
                  :style="commonCptStyle(item, index, 'rotate')"
                />
              </div>
              <!-- 缩放把手 -->
              <div
                v-for="(it, i) in resizeBars"
                v-show="currentCptIndex === index"
                :key="i"
                v-resize="it.direction"
                :style="it.style"
                class="resize-bar"
              />
            </div>
          </template>
          <!-- 无组件提示信息 -->
          <div v-else class="no-cpt-placeholder">
            <BSvgIcon class="no-cpt-tip-img" icon-class="building" />
            <span class="no-cpt-tips"> 暂无组件，请从左侧组件面板拖入进行设计 </span>
          </div>
        </div>
      </div>
      <!--右侧属性设置栏-->
      <div class="right-prop-pane" :style="{ width: configPaneWidth + 'px' }">
        <config-pane ref="configPane" :currentCpt.sync="currentCpt" />
      </div>
    </div>
  </div>
</template>

<script>
import ComponentPane from '../modules/Pane/component-pane'
import ConfigPane from '../modules/Pane/config-pane'
import { clearCptInterval } from '@/utils'
import Toolbar from '../modules/Toolbar'
import RightPaneControlBar from '../modules/PaneControlBar/right-bar'
import LeftPaneControlBar from '../modules/PaneControlBar/left-bar'
import SketchRuler from '../modules/SketchRuler'
import mockData from './mockData'
// import * as BigscreenApi from '@/api'
import { Base64 } from 'js-base64'
export default {
  name: 'BigScreenDesigner',
  components: {
    ConfigPane,
    ComponentPane,
    LeftPaneControlBar,
    RightPaneControlBar,
    SketchRuler,
    Toolbar
  },
  directives: {
    resize(el, binding, vNode) {
      // 组件拉伸，移动位置
      el.onmousedown = function(e) {
        const that = vNode.context
        that.bgOpacity = 0.8
        const scaleClientX = e.clientX / that.containerScale
        const scaleClientY = e.clientY / that.containerScale
        const rbX = scaleClientX - el.parentNode.offsetWidth
        const rbY = scaleClientY - el.parentNode.offsetHeight
        const ltX = scaleClientX + el.parentNode.offsetWidth
        const ltY = scaleClientY + el.parentNode.offsetHeight
        const disX = scaleClientX - el.parentNode.offsetLeft
        const disY = scaleClientY - el.parentNode.offsetTop
        let cptWidth, cptHeight, cptX, cptY

        document.onmousemove = function(me) {
          const meScaleClientX = me.clientX / that.containerScale
          const meScaleClientY = me.clientY / that.containerScale
          if (binding.value === 'move') {
            cptX = meScaleClientX - disX
            cptY = meScaleClientY - disY
            // 遍历已经多选的组件，并更新改其位置
            // new position = old position + moving distance
            Object.keys(that.multipleCpts).forEach(key => {
              const newX = that.multipleCptPositions[key].cptX + Math.round(meScaleClientX - scaleClientX)
              const newY = that.multipleCptPositions[key].cptY + Math.round(meScaleClientY - scaleClientY)

              that.multipleCpts[key].cptX = newX
              that.multipleCpts[key].cptY = newY
            })
          } else {
            switch (binding.value) {
              case 'lt':
                cptWidth = ltX - meScaleClientX
                cptHeight = ltY - meScaleClientY
                cptX = meScaleClientX - disX
                cptY = meScaleClientY - disY
                that.currentCpt.cptX = Math.round(cptX)
                that.currentCpt.cptY = Math.round(cptY)
                break
              case 't':
                cptHeight = ltY - meScaleClientY
                cptY = meScaleClientY - disY
                that.currentCpt.cptY = Math.round(cptY)
                break
              case 'rt':
                cptWidth = meScaleClientX - rbX
                cptHeight = ltY - meScaleClientY
                cptY = meScaleClientY - disY
                that.currentCpt.cptY = Math.round(cptY)
                break
              case 'r':
                cptWidth = meScaleClientX - rbX
                break
              case 'rb':
                cptWidth = meScaleClientX - rbX
                cptHeight = meScaleClientY - rbY
                break
              case 'b':
                cptHeight = meScaleClientY - rbY
                break
              case 'lb':
                cptWidth = ltX - meScaleClientX
                cptHeight = meScaleClientY - rbY
                cptX = meScaleClientX - disX
                that.currentCpt.cptX = Math.round(cptX)
                break
              case 'l':
                cptWidth = ltX - meScaleClientX
                cptX = meScaleClientX - disX
                that.currentCpt.cptX = Math.round(cptX)
                break
            }
            cptWidth = cptWidth < 40 ? 40 : cptWidth // 限制最小缩放
            cptHeight = cptHeight < 20 ? 20 : cptHeight
            if (cptWidth) that.currentCpt.cptWidth = Math.round(cptWidth)
            if (cptHeight) that.currentCpt.cptHeight = Math.round(cptHeight)
          }
        }
        document.onmouseup = function() {
          that.bgOpacity = 1
          document.onmousemove = document.onmouseup = null
          // 解决多选移动未松开ctrl键第二次以后拖动定位还原
          that.multipleCptPositions = JSON.parse(JSON.stringify(that.multipleCpts))
        }
        return false
      }
    }
  },
  provide() {
    return {
      refreshCptData: this.refreshCptData
    }
  },
  data() {
    return {
      bigscreenId: '',
      // 背景透明度
      bgOpacity: 1,
      // 缩放按钮
      resizeBars: Object.freeze([
        {
          direction: 'lt',
          style: 'top: 0; left: 0; cursor: nwse-resize; transform: translate(-50%, -50%);'
        },
        {
          direction: 't',
          style:
            'top: 0; border-radius: 5px !important;  left: 50%; cursor: ns-resize; transform: translate(-50%, -50%);'
        },
        {
          direction: 'rt',
          style: 'top: 0; right: 0; cursor: nesw-resize; transform: translate(50%, -50%);'
        },
        {
          direction: 'l',
          style:
            'top: 50%; left: 0; border-radius: 5px !important; cursor: ew-resize; transform: translate(-50%, -50%);'
        },
        {
          direction: 'lb',
          style: 'bottom: 0; left: 0; cursor: nesw-resize; transform: translate(-50%, 50%);'
        },
        {
          direction: 'b',
          style:
            'bottom: 0; border-radius: 5px !important; left: 50%; cursor: ns-resize; transform: translate(-50%, 50%);'
        },
        {
          direction: 'rb',
          style: 'bottom: 0; right: 0; cursor: nwse-resize; transform: translate(50%, 50%);'
        },
        {
          direction: 'r',
          style:
            'top: 50%; border-radius: 5px !important;  right: 0; cursor:ew-resize; transform: translate(50%, -50%);'
        }
      ]),
      curDragCpt: '',
      multipleCpts: {},
      // 记录组件原来位置
      multipleCptPositions: {}
    }
  },
  computed: {
    cptRefs() {
      return this.$store.state.bigScreen.cptRefs
    },
    designAreaStyle() {
      return this.$store.getters['bigScreen/designAreaStyle']
    },
    containerScale() {
      return this.$store.state.bigScreen.containerScale
    },
    windowWidth() {
      return this.$store.state.bigScreen.windowWidth
    },
    windowHeight() {
      return this.$store.state.bigScreen.windowHeight
    },
    cptPaneWidth() {
      return this.$store.state.bigScreen.componentPaneWidth
    },
    configPaneWidth() {
      return this.$store.state.bigScreen.configPaneWidth
    },
    designData() {
      return this.$store.state.bigScreen.bigScreenData
    },
    isShowCoord: {
      get() {
        return this.$store.state.bigScreen.isShowCoord
      },
      set(val) {
        this.$store.dispatch('bigScreen/setCoordShowStatus', val)
      }
    },
    isShowRuler: {
      get() {
        return this.$store.state.bigScreen.isShowRuler
      },
      set(val) {
        this.$store.dispatch('bigScreen/setRuleShowStatus', val)
      }
    },
    currentCptIndex() {
      return this.$store.state.bigScreen.curComponentIndex
    },
    // 当前选中的组件
    currentCpt() {
      return this.$store.state.bigScreen.curComponent
    },
    cacheComponents() {
      return this.$store.state.bigScreen.componentList
    }
  },
  created() {
    this.$store.commit('bigScreen/INIT_FREQUENTLY_USED_COMPONENTS')
    this.loadData()
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('resize', this.initContainerSize)
    this.$store.dispatch('bigScreen/setContainer', this.$refs.webContainer)
  },
  beforeDestroy() {
    this.$store.commit('bigScreen/CLEAR_BIG_SCREEN_CPT_REF')
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('resize', this.initContainerSize)
  },
  methods: {
    convertAnimation(animation) {
      if (animation) {
        const { name, speed, repeat, delay } = animation
        return `animate__animated animate__${name} ${speed} ${repeat} ${delay}`
      }
    },
    commonCptStyle(item, index, type) {
      if (type === 'rotate') {
        return {
          transform: `rotateX(${item.rotateX}deg) rotateY(${item.rotateY}deg) rotateZ(${item.rotateZ}deg)`,
          opacity: item.opacity ? item.opacity : item.hidden ? '0.3' : '1'
        }
      }
      return {
        width: Math.round(item.cptWidth) + 'px',
        height: Math.round(item.cptHeight) + 'px',
        top: Math.round(item.cptY) + 'px',
        left: Math.round(item.cptX) + 'px',
        zIndex: this.currentCptIndex === index ? 1800 : item.cptZ
      }
    },
    // 点击右键菜单时触发
    handleContextMenu(event) {
      const menu = [
        {
          label: '上移一层',
          icon: 'el-icon-arrow-up',
          key: 'layerUp'
        },
        {
          label: '下移一层',
          icon: 'el-icon-arrow-down',
          key: 'layerDown'
        },
        {
          label: '置顶图层',
          icon: 'el-icon-top',
          key: 'layerTop'
          // callback: this.copyCpt
        },
        {
          label: '置底图层',
          icon: 'el-icon-bottom',
          key: 'layerBottom'
          // callback: this.copyCpt
        },
        {
          label: '复制图层',
          icon: 'el-icon-document-copy',
          key: 'copyLayer',
          callback: this.copyCpt
        },
        {
          label: '删除图层',
          icon: 'el-icon-delete',
          key: 'delLayer',
          callback: this.copyCpt
        }
      ]
      const rightMenuOptions = {
        menu,
        event,
        backgroundColor: '#27343e',
        activeColor: '#23434f'
      }
      this.$rightCtx(rightMenuOptions)
        .then(res => {
          switch (res.key) {
            case 'layerUp':
              this.currentCpt.cptZ++
              break
            case 'layerDown':
              this.currentCpt.cptZ--
              break
            case 'layerTop':
              // todo
              break
            case 'layerBottom':
              // todo
              break
            case 'copyLayer':
              res.callback(this.currentCpt)
              break
            case 'delLayer':
              this.delCpt(this.currentCpt, event.target.dataset.index)
              break

            default:
              break
          }
        })
        .catch(err => {
          // this.$modal.msg('操作失败，请重试')
          console.log('右键操作取消/失败', err)
        })
    },

    handleKeyDown(e) {
      // 没有组件选中时，则无需做任何处理
      if (this.currentCptIndex === -1) {
        return
      }
      // 是否需在其他输入元素聚焦
      const isIptElFocus = ['INPUT', 'TEXTAREA'].includes(document.activeElement.nodeName)
      // 存在输入框聚焦时，不触发方向键移动事件，持续优化
      if (isIptElFocus) {
        return false
      }
      // 键盘事件的 code
      const keyCode = e.which || e.keyCode
      // ctrl 键是否按下
      const isCtrlDown = e.ctrlKey ? e.ctrlKey : keyCode === 17
      // ctrl + c
      if (keyCode === 67 && isCtrlDown) {
        this.copyCpt(this.currentCpt)
      }
      const key = e.key
      if (['ArrowDown', 'Arrow', 'ArrowLeft', 'ArrowRight'].includes(key)) {
        e.preventDefault()
      }
      let speed = 1
      if (e.shiftKey) {
        speed = 5
      }
      let idx = 0
      switch (key) {
        // 方向键移动当前组件
        case 'ArrowDown':
          this.currentCpt.cptY += speed
          break
        case 'ArrowUp':
          this.currentCpt.cptY -= speed
          break
        case 'ArrowLeft':
          this.currentCpt.cptX -= speed
          break
        case 'ArrowRight':
          this.currentCpt.cptX += speed
          break
        // 删除键(delete) 和 退回键(back space) 触发删除组件
        // 避免有输入框聚焦时影响输入，此处判断是否存在聚焦中的输入框
        case 'Delete':
          if (!isIptElFocus) {
            idx = this.cacheComponents.findIndex(c => c.id === this.currentCpt.id)
            this.delCpt(this.currentCpt, idx)
          }
          break
        case 'Backspace':
          if (!isIptElFocus) {
            idx = this.cacheComponents.findIndex(c => c.id === this.currentCpt.id)
            this.delCpt(this.currentCpt, idx)
          }
          break
      }
    },
    initContainerSize() {
      this.$store.dispatch('bigScreen/initContainerSize')
    },

    // 加载数据
    async loadData() {
      this.$modal.loading('加载中')
      let bigscreenData = ''
      const cacheData = localStorage.getItem('viewData')
      if (cacheData) {
        bigscreenData = JSON.parse(Base64.decode(cacheData))
      } else {
        bigscreenData = mockData
      }

      const cptList = bigscreenData.components
      this.$store.dispatch('bigScreen/initViewBigScreenData', bigscreenData)
      this.$store.dispatch('bigScreen/initBigScreenData', bigscreenData)
      this.$store.dispatch('bigScreen/initComponentList', cptList)
      // 全局注册组件引用
      this.$nextTick(() => {
        this.designData.components.forEach(c => {
          const id = c.id
          const ref = this.$refs[id][0]
          this.$store.commit('bigScreen/ADD_BIG_SCREEN_CPT_REF', { id, ref })
        })
      })
      this.designData.components.forEach(cpt => {
        if (cpt.configProps.cptDataForm) {
          // if (!cpt.configProps.cptDataForm.reqParams) {
          //   console.warn(cpt.layerName + '未设置参数')
          //   return
          // }
          const id = cpt.id
          const params = JSON.parse(cpt.configProps.cptDataForm.reqParams || '{}')
          this.$store.dispatch('bigScreen/changeReqParams', { id, params })
        }
      })
      this.$modal.closeLoading()
      this.initContainerSize()
    },

    // 复制组件
    copyCpt(item) {
      const copyCpt = JSON.parse(JSON.stringify(item))
      copyCpt.id = require('uuid').v1()
      // 复制出的组件坐标需有所偏移，与源组件有所区分，以便能清楚感知
      copyCpt.cptX = item.cptX + 30
      copyCpt.cptY = item.cptY + 30
      copyCpt.cptZ = this.cacheComponents.length + 1
      this.$store.dispatch('bigScreen/addCpt', copyCpt)
      this.$nextTick(() => {
        this.$store.commit('bigScreen/ADD_BIG_SCREEN_CPT_REF', { id: copyCpt.id, ref: this.$refs[copyCpt.id][0] })
      })
      // todo 根据类型提示
      // 聚焦到复制的组件
      this.$store.dispatch('bigScreen/setCurComponentIndex', this.cacheComponents.length - 1)
      this.$store.dispatch('bigScreen/setCurComponent', copyCpt)
      // 将复制的组件添加到已选组件列表
      this.clearMultipleCpts()
      this.setMultipleCpt({}, copyCpt)
      this.$message.closeAll()
      this.$modal.msgSuccess(`${item.cptTitle} 组件复制成功！`)
    },
    refreshCptData(refName) {
      const cptRef = this.cptRefs.get(refName)
      if (!cptRef.refreshCptData) {
        this.$message.info('当前图层还未实现 refreshCptData 方法')
      } else {
        // 刷新子组件数据，ref 引用为组件名加 index
        cptRef.refreshCptData()
      }
    },
    outBlur() {
      // 取消聚焦组件
      this.$store.dispatch('bigScreen/setCurComponentIndex', -1)
      this.$store.dispatch('bigScreen/setCurComponent', {})
      this.clearMultipleCpts()
    },

    // 删除组件
    delCpt(cpt, index) {
      this.$confirm('删除' + cpt.cptTitle + '组件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'big-screen-confirm-dialog'
      })
        .then(() => {
          // 记录一个bug，v-for key值重复导致页面渲染数据错乱。在丢下组件时实用uuid作为key解决。
          this.$store.dispatch('bigScreen/setCurComponent', {})
          this.$store.dispatch('bigScreen/delCpt', index)
          const childId = this.$refs[cpt.componentName + index][0].uuid
          clearCptInterval(childId)
        })
        .catch(() => {})
    },
    // 显示配置面板
    showConfigPane(e, item, index) {
      // 设置多选组件集合
      this.setMultipleCpt(e, item)
      // 刷新属性栏数据，页面上拖动的组件执行点击事件来更新组件的属性栏
      this.$store.dispatch('bigScreen/setCurComponent', item)
      this.$store.dispatch('bigScreen/setCurComponentIndex', index)
      if (this.$refs['div' + item.componentName + index]) {
        // 聚焦 用于多选移动
        this.$refs['div' + item.componentName + index][0].focus()
      }
      this.$refs['configPane'].showCptConfig(item)
    },
    dragStart(curDragCpt) {
      // 拖拽开始,及从左侧组件列表拖起组件时
      this.curDragCpt = curDragCpt
      curDragCpt.draggable = false
    },
    dropOver(e) {
      e.preventDefault()
    },
    handleDrop(e) {
      const config = JSON.parse(this.curDragCpt.dataset.config)
      this.$store.commit('bigScreen/ADD_HISTORY_USED_CPT', config)
      if (config.props.cptDataForm) {
        // 将静态数据、api、sql用三个字段存储，配置项未填写apiUrl字段和sql字段在此处赋默认值
        if (!config.props.cptDataForm.apiUrl) {
          config.props.cptDataForm.apiUrl = '/sc/test'
        }
        if (!config.props.cptDataForm.sql) {
          config.props.cptDataForm.sql = '-- 请在此输入用来查询数据的 sql 语句\n'
        }
        // 初始化数据/图表处理函数
        if (!config.props.cptDataForm.convertData) {
          config.props.cptDataForm.convertData =
            '(data) => {\n  // data 为图表需要的显示数据，如果数据源为接口请求，则 data 为接口返回数据\n  return data;\n};'
        }
        if (!config.props.cptDataForm.convertChart) {
          config.props.cptDataForm.convertChart =
            '(option) => {\n  // option 为图表需要的样式数据，更多详情可查看 https://echarts.apache.org/zh/option.html\n  return option;\n};'
        }
      }
      // meta 没设置默认宽高则在此处设置
      // 宽
      const w = config.width || 400
      // 高
      const h = config.height || 300
      // 生成 id
      const id = require('uuid').v1()
      const animation = {
        name: '',
        delay: 'animate__delay-0s',
        speed: 'animate__slow',
        repeat: 'animate__repeat-1'
      }
      const cpt = {
        id,
        cptTitle: config.name,
        layerName: config.name,
        icon: config.icon,
        hidden: false,
        opacity: config.opacity || 1,
        componentName: config.componentName,
        setterName: config.setterName ? config.setterName : config.componentName + '-setter',
        configProps: { ...config.props, ...{ animation } },
        // 将鼠标 drop 处设置为组件中心
        cptX: Math.round(e.offsetX) - w / 2,
        cptY: Math.round(e.offsetY) - h / 2,
        cptZ: this.cacheComponents.length + 1,
        cptWidth: w,
        cptHeight: h,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0
      }
      this.$store.dispatch('bigScreen/addCpt', cpt)
      this.$nextTick(() => {
        this.$store.commit('bigScreen/ADD_BIG_SCREEN_CPT_REF', { id, ref: this.$refs[id][0] })
      })
      // 多选清空
      this.clearMultipleCpts()
      // 丢下组件后刷新组件属性栏,并选中 push 进的最新一个组件
      this.showConfigPane({}, cpt, this.cacheComponents.length - 1)
      this.$refs['configPane'].showCptConfig()
    },
    // 设置多选组件
    setMultipleCpt(e, cpt) {
      // 未按 ctrl 键
      if (!e.ctrlKey && !e.metaKey) {
        // 已多选的组件中没有当前组件时
        // 清除已多选的组件
        if (!this.multipleCpts[cpt.id]) {
          this.clearMultipleCpts()
        }
      } else {
        // 已多选的组件中没有当前组件时
        // 将其在已多选列表中清除
        if (this.multipleCpts[cpt.id]) {
          return delete this.multipleCpts[cpt.id]
        }
      }
      // 修复修改时无响应问题
      // this.multipleCpts[cpt.id] = cpt
      this.$set(this.multipleCpts, [cpt.id], cpt)
      this.multipleCptPositions[cpt.id] = JSON.parse(JSON.stringify(cpt))
    },
    // 清空多选组件
    clearMultipleCpts() {
      this.multipleCpts = {}
    }
  }
}
</script>

<style scoped lang="less">
.bigscreen-designer {
  // 设计区
  .design-area {
    // 左侧组件列表/图层
    .left-pane {
      height: 100%;
      overflow: hidden;
    }
    // 中间画布区
    .canvas-area {
      position: relative;
      overflow: scroll;
      height: 100%;
      .web-container {
        position: relative;
        // margin: 0 10px;
        background-size: 100% 100%;
        transform-origin: 0 0;
        // 修复窗口大小变化导致的底部白条问题，暂时注释动画效果
        // transition: all .4s;
        .cpt-div {
          position: absolute;
          outline: none;
          cursor: pointer;
          // transition: all .3s;
          &:hover {
            background: #895eda77;
            .cpt-coordinate {
              opacity: 1;
            }
          }
          .cpt-coordinate {
            font-size: 20px;
            color: #fff;
            position: absolute;
            right: 0;
            top: 0;
            opacity: 0.3;
          }
          .x-auxiliary-line,
          .y-auxiliary-line {
            position: fixed;
          }
          .x-auxiliary-line {
            border-top: 2px dashed #09f;
            width: 100%;
            left: 0;
          }

          .y-auxiliary-line {
            border-right: 2px dashed #09f;
            height: 100%;
            top: 0;
          }
          .active-mask {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 1801;
          }
          .cpt-wrap {
            width: 100%;
            height: 100%;
          }
          .resize-bar {
            width: 20px;
            height: 20px;
            position: absolute;
            background-color: #0099ff;
            z-index: 2000;
            border-radius: 50%;
          }
        }
        .no-cpt-placeholder {
          font-size: 1rem;
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          user-select: none;
          opacity: 0.5;
          .no-cpt-tip-img {
            font-size: 500px;
          }
          .no-cpt-tips {
            color: #fff;
            // background: #2d333f;
          }
        }
      }
      // 滚动条样式
      // ::-webkit-scrollbar-track-piece 内层轨道，滚动条中间部分（除去）
      // ::-webkit-resizer 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件

      // 滚动条整体部分
      // &::-webkit-scrollbar{
      //     width:8px;
      //     height:8px;
      //     background-color: #61b6eb00;
      // }

      // 滚动条的轨道（里面装有Thumb）
      // &::-webkit-scrollbar-track{
      //     background: #21314700;
      //     border-radius:2px;
      // }

      // 滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
      &::-webkit-scrollbar-thumb {
        background: #61b6eb15;
        border-radius: 2px;
      }

      // 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置
      &::-webkit-scrollbar-button {
        display: none;
      }

      //
      // &::-webkit-scrollbar-thumb:hover{
      //     background: #61b6eb27;
      // }

      // 边角，即两个滚动条的交汇处
      &::-webkit-scrollbar-corner {
        background: #ffffff00;
      }
    }
    // 右侧属性设置面板
    .right-prop-pane {
      height: 100%;
      overflow: hidden;
      // tab栏样式重写
      /deep/ .el-tabs {
        background: rgb(57, 57, 58);
        color: #fff;
        .el-tabs__header {
          margin: 0;
        }
        .el-tabs__item {
          color: #fff;
          background: #39393a;
          padding: 0;
          &.is-active {
            color: #1890ff;
          }
        }
        .el-tabs__active-bar {
          display: none;
        }
      }

      // 输入框/textarea/数值加/数值减样式重写
      /deep/ .el-input__inner,
      /deep/ .el-textarea__inner,
      /deep/ .el-input-number__decrease,
      /deep/ .el-input-number__increase {
        background: rgb(57, 57, 58);
        color: #fff;
        border-color: #666666;
        // 增加/减少 按钮 hover 时
        &:hover {
          i {
            font-weight: bolder;
          }
        }
      }

      // 增加/减少 按钮去除 border
      /deep/ .el-input-number__decrease,
      /deep/ .el-input-number__increase {
        cursor: pointer;
        border: none;
        border-color: #333333;
        i {
          color: #e6cdcd;
        }
        // background-color: #0f1014!important;
      }

      // 重写 el-silder 样式
      /deep/ .el-slider {
        // 进度条整体
        .el-slider__runway {
          background: #454547;
          height: 2px;
          // 已滑动的进度条
          .el-slider__bar {
            height: 100%;
            border-radius: 0 !important;
          }
          .el-slider__button-wrapper {
            width: 10px;
            height: 32px;
            // 滑块
            .el-slider__button {
              width: 10px;
              height: 10px;
              border-radius: 0;
              border-width: 1px;
            }
          }
        }
      }

      // 表单样式重写
      /deep/ .el-form-item__label {
        font-weight: normal;
        color: #ffffff;
        text-align: left;
        font-size: 12px;
      }

      // 开关样式重写
      /deep/ .el-switch {
        &.is-checked {
          // 开启时背景色
          .el-switch__core {
            background: #5a9cf8 !important;
          }
        }
        // 开关背景色
        .el-switch__core {
          width: 40px;
          height: 15px;
          background-color: #39393a !important;
          color: hsla(0, 0%, 100%, 0.82) !important;
          border-color: #666 !important;
          // 开关圆点
          &::after {
            width: 15px;
            height: 15px;
            top: -1px;
          }
        }
      }

      /deep/ .el-input__inner {
        border-color: #282e3a !important;
        // background-color: #0f1014!important;
        color: #86adbb !important;
      }
      // input 后缀样式更改 如清除图标等
      /deep/ .el-input__suffix {
        i {
          color: #409eff;
        }
        // color: yellow !important;
        // background: red;
      }
      // 重写颜色选择器样式
      /deep/ .el-color-picker {
        &__trigger {
          border: none;
        }
      }

      /deep/ .el-button {
        background-color: transparent;
        color: #409eff;
        border-color: #409eff;
        border-radius: 0;
        &:hover {
          background: #409eff;
          color: #fff;
        }
      }
    }
  }
  /deep/ .el-dialog {
    margin-top: 0 !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // max-height: calc(100% - 200px);
    // overflow-y: scroll;
    min-width: 600px !important;
    .el-dialog__header {
      padding: 10px;
      margin: 0;
      background: #2b3340;
      color: #fff !important;
      display: flex;
      align-items: center;
      .el-dialog__title {
        color: #fff;
      }
      .el-dialog__close {
        display: none;
      }
    }
    .el-dialog__body {
      padding: 10px;
      margin: 0;
      background: #2b3340;
      color: #fff;
      // display: flex;
      // align-items: center;
      max-height: calc(100vh - 200px);
      overflow-y: scroll;
      border: 1px solid #646478;
      border-left: none;
      border-right: none;
    }
    .el-dialog__footer {
      width: 100%;
      padding: 10px;
      margin: 0;
      background: #2b3340;
      // color: #fff;
      // display: flex;
      // align-items: flex-end;
      .dialog-footer {
        width: 100%;
        display: flex;
        justify-content: space-around;
      }
    }
  }
}
</style>
