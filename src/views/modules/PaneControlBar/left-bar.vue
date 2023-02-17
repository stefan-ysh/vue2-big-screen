<template>
  <div
    class="hidden-pane-bar hidden-pane-bar-left"
    :style="{ left: cptPaneWidth + 'px' }"
    :title="cptPaneWidth === 200 ? '隐藏组件面板' : '显示组件面板'"
    @click="hiddenPane('left')"
  >
    <div
      class="hidden-pane-bar-top"
      :class="cptPaneWidth === 200 ? 'hidden-pane-bar-top-left-active' : 'hidden-pane-bar-top-left'"
    />
    <div
      class="hidden-pane-bar-bottom"
      :class="cptPaneWidth === 200 ? 'hidden-pane-bar-bottom-left-active' : 'hidden-pane-bar-bottom-left'"
    />
  </div>
</template>

<script>
export default {
  name: 'LeftPaneControlBar',
  data() {
    return {}
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
    }
  },
  methods: {
    // 隐藏设置面板
    hiddenPane(type) {
      this.$store.dispatch('bigScreen/changePaneDisplayStatus', type)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
