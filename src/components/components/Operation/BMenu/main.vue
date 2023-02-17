<template>
  <el-menu
    :default-active="defaultValue"
    class="el-menu-b-menu"
    :background-color="configProps.attribute.menuBgColor"
    :text-color="configProps.attribute.textColor"
    :active-text-color="configProps.attribute.activeTextColor"
    :style="`
      --activeBgColor: ${configProps.attribute.activeBgColor};
      --menuItemHoverColor: ${configProps.attribute.menuItemHoverColor};
      --menuItemHoverBgColor: ${configProps.attribute.menuItemHoverBgColor}
    `"
    @select="handleSelectMenu"
  >
    <el-menu-item
      v-for="menu in cptData"
      :key="menu.value"
      :index="menu.value.toString()"
      :style="{
        height: configProps.attribute.menuHeight + 'px',
        'line-height': configProps.attribute.menuHeight + 'px',
        'text-align': configProps.attribute.textAlign,
        'font-weight': configProps.attribute.fontWeight,
        'font-size': configProps.attribute.fontSize + 'px'
      }"
    >
      <!-- <i class="el-icon-setting"></i> -->
      <span slot="title">{{ menu.label }}</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
import { getDataJson, pollingRefresh } from '@/utils'

export default {
  name: 'BMenu',
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
    if (this.configProps.attribute.defaultValue) {
      this.defaultValue = this.configProps.attribute.defaultValue.toString()
      // this.handleSelectMenu(this.defaultValue)
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
    handleSelectMenu(curMenu) {
      // 点击当前菜单不重新发起请求
      if (curMenu === this.defaultValue) return
      this.defaultValue = curMenu.toString()
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
            const hidden = curMenu !== _e.tab
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
.b-year {
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
<style scoped lang="less">
.el-menu-b-menu {
  height: 100%;
  overflow: auto;
  .el-menu-item.is-active {
    background-color: var(--activeBgColor) !important;
  }
  .el-menu-item:hover {
    outline: 0 !important;
    color: var(--menuItemHoverColor) !important;
    background: var(--menuItemHoverBgColor) !important;
  }
  //  .el-menu-item.is-active {
  //     color: #2E95FB !important;
  //     background: linear-gradient(270deg, #F2F7FC 0%, #FEFEFE 100%)!important;
  // }
}

// .el-submenu /deep/.el-submenu__title:hover {
//   color: #2E95FB !important;
//   background: linear-gradient(270deg, #F2F7FC 0%, #FEFEFE 100%)!important;
// }
</style>
