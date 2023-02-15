<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="config-pane">
    <!-- 组件配置 -->
    <el-tabs v-show="configBarShow" v-model="configTab" :stretch="true">
      <el-tab-pane label="基础参数" name="basic">
        <span slot="label"><i class="el-icon-aim" /> 基础参数</span>
        <BaseConfig />
      </el-tab-pane>
      <el-tab-pane label="配置" name="custom">
        <span slot="label"><i class="el-icon-setting" /> 配置</span>
        <div
          v-if="currentCpt && currentCpt.configProps"
          class="custom-form"
          :style="{ height: windowHeight - 140 + 'px' }"
        >
          <el-row class="cur-cpt-title">
            <el-col class="cur-cpt-title-content">
              {{ currentCpt.cptTitle }}
            </el-col>
          </el-row>
          <component
            :is="currentCpt.setterName ? currentCpt.setterName : currentCpt.componentName + '-setter'"
            :currentCpt="currentCpt"
            :cptDataForm="currentCpt.configProps.cptDataForm"
            :attribute="currentCpt.configProps.attribute"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="动画" name="animation">
        <span slot="label"><i class="el-icon-star-off" /> 动画</span>
        <AnimationConfig v-if="currentCpt && currentCpt.configProps" />
      </el-tab-pane>
      <el-tab-pane v-if="currentCpt.configProps && currentCpt.configProps.interaction" label="交互" name="interaction">
        <span slot="label"><i class="el-icon-connection" /> 交互</span>
        <InteractionConfig />
      </el-tab-pane>
      <!-- 展示数据表单需在 meta.js 初始化 cptDataForm-->
      <el-tab-pane v-if="cptDataFormShow" label="数据" name="data">
        <span slot="label"><i class="el-icon-coin" /> 数据</span>
        <CptDataConfig />
      </el-tab-pane>
    </el-tabs>
    <!-- 大屏配置 -->
    <BigScreenConfig v-show="!configBarShow" />
  </div>
</template>
<!-- eslint-disable -->
<script>
import BaseConfig from '../BasicConfig'
import BigScreenConfig from '../BigscreenConfig'
import CptDataConfig from '../CptDataConfig'
import InteractionConfig from '../InteractionConfig'
import AnimationConfig from '../AnimationConfig'

export default {
  name: 'ConfigPane',
  components: {
    AnimationConfig,
    BaseConfig,
    BigScreenConfig,
    InteractionConfig,
    CptDataConfig
  },
  props: {
    currentCpt: { type: Object, default: () => {} },
  },
  data() {
    return {
      cptDataFormShow: false,
      configTab: 'custom',
      configBarShow: false,
    }
  },
  computed: {
    windowHeight() {
      return this.$store.state.bigScreen.windowHeight
    },
  },
  watch: {
    currentCpt(newVal) {
      this.cptDataFormShow = false
      if (!newVal || !newVal.configProps) {
        this.configBarShow = false // 清空时
      } else {
        if (this.currentCpt.configProps.cptDataForm) {
          this.cptDataFormShow = true
        } else {
          this.configTab = 'basic' // 解決上一組件沒有数据表单导致tab栏未选中bug
        }
      }
    }
  },
  methods: {
    showCptConfig() {
      this.configBarShow = true
    }
  }
}
</script>

<style scoped lang="less">
.config-pane {
  width: 100%;
  height: 100%;
  background: #2d333f;
  overflow: hidden;
  /deep/ .el-tabs {
    height: 100%;
    background: rgb(57, 57, 58);
    color: #fff;
    .el-tabs__header {
      margin: 0;
      .el-tabs__nav-wrap {
        .el-tabs__nav-scroll {
          .el-tabs__nav {
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            // tab 切换栏背景色
            // background: #414c5c;
            // 标题禁止选中，减少视觉压力
            user-select: none;
            &.is-top {
              // background: red;
            }
            .el-tabs__item {
              transition: all 0.3s linear;
              padding: 0 10px !important;
              opacity: 0.2;
              &:hover,
              &.is-active {
                // background: #414c5c;
                color: #fff !important;
                // border-bottom: 2px solid #2b3340;
                opacity: 1;
              }
            }
          }
        }
        &::after {
          display: none;
        }
      }
    }
    .el-tabs__content {
      background: #2d333f;
      height: calc(100% - 40px);
      overflow-x: hidden;
      overflow-y: scroll;
      .el-tab-pane {
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
      }
    }
  }
}

.custom-form {
  padding: 10px;
  overflow-y: auto;
  background: #2b3340;
  .cur-cpt-title {
    margin-bottom: 10px;
    font-size: 12px;
    &-content {
      text-align: center;
    }
  }
}
</style>
