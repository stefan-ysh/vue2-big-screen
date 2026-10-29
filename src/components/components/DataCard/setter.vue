<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <el-form label-width="90px" size="mini">
      <el-form-item label="标题">
        <el-input v-model="attribute.title" />
      </el-form-item>
      <el-form-item label="前缀">
        <el-input v-model="attribute.prefix" placeholder="如 ¥" />
      </el-form-item>
      <el-form-item label="数值">
        <el-input v-model="attribute.value" />
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="attribute.unit" placeholder="如 万" />
      </el-form-item>
      <el-form-item label="涨幅">
        <el-input v-model="attribute.growth" placeholder="如 +12.5%" />
      </el-form-item>
      <el-form-item label="涨幅状态">
        <el-select v-model="attribute.growthStatus" popper-class="big-screen-select">
          <el-option label="上涨" value="up" />
          <el-option label="下跌" value="down" />
        </el-select>
      </el-form-item>
      <el-form-item label="标题颜色">
        <BColorPicker :data="attribute" field="titleColor" show-alpha />
      </el-form-item>
      <el-form-item label="数值颜色">
        <BColorPicker :data="attribute" field="valueColor" show-alpha />
      </el-form-item>
      <el-form-item label="背景色">
        <BColorPicker :data="attribute" field="backgroundColor" show-alpha />
      </el-form-item>
      <el-form-item label="边框色">
        <BColorPicker :data="attribute" field="borderColor" show-alpha />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import BColorPicker from '@/components/BColorPicker.vue'

export default {
  name: 'DataCardSetter',
  components: { BColorPicker },
  props: {
    attribute: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
