<template>
  <div class="bigscreen-designer">
    <!-- 顶部操作栏 -->
    <Toolbar />
    <!-- 底部设计区 -->
    <div
      class="design-area"
      :style="{
        height: windowHeight - 45 + 'px',
        background: 'url(' + require('@/assets/images/port.png') + ') repeat',
      }"
      @click.self="outBlur"
    >
      <!--左侧组件列表栏-->
      <div
        class="left-pane"
        :style="{ width: cptPaneWidth + 'px' }"
      >
        <component-pane
          :selectedComponents="cacheComponents"
          :currentCptIndex="currentCptIndex"
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
        <div
          v-show="isShowRule"
          style="height: 10px; margin-left: 10px"
          :style="{ width: 1920 * containerScale + 'px' }"
        >
          <!--顶部刻度线-->
          <ScaleMarkX />
        </div>
        <div
          v-show="isShowRule"
          style="position: absolute; width: 10px"
          :style="{
            height:
              ((1920 * containerScale) / designData.scaleX) *
              designData.scaleY +
              'px',
          }"
        >
          <!--左侧刻度线-->
          <ScaleMarkY />
        </div>
        <div
          ref="webContainer"
          class="web-container"
          :style="{
            width: designData.scaleX + 'px',
            height: designData.scaleY + 'px',
            backgroundColor: designData.bgColor,
            backgroundImage: designData.bgImg
              ? 'url(' + designData.bgImg + ')'
              : 'none',
            transform: 'scale(' + containerScale + ')',
            margin: isShowRule ? '0 10px' : ''
          }"
          @dragover="allowDrop"
          @drop="drop"
          @click.self="outBlur"
        >
          <template v-if="cacheComponents.length > 0">
            <!-- 组件 -->
            <div
              v-for="(item, index) in cacheComponents"
              :key="item.id"
              :ref="'div' + item.componentName + index"
              class="cpt-div"
              :style="{
                width: Math.round(item.cptWidth) + 'px',
                height: Math.round(item.cptHeight) + 'px',
                top: Math.round(item.cptY) + 'px',
                left: Math.round(item.cptX) + 'px',
                zIndex: currentCptIndex === index ? 1800 : item.cptZ,
                opacity: item.hidden ? '0.3' : '1'
              }"
              tabindex="0"
              @mousedown="showConfigPane($event, item, index)"
              @contextmenu.prevent="handleContextMenu"
            >
              <!-- 组件坐标显示 -->
              <div v-if="isShowCoord" class="cpt-coordinate">
                ({{ item.cptX }}, {{ item.cptY }})
              </div>
              <!--顶部辅助线-->
              <div
                v-show="currentCptIndex === index"
                class="x-auxiliary-line"
              />
              <!--左侧辅助线-->
              <div
                v-show="currentCptIndex === index"
                class="y-auxiliary-line"
              />
              <!-- 新增iframe组件，防止焦点聚焦在iframe内部，添加此蒙版 -->
              <!-- todo 探索其他解决方案 -->
              <div
                v-resize="'move'"
                class="active-mask"
                :data-index="index"
                :style="
                  cacheChoices[item.id] ? { border: '1px solid #B6BFCE' } : {}
                "
              />
              <div class="cpt-wrap">
                <component
                  :is="item.componentName"
                  :ref="item.componentName + index"
                  :width="Math.round(item.cptWidth)"
                  :height="Math.round(item.cptHeight)"
                  :configProps="item.configProps"
                  :rotateDeg="{transform:`rotateX(${item.rotateX}deg) rotateY(${item.rotateY}deg) rotateZ(${item.rotateZ}deg)`}"
                />
              </div>
              <!-- 缩放把手 -->
              <div
                v-for="(it,i) in resizeBars"
                v-show="currentCptIndex === index"
                :key="i"
                v-resize="it.direction"
                :style="it.style"
                class="resize-bar"
              />
            </div>
          </template>
          <!-- 无组件提示信息 -->
          <div
            v-else
            class="no-cpt-placeholder"
          >
            <embed
              class="no-cpt-tip-img"
              :src="require('@/assets/icon/building.svg')"
              type="image/svg+xml"
            >
            <span class="no-cpt-tips">
              暂无组件，请从左侧组件面板拖入进行设计
            </span>
          </div>
        </div>
      </div>
      <!--右侧属性设置栏-->
      <div
        class="right-prop-pane"
        :style="{ width: configPaneWidth + 'px' }"
      >
        <config-pane
          ref="configPane"
          :currentCpt.sync="currentCpt"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ComponentPane from '@/views/designer/componentPane'
