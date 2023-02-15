<template>
  <div class="animation-config-wrap">
    <el-button class="clear-animation-btn" @click="clearAnimation">清除动画</el-button>
    <el-collapse v-model="activeNames">
      <el-collapse-item v-for="(animation, index) in animations" :key="index" :title="animation.title">
        <el-row>
          <el-col
            v-for="(childrenItem, i) in animation.children"
            :key="i"
            :span="8"
            class="animation-item"
            :class="[
              activeIndex(childrenItem.value) && 'active',
              hoverPreviewAnimation === childrenItem.value && `animate__animated  animate__${childrenItem.value}`
            ]"
            @mouseover.native="hoverPreviewAnimation = childrenItem.value"
            @click.native="addAnimation(childrenItem.value)"
          >
            {{ childrenItem.label }}
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
    <el-form style="margin-top: 10px" label-width="60px" size="mini">
      <el-form-item label="延迟时间">
        <el-row>
          <el-col :span="24">
            <el-select v-model="currentCpt.configProps.animation.delay" style="width: 100%">
              <el-option label="无延迟" value="animate__delay-0s"></el-option>
              <el-option label="1秒" value="animate__delay-1s"></el-option>
              <el-option label="2秒" value="animate__delay-2s"></el-option>
              <el-option label="3秒" value="animate__delay-3s"></el-option>
              <el-option label="4秒" value="animate__delay-4s"></el-option>
              <el-option label="5秒" value="animate__delay-5s"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="动画速度">
        <el-row>
          <el-col :span="24">
            <el-select v-model="currentCpt.configProps.animation.speed" style="width: 100%">
              <el-option label="较慢" value="animate__slower"></el-option>
              <el-option label="慢" value="animate__slow"></el-option>
              <el-option label="快" value="animate__fast"></el-option>
              <el-option label="较快" value="animate__faster"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="循环次数">
        <el-row>
          <el-col :span="24">
            <el-select v-model="currentCpt.configProps.animation.repeat" style="width: 100%">
              <el-option label="一次" value="animate__repeat-1"></el-option>
              <el-option label="两次" value="animate__repeat-2"></el-option>
              <el-option label="三次" value="animate__repeat-3"></el-option>
              <el-option label="无限循环" value="animate__infinite"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { animations } from './animations'

export default {
  name: 'AnimationConfig',
  data() {
    return {
      animations,
      activeNames: '',
      hoverPreviewAnimation: ''
    }
  },

  computed: {
    currentCpt() {
      return this.$store.state.bigScreen.curComponent
    }
  },

  methods: {
    // 清除动画
    clearAnimation() {
      this.currentCpt.configProps.animation.name = ''
    },
    // 选中的动画样式
    activeIndex(value) {
      return this.currentCpt.configProps.animation.name === value
    },
    // 新增动画
    addAnimation(value) {
      this.currentCpt.configProps.animation.name = value
    }
  }
}
</script>

<style lang="less" scoped>
.animation-config-wrap {
  padding: 10px;
  .clear-animation-btn {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin: 10px 0;
    padding: 0;
  }
  .el-collapse {
    border: none;
    margin-top: 10px;
    &-item {
      &__header {
        height: 35px !important;
        // margin-bottom: 5px;
        padding: 0 10px;
        color: #fff;
        background: #39393a;
        border-bottom: 1px solid #1d1e1f;
      }
      &__wrap {
        border-bottom: none;
      }
      &__content {
        background: #2d333f;
        padding-bottom: 5px;
        color: #fff;
      }
    }
  }
  .animation-item {
    height: 35px;
    line-height: 35px;
    text-align: center;
    margin-top: 5px;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid #48484f;
    &:hover,
    &.active {
      opacity: 1;
      color: rgb(102, 180, 216);
      border: 1px solid rgb(102, 180, 216);
    }
  }
}
</style>
