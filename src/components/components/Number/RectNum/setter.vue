<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-form label-width="90px" size="mini">
    <el-form-item label="文字大小">
      <el-input-number
        v-model="attribute.fontSize"
        controls-position="right"
        :min="13"
        :max="200"
        style="width: 100%"
      />
    </el-form-item>
    <el-form-item label="文字颜色">
      <BColorPicker :data="attribute" field="color" size="mini" />
    </el-form-item>
    <el-form-item label="边距">
      <el-input-number v-model="attribute.padding" controls-position="right" :min="1" :max="200" style="width: 100%" />
    </el-form-item>
    <el-form-item label="边框颜色">
      <BColorPicker :data="attribute" field="borderColor" size="mini" />
    </el-form-item>
    <el-form-item label="背景颜色">
      <BColorPicker :data="attribute" field="bgColor" size="mini" show-alpha />
    </el-form-item>
  </el-form>
</template>
<script>
import BColorPicker from '@/components/BColorPicker.vue'

export default {
  name: 'RectNumSetter',
  components: { BColorPicker },
  props: {
    attribute: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
