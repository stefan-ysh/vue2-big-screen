<template>
  <div class="custom-form" :style="{ height: windowHeight - 140 + 'px' }">
    <el-form label-width="60px" size="mini">
      <el-form-item label="图层名称" class="mt5">
        <el-row>
          <el-col :span="24">
            <el-input
              v-model="currentCpt.layerName"
              style="width: 100%"
              size="mini"
            />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="隐藏" class="mt5">
        <span slot="label">
          隐藏
          <el-tooltip
            class="item"
            effect="dark"
            content="隐藏的组件在画布中的透明度更低，并且不会显示在预览界面"
            placement="bottom"
          >
            <i class="el-icon-info" />
          </el-tooltip>
        </span>
        <el-row>
          <el-col :span="24">
            <el-switch
              v-model="currentCpt.hidden"
              :active-value="true"
              :inactive-value="false"
              size="mini"
            />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="尺寸" class="mt5">
        <el-row>
          <el-col :span="11">
            <el-input-number
              v-model="currentCpt.cptWidth"
              controls-position="right"
              :min="20"
              :max="2000"
              size="mini"
              style="width: 100%"
            /></el-col>
          <el-col :span="2" style="text-align: center; color: #fff"> x </el-col>
          <el-col :span="11">
            <el-input-number
              v-model="currentCpt.cptHeight"
              controls-position="right"
              :min="20"
              :max="1500"
              size="mini"
              style="width: 100%"
            /></el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="坐标" style="color: #fff">
        <span slot="label">
          坐标
          <el-tooltip
            class="item"
            effect="dark"
            content="x,y 分别为组件的横纵坐标值，z 值为当前组件的纵深，即 css 中的 z-index"
            placement="bottom"
          >
            <i class="el-icon-info" />
          </el-tooltip>
        </span>
        <el-row class="mb5">
          <el-col :span="4">x</el-col>
          <el-col :span="20">
            <el-input-number
              v-model="currentCpt.cptX"
              controls-position="right"
              :min="-500"
              :max="2500"
              size="mini"
              style="width: 100%"
            />
          </el-col>
        </el-row>
        <el-row class="mb5">
          <el-col :span="4">y</el-col>
          <el-col :span="20">
            <el-input-number
              v-model="currentCpt.cptY"
              controls-position="right"
              :min="-500"
              size="mini"
              style="width: 100%"
            />
          </el-col>
        </el-row>
        <el-row class="mb5">
          <el-col :span="4">z</el-col>
          <el-col :span="20">
            <el-input-number
              v-model="currentCpt.cptZ"
              controls-position="right"
              :min="1"
              :max="1800"
              size="mini"
              style="width: 100%"
            />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="旋转" style="color: #fff">
        <span slot="label">
          旋转
          <el-tooltip
            class="item"
            effect="dark"
            content="组件的旋转角度，分别以x，y，z轴为中心旋转的角度值"
            placement="bottom"
          >
            <i class="el-icon-info" />
          </el-tooltip>
        </span>
        <el-row class="mb5">
          <el-col :span="4">x</el-col>
          <el-col :span="20">
            <el-slider
              v-model="currentCpt.rotateX"
              size="mini"
              style="width: 100%"
            />
          </el-col>
        </el-row>
        <el-row class="mb5">
          <el-col :span="4">y</el-col>
          <el-col :span="20">
            <el-slider
              v-model="currentCpt.rotateY"
              size="mini"
              style="width: 100%"
            />
          </el-col>
        </el-row>
        <el-row class="mb5">
          <el-col :span="4">z</el-col>
          <el-col :span="20">
            <el-slider
              v-model="currentCpt.rotateZ"
              size="mini"
              style="width: 100%"
            />
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CptBaseConfig',
  data () {
    return {

    }
  },
  computed: {
    windowHeight () {
      return this.$store.state.bigScreen.windowHeight
    },
    currentCpt () {
      return this.$store.state.bigScreen.curComponent
    }
    // currentCpt: {
    //   get() {
    //     return this.$store.state.bigScreen.curComponent
    //   },
    //   set(val) {

    //   }
    // }
  }
}
</script>

<style lang="less" scoped>
.custom-form {
  padding: 10px;
  overflow-y: auto;
  background: #2b3340;
  // .cur-cpt-title {
  //   margin-bottom: 10px;
  //   font-size: 12px;
  //   &-content {
  //     text-align: center;
  //   }
  // }
}
</style>
