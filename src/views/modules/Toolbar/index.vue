<template>
  <div class="b-toolbar">
    <el-row class="operation-area">
      <!-- 左侧 -->
      <el-col :span="4" class="operation-area-left">
        <el-button type="text" @click="goBack">a回home</el-button>
      </el-col>
      <!-- 中间画布设置栏 -->
      <el-col :span="14" class="operation-area-center">
        <el-tooltip
          class="operation-handler icon-btn hidden-left-btn"
          :class="{ 'pane-active': cptPaneWidth === 200 }"
          placement="bottom"
        >
          <div slot="content">物料</div>
          <i class="btn el-icon-brush" @click="hiddenPane('left')" />
        </el-tooltip>
        <el-tooltip
          class="operation-handler icon-btn hidden-right-btn"
          :class="{ 'pane-active': configPaneWidth === 300 }"
          placement="bottom"
        >
          <div slot="content">配置</div>
          <i class="btn el-icon-setting" @click="hiddenPane('right')" />
        </el-tooltip>
        <el-tooltip
          class="operation-handler icon-btn lattice-btn"
          :class="{ 'pane-active': canvasBgStyle === 'lattice' }"
          placement="bottom"
        >
          <div slot="content">点阵背景</div>
          <i class="btn el-icon-date" @click="changeCanvasBgStyle('lattice')" />
        </el-tooltip>
        <el-tooltip
          class="operation-handler icon-btn grid-btn"
          :class="{ 'pane-active': canvasBgStyle === 'grid' }"
          placement="bottom"
        >
          <div slot="content">网格背景</div>
          <i class="btn el-icon-s-grid" @click="changeCanvasBgStyle('grid')" />
        </el-tooltip>
        <el-checkbox v-model="isShowCoord" class="operation-handler coord-bar">坐标</el-checkbox>
        <!-- <el-checkbox v-model="isShowRuler" class="operation-handler rule-bar">标尺</el-checkbox> -->
        <el-slider v-model="containerScale" class="operation-handler scale-bar" :min="0.02" :max="2" :step="0.01" />
        <el-tooltip class="operation-handler icon-btn" placement="bottom">
          <div slot="content">恢复比例</div>
          <i class="btn el-icon-aim" @click="$store.dispatch('bigScreen/initContainerSize')" />
        </el-tooltip>
        <el-tooltip class="align-btn" placement="bottom">
          <div slot="content">上对齐</div>
          <BSvgIcon
            :style="{
              opacity: isMultiple ? 1 : 0.5,
              transition: 'all .4s',
              cursor: isMultiple ? 'pointer' : 'not-allowed',
              'font-size': '18px',
              background: isMultiple ? '#2681ff' : ''
            }"
            class="align-top"
            icon-class="align-top"
            @click.stop="handleAlign('top')"
          />
        </el-tooltip>
        <el-tooltip class="align-btn" placement="bottom">
          <div slot="content">水平居中</div>
          <BSvgIcon
            :style="{
              opacity: isMultiple ? 1 : 0.5,
              cursor: isMultiple ? 'pointer' : 'not-allowed',
              transition: 'all .4s',
              'font-size': '18px',
              background: isMultiple ? '#2681ff' : ''
            }"
            class="align-horizontal-center"
            icon-class="align-horizontal-center"
            @click.stop="handleAlign('horizontal-center')"
          />
        </el-tooltip>
        <el-tooltip class="align-btn" placement="bottom">
          <div slot="content">下对齐</div>
          <BSvgIcon
            :style="{
              transition: 'all .4s',
              opacity: isMultiple ? 1 : 0.5,
              cursor: isMultiple ? 'pointer' : 'not-allowed',
              'font-size': '18px',
              background: isMultiple ? '#2681ff' : ''
            }"
            class="align-bottom"
            icon-class="align-bottom"
            @click.stop="handleAlign('bottom')"
          />
        </el-tooltip>
        <el-tooltip class="align-btn" placement="bottom">
          <div slot="content">左对齐</div>
          <BSvgIcon
            :style="{
              transition: 'all .4s',
              opacity: isMultiple ? 1 : 0.5,
              cursor: isMultiple ? 'pointer' : 'not-allowed',
              'font-size': '18px',
              background: isMultiple ? '#2681ff' : ''
            }"
            class="align-left"
            icon-class="align-left"
            @click.stop="handleAlign('left')"
          />
        </el-tooltip>
        <el-tooltip class="align-btn" placement="bottom">
          <div slot="content">垂直居中对齐</div>
          <BSvgIcon
            :style="{
              transition: 'all .4s',
              opacity: isMultiple ? 1 : 0.5,
              cursor: isMultiple ? 'pointer' : 'not-allowed',
              'font-size': '18px',
              background: isMultiple ? '#2681ff' : ''
            }"
            class="align-vertical-center"
            icon-class="align-vertical-center"
            @click.stop="handleAlign('vertical-center')"
          />
        </el-tooltip>
        <el-tooltip class="align-btn" placement="bottom">
          <div slot="content">右对齐</div>
          <BSvgIcon
            :style="{
              transition: 'all .4s',
              opacity: isMultiple ? 1 : 0.5,
              cursor: isMultiple ? 'pointer' : 'not-allowed',
              'font-size': '18px',
              background: isMultiple ? '#2681ff' : ''
            }"
            class="align-right"
            icon-class="align-right"
            @click.stop="handleAlign('right')"
          />
        </el-tooltip>
      </el-col>
      <!-- 右侧操作按钮 -->
      <el-col class="operation-area-right" :span="6" @click.self.native="outBlur">
        <el-tooltip class="big-screen-opetatin-btn" placement="bottom">
          <div slot="content">清空画布</div>
          <BSvgIcon icon-class="delete" @click="clearDesign" />
        </el-tooltip>
        <el-tooltip class="big-screen-opetatin-btn" placement="bottom">
          <div slot="content">导入</div>
          <BSvgIcon icon-class="import" @click="importDesign" />
        </el-tooltip>
        <!-- line-height 为了调整el-dropdown 和 tooltip 按钮水平对齐 想到了更好的可以来替换 T_T -->
        <el-dropdown title="导出" trigger="click" style="line-height: 0" @command="handleExport">
          <BSvgIcon class="export-btn" icon-class="export" />
          <el-dropdown-menu slot="dropdown" class="big-screen-dropdown">
            <el-dropdown-item command="img">图片文件</el-dropdown-item>
            <el-dropdown-item command="json">json文件</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-tooltip class="big-screen-opetatin-btn" placement="bottom">
          <div slot="content">预览</div>
          <BSvgIcon icon-class="eye-open" @click="preview" />
        </el-tooltip>
        <el-tooltip class="big-screen-opetatin-btn" placement="bottom">
          <div slot="content">保存</div>
          <BSvgIcon icon-class="save" @click="saveDesignData" />
        </el-tooltip>
      </el-col>
    </el-row>
    <input v-show="false" id="files" ref="refFile" type="file" accept=".json" @change="fileLoad" />
  </div>
