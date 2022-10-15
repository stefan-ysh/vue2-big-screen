<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div style="position: relative">
    <el-form label-width="100px" size="mini">
      <el-form-item label="上方颜色">
        <BColorPicker :data="attribute" field="topColor" show-alpha />
      </el-form-item>
      <el-form-item label="下方颜色">
        <BColorPicker :data="attribute" field="bottomColor" show-alpha />
      </el-form-item>
      <el-form-item label="样式">
        <el-select v-model="attribute.shape" placeholder="请选择">
          <el-option label="矩形" value="rect" />
          <el-option label="圆角矩形" value="roundRect" />
          <el-option label="圆形" value="round" />
        </el-select>
      </el-form-item>
      <el-form-item label="波浪数量">
        <el-input-number
          v-model="attribute.waveNum"
          controls-position="right"
          style="width: 100%"
          :min="1"
        />
      </el-form-item>
      <el-form-item label="波浪高度">
        <el-input-number
          v-model="attribute.waveHeight"
          controls-position="right"
          style="width: 100%"
          :min="1"
        />
      </el-form-item>
      <el-form-item label="波浪透明度">
        <el-input-number
          v-model="attribute.waveOpacity"
          controls-position="right"
          style="width: 100%"
          :step="0.1"
          :min="0"
          :max="1"
        />
      </el-form-item>
      <el-form-item label="信息格式化">
        <el-input v-model="attribute.formatter" type="textarea" />
      </el-form-item>
    </el-form>
  </div>
</template>
<!-- eslint-disable vue/no-mutating-props -->
<script>
import BColorPicker from '@/components/BColorPicker.vue'

export default {
  name: 'WaterLevelSetter',
  components: { BColorPicker },
  props: {
    attribute: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      // tempColor1: '#00BAFF',
      // tempColor2: '#3DE7C9'
    }
  },
  methods: {
    // changeColor() {
    //   this.attribute.colors = [this.tempColor1, this.tempColor2]
    //   this.attribute.refresh = !this.attribute.refresh
    // }
  }
}
</script>

<style scoped></style>
