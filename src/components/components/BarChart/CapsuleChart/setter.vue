<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <el-form label-width="100px" size="mini">
      <el-form-item label="图表背景">
        <BColorPicker :data="attribute" field="bgColor" show-alpha />
      </el-form-item>
      <el-form-item label="标题">
        <el-switch v-model="attribute.titleShow" size="mini" />
      </el-form-item>
      <el-form-item v-show="attribute.titleShow" label="标题内容">
        <el-input v-model="attribute.chartTitle" size="mini" />
      </el-form-item>
      <el-form-item v-show="attribute.titleShow" label="标题颜色">
        <BColorPicker :data="attribute" field="titleTextColor" show-alpha />
      </el-form-item>
      <el-form-item v-show="attribute.titleShow" label="标题大小">
        <el-input-number v-model="attribute.titleFontSize" style="width: 100%" controls-position="right" size="mini" />
      </el-form-item>
      <el-form-item v-show="attribute.titleShow" label="标题位置(x)">
        <el-input-number v-model="attribute.titleLeft" style="width: 100%" controls-position="right" size="mini" />
      </el-form-item>
      <el-form-item v-show="attribute.titleShow" label="标题位置(y)">
        <el-input-number v-model="attribute.titleTop" style="width: 100%" controls-position="right" size="mini" />
      </el-form-item>

      <el-form-item label="x轴">
        <el-switch v-model="attribute.xAxisShow" />
      </el-form-item>
      <div v-show="attribute.xAxisShow">
        <el-form-item label="x轴线显示">
          <el-switch v-model="attribute.xAxisLine" />
        </el-form-item>
        <el-form-item v-show="attribute.xAxisLine" label="x轴线颜色">
          <BColorPicker :data="attribute" field="xLineColor" show-alpha />
        </el-form-item>
        <el-form-item label="x轴网格线">
          <el-switch v-model="attribute.xSplitLine" />
        </el-form-item>
        <el-form-item label="x轴刻度线">
          <el-switch v-model="attribute.xAxisTick" />
        </el-form-item>
        <el-form-item label="x轴字体颜色">
          <BColorPicker :data="attribute" field="xLabelColor" show-alpha />
        </el-form-item>
        <el-form-item label="x轴字体大小">
          <el-input-number v-model="attribute.xLabelFontSize" controls-position="right" style="width: 100%" />
        </el-form-item>
        <el-form-item label="x轴字体倾斜">
          <el-slider v-model="attribute.xFontRotate" :min="-180" :max="180" />
        </el-form-item>
      </div>
      <el-form-item label="y轴">
        <el-switch v-model="attribute.yAxisShow" />
      </el-form-item>
      <div v-show="attribute.yAxisShow">
        <el-form-item label="y轴线显示">
          <el-switch v-model="attribute.yAxisLine" />
        </el-form-item>
        <el-form-item v-show="attribute.yAxisLine" label="y轴线颜色">
          <BColorPicker :data="attribute" field="yLineColor" show-alpha />
        </el-form-item>
        <el-form-item label="y轴网格线">
          <el-switch v-model="attribute.ySplitLine" />
        </el-form-item>
        <el-form-item label="y轴刻度线">
          <el-switch v-model="attribute.yAxisTick" />
        </el-form-item>
        <el-form-item label="y轴字体颜色">
          <BColorPicker :data="attribute" field="yLabelColor" show-alpha />
        </el-form-item>
        <el-form-item label="y轴字体大小">
          <el-input-number v-model="attribute.yLabelFontSize" controls-position="right" style="width: 100%" />
        </el-form-item>
        <el-form-item label="y轴字体倾斜">
          <el-slider v-model="attribute.yFontRotate" :min="-180" :max="180" />
        </el-form-item>
      </div>
      <el-form-item label="颜色渐变">
        <el-switch v-model="attribute.gradualColor" />
      </el-form-item>
      <div v-if="attribute.gradualColor">
        <el-form-item label="柱顶颜色">
          <BColorPicker :data="attribute" field="barColor1" show-alpha />
        </el-form-item>
        <el-form-item label="柱中颜色">
          <BColorPicker :data="attribute" field="barColor2" show-alpha />
        </el-form-item>
        <el-form-item label="柱底颜色">
          <BColorPicker :data="attribute" field="barColor3" show-alpha />
        </el-form-item>
      </div>
      <div v-else>
        <el-form-item label="柱体颜色">
          <BColorPicker :data="attribute" field="barColor" show-alpha />
        </el-form-item>
      </div>
      <el-form-item v-show="attribute.barType === 'bar'" label="柱体背景">
        <el-switch v-model="attribute.barBgShow" />
      </el-form-item>
      <el-form-item label="胶囊圆角">
        <el-input-number
          v-model="attribute.capsuleRadius"
          controls-position="right"
          style="width: 100%"
          :min="0"
          :max="50"
        />
      </el-form-item>
      <el-form-item label="胶囊宽度">
        <el-input-number
          v-model="attribute.barWidth"
          controls-position="right"
          style="width: 100%"
          :min="1"
          :max="100"
        />
      </el-form-item>
      <el-form-item label="胶囊背景">
        <el-switch v-model="attribute.showBackground" />
      </el-form-item>
      <el-form-item v-show="attribute.showBackground" label="胶囊背景圆角">
        <el-input-number
          v-model="attribute.capsuleBgRadius"
          controls-position="right"
          style="width: 100%"
          :min="0"
          :max="50"
        />
      </el-form-item>
      <!-- <el-form-item v-show="attribute.showBackground" label="胶囊背景宽度">
        <el-input-number
          v-model="attribute.bgBarWidth"
          controls-position="right"
          style="width: 100%"
          :min="1"
          :max="100"
        />
      </el-form-item> -->
      <el-form-item v-show="attribute.showBackground" label="胶囊背景颜色">
        <BColorPicker :data="attribute" field="capsuleBgColor" show-alpha />
      </el-form-item>
      <el-form-item label="数值显示">
        <el-switch v-model="attribute.barLabelShow" />
      </el-form-item>
      <div v-show="attribute.barLabelShow">
        <el-form-item label="数值字体">
          <el-input-number
            v-model="attribute.barLabelSize"
            controls-position="right"
            style="width: 100%"
            :min="2"
            :max="100"
          />
        </el-form-item>
        <el-form-item label="数值颜色">
          <BColorPicker :data="attribute" field="barLabelColor" show-alpha />
        </el-form-item>
      </div>
      <el-form-item label="0~40%">
        <BColorPicker :data="attribute" field="weakColor" show-alpha />
      </el-form-item>
      <el-form-item label="40%~70%">
        <BColorPicker :data="attribute" field="mediumColor" show-alpha />
      </el-form-item>
      <el-form-item label="70%~100%">
        <BColorPicker :data="attribute" field="strongColor" show-alpha />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import BColorPicker from '@/components/BColorPicker.vue'
export default {
  name: 'CapsuleChartSetter',
  components: { BColorPicker },
  props: {
    attribute: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
