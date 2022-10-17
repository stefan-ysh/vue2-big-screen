<template>
  <div class="b-toolbar">
    <el-row class="operation-area">
      <!-- 左侧 -->
      <el-col :span="4" class="operation-area-left">
        <span class="title">这块儿可以是标题或者其他啥玩意儿</span>
      </el-col>
      <!-- 中间画布设置栏 -->
      <el-col :span="14" class="operation-area-center">
        <el-tooltip
          class="operation-handler icon-btn hidden-left-btn"
          :class="{ 'pane-active': cptPaneWidth === 200 }"
          placement="bottom"
          style="width: 25px;height:25px;padding: 0 5px;line-height: 25px;"
        >
          <div slot="content">物料</div>
          <i class="btn el-icon-brush" @click="hiddenPane('left')" />
        </el-tooltip>
        <el-tooltip
          class="operation-handler icon-btn hidden-right-btn"
          :class="{ 'pane-active': configPaneWidth === 300 }"
          placement="bottom"
          style="width: 25px;height:25px;padding: 0 5px;line-height: 25px;"
        >
          <div slot="content">配置</div>
          <i class="btn el-icon-setting" @click="hiddenPane('right')" />
        </el-tooltip>
         <el-tooltip
          class="operation-handler icon-btn lattice-btn"
          :class="{ 'pane-active': canvasBgStyle === 'lattice' }"
          placement="bottom"
          style="width: 25px;height:25px;padding: 0 5px;line-height: 25px;"
        >
          <div slot="content">点阵背景</div>
          <i class="btn el-icon-date" @click="changeCanvasBgStyle('lattice')" />
        </el-tooltip>
        <el-tooltip
          class="operation-handler icon-btn grid-btn"
          :class="{ 'pane-active': canvasBgStyle === 'grid' }"
          placement="bottom"
          style="width: 25px;height:25px;padding: 0 5px;line-height: 25px;"
        >
          <div slot="content">网格背景</div>
          <i class="btn el-icon-s-grid" @click="changeCanvasBgStyle('grid')" />
        </el-tooltip>
        <el-checkbox v-model="isShowCoord" class="operation-handler coord-bar">坐标</el-checkbox>
        <el-checkbox v-model="isShowRule" class="operation-handler rule-bar">标尺</el-checkbox>
        <el-slider
          v-model="containerScale"
          class="operation-handler scale-bar"
          :min="0.3"
          :max="2"
          :step="0.01"
        />
        <el-tooltip
          class="operation-handler icon-btn"
          placement="bottom"
          style="width: 25px;height:25px;padding: 0 5px;line-height: 25px;"
        >
          <div slot="content">恢复比例</div>
          <i class="btn el-icon-aim" @click="$store.dispatch('bigScreen/initContainerSize')" />
        </el-tooltip>
        <el-tooltip class="operation-handler icon-btn" placement="bottom" style="width: 25px;height:25px;padding: 0 5px">
          <div slot="content">上对齐</div>
          <img
            :style="{opacity: isMultiple ? 1 : 0.5, cursor: isMultiple ? 'pointer' : 'not-allowed'}"
            src="@/assets/icon/align-top.svg"
            alt=""
            @click.stop="handleAlign('top')"
          >
        </el-tooltip>
        <!-- <el-tooltip
          class="operation-handler icon-btn"
          placement="bottom"
          @click.stop="handleAlign('top')"
        >
          <div slot="content">水平居中</div>
          <img
            :style="{opacity: isMultiple ? 1 : 0.5, cursor: isMultiple ? 'pointer' : 'not-allowed'}"
            src="@/assets/icon/align-horizontal-center.svg"
            alt=""
            @click.stop="handleAlign('horizontal-center')"
          >
        </el-tooltip> -->
        <el-tooltip class="operation-handler icon-btn" placement="bottom" style="width: 25px;height:25px;padding: 0 5px">
          <div slot="content">下对齐</div>
          <img
            :style="{opacity: isMultiple ? 1 : 0.5, cursor: isMultiple ? 'pointer' : 'not-allowed'}"
            src="@/assets/icon/align-bottom.svg"
            alt=""
            @click.stop="handleAlign('bottom')"
          >
        </el-tooltip>
        <el-tooltip class="operation-handler icon-btn" placement="bottom" style="width: 25px;height:25px;padding: 0 5px">
          <div slot="content">左对齐</div>
          <img
            :style="{opacity: isMultiple ? 1 : 0.5, cursor: isMultiple ? 'pointer' : 'not-allowed'}"
            src="@/assets/icon/align-left.svg"
            alt=""
            @click.stop="handleAlign('left')"
          >
        </el-tooltip>
        <!-- <el-tooltip class="operation-handler icon-btn" placement="bottom" style="width: 25px;height:25px;padding: 0 5px">
          <div slot="content">垂直居中对齐</div>
          <img
            :style="{opacity: isMultiple ? 1 : 0.5, cursor: isMultiple ? 'pointer' : 'not-allowed'}"
            src="@/assets/icon/align-vertical-center.svg"
            alt=""
            @click.stop="handleAlign('vertical-center')"
          >
        </el-tooltip> -->
        <el-tooltip class="operation-handler icon-btn" placement="bottom" style="width: 25px;height:25px;padding: 0 5px">
          <div slot="content">右对齐</div>
          <img
            :style="{opacity: isMultiple ? 1 : 0.5, cursor: isMultiple ? 'pointer' : 'not-allowed'}"
            src="@/assets/icon/align-right.svg"
            alt=""
            @click.stop="handleAlign('right')"
          >
        </el-tooltip>
      </el-col>
      <!-- 右侧操作按钮 -->
      <el-col class="operation-area-right" :span="6" @click.self.native="outBlur">
        <el-tooltip placement="bottom">
          <div slot="content">清空画布</div>
          <i class="btn el-icon-delete" @click="clearDesign" />
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">导入</div>
          <i class="btn el-icon-download" @click="importDesign()" />
        </el-tooltip>
        <el-dropdown @command="handleExport">
          <i class="btn el-icon-upload2" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="img">图片</el-dropdown-item>
            <el-dropdown-item command="json">json</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-tooltip placement="bottom">
          <div slot="content">预览</div>
          <i class="btn el-icon-view" @click="preview" />
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">保存</div>
          <i class="btn el-icon-circle-check" @click="saveDesignData" />
        </el-tooltip>
      </el-col>
    </el-row>
    <input
      v-show="false"
      id="files"
      ref="refFile"
      type="file"
      accept=".json"
      @change="fileLoad"
    >
    <!-- 预览抽屉 -->
    <el-drawer
      :with-header="false"
      size="100%"
      close-on-press-escape
      :visible="isPreview"
      direction="ttb"
      :before-close="() => (isPreview = false)"
      append-to-body
      destroy-on-close
    >
      <BigScreenPreview />
    </el-drawer>
  </div>

