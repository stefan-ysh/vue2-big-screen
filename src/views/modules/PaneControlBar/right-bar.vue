<template>
  <div
    class="hidden-pane-bar hidden-pane-bar-right"
    :style="{ left: windowWidth - configPaneWidth - 20 + 'px' }"
    :title="configPaneWidth === 300 ? '隐藏配置面板' : '显示配置面板'"
    @click="hiddenPane('right')"
  >
    <div
      class="hidden-pane-bar-top"
      :class="
        configPaneWidth === 300
          ? 'hidden-pane-bar-top-right-active'
          : 'hidden-pane-bar-top-right'
      "
    />
    <div
      class="hidden-pane-bar-bottom"
      :class="
        configPaneWidth === 300
          ? 'hidden-pane-bar-bottom-right-active'
          : 'hidden-pane-bar-bottom-right'
      "
    />
  </div>
</template>

<script>
export default {
  name: 'RightPaneControlBar',
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
@import url("./index.less");
</style>
