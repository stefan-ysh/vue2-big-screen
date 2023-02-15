<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-form label-width="100px" size="mini">
    <el-form-item label="格式化">
      <el-input v-model="attribute.content" />
    </el-form-item>
    <el-form-item label="小数位数">
      <el-input-number
        v-model="attribute.toFixedNum"
        controls-position="right"
        style="width: 100%"
        :min="0"
        :max="10"
      />
    </el-form-item>
    <el-form-item label="对齐方式">
      <el-select v-model="attribute.textAlign">
        <el-option label="左" value="left" />
        <el-option label="中" value="center" />
        <el-option label="右" value="right" />
      </el-select>
    </el-form-item>
    <el-form-item label="行间距">
      <el-input-number v-model="attribute.rowGap" :min="0" :max="300" />
    </el-form-item>
    <el-form-item label="字体大小">
      <el-input-number v-model="attribute.style.fontSize" :min="0" :max="100" />
    </el-form-item>
    <el-form-item label="字体颜色">
      <BColorPicker :data="attribute.style" field="fill" show-alpha />
    </el-form-item>
  </el-form>
</template>

<script>
import BColorPicker from '@/components/BColorPicker.vue';
export default {
  name: 'DigitalFlopSetter',
  components: { BColorPicker },
  props: {
    attribute: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
}
</script>

<style scoped></style>
