<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-form label-width="100px" size="mini">
    <el-form-item label="主标题">
      <el-input v-model="attribute.titleText" />
    </el-form-item>
    <el-form-item label="主标题颜色">
      <BColorPicker :data="attribute" field="titleColor" show-alpha />
    </el-form-item>
    <el-form-item label="主标题大小">
      <el-input-number
        v-model="attribute.titleFontSize"
        size="mini"
        style="width: 100%"
        controls-position="right"
        :min="4"
        :max="100"
      />
    </el-form-item>
    <el-form-item label="副标题">
      <el-input v-model="attribute.subtext" />
    </el-form-item>
    <el-form-item label="副标题颜色">
      <BColorPicker :data="attribute" field="subTitleColor" show-alpha />
    </el-form-item>
    <el-form-item label="副标题大小">
      <el-input-number
        v-model="attribute.subTitleFontSize"
        size="mini"
        style="width: 100%"
        controls-position="right"
        :min="4"
        :max="100"
      />
    </el-form-item>
    <el-form-item label="标题位置(x)">
      <el-input v-model="attribute.titleLeft" />
    </el-form-item>
    <el-form-item label="标题位置(y)">
      <el-input v-model="attribute.titleTop" />
    </el-form-item>
    <el-form-item label="说明文字">
      <el-input v-model="attribute.seriesName" />
    </el-form-item>
    <el-form-item label="缩放">
      <el-switch v-model="attribute.roam" />
    </el-form-item>

    <el-form-item label="路线颜色">
      <BColorPicker :data="attribute" field="seriesColor" show-alpha />
    </el-form-item>
    <el-form-item label="路线宽度">
      <el-input-number
        v-model="attribute.lineWidth"
        size="mini"
        style="width: 100%"
        controls-position="right"
        :min="0"
        :max="100"
      />
    </el-form-item>
    <el-form-item label="路径曲度">
      <el-slider v-model="attribute.curveness" :step="0.1" :min="0" :max="1" />
    </el-form-item>

    <!-- todo 切换后画布中组件未更新 -->
    <!-- <el-form-item label="特效形状">
      <el-select v-model="attribute.symbol">
        <el-option label="arrow" value="arrow" />
        <el-option label="矩形" value="rect" />
        <el-option label="圆形" value="circle" />
        <el-option label="圆角矩形" value="roundRect" />
        <el-option label="三角形" value="triangle" />
        <el-option label="菱形" value="diamond" />
        <el-option label="标记" value="pin" />
      </el-select>
    </el-form-item> -->
    <el-form-item label="特效颜色">
      <BColorPicker :data="attribute" field="effectColor" show-alpha />
    </el-form-item>
    <el-form-item label="特效大小">
      <el-input-number
        v-model="attribute.symbolSize"
        size="mini"
        style="width: 100%"
        controls-position="right"
        :min="2"
        :max="100"
      />
    </el-form-item>
    <el-form-item label="特效时长">
      <el-input-number
        v-model="attribute.period"
        size="mini"
        style="width: 100%"
        controls-position="right"
        :min="2"
        :max="100"
      />
    </el-form-item>
    <el-form-item label="特效循环">
      <el-switch v-model="attribute.effectLoop" />
    </el-form-item>
  </el-form>
</template>

<script>
import BColorPicker from '@/components/BColorPicker.vue';
export default {
  name: 'MapMigrateSetter',
  components: { BColorPicker },
  props: { attribute: { type: Object, default: () => {} }}
}
</script>

<style scoped></style>
