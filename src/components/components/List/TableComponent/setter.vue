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
      <el-form-item label="排名高亮">
        <el-switch v-model="attribute.rankHighlight" />
        <span class="setter-tip">前三名显示金银铜徽标</span>
      </el-form-item>
      <el-form-item label="表头颜色">
        <BColorPicker :data="attribute" field="headerColor" show-alpha />
      </el-form-item>
      <el-form-item label="文字颜色">
        <BColorPicker :data="attribute" field="textColor" show-alpha />
      </el-form-item>
      <el-form-item label="背景色">
        <BColorPicker :data="attribute" field="backgroundColor" show-alpha />
      </el-form-item>
      <el-form-item label="边框色">
        <BColorPicker :data="attribute" field="borderColor" show-alpha />
      </el-form-item>
      <el-form-item label="列配置">
        <el-input :value="columnsJson" type="textarea" :rows="5" @input="applyColumns" />
      </el-form-item>
      <el-form-item v-if="columnsError" label="">
        <span class="columns-error">列配置解析失败：{{ columnsError }}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import BColorPicker from '@/components/BColorPicker.vue'

export default {
  name: 'TableComponentSetter',
  components: { BColorPicker },
  props: {
    attribute: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      columnsError: ''
    }
  },
  computed: {
    columnsJson() {
      return JSON.stringify(this.attribute.columns || [], null, 2)
    }
  },
  methods: {
    applyColumns(value) {
      try {
        const parsed = JSON.parse(value)
        if (!Array.isArray(parsed)) {
          this.columnsError = '必须为数组'
          return
        }
        this.$set(this.attribute, 'columns', parsed)
        this.columnsError = ''
      } catch (e) {
        this.columnsError = e.message
      }
    }
  }
}
</script>

<style scoped>
.setter-tip {
  margin-left: 8px;
  font-size: 11px;
  color: #8a97ad;
}

.columns-error {
  color: #f56c6c;
  font-size: 12px;
}
</style>
