<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div style="position: relative">
    <el-form label-width="100px" size="mini">
      <el-form-item label="数值单位">
        <el-input v-model="attribute.unit" />
      </el-form-item>
      <el-form-item label="显示行数">
        <el-input-number
          v-model="attribute.rowNum"
          controls-position="right"
          style="width: 100%"
          :min="1"
          :max="60"
        />
      </el-form-item>
      <el-form-item label="时间间隔(ms)">
        <el-input-number
          v-model="attribute.waitTime"
          controls-position="right"
          style="width: 100%"
          :min="200"
          :max="20000"
          :step="500"
        />
      </el-form-item>
      <el-form-item label="滚动方式">
        <el-select v-model="attribute.carousel" placeholder="请选择">
          <el-option label="单列滚动" value="single" />
          <el-option label="全表滚动" value="page" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ScrollListSetter',
  props: {
    attribute: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped></style>
