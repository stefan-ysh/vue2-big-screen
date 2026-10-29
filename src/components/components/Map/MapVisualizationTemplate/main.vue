<template>
  <div
    class="map-visualization-template"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <div class="template-title" v-if="attribute.showTitle" :style="{ color: attribute.titleColor }">
      {{ attribute.title || '地图可视化' }}
    </div>
    <div class="map-container" :style="mapContainerStyle">
      <component
        :is="mapComponentName"
        :cptId="cptId"
        :width="mapWidth"
        :height="mapHeight"
        :configProps="innerConfigProps"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapVisualizationTemplate',
  props: {
    cptId: String,
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 400
    },
    configProps: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    attribute() {
      return this.configProps.attribute || {}
    },
    // 只允许使用已注册的地图组件，避免 Unknown custom element
    mapComponentName() {
      const allowed = ['MapGc', 'MapMigrate']
      return allowed.includes(this.attribute.mapType) ? this.attribute.mapType : 'MapGc'
    },
    mapContainerStyle() {
      return {
        width: '100%',
        height: this.attribute.showTitle
          ? `calc(100% - ${this.attribute.titleHeight || 40}px)`
          : '100%',
        backgroundColor: this.attribute.backgroundColor || 'rgba(12, 26, 60, 0.2)',
        border: `1px solid ${this.attribute.borderColor || '#1D2C5E'}`,
        borderRadius: '4px'
      }
    },
    mapWidth() {
      return this.width
    },
    mapHeight() {
      if (!this.attribute.showTitle) return this.height
      return Math.max(this.height - (this.attribute.titleHeight || 40), 0)
    },
    innerConfigProps() {
      return {
        attribute: this.attribute.mapConfig || {},
        cptDataForm: this.configProps.cptDataForm,
        animation: this.configProps.animation
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.map-visualization-template {
  position: relative;

  .template-title {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }

  .map-container {
    position: relative;
    overflow: hidden;
  }
}
</style>