</template>

<script>
import { clearCptInterval, fileDownload, base64toFile } from '@/utils/big-screen'
import BigScreenPreview from '@/views/preview'
import html2canvas from 'html2canvas'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Toolbar',
  components: {
    BigScreenPreview
  },
  props: {
    multipleCpts: {
      type: Object,
      default: () => {}
    },
    multipleCptPositions: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isPreview: false
    }
  },
  computed: {
    isMultiple () {
      console.log('[ Object.keys(this.multipleCpts).length ] >', Object.keys(this.multipleCpts).length)
      return Object.keys(this.multipleCpts).length >= 2
    },
    // 画布背景风格
    canvasBgStyle () {
      return this.$store.state.bigScreen.canvasBgStyle
    },
    cacheComponents () {
      return this.$store.state.bigScreen.componentList
    },
    containerScale: {
      get () {
        return this.$store.state.bigScreen.containerScale
      },
      set (val) {
        this.$store.dispatch('bigScreen/changeScale', val)
      }
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
    }
  },
  methods: {
    // TODO 改为状态管理
    handleAlign (type) {
      if (!Object.keys(this.multipleCpts).length) {
        return
      }
      const posArr = []
      if (type === 'top') {
        let val = 0
        for (const key in this.multipleCpts) {
          if (Object.hasOwnProperty.call(this.multipleCpts, key)) {
            const el = this.multipleCpts[key]
            posArr.push(el.cptY)
          }
        }
        val = Math.min(...posArr)
        Object.keys(this.multipleCpts).forEach((key) => {
          // eslint-disable-next-line vue/no-mutating-props
          this.multipleCpts[key].cptY = val
        })
      } else if (type === 'horizontal-center') {
        // todo 水平居中对齐
        // 1. 找出中间组件
        // 2. 查看中间组件的 y 值
        // 3. 将 y 值加上自身 height / 2 ，保存为 result
        // 4. 其他组件的中心点在 result 上
        //  4.1 如果中心在
      } else if (type === 'bottom') {
        for (const key in this.multipleCpts) {
          if (Object.hasOwnProperty.call(this.multipleCpts, key)) {
            const el = this.multipleCpts[key]
            posArr.push({ height: el.cptHeight, max: el.cptHeight + el.cptY })
          }
        }
        const arr = posArr.map((v) => v.max)
        const max = Math.max(...arr)
        Object.keys(this.multipleCpts).forEach((key) => {
          // eslint-disable-next-line vue/no-mutating-props
          this.multipleCpts[key].cptY = max - this.multipleCpts[key].cptHeight
        })
      } else if (type === 'left') {
        let val = 0
        for (const key in this.multipleCpts) {
          if (Object.hasOwnProperty.call(this.multipleCpts, key)) {
            const el = this.multipleCpts[key]
            posArr.push(el.cptX)
          }
        }
        val = Math.min(...posArr)
        Object.keys(this.multipleCpts).forEach((key) => {
          // eslint-disable-next-line vue/no-mutating-props
          this.multipleCpts[key].cptX = val
        })
      } else if (type === 'vertical-center') {
        // todo 垂直居中对齐
        for (const key in this.multipleCpts) {
          if (Object.hasOwnProperty.call(this.multipleCpts, key)) {
            const el = this.multipleCpts[key]
            posArr.push({ height: el.cptWidth, max: el.cptWidth + el.cptX })
          }
        }
        const arr = posArr.map((v) => v.max)
        const max = Math.max(...arr)
        Object.keys(this.multipleCpts).forEach((key) => {
          // eslint-disable-next-line vue/no-mutating-props
          this.multipleCpts[key].cptX = max - this.multipleCpts[key].cptWidth
        })
      } else if (type === 'right') {
        for (const key in this.multipleCpts) {
          if (Object.hasOwnProperty.call(this.multipleCpts, key)) {
            const el = this.multipleCpts[key]
            posArr.push({ height: el.cptWidth, max: el.cptWidth + el.cptX })
          }
        }
        const arr = posArr.map((v) => v.max)
        const max = Math.max(...arr)
        Object.keys(this.multipleCpts).forEach((key) => {
          // eslint-disable-next-line vue/no-mutating-props
          this.multipleCpts[key].cptX = max - this.multipleCpts[key].cptWidth
        })
      }
      Object.keys(this.multipleCptPositions).forEach((key) => {
        // eslint-disable-next-line vue/no-mutating-props
        this.multipleCptPositions[key].cptX = this.multipleCpts[key].cptX
        // eslint-disable-next-line vue/no-mutating-props
        this.multipleCptPositions[key].cptY = this.multipleCpts[key].cptY
      })
    },
    changeCanvasBgStyle (style) {
      this.$store.dispatch('bigScreen/changeCanvasBgStyle', style)
    },
    // 导出
    handleExport (command) {
      if (command === 'img') {
        // 导出图片
        html2canvas(this.$store.state.bigScreen.webContainer, {
          backgroundColor: '#49586e'
        }).then((canvas) => {
          const canvasData = canvas.toDataURL('image/jpeg')
          fileDownload(canvasData, this.designData.title + '.png')
        })
      } else if (command === 'json') {
        // 导出json
        this.$store.dispatch('bigScreen/setBigScreenData', { components: this.cacheComponents })
        const data = JSON.stringify(this.designData)
        const uri =
          'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(data) // encodeURIComponent解决中文乱码
        fileDownload(uri, this.designData.title + '.json')
      }
    },
    outBlur () {
      // 取消聚焦组件
      this.$store.dispatch('bigScreen/setCurComponentIndex', -1)
      this.$store.dispatch('bigScreen/setCurComponent', {})
      this.$emit('clearMultipleCpts')
    },
    // 隐藏设置面板
    hiddenPane (type) {
      this.$store.dispatch('bigScreen/changePaneDisplayStatus', type)
    },

    importDesign () {
      this.$refs.refFile.dispatchEvent(new MouseEvent('click'))
    },
    fileLoad () {
      const that = this
      // 选择导入的文件
      const importedFile = this.$refs.refFile.files[0]
      if (!importedFile) {
        return this.$message.info('文件上传失败，请检查后重试')
      }
      // 文件名字
      const fileName = importedFile.name
      // 文件阅读器
      const reader = new FileReader()
      // 读取文件内容
      reader.readAsText(importedFile)
      // 文件加载
      reader.onload = function () {
        // todo 文件合法性校验待完善
        const fileJson = JSON.parse(reader.result)
        fileJson.id = that.designData.id
        that.$store.dispatch('bigScreen/initBigScreenData', fileJson)
        that.$store.dispatch('bigScreen/initComponentList', fileJson.components)
        // 清空现有大屏组件列表
        // that.$store.dispatch('bigScreen/setBigScreenData', { components: [] })
        that.$message.success(`文件 ${fileName} 导入成功!`)
      }
      // 读取错误
      reader.onerror = function () {
        that.$message.success(`文件 ${fileName} 读取失败，请检查后重试`)
      }
      this.$refs.refFile.value = ''
    },
    // 保存数据
    saveDesignData () {
      this.$message.info('保存中，请稍后...')
      // 保存
      this.$store.dispatch('bigScreen/setComponentList', { components: this.cacheComponents })
      localStorage.setItem('designCache', JSON.stringify(this.designData))
      this.$message.success('已保存')
      const that = this
      // 生成缩略图
      html2canvas(that.$store.state.bigScreen.webContainer, {
        backgroundColor: '#49586e'
      }).then((canvas) => {
        const canvasData = canvas.toDataURL('image/jpeg')
        const file = base64toFile(canvasData, that.designData.title + '.png')
        const fileFormData = new FormData()
        fileFormData.append('file', file)
        // todo 上传缩略图
        // uploadThumbnail(that.designData.id + '.png', fileFormData).then(
        //   (res) => {
        //   // 上传预览图
        //     that.$store.dispatch('bigScreen/setBigScreenData', { designImgPath: res.data })
        //     that.$store.dispatch('bigScreen/setBigScreenData', { components: JSON.stringify(this.cacheComponents) })
        //     // todo 接入后端保存api 保存 designData
        //   }
        // )
        this.$message.success('保存成功')
      })
    },
    // 预览画布
    preview () {
      if (!this.cacheComponents.length) {
        this.$message.closeAll()
        return this.$message.info('暂无组件可预览，请先设计看板')
      }
      if (!this.cacheComponents.some(c => { return !c.hidden })) {
        this.$message.closeAll()
        return this.$message.info('画布中暂无可见组件，请调整后重试')
      }
      // 预览按钮
      this.$store.dispatch('bigScreen/setBigScreenData', { components: this.cacheComponents })
      localStorage.setItem('designCache', JSON.stringify(this.designData))
      this.isPreview = true
    },
    // 清空画布
    clearDesign () {
      this.$confirm('此操作将会清空画布，是否继续？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 可考虑优化为一个方法
          this.$store.dispatch('bigScreen/clearCanvas')
          this.$store.dispatch('bigScreen/setBigScreenData', { components: [] })
          this.$store.dispatch('bigScreen/setCurComponent', {})
          localStorage.removeItem('designCache')
          clearCptInterval(null, true)
          this.$message.success('画布已清除')
        })
        .catch(() => {
          console.log('取消清空')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.b-toolbar {
  // 顶部操作栏
  .operation-area {
    height: 45px;
    box-shadow: 0 2px 5px #2b3340 inset;
    color: #fff;
    overflow: hidden;
    margin: 0;
    font-size: 18px;
    line-height: 45px;
    background: #1d1e1f;
    padding: 0 10px;
    &-left {
      .title{

      }
    }
    &-center {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      /deep/ .el-checkbox {
        margin: 0;
        &__input {
          .el-checkbox__inner {
            width: 12px;
            height: 12px;
          }
        }
        &__label {
          padding-left: 5px !important;
        }
      }
      .icon-btn {
        width:24px;
        height:24px;
        line-height:24px;
        border-radius: 5px;
        text-align:center;
        background: #303640;
        font-size:15px;
        margin-right:5px;
        &.pane-active {
          background:#2681ff;
        }
      }
      .operation-handler {
        cursor: pointer;
        margin: 0 5px;
      }
      .scale-bar{
        min-width: 80px;
      }
    }
    &-right {
      height: 100%;
      display:flex;
      align-items: center;
      justify-content: flex-end;
      .btn {
        width: 40px;
        // height: 100%;
        text-align: center;
        line-height: 45px;
        color: #909399;
        cursor: pointer;
        transition: all .5s;
        &:hover {
          font-weight: 999;
          background: #414b5d;
        }
      }
    }
  }
}

</style>
