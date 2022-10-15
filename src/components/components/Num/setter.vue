<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-form labelWidth="90px" size="mini">
    <el-form-item label="标题">
      <el-input v-model="attribute.title" size="mini" />
    </el-form-item>
    <el-form-item label="数值大小">
      <el-input-number
        v-model="attribute.numSize"
        controls-position="right"
        style="width:100%"
        :min="13"
        :max="200"
        size="mini"
      />
    </el-form-item>
    <el-form-item label="数值颜色">
      <BColorPicker :data="attribute" field="numColor" />
    </el-form-item>
    <el-form-item label="数值行高">
      <el-input-number
        v-model="attribute.numHeight"
        controls-position="right"
        :min="10"
        style="width:100%"
        :max="200"
        size="mini"
      />
    </el-form-item>
  </el-form>
</template>

<script>
import BColorPicker from '@/components/BColorPicker.vue'
export default {
  name: 'BNumSetter',
  components: { BColorPicker },
  props: {
    attribute: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
