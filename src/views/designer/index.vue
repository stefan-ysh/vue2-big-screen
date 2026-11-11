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
          @selectAllLayers="selectAllLayers"
        />
      </div>
      <!-- 中间组件显示区 -->
      <div
        class="canvas-area"
        :style="{ width: windowWidth - cptPaneWidth - configPaneWidth + 'px', opacity: bgOpacity }"
        @click.self="outBlur"
      >
        <!-- 画布标尺 -->
        <SketchRuler
          v-show="isShowRuler"
          :scale="containerScale"
          :width="windowWidth - cptPaneWidth - configPaneWidth - 27"
          :height="windowHeight - 73"
        />
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
          <template v-if="cacheComponents.length > 0 && $store.state.bigScreen.designMode === 'pc'">
            <!-- 吸附对齐辅助线 -->
            <div
              v-for="(line, i) in snapLines"
              :key="'snap-' + i"
              class="snap-line"
              :style="snapLineStyle(line)"
            />
            <!-- 组件 -->
            <div
              v-for="(item, index) in cacheComponents"
              :key="item.id"
              :ref="'div' + item.componentName + index"
              class="cpt-div"
              :class="{ 'drop-anim': item.id === dropAnimId }"
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
          <div
            v-else-if="$store.state.bigScreen.designMode === 'mobile' && cacheComponents.length > 0"
            style="width: 50%;height: 100%;margin: 0 auto;color: #ffffff;font-size: 50px;text-align:center;line-height: 5"
          >移动端布局设计开发中，敬请期待</div>
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
    <!-- 示例选择器 -->
    <div v-if="$route.params.type" class="example-selector-container">
      <el-select 
        v-model="currentExample" 
        placeholder="选择示例数据" 
        size="small"
        @change="handleExampleChange"
        class="example-selector"
      >
        <el-option label="默认数据" value=""></el-option>
        <el-option 
          v-for="example in availableExamples" 
          :key="example.key" 
          :label="example.name" 
          :value="example.key"
        >
        </el-option>
      </el-select>
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
import templates from './templates'

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
            // 吸附对齐：以当前组件为基准与其他组件/画布边缘对齐，整组跟随偏移
            if (that.currentCpt && that.currentCpt.id) {
              const snap = that.computeSnap(that.currentCpt)
              if (snap.dx || snap.dy) {
                Object.keys(that.multipleCpts).forEach(key => {
                  that.multipleCpts[key].cptX += snap.dx
                  that.multipleCpts[key].cptY += snap.dy
                })
              }
              that.snapLines = snap.lines
            }
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
          // 清除吸附辅助线
          that.snapLines = []
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
      curDragCpt: null,
      multipleCpts: {},
      currentExample: '',
      availableExamples: [],
      // 撤销/重做：恢复历史期间暂停历史记录，避免恢复动作本身被记入历史
      restoringHistory: false,
      historyTimer: null,
      // 拖拽时的吸附对齐辅助线 [{ type: 'v'|'h', pos }]
      snapLines: [],
      // 刚拖入画布的组件 id，用于播放放置反馈动画
      dropAnimId: '',
      dropAnimTimer: null,
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
    },
    frequentlyUsedComponents() {
      return this.$store.state.bigScreen.frequentlyUsedComponents.slice(0, 6);
    },
    canUndo() {
      return this.$store.getters['bigScreen/canUndo']
    },
    canRedo() {
      return this.$store.getters['bigScreen/canRedo']
    }
  },
  watch: {
    // 画布组件任何变更（增删/移动/属性修改）稳定后记录一条历史快照，用于撤销/重做
    cacheComponents: {
      handler() {
        this.pushHistoryDebounced()
      },
      deep: true
    }
  },
  created() {
    this.$store.commit('bigScreen/INIT_FREQUENTLY_USED_COMPONENTS')
    this.currentExample = this.$route.query.example || ''
    this.fetchAvailableExamples()
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
    clearTimeout(this.historyTimer)
    clearTimeout(this.dropAnimTimer)
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
              this.setCptZLayer('top')
              break
            case 'layerBottom':
              this.setCptZLayer('bottom')
              break
            case 'copyLayer':
              res.callback(this.currentCpt)
              break
            case 'delLayer': {
              // 按组件 id 定位下标，避免误删其它组件
              const idx = this.cacheComponents.findIndex(c => c.id === this.currentCpt.id)
              if (idx > -1) {
                this.delCpt(this.currentCpt, idx)
              }
              break
            }

            default:
              break
          }
        })
        .catch(() => {
          // 右键操作取消时无需处理
        })
    },

    handleKeyDown(e) {
      // 是否需在其他输入元素聚焦
      const isIptElFocus = ['INPUT', 'TEXTAREA'].includes(document.activeElement.nodeName)
      // 存在输入框聚焦时，不触发方向键移动事件，持续优化
      if (isIptElFocus) {
        return false
      }
      // 键盘事件的 code
      const keyCode = e.which || e.keyCode
      // ctrl / cmd 键是否按下
      const isCtrlDown = e.ctrlKey || e.metaKey
      // 撤销/重做：不依赖组件选中状态
      if (isCtrlDown && keyCode === 90 && !e.shiftKey) {
        e.preventDefault()
        this.undo()
        return
      }
      if (isCtrlDown && (keyCode === 89 || (keyCode === 90 && e.shiftKey))) {
        e.preventDefault()
        this.redo()
        return
      }
      // 没有组件选中时，则无需做任何处理
      if (this.currentCptIndex === -1) {
        return
      }
      // ctrl + d 复制当前组件
      if (keyCode === 68 && isCtrlDown) {
        e.preventDefault()
        this.copyCpt(this.currentCpt)
        return
      }
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

    /** 撤销/重做 */
    // 画布变更稳定后记录快照（500ms 内的连续变更合并为一条）
    pushHistoryDebounced() {
      if (this.restoringHistory) return
      clearTimeout(this.historyTimer)
      this.historyTimer = setTimeout(() => {
        if (this.restoringHistory) return
        const snapshot = JSON.parse(JSON.stringify(this.cacheComponents))
        const current = this.$store.state.bigScreen.history[this.$store.state.bigScreen.historyIndex]
        // 与栈顶相同的状态不入栈（如恢复快照后渲染回响触发的空变更），
        // 避免覆盖重做分支
        if (current && JSON.stringify(current) === JSON.stringify(snapshot)) return
        this.$store.commit('bigScreen/PUSH_HISTORY', snapshot)
      }, 500)
    },
    undo() {
      if (!this.canUndo) return
      this.applyHistory(() => this.$store.dispatch('bigScreen/undo'))
    },
    redo() {
      if (!this.canRedo) return
      this.applyHistory(() => this.$store.dispatch('bigScreen/redo'))
    },
    // 恢复快照并重新登记组件引用
    applyHistory(dispatcher) {
      this.restoringHistory = true
      dispatcher()
      this.$nextTick(() => {
        this.registerCptRefs()
        this.restoringHistory = false
      })
    },
    // 重新收集画布组件引用（撤销/重做恢复后原引用失效）
    registerCptRefs() {
      this.cacheComponents.forEach(c => {
        const ref = this.$refs[c.id] && this.$refs[c.id][0]
        if (ref) {
          this.$store.commit('bigScreen/ADD_BIG_SCREEN_CPT_REF', { id: c.id, ref })
        }
      })
    },

    // 图层置顶/置底
    setCptZLayer(type) {
      const cpt = this.currentCpt
      if (!cpt || !cpt.id) return
      const zList = this.cacheComponents.map(c => c.cptZ || 0)
      if (type === 'top') {
        cpt.cptZ = Math.max(...zList) + 1
        this.$message.success('已置顶图层')
      } else {
        cpt.cptZ = Math.min(...zList) - 1
        this.$message.success('已置底图层')
      }
    },
    // 全选图层（配合图层面板的“全选”按钮做多选操作）
    selectAllLayers() {
      if (this.cacheComponents.length === 0) return
      this.clearMultipleCpts()
      this.cacheComponents.forEach(cpt => {
        this.setMultipleCpt({ ctrlKey: true }, cpt)
      })
      this.$message.success(`已选择 ${this.cacheComponents.length} 个图层`)
    },

    // 加载数据
    async loadData() {
      this.$modal.loading('加载中')
      let bigscreenData = null

      // 首先尝试从 localStorage 读取缓存
      // 注意：与预览页（preview/index.vue）、工具栏（Toolbar/index.vue）共用 designCache 这一份缓存，
      // 保证「设计 -> 保存 -> 预览 -> 回到设计」数据链路一致
      const cacheData = localStorage.getItem('designCache')
      if (cacheData) {
        try {
          bigscreenData = JSON.parse(Base64.decode(cacheData))
        } catch (e) {
          // 缓存损坏时回退到模板数据
          bigscreenData = null
        }
      }
      if (!bigscreenData) {
        // 获取路由参数
        const { type, id } = this.$route.params
        const { example } = this.$route.query

        // 如果指定了类型和ID，尝试从API加载对应数据
        if (type && id) {
          try {
            // 使用API获取大屏详情，支持示例参数
            const { getBigscreenDetail } = await import('@/api/bigscreen')
            bigscreenData = await getBigscreenDetail(id, type, example)
          } catch (error) {
            // API加载失败时，回退到模板加载
            const templateList = templates[type] || []
            const template = templateList.find(t => t.id === id)
            bigscreenData = template || templateList[0] || mockData
          }
        } else {
          // 没有指定参数时使用默认模板
          bigscreenData = mockData
        }
      }
      
      // 确保有数据
      if (!bigscreenData) {
        this.$message.error('获取模板数据失败')
        this.$modal.closeLoading()
        return
      }
      
      // 确保数据结构正确
      if (!bigscreenData.components) {
        bigscreenData.components = []
      }
      if (!Array.isArray(bigscreenData.components)) {
        bigscreenData.components = []
      }
      
      const cptList = bigscreenData.components || []
      this.$store.dispatch('bigScreen/initViewBigScreenData', bigscreenData)
      this.$store.dispatch('bigScreen/initBigScreenData', bigscreenData)
      this.$store.dispatch('bigScreen/initComponentList', cptList)
      
      // 全局注册组件引用
      this.$nextTick(() => {
        if (this.designData && this.designData.components && Array.isArray(this.designData.components)) {
          this.designData.components.forEach(c => {
            const id = c.id
            if (this.$refs[id] && this.$refs[id][0]) {
              const ref = this.$refs[id][0]
              this.$store.commit('bigScreen/ADD_BIG_SCREEN_CPT_REF', { id, ref })
            }
          })
        }
      })
      
      if (this.designData && this.designData.components && Array.isArray(this.designData.components)) {
        this.designData.components.forEach(cpt => {
          if (cpt.configProps && cpt.configProps.cptDataForm) {
            const id = cpt.id
            const params = JSON.parse(cpt.configProps.cptDataForm.reqParams || '{}')
            this.$store.dispatch('bigScreen/changeReqParams', { id, params })
          }
        })
      }
      
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
      // 触发组件联动（设计态即时验证联动效果）
      this.triggerLinkage(item)
    },
    // 触发组件联动：点击组件时刷新与其绑定的组件数据
    triggerLinkage(item) {
      const interaction = item.configProps && item.configProps.interaction
      const linkageIds = interaction && interaction.interactable ? interaction.linkageIds : null
      if (!Array.isArray(linkageIds) || linkageIds.length === 0) return
      let refreshed = 0
      linkageIds.forEach(id => {
        const ref = this.cptRefs.get(id)
        if (ref && ref.refreshCptData) {
          ref.refreshCptData()
          refreshed++
        }
      })
      if (refreshed > 0) {
        this.$message.success(`已联动刷新 ${refreshed} 个组件`)
      }
    },
    // 拖拽吸附：返回需要对齐的位移与参考线位置
    computeSnap(cpt) {
      const THRESHOLD = 6
      // 吸附开关关闭时直接跳过
      if (!this.$store.state.bigScreen.isShowSnap) {
        return { dx: 0, dy: 0, lines: [] }
      }
      const screenW = this.designData.screenWidth
      const screenH = this.designData.screenHeight
      // 候选对齐线：画布边缘/中线 + 其他组件的边缘/中线
      const vTargets = [0, screenW / 2, screenW]
      const hTargets = [0, screenH / 2, screenH]
      this.cacheComponents.forEach(c => {
        if (c.id === cpt.id) return
        vTargets.push(c.cptX, c.cptX + c.cptWidth / 2, c.cptX + c.cptWidth)
        hTargets.push(c.cptY, c.cptY + c.cptHeight / 2, c.cptY + c.cptHeight)
      })
      const movingX = [cpt.cptX, cpt.cptX + cpt.cptWidth / 2, cpt.cptX + cpt.cptWidth]
      const movingY = [cpt.cptY, cpt.cptY + cpt.cptHeight / 2, cpt.cptY + cpt.cptHeight]
      let bestX = THRESHOLD
      let bestY = THRESHOLD
      let dx = 0
      let dy = 0
      let snapX = null
      let snapY = null
      movingX.forEach(mx => {
        vTargets.forEach(t => {
          const d = Math.abs(mx - t)
          if (d < bestX) {
            bestX = d
            dx = t - mx
            snapX = t
          }
        })
      })
      movingY.forEach(my => {
        hTargets.forEach(t => {
          const d = Math.abs(my - t)
          if (d < bestY) {
            bestY = d
            dy = t - my
            snapY = t
          }
        })
      })
      const lines = []
      if (snapX !== null) lines.push({ type: 'v', pos: Math.round(snapX) })
      if (snapY !== null) lines.push({ type: 'h', pos: Math.round(snapY) })
      return { dx, dy, lines }
    },
    snapLineStyle(line) {
      return line.type === 'v'
        ? { left: line.pos + 'px', top: 0, width: '1px', height: '100%' }
        : { top: line.pos + 'px', left: 0, height: '1px', width: '100%' }
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
      // 生成 id
      const id = require('uuid').v1()
      const animation = {
        name: '',
        delay: 'animate__delay-0s',
        speed: 'animate__slow',
        repeat: 'animate__repeat-1'
      }
      
      // 计算放置位置，使其在鼠标位置居中
      const containerRect = this.$refs.webContainer.getBoundingClientRect()
      const dropX = (e.clientX - containerRect.left) / this.containerScale
      const dropY = (e.clientY - containerRect.top) / this.containerScale
      const w = config.width || 400
      const h = config.height || 300
      
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
        // 优化放置位置，更精确
        cptX: Math.round(dropX - w / 2),
        cptY: Math.round(dropY - h / 2),
        cptZ: this.cacheComponents.length + 1,
        cptWidth: w,
        cptHeight: h,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0
      }
      
      // 添加放置动画效果
      this.$store.dispatch('bigScreen/addCpt', cpt)
      this.dropAnimId = id
      clearTimeout(this.dropAnimTimer)
      this.dropAnimTimer = setTimeout(() => {
        this.dropAnimId = ''
      }, 700)
      
      this.$nextTick(() => {
        // 添加组件引用
        this.$store.commit('bigScreen/ADD_BIG_SCREEN_CPT_REF', { id, ref: this.$refs[id][0] })
        
        // 添加放置动画效果
        const componentEl = this.$refs['div' + config.componentName + (this.cacheComponents.length - 1)][0]
        if (componentEl) {
          componentEl.classList.add('component-drop-animation')
          setTimeout(() => {
            componentEl.classList.remove('component-drop-animation')
          }, 500)
        }
      })
      
      // 多选清空
      this.clearMultipleCpts()
      // 丢下组件后刷新组件属性栏,并选中 push 进的最新一个组件
      this.showConfigPane({}, cpt, this.cacheComponents.length - 1)
      this.$refs['configPane'].showCptConfig()
      
      // 提供轻量级反馈
      this.$message.closeAll()
      this.$message({
        message: `${config.name} 组件添加成功！`,
        type: 'success',
        duration: 1500
      })
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
    },
    handleExampleChange(value) {
      // 处理示例变化
      this.currentExample = value;
      
      // 更新URL参数
      const query = { ...this.$route.query }
      if (value) {
        query.example = value
      } else {
        delete query.example
      }
      
      this.$router.replace({
        path: this.$route.path,
        query
      }).then(() => {
        // URL更新后重新加载数据
        this.loadData()
      }).catch(() => {
        // 路由更新失败（含导航重复）时仍需重新加载数据
        this.loadData()
      })
    },
    async fetchAvailableExamples() {
      const { type } = this.$route.params
      if (!type) return
      
      try {
        const { getAvailableExamples } = await import('@/api/bigscreen')
        this.availableExamples = await getAvailableExamples(type)
      } catch (error) {
        this.availableExamples = []
      }
    }
  }
}
</script>

<style scoped lang="less">
.bigscreen-designer {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #1d1e1f;
  overflow: hidden;
  
  .example-selector-container {
    position: absolute;
    top: 10px;
    right: 20px;
    z-index: 1000;
    
    .example-selector {
      width: 150px;
      
      /deep/ .el-input__inner {
        background-color: #3a3a3a;
        border-color: #555;
        color: #fff;
        
        &:focus {
          border-color: #4a9eff;
        }
      }
      
      /deep/ .el-input__suffix {
        color: #ccc;
      }
    }
  }
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
        .cpt-div.drop-anim .cpt-wrap {
        animation: cpt-drop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      @keyframes cpt-drop-in {
        from {
          opacity: 0;
          transform: scale(0.7);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .snap-line {
        position: absolute;
        background: #ff4d4f;
        z-index: 3000;
        pointer-events: none;
      }

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
