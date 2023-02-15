<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-form label-width="100px" size="mini">
    <el-form-item label="背景色">
      <BColorPicker :data="attribute" field="bgColor" show-alpha />
    </el-form-item>
    <el-form-item label="渐变背景色">
      <el-switch v-model="attribute.gradient" />
    </el-form-item>
    <el-form-item v-if="attribute.gradient" label="渐变颜色">
      <div>
        <div
          v-for="(item, index) in attribute.gradientColors"
          :key="index"
          class="color-block"
          :style="{ backgroundColor: item }"
        >
          <div class="del-btn" @click="delColor(index)">
            <i class="el-icon-delete" />
          </div>
        </div>
        <el-color-picker v-model="tempColor" show-alpha @change="addColor" />
      </div>
    </el-form-item>
    <el-form-item v-if="attribute.gradient" label="渐变方向">
      <el-select v-model="attribute.gradientDirection">
        <el-option value="to top" label="向上" />
        <el-option value="to bottom" label="向下" />
        <el-option value="to left" label="向左" />
        <el-option value="to right" label="向右" />
      </el-select>
    </el-form-item>
    <el-form-item v-if="attribute.gradient" label="渐变占比">
      <div v-for="(item, index) in attribute.gradientPercentage" :key="index">
        <el-slider v-model="attribute.gradientPercentage[index]" />
      </div>
    </el-form-item>
    <el-form-item label="边框类型">
      <el-select v-model="attribute.borderTopStyle">
        <el-option v-for="opt in borderStyles" :key="opt.value" :value="opt.value" :label="opt.label" />
      </el-select>
      <el-select v-model="attribute.borderRightStyle">
        <el-option v-for="opt in borderStyles" :key="opt.value" :value="opt.value" :label="opt.label" />
      </el-select>
      <el-select v-model="attribute.borderBottomStyle">
        <el-option v-for="opt in borderStyles" :key="opt.value" :value="opt.value" :label="opt.label" />
      </el-select>
      <el-select v-model="attribute.borderLeftStyle">
        <el-option v-for="opt in borderStyles" :key="opt.value" :value="opt.value" :label="opt.label" />
      </el-select>
    </el-form-item>
    <el-form-item label="边框颜色">
      <BColorPicker :data="attribute" field="borderTopColor" show-alpha />
      <BColorPicker :data="attribute" field="borderRightColor" show-alpha />
      <BColorPicker :data="attribute" field="borderBottomColor" show-alpha />
      <BColorPicker :data="attribute" field="borderLeftColor" show-alpha />
    </el-form-item>
    <el-form-item label="边框宽度">
      <el-input-number v-model="attribute.borderTopWidth" style="width: 100%" :min="0" :max="100" />
      <el-input-number v-model="attribute.borderRightWidth" style="width: 100%" :max="100" />
      <el-input-number v-model="attribute.borderBottomWidth" style="width: 100%" :max="100" />
      <el-input-number v-model="attribute.borderLeftWidth" style="width: 100%" :max="100" />
    </el-form-item>
    <el-form-item label="圆角">
      <el-input-number v-model="attribute.topRightRadius" style="width: 100%" :min="0" />
      <el-input-number v-model="attribute.bottomRightRadius" style="width: 100%" :min="0" />
      <el-input-number v-model="attribute.topLeftRadius" style="width: 100%" :min="0" />
      <el-input-number v-model="attribute.bottomLeftRadius" style="width: 100%" :min="0" />
    </el-form-item>
    <el-form-item label="阴影">
      <el-switch v-model="attribute.boxShadow" />
    </el-form-item>
    <el-form-item v-show="attribute.boxShadow" label="x偏移量">
      <el-input-number v-model="attribute.offsetX" controls-position="right" style="width: 100%" />
    </el-form-item>
    <el-form-item v-show="attribute.boxShadow" label="y偏移量">
      <el-input-number v-model="attribute.offsetY" controls-position="right" style="width: 100%" />
    </el-form-item>
    <el-form-item v-show="attribute.boxShadow" label="模糊半径">
      <el-input-number v-model="attribute.blurRadius" controls-position="right" style="width: 100%" :min="0" />
    </el-form-item>
    <el-form-item v-show="attribute.boxShadow" label="扩散半径">
      <el-input-number v-model="attribute.spreadRadius" controls-position="right" style="width: 100%" />
    </el-form-item>
    <el-form-item v-show="attribute.boxShadow" label="阴影颜色">
      <BColorPicker :data="attribute" field="boxShadowColor" show-alpha />
    </el-form-item>
  </el-form>
</template>

<script>
/*eslint-disable */
import BColorPicker from '@/components/BColorPicker.vue'
export default {
  name: 'BCDivSetter',
  components: { BColorPicker },
  props: { attribute: { type: Object, default: () => {} } },
  data() {
    return {
      borderStyles: [
        {
          label: '隐藏',
          value: 'hidden'
        },
        {
          label: '点状虚线',
          value: 'dotted'
        },
        {
          label: '虚线',
          value: 'dashed'
        },
        {
          label: '实线',
          value: 'solid'
        },
        {
          label: '双实线',
          value: 'double'
        },
        {
          label: '3D 凹槽边框',
          value: 'groove'
        },
        {
          label: '3D 垄状边框',
          value: 'ridge'
        },
        {
          label: '3D 嵌入边框',
          value: 'inset'
        },
        {
          label: '3D 突出边框',
          value: 'outset'
        }
      ],
      tempColor: ''
    }
  },
  methods: {
    addColor() {
      this.attribute.gradientColors.push(this.tempColor)
      this.attribute.gradientPercentage.push(100)
    },
    delColor(index) {
      this.attribute.gradientColors.splice(index, 1)
      this.attribute.gradientPercentage.splice(index, 1)
      if (this.attribute.gradientColors.length <= 1) {
        this.attribute.gradient = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.color-block {
  float: left;
  width: 25px;
  height: 25px;
  margin-right: 2px;
}

.del-btn {
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: none;
  text-align: center;
  font-size: 18px;
  color: #fff;
}

.color-block:hover {
  .del-btn {
    display: block;
  }
}
</style>