</template>

<script>
import { clearCptInterval, fileDownload } from '@/utils'
// import BigScreenPreview from '@/views/app/big-screen/preview'
import html2canvas from 'html2canvas'

// import * as BigscreenApi from '@/api/app/big-screen';
import { Base64 } from 'js-base64'
export default {
  name: 'Toolbar',
  components: {
    // BigScreenPreview
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
  data() {
    return {
      appId: '',
      bigscreenId: ''
    }
  },
  computed: {
    isMultiple() {
      return Object.keys(this.multipleCpts).length >= 2
    },
    cacheComponents() {
      return this.$store.state.bigScreen.componentList
    },
    containerScale: {
      get() {
        return this.$store.state.bigScreen.containerScale
      },
      set(val) {
        this.$store.dispatch('bigScreen/changeScale', val)
      }
    },
    // 画布背景风格
    canvasBgStyle() {
      return this.$store.state.bigScreen.canvasBgStyle
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
    }
  },
  created() {
    this.appId = this.$route.params.appId
    this.bigscreenId = this.$route.params.pageId
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    // TODO 改为状态管理
    handleAlign(type) {
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
        Object.values(this.multipleCpts).forEach(_c => {
          _c.cptY = val
        })
      } else if (type === 'horizontal-center') {
        /**
         * 水平居中
         * Y = selfY + selfHeight / 2
         * Y 中心到顶部的距离
         * selfY 自身 y 值
         * selfHeight 自身高度
         */
        let Y = 0
        Object.values(this.multipleCpts).forEach((_c, _i) => {
          const halfHeight = _c.cptHeight / 2
          if (_i === 0) {
            Y = _c.cptY + halfHeight
          } else {
            _c.cptY = Y - halfHeight
          }
        })
      } else if (type === 'bottom') {
        for (const key in this.multipleCpts) {
          if (Object.hasOwnProperty.call(this.multipleCpts, key)) {
            const el = this.multipleCpts[key]
            posArr.push({ max: el.cptHeight + el.cptY })
          }
        }
        const arr = posArr.map(v => v.max)
        const max = Math.max(...arr)
        Object.values(this.multipleCpts).forEach(_c => {
          _c.cptY = max - _c.cptHeight
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
        Object.values(this.multipleCpts).forEach(_c => {
          _c.cptX = val
        })
      } else if (type === 'vertical-center') {
        /**
         * 垂直居中
         * X = selfX + selfWidth / 2
         * X 中心到顶部的距离
         * selfX 自身 x 值
         * selfWidth 自身高度
         */
        let X = 0
        Object.values(this.multipleCpts).forEach((_c, _i) => {
          const halfWidth = _c.cptWidth / 2
          if (_i === 0) {
            X = _c.cptX + halfWidth
          } else {
            _c.cptX = X - halfWidth
          }
        })
      } else if (type === 'right') {
        for (const key in this.multipleCpts) {
          if (Object.hasOwnProperty.call(this.multipleCpts, key)) {
            const el = this.multipleCpts[key]
            posArr.push({ height: el.cptWidth, max: el.cptWidth + el.cptX })
          }
        }
        const arr = posArr.map(v => v.max)
        const max = Math.max(...arr)
        Object.values(this.multipleCpts).forEach(_c => {
          _c.cptX = max - _c.cptWidth
        })
      }
      // 更新存储多选组件的位置的息
      Object.keys(this.multipleCptPositions).forEach(key => {
        // eslint-disable-next-line vue/no-mutating-props
        this.multipleCptPositions[key].cptX = this.multipleCpts[key].cptX
        // eslint-disable-next-line vue/no-mutating-props
        this.multipleCptPositions[key].cptY = this.multipleCpts[key].cptY
      })
    },
    changeCanvasBgStyle(style) {
      this.$store.dispatch('bigScreen/changeCanvasBgStyle', style)
    },
    // 导出
    handleExport(command) {
      if (command === 'img') {
        // 导出图片
        html2canvas(this.$store.state.bigScreen.webContainer, {
          backgroundColor: '#49586e'
        }).then(canvas => {
          const canvasData = canvas.toDataURL('image/jpeg')
          fileDownload(canvasData, this.designData.title + '.png')
        })
      } else if (command === 'json') {
        // 导出json
        this.$store.dispatch('bigScreen/setBigScreenData', {
          components: this.cacheComponents
        })
        const data = JSON.stringify(this.designData)
        const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(data) // encodeURIComponent解决中文乱码
        fileDownload(uri, this.designData.title + '.json')
      }
    },
    outBlur() {
      // 取消聚焦组件
      this.$store.dispatch('bigScreen/setCurComponentIndex', -1)
      this.$store.dispatch('bigScreen/setCurComponent', {})
      this.$emit('clearMultipleCpts')
    },
    // 隐藏设置面板
    hiddenPane(type) {
      this.$store.dispatch('bigScreen/changePaneDisplayStatus', type)
    },

    importDesign() {
      this.$refs.refFile.dispatchEvent(new MouseEvent('click'))
    },
    fileLoad() {
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
      reader.onload = function() {
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
      reader.onerror = function() {
        that.$message.success(`文件 ${fileName} 读取失败，请检查后重试`)
      }
      this.$refs.refFile.value = ''
    },
    // 保存数据
    saveDesignData() {
      const cacheData = Base64.encode(JSON.stringify(this.designData))
      localStorage.setItem('viewData', cacheData)
      // this.designData.components.map((c) => {
      //   // ? 兼容旧版本大屏数据没有动画参数的
      //   if (!c.configProps.animation) {
      //     c.configProps.animation = {
      //       name: '',
      //       delay: 'animate__delay-0s',
      //       speed: 'animate__slow',
      //       repeat: 'animate__repeat-1'
      //     }
      //   }
      // })
      // this.$modal.loading('保存中，请稍后...')
      // 保存大屏数据
      // BigscreenApi.saveBigscreen(bc)
      //   .then((res) => {
      //     this.$modal.closeLoading()
      //     if (res.code === 200) {
      //       this.$message.success('保存成功！');
      //     } else {
      //       this.$message.info(res.msg)
      //     }
      //   })
      //   .catch((err) => {
      //     this.$modal.closeLoading()
      //     console.log(err)
      //   });
      // const that = this
      // 生成缩略图
      // html2canvas(that.$store.state.bigScreen.webContainer, {
      //   backgroundColor: '#49586e'
      // }).then((canvas) => {
      //   const canvasData = canvas.toDataURL('image/jpeg')
      //   const file = base64toFile(canvasData, that.designData.title + '.png')
      //   const fileFormData = new FormData()
      //   fileFormData.append('file', file)
      //   // todo 上传缩略图
      //   // uploadThumbnail(that.designData.id + '.png', fileFormData).then(
      //   //   (res) => {
      //   //   // 上传预览图
      //   //     that.$store.dispatch('bigScreen/setBigScreenData', { designImgPath: res.data })
      //   //     that.$store.dispatch('bigScreen/setBigScreenData', { components: JSON.stringify(this.cacheComponents) })
      //   //     // todo 接入后端保存api 保存 designData
      //   //   }
      //   // )
      //   this.$modal.closeLoading()
      // })
    },
    // 预览画布
    preview() {
      if (!this.cacheComponents.length) {
        this.$message.closeAll()
        return this.$modal.msg('暂无组件可预览，请先设计看板')
      }
      if (
        !this.cacheComponents.some(c => {
          return !c.hidden
        })
      ) {
        this.$message.closeAll()
        return this.$modal.msg('画布中暂无可见组件，请调整后重试')
      }
      // 预览页面数据存储到本地，减少不必要的网络请求，通过标识 mode 是否等于 preview 判断是否为预览模式
      localStorage.setItem('designCache', Base64.encode(JSON.stringify(this.designData)))
      // 生成预览链接
      const routeUrl = this.$router.resolve({
        name: 'PreviewBigscreen',
        params: {
          // pageId: this.bigscreenId
        },
        query: {
          mode: 'preview'
        }
      })
      // 打开预览窗口
      window.open(routeUrl.href, '_blank')
    },
    // 清空画布
    clearDesign() {
      this.$confirm('此操作将会清空画布，是否继续？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'big-screen-confirm-dialog'
      })
        .then(() => {
          // 可考虑优化为一个方法
          this.$store.dispatch('bigScreen/clearCanvas')
          this.$store.dispatch('bigScreen/setBigScreenData', {
            components: []
          })
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
    line-height: 45px;
    background: #1d1e1f;
    padding: 0 10px;
    &-left {
      .title {
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
        width: 24px;
        height: 24px;
        line-height: 24px;
        border-radius: 5px;
        text-align: center;
        background: #303640;
        font-size: 15px;
        margin-right: 5px;
        &.pane-active {
          background: #2681ff;
        }
      }
      .operation-handler {
        cursor: pointer;
        margin: 0 5px;
      }
      .align-btn {
        margin: 0 5px;
        width: 24px;
        height: 24px;
        padding: 3px;
        border-radius: 5px;
      }
      .scale-bar {
        min-width: 80px;
      }
    }
    &-right {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .btn {
        width: 40px;
        // height: 100%;
        text-align: center;
        line-height: 45px;
        color: #909399;
        cursor: pointer;
        transition: all 0.5s;
        &:hover {
          font-weight: 999;
          background: #414b5d;
        }
      }
      .big-screen-opetatin-btn {
        width: 30px;
        padding: 0 5px;
        height: 30px;
        cursor: pointer;
        margin-left: 5px;
        transition: all 0.2s;
        border-left: 1px solid #33b8ec;
        border-top: 1px solid #33b8ec;
        border-right: 3px solid #000;
        border-bottom: 3px solid #000;
        &:active {
          border-right: 1px solid #33b8ec;
          border-bottom: 1px solid #33b8ec;
          border-left: 3px solid #000;
          border-top: 3px solid #000;
        }
      }
      .export-btn {
        font-size: 30px;
        padding: 0 5px;
        // height: 100vh;
        margin-left: 5px;
        transition: all 0.2s;
        cursor: pointer;
        border-left: 1px solid #33b8ec;
        border-top: 1px solid #33b8ec;
        border-right: 3px solid #000;
        border-bottom: 3px solid #000;
        &:active {
          border-right: 1px solid #33b8ec;
          border-bottom: 1px solid #33b8ec;
          border-left: 3px solid #000;
          border-top: 3px solid #000;
        }
      }
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
            width: 5px;
            height: 5px;
            border-radius: 0;
            border-width: 1px;
          }
        }
      }
    }
  }
}
</style>
