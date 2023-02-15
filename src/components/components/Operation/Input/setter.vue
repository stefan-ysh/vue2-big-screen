<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <el-form label-width="80px" size="mini">
      <el-form-item label="名称">
        <el-input v-model="attribute.label" />
      </el-form-item>
      <el-form-item label="label宽度">
        <el-input-number v-model="attribute.labelWidth" :min="20" :max="1500" />
      </el-form-item>
      <el-form-item label="提示内容">
        <el-input v-model="attribute.placeholderValue" />
      </el-form-item>
      <el-form-item label="默认值">
        <el-input v-model="attribute.value" />
      </el-form-item>
      <el-form-item label="输入类型">
        <el-select v-model="attribute.type" popper-class="big-screen-select">
          <el-option label="文本" value="text" />
          <el-option label="密码" value="password" />
        </el-select>
      </el-form-item>
      <el-form-item label="对齐方式">
        <el-select v-model="attribute.labelPosition" popper-class="big-screen-select">
          <el-option label="左" value="left" />
          <el-option label="中" value="center" />
          <el-option label="右" value="right" />
        </el-select>
      </el-form-item>
      <el-form-item label="尺寸">
        <el-select v-model="attribute.formSize" popper-class="big-screen-select">
          <el-option label="迷你" value="mini" />
          <el-option label="小" value="small" />
          <el-option label="中" value="miduem" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'BInputSetter',
  props: {
    attribute: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
