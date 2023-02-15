<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-form label-width="100px" size="mini">
    <el-form-item label="边框粗细">
      <el-input-number
        v-model="attribute.borderWidth"
        controls-position="right"
        style="width: 100%"
        :min="1"
        :max="100"
      />
    </el-form-item>
    <el-form-item label="边框圆角">
      <el-input-number
        v-model="attribute.borderRadius"
        controls-position="right"
        style="width: 100%"
        :min="0"
        :max="100"
      />
    </el-form-item>
    <el-form-item label="内边距">
      <el-input-number
        v-model="attribute.borderGap"
        controls-position="right"
        style="width: 100%"
        :min="0"
        :max="100"
      />
    </el-form-item>
    <el-form-item label="局部渐变">
      <el-switch v-model="attribute.localGradient" />
    </el-form-item>
    <el-form-item label="线条粗细">
      <el-input-number
        v-model="attribute.lineWidth"
        controls-position="right"
        style="width: 100%"
        :min="0"
        :max="50"
      />
    </el-form-item>
    <el-form-item label="线条间隔">
      <el-input-number
        v-model="attribute.lineSpace"
        controls-position="right"
        style="width: 100%"
        :min="0"
        :max="20"
      />
    </el-form-item>
    <el-form-item label="颜色1">
      <BColorPicker :data="attribute" field="color1" show-alpha />
    </el-form-item>
    <el-form-item label="颜色2">
      <BColorPicker :data="attribute" field="color2" show-alpha />
    </el-form-item>
  </el-form>
</template>

<script>
import BColorPicker from '@/components/BColorPicker.vue';
export default {
  name: 'PercentPondSetter',
  components: {
    BColorPicker
  },
  props: {
    attribute: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped></style>
