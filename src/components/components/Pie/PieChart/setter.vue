<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <el-form label-width="90px" size="mini">
      <el-form-item label="标题">
        <el-input v-model="attribute.title" />
      </el-form-item>
      <el-form-item label="显示标题">
        <el-switch v-model="attribute.showTitle" />
      </el-form-item>
      <el-form-item v-show="attribute.showTitle" label="标题颜色">
        <BColorPicker :data="attribute" field="titleColor" show-alpha />
      </el-form-item>
      <el-form-item label="图例颜色">
        <BColorPicker :data="attribute" field="textColor" show-alpha />
      </el-form-item>
      <el-form-item label="背景色">
        <BColorPicker :data="attribute" field="backgroundColor" show-alpha />
      </el-form-item>
      <el-form-item label="边框色">
        <BColorPicker :data="attribute" field="borderColor" show-alpha />
      </el-form-item>
      <el-form-item label="系列配置">
        <el-input
          :value="seriesJson"
          type="textarea"
          :rows="8"
          @input="applySeries"
        />
      </el-form-item>
      <el-form-item v-if="seriesError" label="">
        <span class="series-error">系列配置解析失败：{{ seriesError }}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import BColorPicker from '@/components/BColorPicker.vue'

export default {
  name: 'PieChartSetter',
  components: { BColorPicker },
  props: {
    attribute: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      seriesError: ''
    }
  },
  computed: {
    seriesJson() {
      return JSON.stringify(this.attribute.series || [], null, 2)
    }
  },
  methods: {
    applySeries(value) {
      try {
        const parsed = JSON.parse(value)
        if (!Array.isArray(parsed)) {
          this.seriesError = '必须为数组'
          return
        }
        this.$set(this.attribute, 'series', parsed)
        this.seriesError = ''
      } catch (e) {
        this.seriesError = e.message
      }
    }
  }
}
</script>

<style scoped>
.series-error {
  color: #f56c6c;
  font-size: 12px;
}
</style>
