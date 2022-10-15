<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-form label-width="100px" size="mini">
    <el-form-item label="地图">
      <el-select v-model="attribute.map">
        <el-option label="全国" value="china" />
        <el-option label="常州" value="changZhou" />
      </el-select>
    </el-form-item>
    <el-form-item label="标题">
      <el-input v-model="attribute.titleText" />
    </el-form-item>
    <el-form-item label="标题颜色">
      <BColorPicker :data="attribute" field="titleColor" show-alpha />
    </el-form-item>
    <el-form-item label="标题大小">
      <el-input-number v-model="attribute.titleFontSize" :min="4" :max="100" />
    </el-form-item>
    <el-form-item label="副标题">
      <el-input v-model="attribute.subtext" />
    </el-form-item>
    <el-form-item label="副标题颜色">
      <BColorPicker :data="attribute" field="subTitleColor" show-alpha />
    </el-form-item>
    <el-form-item label="副标题大小">
      <el-input-number
        v-model="attribute.subTitleFontSize"
        :min="4"
        :max="100"
      />
    </el-form-item>
    <el-form-item label="标题位置(左)">
      <el-input v-model="attribute.titleLeft" />
    </el-form-item>
    <el-form-item label="标题位置(上)">
      <el-input v-model="attribute.titleTop" />
    </el-form-item>
    <el-form-item label="说明">
      <el-input v-model="attribute.seriesName" />
    </el-form-item>
    <el-form-item label="地图字颜色">
      <BColorPicker :data="attribute" field="geoLabelColor" show-alpha />
    </el-form-item>
    <el-form-item label="地图字大小">
      <el-input-number v-model="attribute.geoLabelSize" :min="4" :max="100" />
    </el-form-item>
    <el-form-item label="允许缩放">
      <el-switch v-model="attribute.roam" active-text="开" inactive-text="关" />
    </el-form-item>
    <el-form-item label=">100文字">
      <el-input v-model="attribute.piecesLabel1" />
    </el-form-item>
    <el-form-item label=">100颜色">
      <BColorPicker :data="attribute" field="piecesColor1" show-alpha />
    </el-form-item>
    <el-form-item label="10 - 100文字">
      <el-input v-model="attribute.piecesLabel2" />
    </el-form-item>
    <el-form-item label="10-100颜色">
      <BColorPicker :data="attribute" field="piecesColor2" show-alpha />
    </el-form-item>
    <el-form-item label="1-9文字">
      <el-input v-model="attribute.piecesLabel3" />
    </el-form-item>
    <el-form-item label="1-9颜色">
      <BColorPicker :data="attribute" field="piecesColor3" show-alpha />
    </el-form-item>
    <el-form-item label="0-1文字">
      <el-input v-model="attribute.piecesLabel4" />
    </el-form-item>
    <el-form-item label="0-1颜色">
      <BColorPicker :data="attribute" field="piecesColor4" show-alpha />
    </el-form-item>
    <el-form-item label="0文字">
      <el-input v-model="attribute.piecesLabel5" />
    </el-form-item>
    <el-form-item label="0颜色">
      <BColorPicker :data="attribute" field="piecesColor5" show-alpha />
    </el-form-item>
  </el-form>
</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
import BColorPicker from '@/components/BColorPicker.vue'
export default {
  name: 'MapGcSetter',
  components: { BColorPicker },
  props: { attribute: Object }
}
</script>

<style scoped></style>
