<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <el-form label-width="100px" size="mini">
      <el-form-item label="标题">
        <el-input v-model="attribute.chartTitle" />
      </el-form-item>
      <el-form-item label="标题位置(X)">
        <el-input-number v-model="attribute.titleX" style="width: 100%" controls-position="right" />
      </el-form-item>
      <el-form-item label="标题位置(Y)">
        <el-input-number v-model="attribute.titleY" style="width: 100%" controls-position="right" />
      </el-form-item>
      <el-form-item label="标题大小">
        <el-input-number
          v-model="attribute.titleFontSize"
          controls-position="right"
          style="width: 100%"
          :min="10"
          :max="50"
        />
      </el-form-item>
      <el-form-item label="标题颜色">
        <BColorPicker :data="attribute" field="titleTextColor" />
      </el-form-item>
      <el-form-item label="副标题">
        <el-input v-model="attribute.subtext" />
      </el-form-item>
      <el-form-item label="副标题颜色">
        <BColorPicker :data="attribute" field="subtextColor" />
      </el-form-item>
      <el-form-item label="图例显示">
        <el-switch v-model="attribute.legendShow" active-text="开" inactive-text="关" />
      </el-form-item>
      <div v-show="attribute.legendShow">
        <el-form-item label="图例位置(X)">
          <el-input v-model="attribute.legendX" />
        </el-form-item>
        <el-form-item label="图例位置(Y)">
          <el-input v-model="attribute.legendY" />
        </el-form-item>
        <el-form-item label="图例布局方式">
          <el-select v-model="attribute.orient" popper-class="big-screen-select">
            <el-option label="纵向" value="vertical" />
            <el-option label="横向" value="horizontal" />
          </el-select>
        </el-form-item>
        <el-form-item label="图例字体">
          <el-input-number
            v-model="attribute.legendFontSize"
            controls-position="right"
            style="width: 100%"
            :min="2"
            :max="120"
          />
        </el-form-item>
        <el-form-item label="图例文字颜色">
          <BColorPicker :data="attribute" field="legendTextColor" />
        </el-form-item>
      </div>
      <el-form-item label="玫瑰图">
        <el-select v-model="attribute.roseType" popper-class="big-screen-select">
          <el-option label="不展示" value="false" />
          <el-option label="圆心角" value="radius" />
          <el-option label="扇区" value="area" />
        </el-select>
      </el-form-item>
      <el-form-item label="外环大小%">
        <el-input-number
          v-model="attribute.radiusOutside"
          controls-position="right"
          style="width: 100%"
          :min="2"
          :max="120"
        />
      </el-form-item>
      <el-form-item label="内环大小%">
        <el-input-number
          v-model="attribute.radiusInside"
          controls-position="right"
          style="width: 100%"
          :min="0"
          :max="100"
        />
      </el-form-item>
      <el-form-item label="圆角">
        <el-slider v-model="attribute.borderRadius" :min="0" />
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
      <el-form-item label="标签位置">
        <el-select v-model="attribute.labelPosition" popper-class="big-screen-select">
          <el-option label="内部" value="inside" />
          <el-option label="外侧" value="outside" />
          <el-option label="中心" value="center" />
        </el-select>
      </el-form-item>
      <el-form-item label="标签字体">
        <el-input-number
          v-model="attribute.labelFontSize"
          controls-position="right"
          style="width: 100%"
          :min="2"
          :max="120"
        />
      </el-form-item>
      <el-form-item label="标签颜色">
        <BColorPicker :data="attribute" field="labelColor" />
      </el-form-item>
    </el-form>
  </div>
</template>
<!-- eslint-disable vue/no-mutating-props -->
<script>
import BColorPicker from '@/components/BColorPicker.vue'
export default {
  name: 'PieSetter',
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
