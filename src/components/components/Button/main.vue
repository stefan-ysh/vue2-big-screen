<template>
  <div style="height: 100%">
    <button
      style="width: 100%; height: 100%; border: none;cursor: pointer;"
      :style="{
        background: configProps.attribute.bgColor,
        color: configProps.attribute.textColor,
        'font-size': configProps.attribute.fontSize + 'px',
        borderRadius: configProps.attribute.radius + 'px',
        ...rotateDeg
      }"
      @click="handleClickEvent"
    >
      {{ cptData.value }}
    </button>
  </div>
</template>
<script>
import { getDataJson, pollingRefresh } from '@/utils/big-screen'

export default {
  name: 'BButton',
  props: { rotateDeg: { type: Object, default: () => {} }, configProps: { type: Object, default: () => {} } },
  data () {
    return {
      cptData: {},
      uuid: null
    }
  },
  created () {
    this.uuid = require('uuid').v1()
    this.refreshCptData()
  },
  methods: {
    refreshCptData () {
      pollingRefresh(this.uuid, this.configProps.cptDataForm, this.loadData)
    },
    loadData () {
      getDataJson(this.configProps.cptDataForm).then((res) => {
        this.cptData = res
      })
    },
    handleClickEvent () {
      // 开启了点击事件
      if (this.configProps.attribute.event) {
        // 点击跳转
        if (this.configProps.attribute.eType === 'url') {
          this.handleClickUrl()
        } else {
          // 组件交互
          this.configProps.attribute.eventList.forEach(_e => {
            switch (_e.eMode) {
              case 'hidden':
                // 控制组件显隐
                this.$emit('changeCptHiddenStatus', _e.cpt)
                break
              case 'refreshCpt':
                // 刷新组件数据
                this.$emit('refreshCpt', _e.cpt)
                break
              case 'refreshCanvas':
                // 刷新页面数据
                this.$emit('reload')
                break

              default:
                break
            }
          })
        }
      }
    },
    handleClickUrl () {
      if (this.configProps.attribute.url.startsWith('view')) {
        // 跳转到其他大屏
        // this.$router.push(xxx)
        this.$emit('reload')
      } else {
        // 跳到其他外部链接
        window.open(this.configProps.attribute.url)
      }
    }
  }
}
</script>

<style scoped></style>
