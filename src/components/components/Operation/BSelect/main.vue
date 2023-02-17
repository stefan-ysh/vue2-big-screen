<template>
  <el-select
    v-model="defaultValue"
    :placeholder="configProps.attribute.placeholder"
    class="b-select"
    :style="`--fontSize:${configProps.attribute.fontSize}px;--fontWeight:${configProps.attribute.fontWeight};--textColor:${configProps.attribute.textColor}`"
    popper-class="b-select-cpt-popover"
    @change="handleSelect"
  >
    <el-option v-for="option in cptData" :key="option.value" :value="option.value" :label="option.label" />
  </el-select>
</template>
<script>
import { getDataJson, pollingRefresh } from '@/utils'

export default {
  name: 'BSelect',
  props: {
    cptId: {
      type: String,
      default: ''
    },
    configProps: { type: Object, default: () => {} }
  },
  data() {
    return {
      cptData: [],
      uuid: null,
      defaultValue: ''
    }
  },
  computed: {
    cptRefs() {
      return this.$store.state.bigScreen.cptRefs
    }
  },
  created() {
    this.uuid = require('uuid').v1()
    if (this.configProps.attribute.hasDefaultVal) {
      this.defaultValue = this.configProps.attribute.defaultValue
      this.handleSelect(this.defaultValue)
    }
    this.refreshCptData()
  },
  methods: {
    refreshCptData() {
      pollingRefresh(this.uuid, this.configProps.cptDataForm, this.loadData)
    },
    loadData() {
      getDataJson(this.configProps.cptDataForm, this.cptId).then(res => {
        this.cptData = res
        this.handleParams(this.configProps.attribute.paramsList, true)
      })
    },
    changeCptHiddenStatus(id, hidden) {
      this.$store.dispatch('bigScreen/changeCptHiddenStatus', { id, hidden })
    },
    handleSelect(curTab) {
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
    handleParams(paramsList, init) {
      paramsList.forEach(_p => {
        _p.paramsCpt.forEach(id => {
          const temVal = {}
          // 默认选中第一项
          if (init && this.configProps.attribute.firstItemSelectedByDefault) {
            this.defaultValue = this.cptData[0].value
            if (_p.paramsSource === 'selectItemValue') {
              temVal[_p.paramsName] = this.cptData[0].value
            } else if (_p.paramsSource === 'selectItemLabel') {
              temVal[_p.paramsName] = this.cptData[0].label
            }
          } else {
            if (_p.paramsSource === 'selectItemValue') {
              temVal[_p.paramsName] = this.defaultValue
            } else if (_p.paramsSource === 'selectItemLabel') {
              const v = this.cptData.find(c => {
                // eslint-disable-next-line eqeqeq
                return c.value == this.defaultValue
              })
              if (v) temVal[_p.paramsName] = v.label
            } else {
              temVal[_p.paramsName] = _p.paramsVal
            }
          }
          this.$store.dispatch('bigScreen/changeReqParams', {
            id,
            params: temVal
          })
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
.b-select {
  /deep/ .el-input {
    .el-input__inner {
      padding: 0;
      background-color: transparent !important;
      border: none;
      color: var(--textColor);
      font-size: var(--fontSize);
      font-weight: var(--fontWeight);
    }

    .el-input__suffix {
      display: none;
    }
  }
}
</style>
<style lang="less">
// .b-select-cpt-popover {
//   background: #1d2830;
//   border: none;
//   border-radius: 0;
//   .el-dropdown-menu__item {
//     color: #a6a6c5;
//     &:hover {
//       background: rgba(0, 192, 222, 0.1);
//       color: #409eff;
//     }
//   }

//   .popper__arrow {
//     // border-bottom-color: black !important;
//     border: none !important;
//     &::after {
//       border-bottom-color: #1d2830 !important;
//     }
//   }
// }
</style>
