<!-- eslint-disable -->
<template>
  <div class="b-color-picker">
    <el-input size="mini" v-model="data[field]" clearable />
    <el-color-picker :color-format="colorFormat" size="mini" v-model="data[field]"  />
  </div>
</template>

<script>
export default {
  name: 'BColorPicker',
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    field: {
      type: String,
      default: 'color',
    },
    colorFormat: {
      type: String,
      default: 'hex',
    }
  }
}
</script>

<style scoped lang="less">
.b-color-picker {
  display: flex;
  border: 1px solid #282e3a;
  border-radius: 5px;
  /deep/ .el-input {
    &__inner {
      border-top-left-radius: 4px !important;
      border-bottom-left-radius: 4px !important;
      border: none;
      border-radius: 0;
    }
  }
  /deep/ .el-color-picker {
    .el-color-picker__trigger {
      border-radius: 0;
      border-top-right-radius: 4px !important;
      border-bottom-right-radius: 4px !important;
      border-left: 1px solid #282e3a !important;
      background-color: #39393a;
      .el-color-picker__color {
        &-inner {
        }
      }
      .el-color-picker__icon {
        display: none;
      }
    }
  }
}
</style>
