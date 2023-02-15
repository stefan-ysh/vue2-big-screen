<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-form label-width="100px" size="mini">
    <el-form-item label="边框粗细">
      <el-input-number v-model="attribute.lineWidth" size="mini" style="width: 100%" controls-position="right" :min="1" :max="100" />
    </el-form-item>
    <el-form-item label="半径">
      <el-input-number v-model="attribute.radius" size="mini" style="width: 100%" controls-position="right" :min="1" :max="500" />
    </el-form-item>
    <el-form-item label="动态半径">
      <el-input-number v-model="attribute.activeRadius" size="mini" style="width: 100%" controls-position="right" :min="1" :max="510" />
    </el-form-item>
    <el-form-item label="显示百分比">
      <el-switch
        v-model="attribute.showOriginValue"
        size="mini"
        style="width:100%"
        active-text="数值"
        inactive-text="百分比"
      />
    </el-form-item>
    <el-form-item label="颜色">
      <div>
        <div
          v-for="(item, index) in attribute.color"
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
  </el-form>
</template>
<!-- eslint-disable vue/no-mutating-props -->
<script>
export default {
  name: 'ActiveRingSetter',
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
      this.attribute.color.push(this.tempColor)
    },
    delColor(index) {
      this.attribute.color.splice(index, 1)
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
