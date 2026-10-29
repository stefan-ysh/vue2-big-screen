<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <el-form label-width="90px" size="mini">
      <el-form-item label="标题">
        <el-input v-model="attribute.title" />
      </el-form-item>
      <el-form-item label="显示标题">
        <el-switch v-model="attribute.showTitle" />
      </el-form-item>
      <el-form-item label="地图类型">
        <el-select v-model="attribute.mapType" popper-class="big-screen-select">
          <el-option label="渐变地图" value="MapGc" />
          <el-option label="飞线图" value="MapMigrate" />
        </el-select>
      </el-form-item>
      <el-form-item label="标题颜色">
        <BColorPicker :data="attribute" field="titleColor" show-alpha />
      </el-form-item>
      <el-form-item label="背景色">
        <BColorPicker :data="attribute" field="backgroundColor" show-alpha />
      </el-form-item>
      <el-form-item label="边框色">
        <BColorPicker :data="attribute" field="borderColor" show-alpha />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import BColorPicker from '@/components/BColorPicker.vue'

export default {
  name: 'MapVisualizationTemplateSetter',
  components: { BColorPicker },
  props: {
    attribute: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
