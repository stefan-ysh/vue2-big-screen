<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-form label-width="100px" size="mini">
    <el-form-item label="时间格式">
      <el-select v-model="attribute.format" style="width: 100%" popper-class="big-screen-select">
        <el-option label="年月日时分秒" value="YYYY-MM-DD hh:mm:ss" />
        <el-option label="年月日" value="YYYY-MM-DD" />
        <el-option label="月日" value="MM-DD" />
        <el-option label="时分秒" value="hh:mm:ss" />
        <el-option label="时分" value="hh:mm" />
      </el-select>
    </el-form-item>
    <el-form-item label="上/下午显示">
      <el-switch v-model="attribute.am" style="width: 100%" />
    </el-form-item>
    <el-form-item v-if="attribute.am" label="文字大写">
      <el-switch v-model="attribute.isUpperCase" style="width: 100%" />
    </el-form-item>
    <el-form-item label="显示星期">
      <el-switch v-model="attribute.showWeek" style="width: 100%" />
    </el-form-item>
    <el-form-item label="字体">
      <el-select v-model="attribute.fontFamily" style="width: 100%" popper-class="big-screen-select">
        <el-option
          v-for="(item, index) in ['微软雅黑', '黑体', '宋体', '仿宋', '楷体', '华文宋体']"
          :key="index"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="字体颜色">
      <BColorPicker field="color" :data="attribute" show-alpha />
    </el-form-item>
    <el-form-item label="字体大小">
      <el-input-number v-model="attribute.fontSize" controls-position="right" style="width: 100%" :min="1" />
    </el-form-item>
    <el-form-item label="字体粗细">
      <el-select v-model="attribute.fontWeight" style="width: 100%" popper-class="big-screen-select">
        <el-option label="细" value="lighter" />
        <el-option label="正常" value="normal" />
        <el-option label="加粗" value="bold" />
      </el-select>
    </el-form-item>
    <el-form-item label="倾斜">
      <el-select v-model="attribute.fontStyle" popper-class="big-screen-select">
        <el-option label="正常" value="normal" />
        <el-option label="斜体" value="italic" />
      </el-select>
    </el-form-item>
    <el-form-item label="对齐方式">
      <el-select v-model="attribute.textAlign" popper-class="big-screen-select">
        <el-option label="左" value="left" />
        <el-option label="中" value="center" />
        <el-option label="右" value="right" />
      </el-select>
    </el-form-item>
    <el-form-item label="下划线">
      <el-select v-model="attribute.textDecoration" popper-class="big-screen-select">
        <el-option
          v-for="(item, index) in textDecorationList"
          :key="index + item.label"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="行高">
      <el-input-number v-model="attribute.lineHeight" controls-position="right" style="width: 100%" :min="0" />
    </el-form-item>
    <el-form-item label="字符间距">
      <el-input-number v-model="attribute.letterSpace" controls-position="right" style="width: 100%" :min="0" />
    </el-form-item>
    <el-form-item label="跑马灯">
      <el-switch v-model="attribute.animation" />
    </el-form-item>
  </el-form>
</template>

<script>
import BColorPicker from '@/components/BColorPicker.vue'
export default {
  name: 'ClockSetter',
  components: { BColorPicker },
  props: {
    attribute: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      textDecorationList: [
        { label: '无', value: 'none' },
        { label: '下划线', value: 'underline' },
        { label: '上划线', value: 'overline' },
        { label: '穿过文字', value: 'line-through' }
      ]
    }
  }
}
</script>

<style scoped></style>