import ConfigPane from '@/views/designer/configPane'
import { clearCptInterval } from '@/utils/big-screen'
import ScaleMarkX from '../modules/ScaleMark/ScaleMarkX.js'
import ScaleMarkY from '../modules/ScaleMark/ScaleMarkY.js'
import Toolbar from '../modules/Toolbar'

export default {
  name: 'BigScreenDesigner',
  components: {
    ScaleMarkY,
    ScaleMarkX,
    ConfigPane,
    ComponentPane,
    Toolbar
  },
  directives: {
    resize (el, binding, vNode) {
      // 组件拉伸，移动位置
      el.onmousedown = function (e) {
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

        document.onmousemove = function (me) {
          const meScaleClientX = me.clientX / that.containerScale
          const meScaleClientY = me.clientY / that.containerScale
          if (binding.value === 'move') {
            cptX = meScaleClientX - disX
            cptY = meScaleClientY - disY
            Object.keys(that.cacheChoices).forEach((key) => {
              that.cacheChoices[key].cptX =
                that.cacheChoicesFixed[key].cptX +
                Math.round(meScaleClientX - scaleClientX)
              that.cacheChoices[key].cptY =
                that.cacheChoicesFixed[key].cptY +
                Math.round(meScaleClientY - scaleClientY)
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
        document.onmouseup = function () {
          that.bgOpacity = 1
          document.onmousemove = document.onmouseup = null
          that.cacheChoicesFixed = JSON.parse(
            JSON.stringify(that.cacheChoices)
          ) // 解决多选移动未松开ctrl键第二次以后拖动定位还原
        }
        return false
      }
    }
  },
  provide () {
    return {
      refreshCptData: this.refreshCptData
    }
  },
  data () {
    return {
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
          style: 'top: 0; left: 50%; cursor: ns-resize; transform: translate(-50%, -50%);'
        },
        {
          direction: 'rt',
          style: 'top: 0; right: 0; cursor: nesw-resize; transform: translate(50%, -50%);'
        },
        {
          direction: 'l',
          style: 'top: 50%; left: 0; cursor: ew-resize; transform: translate(-50%, -50%);'
        },
        {
          direction: 'lb',
          style: 'bottom: 0; left: 0; cursor: nesw-resize; transform: translate(-50%, 50%);'
        },
        {
          direction: 'b',
          style: 'bottom: 0; left: 50%; cursor: ns-resize; transform: translate(-50%, 50%);'
        },
        {
          direction: 'rb',
          style: 'bottom: 0; right: 0; cursor: nwse-resize; transform: translate(50%, 50%);'
        },
        {
          direction: 'r',
          style: 'top: 50%; right: 0; cursor:ew-resize; transform: translate(50%, -50%);'
        }
      ]),
      copyDom: '',
      cacheChoices: {},
      cacheChoicesFixed: {} // 记录移动前选中组件的位置 自定义事件内部无法处理，放在了外面。
    }
  },
  computed: {
    containerScale () {
      return this.$store.state.bigScreen.containerScale
    },
    windowWidth () {
      return this.$store.state.bigScreen.windowWidth
    },
    windowHeight () {
      return this.$store.state.bigScreen.windowHeight
    },
    cptPaneWidth () {
      return this.$store.state.bigScreen.componentPaneWidth
    },
    configPaneWidth () {
      return this.$store.state.bigScreen.configPaneWidth
    },
    designData () {
      return this.$store.state.bigScreen.bigScreenData
    },
    isShowCoord: {
      get () {
        return this.$store.state.bigScreen.isShowCoord
      },
      set (val) {
        this.$store.dispatch('bigScreen/setCoordShowStatus', val)
      }
    },
    isShowRule: {
      get () {
        return this.$store.state.bigScreen.isShowRule
      },
      set (val) {
        this.$store.dispatch('bigScreen/setRuleShowStatus', val)
      }
    },
    currentCptIndex () {
      return this.$store.state.bigScreen.curComponentIndex
    },
    // 当前选中的组件
    currentCpt () {
      return this.$store.state.bigScreen.curComponent
    },
    cacheComponents () {
      return this.$store.state.bigScreen.componentList
    }
  },
  created () {
    this.$store.commit('bigScreen/INIT_FREQUENTLY_USED_COMPONENTS')
    this.loadData()
  },
  mounted () {
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('resize', this.initContainerSize)
    this.$store.dispatch('bigScreen/setContainer', this.$refs.webContainer)
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('resize', this.initContainerSize)
  },
  methods: {
    // 点击右键菜单时触发
    handleContextMenu (event) {
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
        .then((res) => {
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
        .catch((err) => {
          console.log('右键操作取消/失败', err)
        })
    },

    handleKeyDown (e) {
      if (this.currentCptIndex !== -1) {
        const key = e.key
        if (['ArrowDown', 'Arrow', 'ArrowLeft', 'ArrowRight'].includes(key)) {
          e.preventDefault()
        }
        let idx = 0
        switch (key) {
          // 方向键移动当前组件
          case 'ArrowDown':
            this.currentCpt.cptY += 1
            break
          case 'ArrowUp':
            this.currentCpt.cptY -= 1
            break
          case 'ArrowLeft':
            this.currentCpt.cptX -= 1
            break
          case 'ArrowRight':
            this.currentCpt.cptX += 1
            break
          // 删除键(delete) 和 退回键(back space) 触发删除组件
          // 避免有输入框聚焦时影响输入，此处判断是否存在聚焦中的输入框
          case 'Delete':
            if (!['INPUT', 'TEXTAREA'].includes(document.activeElement.nodeName)) {
              idx = this.cacheComponents.findIndex(
                (c) => c.id === this.currentCpt.id
              )
              this.delCpt(this.currentCpt, idx)
            }
            break
          case 'Backspace':
            if (!['INPUT', 'TEXTAREA'].includes(document.activeElement.nodeName)) {
              idx = this.cacheComponents.findIndex(
                (c) => c.id === this.currentCpt.id
              )
              this.delCpt(this.currentCpt, idx)
            }
            break
        }
      }
    },
    initContainerSize () {
      this.$store.dispatch('bigScreen/initContainerSize')
    },

    // 加载数据
    loadData () {
      this.$message.warning('加载中')
      // todo 缓存模拟 有无id 来判断是新建还是编辑
      const cacheStr = localStorage.getItem('designCache')
      // 模拟有id，读取数据进行编辑
      if (cacheStr) {
        const data = JSON.parse(cacheStr)
        const cptList = data.components
        this.$store.dispatch('bigScreen/initBigScreenData', data)
        this.$store.dispatch('bigScreen/initComponentList', cptList)
      } else {
        // 模拟无 id，初始化数据进行新建
        localStorage.setItem('designCache', JSON.stringify(this.$store.state.bigScreen.bigScreenData))
      }
      this.$message.info('加载完毕')
      this.initContainerSize()
    },

    // 复制组件
    copyCpt (item) {
      const copyItem = JSON.parse(JSON.stringify(item))
      copyItem.cptX = item.cptX + 30 // 复制的组件向右下偏移
      copyItem.cptY = item.cptY + 30
      copyItem.cptZ = this.cacheComponents.length + 1
      copyItem.id = require('uuid').v1()
      this.$store.dispatch('bigScreen/addCpt', copyItem)
      // todo 根据类型提示
      // 聚焦到复制的组件
      this.$store.dispatch('bigScreen/setCurComponentIndex', 0)
      this.$message.success(`${item.cptTitle} 组件复制成功！`)
    },
    refreshCptData (refName) {
      // const refName = this.currentCpt.componentName + this.currentCptIndex
      if (!this.$refs[refName][0].refreshCptData) {
        this.$message.warning('当前图层还未实现 refreshCptData 方法')
      } else {
        // 刷新子组件数据，ref 引用为组件名加 index
        this.$refs[refName][0].refreshCptData()
      }
    },
    outBlur () {
      // 取消聚焦组件
      this.$store.dispatch('bigScreen/setCurComponentIndex', -1)
      this.$store.dispatch('bigScreen/setCurComponent', {})
      this.cacheChoices = {}
    },

    // 删除组件
    delCpt (cpt, index) {
      this.$confirm('删除' + cpt.cptTitle + '组件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
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
    showConfigPane (e, item, index) {
      // 刷新属性栏数据，页面上拖动的组件执行click事件来更新组件的属性栏
      this.$store.dispatch('bigScreen/setCurComponent', item)
      this.$store.dispatch('bigScreen/setCurComponentIndex', index)
      if (this.$refs['div' + item.componentName + index]) {
        this.$refs['div' + item.componentName + index][0].focus() // 聚焦 用于多选移动
      }
      if (!e.ctrlKey) {
        // 未按住ctrl键
        this.cacheChoices = {}
      }
      this.$refs.configPane.showCptConfig(item)
      this.cacheChoices[item.id] = item
      this.cacheChoicesFixed[item.id] = JSON.parse(JSON.stringify(item))
    },
    dragStart (copyDom) {
      // 从组件栏拿起组件
      this.copyDom = copyDom
      copyDom.draggable = false
    },
    allowDrop (e) {
      e.preventDefault()
    },
    drop (e) {
      // 从组件栏丢下组件
      const config = JSON.parse(this.copyDom.getAttribute('config'))
      this.$store.commit('bigScreen/ADD_HISTORY_USED_CPT', config)
      if (config.props.cptDataForm) {
        // 将静态数据、api、sql用三个字段存储，配置项未填写apiUrl字段和sql字段在此处赋默认值
        if (!config.props.cptDataForm.apiUrl) {
          config.props.cptDataForm.apiUrl = '/design/test'
        }
        if (!config.props.cptDataForm.sql) {
          config.props.cptDataForm.sql =
            'SELECT username FROM sys_user'
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
      const cpt = {
        cptTitle: config.name,
        layerName: config.name,
        icon: config.icon,
        hidden: false,
        componentName: config.componentName,
        setterName: config.setterName
          ? config.setterName
          : config.componentName + '-setter',
        configProps: config.props,
        cptX: Math.round(e.offsetX),
        cptY: Math.round(e.offsetY),
        cptZ: this.cacheComponents.length + 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        // meta 没设置默认宽高则在此处设置默认值
        cptWidth: config.width ? config.width : 400,
        cptHeight: config.height ? config.height : 300,
        id: require('uuid').v1()
      }
      this.$store.dispatch('bigScreen/addCpt', cpt)
      this.cacheChoices = {} // 多选清空
      this.showConfigPane({}, cpt, 0) // 丢下组件后刷新组件属性栏
      this.$refs.configPane.showCptConfig()
    }
  }
}
</script>

<style scoped lang="less">
.bigscreen-designer{
  // 设计区
  .design-area{
    display: flex;
    // 左侧组件列表/图层
    .left-pane {
      height: 100%;
      overflow: hidden
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
          font-size: 2rem;
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          user-select: none;
          opacity: .5;
          .no-cpt-tip-img{
            width: 30%;
          }
          .no-cpt-tips{
            color: #fff;
            // background: #2d333f;
          }
        }
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
          .el-tabs__item{
            color: #fff;
            background: #39393a;
            padding: 0;
            &.is-active{
              color: #1890ff;
            }
          }
          .el-tabs__active-bar{
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
          i{
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
            background-color: #39393a!important;
            color: hsla(0,0%,100%,.82)!important;
            border-color: #666!important;
            // 开关圆点
            &::after{
              width: 15px;
              height: 15px;
              top: -1px;
            }
          }
        }

        /deep/ .el-input__inner {
          border-color: #282e3a!important;
          // background-color: #0f1014!important;
          color: #86adbb!important;
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
      .el-dialog__title{
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
      .dialog-footer{
        width: 100%;
        display: flex;
        justify-content: space-around;
      }
    }
  }
}

</style>
