<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <el-form label-width="100px" size="mini">
      <el-form-item label="标题">
        <el-input v-model="attribute.chartTitle" />
      </el-form-item>
      <el-form-item label="标题位置(x)">
        <el-input v-model="attribute.titleLeft" />
      </el-form-item>
      <el-form-item label="标题位置(y)">
        <el-input v-model="attribute.titleTop" />
      </el-form-item>
      <el-form-item label="标题颜色">
        <BColorPicker :data="attribute" field="titleTextColor" show-alpha />
      </el-form-item>
      <el-form-item label="x轴">
        <el-switch v-model="attribute.xAxisShow" />
      </el-form-item>
      <div v-show="attribute.xAxisShow">
        <el-form-item label="x轴线显示">
          <el-switch v-model="attribute.xLineShow" />
        </el-form-item>
        <el-form-item label="x轴线颜色">
          <BColorPicker :data="attribute" field="xLineColor" show-alpha />
        </el-form-item>
        <el-form-item label="x轴刻度线">
          <el-switch v-model="attribute.xTickShow" />
        </el-form-item>
        <el-form-item label="x轴字体颜色">
          <BColorPicker :data="attribute" field="xLabelColor" show-alpha />
        </el-form-item>
        <el-form-item label="x轴字体倾斜">
          <el-slider v-model="attribute.xFontRotate" :min="-180" :max="180" />
        </el-form-item>
      </div>
      <el-form-item label="y轴">
        <el-switch v-model="attribute.yAxisShow" />
      </el-form-item>
      <div v-show="attribute.yAxisShow">
        <el-form-item label="y轴线显示">
          <el-switch v-model="attribute.yLineShow" />
        </el-form-item>
        <el-form-item label="y轴颜色">
          <BColorPicker :data="attribute" field="yLineColor" show-alpha />
        </el-form-item>
        <el-form-item label="y轴网格线">
          <el-switch v-model="attribute.yGridLineShow" />
        </el-form-item>
        <el-form-item label="y轴刻度线">
          <el-switch v-model="attribute.yTickShow" />
        </el-form-item>
        <el-form-item label="y轴字体颜色">
          <BColorPicker :data="attribute" field="yLabelColor" show-alpha />
        </el-form-item>
      </div>
      <el-form-item label="颜色渐变">
        <el-switch v-model="attribute.gradualColor" />
      </el-form-item>
      <div v-if="attribute.gradualColor">
        <el-form-item label="柱顶颜色">
          <BColorPicker :data="attribute" field="barColor1" show-alpha />
        </el-form-item>
        <el-form-item label="柱中颜色">
          <BColorPicker :data="attribute" field="barColor2" show-alpha />
        </el-form-item>
        <el-form-item label="柱底颜色">
          <BColorPicker :data="attribute" field="barColor3" show-alpha />
        </el-form-item>
      </div>
      <div v-else>
        <el-form-item label="柱体颜色">
          <BColorPicker :data="attribute" field="barColor" show-alpha />
        </el-form-item>
      </div>
      <el-form-item v-show="attribute.barType === 'bar'" label="柱体背景">
        <el-switch v-model="attribute.barBgShow" />
      </el-form-item>
      <el-form-item label="柱体宽度">
        <el-input-number
          v-model="attribute.barWidth"
          style="width: 100%"
          controls-position="right"
          :min="1"
          :max="100"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import BColorPicker from '@/components/BColorPicker.vue'
export default {
  name: 'TdColumnChartSetter',
  components: { BColorPicker },
  props: {
    attribute: { type: Object, default: () => {} }
  },
  data() {
    return {}
  }
}
</script>

<style scoped></style>
