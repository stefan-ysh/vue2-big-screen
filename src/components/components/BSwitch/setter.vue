<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <el-form label-width="80px" size="mini">
      <el-form-item label="禁用">
        <el-switch v-model="attribute.disabled" />
      </el-form-item>
      <el-form-item label="开启颜色">
        <BColorPicker field="activeColor" :data="attribute" />
      </el-form-item>
      <el-form-item label="关闭颜色">
        <BColorPicker field="inActiveColor" :data="attribute" />
      </el-form-item>
      <el-form-item label="开关宽度">
        <el-input-number
          v-model="attribute.width"
          controls-position="right"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="开启文字">
        <el-input v-model="attribute.activeText" style="width: 100%" />
      </el-form-item>
      <el-form-item label="关闭文字">
        <el-input v-model="attribute.inActiveText" style="width: 100%" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import BColorPicker from '@/components/BColorPicker.vue';
export default {
  name: 'BSwitchSetter',
  components: {
    BColorPicker
  },
  props: { attribute: { type: Object, default: () => {} }},
  data() {
    return {}
  },
  computed: {
    componentList() {
      return this.$store.state.bigScreen.componentList
    },
  },
  methods: {
    addRow() {
      // eslint-disable-next-line vue/no-mutating-props
      this.attribute.eventList.push({})
    },
  }
}
</script>

<style scoped lang="less">
.event-wrap {
  .el-row {
    font-size: 12px !important;
    .el-col {
      margin-top: 10px;
    }
  }

  /deep/ .el-form-item__content {
    margin-left: 0 !important;
  }
}
</style>
