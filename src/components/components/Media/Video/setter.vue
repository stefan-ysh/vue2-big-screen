<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <el-form label-width="90px" size="mini">
      <el-form-item label="视频地址">
        <el-input v-model="attribute.videoUrl" />
      </el-form-item>
      <el-form-item label="控制器">
        <el-switch v-model="attribute.isShowControls" :active-value="true" :inactive-value="false" />
      </el-form-item>
      <el-form-item label="自动播放">
        <el-switch v-model="attribute.autoplay" :active-value="true" :inactive-value="false" />
      </el-form-item>
      <el-form-item label="是否循环">
        <el-switch v-model="attribute.isLoop" :active-value="true" :inactive-value="false" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'BVideoSetter',
  props: {
    attribute: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      textFamilyList: ['微软雅黑', '黑体', '宋体', '仿宋', '楷体', '华文宋体'],
      textDecorationList: [
        { label: '无', value: 'none' },
        { label: '下划线', value: 'underline' },
        { label: '上划线', value: 'overline' },
        { label: '穿过文字', value: 'line-through' },
        { label: '闪烁(存在兼容问题)', value: 'blink' }
      ]
    }
  }
}
</script>

<style scoped></style>
