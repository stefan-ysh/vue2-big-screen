<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <el-form label-width="100px" size="mini">
      <el-form-item label="主标题显示">
        <el-switch v-model="attribute.titleVisible" />
      </el-form-item>
      <el-form-item v-if="attribute.titleVisible" label="主标题">
        <el-input v-model="attribute.chartTitle" />
      </el-form-item>
      <el-form-item v-if="attribute.titleVisible" label="主标题大小">
        <el-input-number
          v-model="attribute.titleFontSize"
          controls-position="right"
          style="width: 100%"
          :min="10"
          :max="50"
        />
      </el-form-item>
      <el-form-item v-if="attribute.titleVisible" label="主标题颜色">
        <BColorPicker :data="attribute" field="titleTextColor" />
      </el-form-item>
      <el-form-item label="副标题">
        <el-input v-model="attribute.subtext" />
      </el-form-item>
      <el-form-item label="副标题大小">
        <el-input-number v-model="attribute.subTitleFontSize" controls-position="right" style="width: 100%" />
      </el-form-item>
      <el-form-item label="副标题颜色">
        <BColorPicker :data="attribute" field="subTitleColor" />
      </el-form-item>
      <el-form-item label="标题位置(X)">
        <el-slider v-model="attribute.titleX" :max="999" />
      </el-form-item>
      <el-form-item label="标题位置(Y)">
        <el-slider v-model="attribute.titleY" :max="500" />
      </el-form-item>
      <el-form-item label="雷达图类型">
        <el-select v-model="attribute.shape" popper-class="big-screen-select">
          <el-option label="圆形" value="circle" />
          <el-option label="菱形" value="polygon" />
        </el-select>
      </el-form-item>
      <el-form-item label="指示器段数">
        <el-input-number v-model="attribute.splitNumber" controls-position="right" style="width: 100%" />
      </el-form-item>
      <el-form-item label="指示器内容">
        <el-input v-model="attribute.indicator" type="textarea" />
      </el-form-item>
      <el-form-item label="指示器文字大小">
        <el-input-number v-model="attribute.axisNameFontSize" style="width: 100%" controls-position="right" />
      </el-form-item>
      <el-form-item label="名称轴距">
        <el-input-number v-model="attribute.nameGap" controls-position="right" style="width: 100%" />
      </el-form-item>
      <el-form-item label="内圈半径">
        <el-slider v-model="attribute.radiusInside" :max="100" />
      </el-form-item>
      <el-form-item label="外圈半径">
        <el-slider v-model="attribute.radiusOutside" :max="100" />
      </el-form-item>
      <el-form-item label="雷达颜色">
        <BColorPicker :data="attribute" field="areaColor" />
      </el-form-item>
      <el-form-item label="雷达透明度">
        <el-slider v-model="attribute.areaOpacity" :step="0.1" :min="0" :max="1" />
      </el-form-item>
      <el-form-item label="图例显示">
        <el-switch v-model="attribute.legendVisible" />
      </el-form-item>
      <!-- <el-form-item label="标题位置(X)">
        <el-input v-model="attribute.titleX" />
      </el-form-item>
      <el-form-item label="标题位置(Y)">
        <el-input v-model="attribute.titleY" />
      </el-form-item>
      <el-form-item label="标题大小">
        <el-input-number
          v-model="attribute.titleFontSize"
          :min="10"
          :max="50"
        />
      </el-form-item>
      <el-form-item label="标题颜色">
        <el-color-picker v-model="attribute.titleTextColor" />
      </el-form-item>
      <el-form-item label="副标题">
        <el-input v-model="attribute.subtext" />
      </el-form-item>
      <el-form-item label="副标题颜色">
        <el-color-picker v-model="attribute.subtextColor" />
      </el-form-item>
      <el-form-item label="图例显示">
        <el-switch
          v-model="attribute.legendShow"
          active-text="开"
          inactive-text="关"
        />
      </el-form-item>
      <div v-show="attribute.legendShow">
        <el-form-item label="图例位置(X)">
          <el-input v-model="attribute.legendX" />
        </el-form-item>
        <el-form-item label="图例位置(Y)">
          <el-input v-model="attribute.legendY" />
        </el-form-item>
        <el-form-item label="雷达图类型">
          <el-select popper-class="big-screen-select" v-model="attribute.shape">
            <el-option label="圆形" value="circle" />
            <el-option label="菱形" value="polygon" />
          </el-select>
        </el-form-item>
        <el-form-item label="图例布局方式">
          <el-select popper-class="big-screen-select" v-model="attribute.orient">
            <el-option label="纵向" value="vertical" />
            <el-option label="横向" value="horizontal" />
          </el-select>
        </el-form-item>
        <el-form-item label="图例字体">
          <el-input-number
            v-model="attribute.legendFontSize"
            :min="2"
            :max="120"
          />
        </el-form-item>
        <el-form-item label="图例文字颜色">
          <el-color-picker v-model="attribute.legendTextColor" />
        </el-form-item>
      </div>
      <el-form-item label="南丁格尔图">
        <el-select popper-class="big-screen-select" v-model="attribute.roseType">
          <el-option label="不展示" value="false" />
          <el-option label="圆心角" value="radius" />
          <el-option label="扇区" value="area" />
        </el-select>
      </el-form-item>
      <el-form-item label="外环大小%">
        <el-input-number
          v-model="attribute.radiusOutside"
          :min="2"
          :max="120"
        />
      </el-form-item>
      <el-form-item label="内环大小%">
        <el-input-number v-model="attribute.radiusInside" :min="0" :max="100" />
      </el-form-item>
      <el-form-item label="圆角">
        <el-slider v-model="attribute.borderRadius" :min="0" :max="120" />
      </el-form-item>
      <el-form-item label="大饼颜色">
        <div>
          <div
            v-for="(item, index) in attribute.pieColor"
            :key="index"
            class="colorBlock"
            :style="{ backgroundColor: item }"
          >
            <div class="delTag" @click="delColor(index)">
              <i class="el-icon-delete" />
            </div>
          </div>
          <el-color-picker v-model="tempColor" show-alpha @change="addColor" />
        </div>
      </el-form-item>
      <el-form-item label="label位置">
        <el-select popper-class="big-screen-select" v-model="attribute.labelPosition">
          <el-option label="内部" value="inside" />
          <el-option label="外侧" value="outside" />
          <el-option label="中心" value="center" />
        </el-select>
      </el-form-item>
      <el-form-item label="label字体">
        <el-input-number
          v-model="attribute.labelFontSize"
          :min="2"
          :max="120"
        />
      </el-form-item>
      <el-form-item label="label颜色">
        <el-color-picker v-model="attribute.labelColor" />
      </el-form-item> -->
    </el-form>
  </div>
</template>
<!-- eslint-disable vue/no-mutating-props -->
<script>
import BColorPicker from '@/components/BColorPicker.vue'
export default {
  name: 'RadarChartSetter',
  components: { BColorPicker },
  props: {
    attribute: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tempColor: ''
    }
  },
  methods: {
    addColor() {
      this.attribute.pieColor.push(this.tempColor)
    },
    delColor(index) {
      this.attribute.pieColor.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.colorBlock {
  float: left;
  width: 25px;
  height: 25px;
  margin-right: 2px;
}
.colorBlock:hover .delTag {
  display: inline-block;
}
.delTag {
  width: 100%;
  height: 100%;
  display: none;
  text-align: center;
  font-size: 18px;
  color: #fff;
}
</style>
