<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-form label-width="100px" size="mini">
    <el-form-item label="标题">
      <el-input v-model="attribute.title" />
    </el-form-item>
    <el-form-item label="标题颜色">
      <BColorPicker :data="attribute" field="titleTextColor" show-alpha />
    </el-form-item>
    <el-form-item label="副标题">
      <el-input v-model="attribute.subtext" />
    </el-form-item>
    <el-form-item label="副标题颜色">
      <BColorPicker :data="attribute" field="subtextColor" show-alpha />
    </el-form-item>
    <el-form-item label="标题位置(左)">
      <el-input v-model="attribute.titleLeft" />
    </el-form-item>
    <el-form-item label="标题位置(上)">
      <el-input v-model="attribute.titleTop" />
    </el-form-item>
    <el-form-item label="x轴文字">
      <el-switch v-model="attribute.xLabelShow" active-text="开" inactive-text="关" />
    </el-form-item>
    <el-form-item label="x轴字体颜色">
      <BColorPicker :data="attribute" field="xLabelColor" show-alpha />
    </el-form-item>
    <el-form-item label="x轴线显示">
      <el-switch v-model="attribute.xLineShow" active-text="开" inactive-text="关" />
    </el-form-item>
    <el-form-item label="x轴线颜色">
      <BColorPicker :data="attribute" field="xLineColor" show-alpha />
    </el-form-item>
    <el-form-item label="x轴刻度线">
      <el-switch v-model="attribute.xTickShow" active-text="开" inactive-text="关" />
    </el-form-item>
    <el-form-item label="y轴文字">
      <el-switch v-model="attribute.yLabelShow" active-text="开" inactive-text="关" />
    </el-form-item>
    <el-form-item label="y轴字体颜色">
      <BColorPicker :data="attribute" field="yLabelColor" show-alpha />
    </el-form-item>
    <el-form-item label="y轴线显示">
      <el-switch v-model="attribute.yLineShow" active-text="开" inactive-text="关" />
    </el-form-item>
    <el-form-item label="y轴颜色">
      <BColorPicker :data="attribute" field="yLineColor" show-alpha />
    </el-form-item>
    <el-form-item label="y轴网格线">
      <el-switch v-model="attribute.yGridLineShow" active-text="开" inactive-text="关" />
    </el-form-item>
    <el-form-item label="y轴刻度线">
      <el-switch v-model="attribute.yTickShow" active-text="开" inactive-text="关" />
    </el-form-item>
    <el-form-item label="平滑曲线">
      <el-switch v-model="attribute.smooth" active-text="开" inactive-text="关" />
    </el-form-item>
    <el-form-item label="标志显示">
      <el-switch v-model="attribute.showSymbol" active-text="开" inactive-text="关" />
    </el-form-item>

    <el-form-item label="渐变颜色1">
      <BColorPicker :data="attribute" field="areaColor1" show-alpha />
    </el-form-item>
    <el-form-item label="渐变颜色2">
      <BColorPicker :data="attribute" field="areaColor2" show-alpha />
    </el-form-item>
    <el-form-item label="渐变颜色3">
      <BColorPicker :data="attribute" field="areaColor3" show-alpha />
    </el-form-item>
  </el-form>
</template>

<script>
import BColorPicker from '@/components/BColorPicker.vue'
export default {
  name: 'LineChartSetter',
  components: {
    BColorPicker
  },
  props: { attribute: { type: Object, default: () => {} } }
}
</script>

<style scoped></style>
