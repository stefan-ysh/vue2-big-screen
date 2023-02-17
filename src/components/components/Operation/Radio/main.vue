<template>
  <div class="b-radio-wrap">
    <el-radio-group
      v-model="radioValue"
      :fill="configProps.attribute.activeFill"
      :text-color="configProps.attribute.activeTextColor"
      :size="configProps.attribute.size"
      :style="{
        width: '100%',
        height: '100%',
        '--textColor': configProps.attribute.textColor,
        '--fill': configProps.attribute.fill,
        '--borderColor': configProps.attribute.borderColor,
        '--activeBorderColor': configProps.attribute.activeBorderColor,
        '--borderRadius': configProps.attribute.borderRadius + 'px',
        display: 'flex',
        'flex-direction': configProps.attribute.flexDirection
      }"
      @change="changeRadio"
    >
      <!-- 按钮类型 -->
      <!-- 此时 text-color 和 fill 才生效 -->
      <template v-if="configProps.attribute.type === 'button'">
        <el-radio-button
          v-for="o in cptData"
          :key="o.value"
          :border="configProps.attribute.border"
          :label="o.value"
          :style="{
            ...convertGap(configProps.attribute.flexDirection, configProps.attribute.gap),
            height: configProps.attribute.radioHeight + 'px',
            width: configProps.attribute.radioWidth + 'px'
          }"
        >
          <span
            class="b-option-label"
            :style="{
              'font-size': configProps.attribute.fontSize + 'px',
              'text-align': configProps.attribute.textAlign
            }"
          >
            {{ o.label }}
          </span>
        </el-radio-button>
      </template>
      <!-- 普通类型 -->
      <template v-else>
        <el-radio
          v-for="o in cptData"
          :key="o.value"
          :border="configProps.attribute.border"
          :label="o.value"
          :style="{ 'margin-right': configProps.attribute.gap + 'px' }"
        >
          <span
            class="b-option-label"
            :style="{
              'font-size': configProps.attribute.fontSize + 'px'
            }"
          >
            {{ o.label }}
          </span></el-radio
        >
      </template>
    </el-radio-group>
  </div>
</template>
<script>
import { getDataJson, pollingRefresh } from '@/utils'

export default {
  name: 'BRadio',
  props: {
    cptId: {
      type: String,
      default: ''
    },
    configProps: { type: Object, default: () => {} }
  },
  data() {
    return {
      cptData: {},
      radioValue: ''
    }
  },
  computed: {
    cptRefs() {
      return this.$store.state.bigScreen.cptRefs
    }
  },
  created() {
    if (this.configProps.attribute.defaultValue) {
      this.radioValue = this.configProps.attribute.defaultValue
    }
    this.refreshCptData()
    // 执行默认数据事件
    this.changeRadio(this.configProps.attribute.defaultValue)
  },
  methods: {
    convertGap(direction, gap) {
      if (direction === 'row') {
        return { 'margin-right': gap + 'px' }
      } else {
        return { 'margin-top': gap + 'px' }
      }
    },
    // 刷新组件shuju
    refreshCptData() {
      pollingRefresh(this.uuid, this.configProps.cptDataForm, this.loadData)
    },
    // 加载数据
    loadData() {
      getDataJson(this.configProps.cptDataForm, this.cptId).then(res => {
        this.cptData = res
      })
    },
    changeCptHiddenStatus(id, hidden) {
      this.$store.dispatch('bigScreen/changeCptHiddenStatus', { id, hidden })
    },
    changeRadio(curTab) {
      if (!this.configProps.attribute.event) {
        return
      }
      // 传递参数
      if (this.configProps.attribute.eType === 'params') {
        this.handleParams(this.configProps.attribute.paramsList)
      } else {
        // 组件显隐交互
        // 只显示与当前 tab 绑定的组件，其他 tab 的组件隐藏
        this.configProps.attribute.eventList.forEach(_e => {
          _e.cpt.forEach(cId => {
            const hidden = curTab !== _e.tab
            this.changeCptHiddenStatus(cId, hidden)
          })
        })
      }
    },
    handleParams(paramsList) {
      paramsList.forEach(_p => {
        _p.paramsCpt.forEach(id => {
          const temVal = {}
          if (_p.paramsSource === 'selectItemValue') {
            temVal[_p.paramsName] = this.radioValue
          } else {
            temVal[_p.paramsName] = _p.paramsVal
          }
          this.$store.dispatch('bigScreen/changeReqParams', { id, params: temVal })
          this.$nextTick(() => {
            if (this.cptRefs.get(id)) {
              this.cptRefs.get(id).refreshCptData()
            }
          })
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.b-radio-wrap {
  width: 100%;
  height: 100%;
  .el-radio-group {
    width: 100%;
    height: 100%;
    display: flex;
    /deep/ .el-radio-button {
      &.is-active {
        .el-radio-button__inner {
          border-color: var(--activeBorderColor) !important;
        }
      }
    }
    /deep/ .el-radio-button,
    .el-radio {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      .b-option-label {
        display: inline-block;
        width: 100%;
      }
      .el-radio-button__inner {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--textColor);
        background-color: var(--fill);
        border-color: var(--borderColor);
        border-left: 1px solid var(--borderColor);
        border-radius: var(--borderRadius);
        padding: 0;
      }
    }
  }
  input {
    width: 100%;
    height: 100%;
  }
}
</style>
