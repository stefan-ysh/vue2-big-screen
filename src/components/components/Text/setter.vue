<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <el-form label-width="90px" size="mini">
      <el-form-item label="字体">
        <el-select v-model="attribute.textFamily" popper-class="big-screen-select">
          <el-option
            v-for="(item, index) in textFamilyList"
            :key="index + item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="颜色">
        <BColorPicker :data="attribute" field="textColor" show-alpha />
      </el-form-item>
      <el-form-item label="加粗">
        <el-select v-model="attribute.fontWeight" popper-class="big-screen-select">
          <el-option label="更细" value="lighter" />
          <el-option label="正常" value="normal" />
          <el-option label="加粗" value="bold" />
          <!-- <el-option label="更粗(存在兼容问题)" value="bolder" /> -->
        </el-select>
      </el-form-item>
      <el-form-item label="倾斜">
        <el-select v-model="attribute.fontStyle" popper-class="big-screen-select">
          <el-option label="正常" value="normal" />
          <el-option label="斜体" value="italic" />
          <!-- <el-option label="倾斜" value="oblique" /> -->
        </el-select>
      </el-form-item>
      <el-form-item label="背景色">
        <BColorPicker :data="attribute" field="bgColor" show-alpha />
      </el-form-item>
      <el-form-item label="文字大小">
        <el-input-number
          v-model="attribute.textSize"
          controls-position="right"
          :min="13"
          :max="200"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="行高">
        <el-input-number
          v-model="attribute.textLineHeight"
          controls-position="right"
          :min="13"
          :max="250"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="对齐方式">
        <el-select v-model="attribute.textAlign" popper-class="big-screen-select">
          <el-option label="左" value="left" />
          <el-option label="中" value="center" />
          <el-option label="右" value="right" />
        </el-select>
      </el-form-item>
      <el-form-item label="下划线">
        <el-select v-model="attribute.textDecoration" popper-class="big-screen-select">
          <el-option
            v-for="(item, index) in textDecorationList"
            :key="index + item.label"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <span slot="label">
          点击跳转
          <el-tooltip
            effect="light"
            content="跳转至外部链接请填写完整路径，如：https://www.baidu.com"
            placement="bottom-end"
          >
            <i class="el-icon-warning" />
          </el-tooltip>
        </span>
        <el-input v-model="attribute.url" type="textarea" :rows="3" />
      </el-form-item>
      <el-form-item label="内边距">
        <el-input-number
          v-model="attribute.paddingTop"
          style="width: 100%"
          :min="0"
        />
        <el-input-number
          v-model="attribute.paddingRight"
          style="width: 100%"
        />
        <el-input-number
          v-model="attribute.paddingBottom"
          style="width: 100%"
        />
        <el-input-number
          v-model="attribute.paddingLeft"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="阴影">
        <el-switch v-model="attribute.textShadow" />
      </el-form-item>
      <el-form-item v-show="attribute.textShadow" label="x偏移量">
        <el-input-number
          v-model="attribute.offsetX"
          controls-position="right"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item v-show="attribute.textShadow" label="y偏移量">
        <el-input-number
          v-model="attribute.offsetY"
          controls-position="right"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item v-show="attribute.textShadow" label="模糊半径">
        <el-input-number
          v-model="attribute.blurRadius"
          controls-position="right"
          style="width: 100%"
          :min="0"
        />
      </el-form-item>
      <el-form-item v-show="attribute.textShadow" label="阴影颜色">
        <BColorPicker :data="attribute" field="textShadowColor" show-alpha />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import BColorPicker from '@/components/BColorPicker.vue'
export default {
  name: 'BTextSetter',
  components: { BColorPicker },
  props: {
    attribute: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      textFamilyList: ['微软雅黑', '黑体', '宋体', '仿宋', '楷体', '华文宋体', '优设标题黑', 'SourceHanSans-Medium'],
      textDecorationList: [
        { label: '无', value: 'none' },
        { label: '下划线', value: 'underline' },
        { label: '上划线', value: 'overline' },
        { label: '穿过文字', value: 'line-through' }
        // { label: '闪烁(存在兼容问题)', value: 'blink' }
      ]
    }
  }
}
</script>

<style scoped></style>
