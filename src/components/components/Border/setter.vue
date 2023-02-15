<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-form label-width="80px" size="mini">
    <el-form-item label="边框样式">
      <el-select v-model="attribute.borderType" style="width: 100%" popper-class="big-screen-select">
        <el-option
          v-for="item in borderTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :title="item.label"
          style="height: 100%; margin-top: 10px; padding-top: 10px; padding-bottom: 10px; text-align: center"
        >
          <img :src="item.img" />
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="边框颜色1">
      <BColorPicker field="borderColor1" :data="attribute" />
    </el-form-item>
    <el-form-item label="边框颜色2">
      <BColorPicker field="borderColor2" :data="attribute" />
    </el-form-item>
    <el-form-item label="背景颜色">
      <BColorPicker field="backgroundColor" :data="attribute" />
    </el-form-item>
    <div v-if="attribute.borderType === 'dv-border-box-8'">
      <el-form-item label="动画时长">
        <el-input-number v-model="attribute.dur" style="width: 100%" controls-position="right" :min="1" :max="60" />
      </el-form-item>
    </div>
    <!-- 类型 8 5 4 的边框可以设置翻转属性 -->
    <div v-if="['dv-border-box-8', 'dv-border-box-5', 'dv-border-box-4'].includes(attribute.borderType)">
      <el-form-item label="方向翻转">
        <el-switch v-model="attribute.reverse" />
      </el-form-item>
    </div>
    <div v-if="attribute.borderType === 'dv-border-box-11'">
      <el-form-item label="标题文字">
        <el-input v-model="attribute.borderTitle" />
      </el-form-item>
      <el-form-item label="标题宽度">
        <el-input-number v-model="attribute.titleWidth" style="width: 100%" controls-position="right" :min="10" />
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import BColorPicker from '@/components/BColorPicker.vue'
export default {
  name: 'BorderSetter',
  components: { BColorPicker },
  props: { attribute: { type: Object, default: () => {} } },
  data() {
    return {
      borderTypes: Object.freeze([
        {
          value: 'dv-border-box-1',
          img: require('@/assets/images/cpt-images/border1.png'),
          label: '边框 1'
        },
        {
          value: 'dv-border-box-2',
          img: require('@/assets/images/cpt-images/border2.png'),
          label: '边框 2'
        },
        {
          value: 'dv-border-box-3',
          img: require('@/assets/images/cpt-images/border3.png'),
          label: '边框 3'
        },
        {
          value: 'dv-border-box-4',
          img: require('@/assets/images/cpt-images/border4.png'),
          label: '边框 4'
        },
        {
          value: 'dv-border-box-5',
          img: require('@/assets/images/cpt-images/border5.png'),
          label: '边框 5'
        },
        {
          value: 'dv-border-box-6',
          img: require('@/assets/images/cpt-images/border6.png'),
          label: '边框 6'
        },
        {
          value: 'dv-border-box-7',
          img: require('@/assets/images/cpt-images/border7.png'),
          label: '边框 7'
        },
        {
          value: 'dv-border-box-8',
          img: require('@/assets/images/cpt-images/border8.png'),
          label: '边框 8'
        },
        {
          value: 'dv-border-box-9',
          img: require('@/assets/images/cpt-images/border9.png'),
          label: '边框 9'
        },
        {
          value: 'dv-border-box-10',
          img: require('@/assets/images/cpt-images/border10.png'),
          label: '边框 10'
        },
        {
          value: 'dv-border-box-11',
          img: require('@/assets/images/cpt-images/border11.png'),
          label: '边框 11'
        },
        {
          value: 'dv-border-box-12',
          img: require('@/assets/images/cpt-images/border12.png'),
          label: '边框 12'
        },
        {
          value: 'dv-border-box-13',
          img: require('@/assets/images/cpt-images/border13.png'),
          label: '边框 13'
        }
      ])
    }
  }
}
</script>

<style scoped></style>
