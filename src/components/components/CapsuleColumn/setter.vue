<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div style="position: relative">
    <el-form label-width="100px" size="mini">
      <el-form-item label="单位">
        <el-input v-model="attribute.unit" />
      </el-form-item>
      <el-form-item label="环颜色">
        <el-color-picker v-model="attribute.textColor" show-alpha />
      </el-form-item>
      <el-form-item label="显示数值">
        <el-switch v-model="attribute.showValue" />
      </el-form-item>
    </el-form>
  </div>
</template>
<!-- eslint-disable -->
<script>
export default {
  name: "CapsuleColumnSetter",
  props: { attribute: { type: Object, default: () => {} } },
};
</script>
