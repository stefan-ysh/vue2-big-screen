<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div style="position: relative">
    <el-form label-width="100px" size="mini">
      <el-form-item label="字体大小">
        <el-input-number v-model="attribute.fontSize" controls-position="right" style="width: 100%" />
      </el-form-item>
      <el-form-item label="文字颜色">
        <BColorPicker :data="attribute" field="textColor" show-alpha />
      </el-form-item>
      <el-form-item label="柱体颜色">
        <BColorPicker :data="attribute" field="columnColor" show-alpha />
      </el-form-item>
      <el-form-item label="图片大小">
        <el-input-number v-model="attribute.imgSideLength" controls-position="right" style="width: 100%" />
      </el-form-item>
      <el-form-item label="图片">
        <el-input-number v-model="attribute.img" controls-position="right" style="width: 100%" />
      </el-form-item>
      <el-form-item label="显示数值">
        <el-switch v-model="attribute.showValue" />
      </el-form-item>
    </el-form>
  </div>
</template>
<!-- eslint-disable -->
<script>
import BColorPicker from '@/components/BColorPicker.vue'
export default {
  name: "ConicalColumnSetter",
  components: {BColorPicker},
  props: { attribute: { type: Object, default: () => {} } },
};
</script>
