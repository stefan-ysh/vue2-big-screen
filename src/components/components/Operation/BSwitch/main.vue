<template>
  <div :id="uuid" class="b-switch-wrap" style="width: 100%; height: 100%">
    <el-switch
      v-model="value"
      :active-color="configProps.attribute.activeColor"
      :inactive-color="configProps.attribute.inActiveColor"
      :width="configProps.attribute.width"
      :disabled="configProps.attribute.disabled"
      :style="{ width: '100%', height: '100%' }"
      @change="handleSwitch"
    />
  </div>
</template>
<script>
export default {
  name: 'BSwitch',
  props: {
    configProps: { type: Object, default: () => {} }
  },
  data() {
    return {
      value: false,
      uuid: null
    }
  },
  created() {
    this.uuid = require('uuid').v1()
  },
  methods: {
    handleSwitch(val) {
      console.log('[ val ] >', val)
    },
    handleClickUrl() {
      if (this.configProps.attribute.url) {
        if (this.configProps.attribute.url.startsWith('view')) {
          // 跳转到其他大屏
          // this.$router.push(xxx)
          this.$emit('reload')
        } else {
          // 跳到其他外部链接
          window.open(this.configProps.attribute.url)
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.b-switch-wrap {
  padding: 50px;
  /deep/ .el-switch__core {
    // width: 100% !important;
    // height: 100%;
    // border-radius: 50%;
    &::after{
      width: auto;
      height: 100%;
      aspect-ratio: 1/1;
    }
  }
}
</style>
