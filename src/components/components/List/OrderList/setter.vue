<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-form label-width="80px" size="mini">
    <!-- <el-form-item label="序号类型">
      <el-select
        v-model="attribute.listStyle"
        style="width: 100%"
        popper-class="big-screen-select"
      >
        <el-option
          v-for="item in listStyleOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :title="item.label"
        />
      </el-select>
    </el-form-item>
    <el-form-item v-show="attribute.listStyle !== 'none'" label="序号颜色">
      <BColorPicker field="indexColor" :data="attribute" />
    </el-form-item> -->
    <el-form-item label="显示序号">
      <el-switch v-model="attribute.showIndex" />
    </el-form-item>
    <el-form-item label="圆角">
      <el-input-number
        v-model="attribute.borderTopRightRadius"
        style="width: 100%"
        controls-position="right"
        :min="0"
      />
      <el-input-number
        v-model="attribute.borderBottomRightRadius"
        style="width: 100%"
        controls-position="right"
        :min="0"
      />
      <el-input-number
        v-model="attribute.borderBottomLeftRadius"
        style="width: 100%"
        controls-position="right"
        :min="0"
      />
      <el-input-number v-model="attribute.borderTopLeftRadius" style="width: 100%" controls-position="right" :min="0" />
    </el-form-item>
    <el-form-item label="整体背景色">
      <BColorPicker field="olBgColor" :data="attribute" />
    </el-form-item>
    <el-form-item label="奇数行背景">
      <BColorPicker field="liOddBgColor" :data="attribute" />
    </el-form-item>
    <el-form-item label="偶数行背景">
      <BColorPicker field="liEvenBgColor" :data="attribute" />
    </el-form-item>
    <el-form-item label="字体">
      <el-select v-model="attribute.textFamily" popper-class="big-screen-select">
        <el-option v-for="(item, index) in textFamilyList" :key="index + item" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="字体大小">
      <el-input-number v-model="attribute.fontSize" style="width: 100%" controls-position="right" :min="1" />
    </el-form-item>
    <el-form-item label="字重">
      <el-select v-model="attribute.fontWeight" style="width: 100%">
        <el-option label="细" value="lighter" />
        <el-option label="正常" value="normal" />
        <el-option label="加粗" value="bold" />
      </el-select>
    </el-form-item>
    <el-form-item label="字体颜色">
      <BColorPicker field="textColor" :data="attribute" />
    </el-form-item>
    <el-form-item label="对齐方式">
      <el-select v-model="attribute.textAlign">
        <el-option value="left" label="左对齐" />
        <el-option value="center" label="居中" />
        <el-option value="right" label="右对齐" />
      </el-select>
    </el-form-item>
    <el-form-item label="列表项高度">
      <el-input-number v-model="attribute.liHeight" style="width: 100%" controls-position="right" :min="1" />
    </el-form-item>
    <el-form-item label="内边距">
      <el-input-number v-model="attribute.paddingTop" style="width: 100%" controls-position="right" :min="0" />
      <el-input-number v-model="attribute.paddingRight" style="width: 100%" controls-position="right" :min="0" />
      <el-input-number v-model="attribute.paddingBottom" style="width: 100%" controls-position="right" :min="0" />
      <el-input-number v-model="attribute.paddingLeft" style="width: 100%" controls-position="right" :min="0" />
    </el-form-item>
    <el-form-item label="外边距">
      <el-input-number v-model="attribute.marginTop" style="width: 100%" controls-position="right" />
      <el-input-number v-model="attribute.marginRight" style="width: 100%" controls-position="right" />
      <el-input-number v-model="attribute.marginBottom" style="width: 100%" controls-position="right" />
      <el-input-number v-model="attribute.marginLeft" style="width: 100%" controls-position="right" />
    </el-form-item>
  </el-form>
</template>

<script>
import BColorPicker from '@/components/BColorPicker.vue'
export default {
  name: 'OListSetter',
  components: { BColorPicker },
  props: { attribute: { type: Object, default: () => {} } },
  data() {
    return {
      textFamilyList: ['微软雅黑', '黑体', '宋体', '仿宋', '楷体', '华文宋体', '优设标题黑', 'SourceHanSans-Medium'],
      listStyleOptions: Object.freeze([
        {
          value: 'none',
          label: '无序号'
        },
        {
          value: 'decimal',
          label: '数字'
        },
        {
          value: 'disc',
          label: '实心圆'
        },
        {
          value: 'circle',
          label: '空心圆'
        },
        {
          value: 'lower-roman',
          label: '小写罗马数字'
        },
        {
          value: 'upper-roman',
          label: '大写罗马数字'
        },
        {
          value: 'lower-greek',
          label: '小写希腊字母'
        },
        {
          value: 'armenian',
          label: '亚美尼亚字符'
        },
        {
          value: 'georgian',
          label: '格鲁吉亚字符'
        }
      ])
    }
  }
}
</script>

<style scoped></style>
