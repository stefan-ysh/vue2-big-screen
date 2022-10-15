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
            :is="
              currentCpt.setterName
                ? currentCpt.setterName
                : currentCpt.componentName + '-setter'
            "
            :attribute="currentCpt.configProps.attribute"
          />
        </div>
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
import BaseConfig from '../modules/BasicConfig'
import BigScreenConfig from '../modules/BigscreenConfig'
import CptDataConfig from '../modules/CptDataConfig'
import InteractionConfig from '../modules/InteractionConfig'

export default {
  name: 'ConfigPane',
  components: {
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
.config-pane{
  width: 100%;
  height: 100%;
  background: #2d333f;
  overflow: hidden;
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
