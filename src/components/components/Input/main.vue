<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <el-form
      :label-position="configProps.attribute.labelPosition"
      :label-width="configProps.attribute.labelWidth + 'px'"
      :size="configProps.attribute.formSize"
    >
      <el-form-item :label="configProps.attribute.label">
        <el-input
          v-model="configProps.attribute.value"
          :type="configProps.attribute.type"
          :placeholder="configProps.attribute.placeholderValue"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'BInput',
  props: {
    configProps: { type: Object, default: () => {} }
  }
}
</script>
