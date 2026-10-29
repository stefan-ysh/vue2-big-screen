<template>
  <div
    class="hidden-pane-bar hidden-pane-bar-right"
    :style="{ left: windowWidth - configPaneWidth - 20 + 'px' }"
    :title="barTitle"
    @mousedown="onMouseDown"
  >
    <div
      class="hidden-pane-bar-top"
      :class="configPaneWidth === 300 ? 'hidden-pane-bar-top-right-active' : 'hidden-pane-bar-top-right'"
    />
    <div
      class="hidden-pane-bar-bottom"
      :class="configPaneWidth === 300 ? 'hidden-pane-bar-bottom-right-active' : 'hidden-pane-bar-bottom-right'"
    />
  </div>
</template>

<script>
export default {
  name: 'RightPaneControlBar',
  data() {
    return {
      // 拖拽调宽相关状态
      dragStartX: 0,
      startWidth: 0,
      moved: false
    }
  },
  computed: {
    windowWidth() {
      return this.$store.state.bigScreen.windowWidth
    },
    cptPaneWidth() {
      return this.$store.state.bigScreen.componentPaneWidth
    },
    configPaneWidth() {
      return this.$store.state.bigScreen.configPaneWidth
    },
    barTitle() {
      return this.configPaneWidth === 0 ? '显示配置面板' : '拖拽调节宽度，点击收起面板'
    }
  },
  beforeDestroy() {
    this.removeDragListeners()
  },
  methods: {
    // 隐藏设置面板
    hiddenPane(type) {
      this.$store.dispatch('bigScreen/changePaneDisplayStatus', type)
    },
    // 点击分隔条收起/展开，按住拖拽可调节面板宽度（向左拖拽加宽）
    onMouseDown(e) {
      this.dragStartX = e.clientX
      this.startWidth = this.configPaneWidth
      this.moved = false
      document.addEventListener('mousemove', this.onDragging)
      document.addEventListener('mouseup', this.onDragEnd)
      e.preventDefault()
    },
    onDragging(e) {
      const dx = e.clientX - this.dragStartX
      if (!this.moved && Math.abs(dx) < 3) return
      this.moved = true
      this.$store.dispatch('bigScreen/setPaneWidth', {
        pane: 'right',
        width: this.startWidth - dx
      })
    },
    onDragEnd() {
      this.removeDragListeners()
      // 未发生拖拽时按点击处理：收起/展开面板
      if (!this.moved) {
        this.hiddenPane('right')
      }
    },
    removeDragListeners() {
      document.removeEventListener('mousemove', this.onDragging)
      document.removeEventListener('mouseup', this.onDragEnd)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
