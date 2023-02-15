<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div style="position: relative">
    <el-form label-width="100px" size="mini">
      <el-form-item label="奇数行背景色">
        <BColorPicker :data="attribute" field="oddRowBGC" show-alpha />
      </el-form-item>
      <el-form-item label="偶数行背景色">
        <BColorPicker :data="attribute" field="evenRowBGC" show-alpha />
      </el-form-item>
      <el-form-item label="显示行数">
        <el-input-number controls-position="right" style="width: 100%" field="rowNum" :min="1" :max="60" />
      </el-form-item>
      <el-form-item label="对齐方式">
        <el-select v-model="attribute.textAlign" popper-class="big-screen-select">
          <el-option label="左" value="left" />
          <el-option label="中" value="center" />
          <el-option label="右" value="right" />
        </el-select>
      </el-form-item>
      <el-form-item label="悬浮暂停轮播">
        <el-switch v-model="attribute.hoverPause" />
      </el-form-item>
      <el-form-item label="轮播间隔(s)">
        <el-input-number controls-position="right" style="width: 100%" field="waitTime" :min="0" :max="100" :step="1" />
      </el-form-item>
      <el-form-item label="显示表头">
        <el-switch v-model="attribute.hasHeader" />
      </el-form-item>
      <el-form-item v-show="attribute.hasHeader" label="表头高度">
        <el-input-number controls-position="right" style="width: 100%" field="headerHeight" :min="5" :max="1000" />
      </el-form-item>
      <el-form-item v-show="attribute.hasHeader" label="表头背景色">
        <BColorPicker :data="attribute" field="headerBGC" show-alpha />
      </el-form-item>
      <el-form-item v-show="attribute.hasHeader" label="表头内容">
        <el-input v-model="attribute.columns" type="textarea" :rows="10" />
      </el-form-item>
      <el-form-item label="显示序号">
        <el-switch v-model="attribute.index" />
      </el-form-item>
      <el-form-item v-show="attribute.index && attribute.hasHeader" label="序号名称">
        <el-input v-model="attribute.indexHeader" />
      </el-form-item>
      <el-form-item label="滚动方式">
        <el-select v-model="attribute.carousel" placeholder="请选择" popper-class="big-screen-select">
          <el-option label="单列滚动" value="single" />
          <el-option label="全表滚动" value="page" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import BColorPicker from '@/components/BColorPicker.vue'
export default {
  name: 'ScrollTableSetter',
  components: { BColorPicker },
  props: { attribute: { type: Object, default: () => {} } }
}
</script>

<style scoped></style>
