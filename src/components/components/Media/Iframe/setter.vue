<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-form label-width="80px" size="mini">
    <el-form-item label="url">
      <el-input v-model="attribute.url" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'BIframeSetter',
  props: {
    attribute: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped></style>
