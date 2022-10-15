<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-form label-width="100px" size="mini">
    <el-form-item label="标题">
      <el-input v-model="attribute.title" />
    </el-form-item>
    <el-form-item label="标题字体">
      <el-input-number
        v-model="attribute.titleSize"
        controls-position="right"
        style="width: 100%"
        :min="1"
        :max="100"
        :step="1"
      />
    </el-form-item>
    <el-form-item label="标题颜色">
      <BColorPicker :data="attribute" field="titleColor" />
    </el-form-item>
    <el-form-item label="最小值">
      <el-input-number
        v-model="attribute.min"
        controls-position="right"
        style="width: 100%"
      />
    </el-form-item>
    <el-form-item label="最大值">
      <el-input-number
        v-model="attribute.max"
        controls-position="right"
        style="width: 100%"
      />
    </el-form-item>
    <el-form-item label="起始角度">
      <el-slider
        v-model="attribute.startAngle"
        :min="-360"
        :max="360"
        :step="1"
      />
    </el-form-item>
    <el-form-item label="结束角度">
      <el-slider
        v-model="attribute.endAngle"
        :min="-360"
        :max="360"
        :step="1"
      />
    </el-form-item>
    <el-form-item label="表盘宽度">
      <el-input-number
        v-model="attribute.lineWidth"
        controls-position="right"
        style="width: 100%"
        :min="1"
        :max="100"
        :step="1"
      />
    </el-form-item>
    <el-form-item label="表盘颜色1">
      <BColorPicker :data="attribute" field="color1" />
    </el-form-item>
    <el-form-item label="表盘颜色2">
      <BColorPicker :data="attribute" field="color2" />
    </el-form-item>
    <el-form-item label="表盘颜色3">
      <BColorPicker :data="attribute" field="color3" />
    </el-form-item>
    <el-form-item label="刻度边距">
      <el-input-number
        v-model="attribute.lineDistance"
        controls-position="right"
        style="width: 100%"
        :min="-10"
        :max="100"
        :step="1"
      />
    </el-form-item>
    <el-form-item label="刻度长度">
      <el-input-number
        v-model="attribute.tickLength"
        controls-position="right"
        style="width: 100%"
        :min="1"
        :max="100"
        :step="1"
      />
    </el-form-item>
    <el-form-item label="刻度值边距">
      <el-input-number
        v-model="attribute.labelDistance"
        controls-position="right"
        style="width: 100%"
        :min="-10"
        :max="100"
        :step="1"
      />
    </el-form-item>
    <el-form-item label="刻度字体">
      <el-input-number
        v-model="attribute.labelSize"
        controls-position="right"
        style="width: 100%"
        :min="1"
        :max="100"
        :step="1"
      />
    </el-form-item>
    <el-form-item label="指针长度">
      <el-input-number
        v-model="attribute.pointerLength"
        controls-position="right"
        style="width: 100%"
        :min="1"
        :max="120"
        :step="1"
      />
    </el-form-item>
    <el-form-item label="指针宽度">
      <el-input-number
        v-model="attribute.pointerWidth"
        controls-position="right"
        style="width: 100%"
        :min="1"
        :max="120"
        :step="1"
      />
    </el-form-item>
    <el-form-item label="指针颜色">
      <BColorPicker :data="attribute" field="itemColor" />
    </el-form-item>
    <el-form-item label="数值字体">
      <el-input-number
        v-model="attribute.detailSize"
        controls-position="right"
        style="width: 100%"
        :min="2"
        :max="120"
        :step="1"
      />
    </el-form-item>
    <el-form-item label="数值颜色">
      <BColorPicker :data="attribute" field="detailColor" />
    </el-form-item>
  </el-form>
</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
import BColorPicker from '@/components/BColorPicker.vue'
export default {
  name: 'DashboardSetter',
  components: { BColorPicker },
  props: { attribute: Object }
}
</script>

<style scoped></style>
