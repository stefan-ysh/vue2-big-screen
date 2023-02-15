<template>
  <div>
    <!--    组件内部没有设置deep监听props，数据变更时，请生成新的props，不然组件将无法刷新状态-->
    <dv-scroll-board :key="refreshFlagKey" :config="config" :style="{ width: width + 'px', height: height + 'px' }" />
  </div>

</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
import { getDataJson, pollingRefresh } from '@/utils'
export default {
  name: 'ScrollTable',
  props: {
    cptId: {
      type: String,
      default: ''
    },
    width: Number,
    height: Number,
    configProps: Object
  },
  data() {
    return {
      config: {},
      uuid: null,
      refreshFlagKey: null
    }
  },
  watch: {
    'configProps.attribute': {
      handler() {
        this.loadData()
      },
      deep: true// 深度监听
    }
  },
  created() {
    this.uuid = require('uuid').v1()
    this.refreshFlagKey = require('uuid').v1()
    this.refreshCptData()
  },
  methods: {
    refreshCptData() {
      pollingRefresh(this.uuid, this.configProps.cptDataForm, this.loadData)
    },
    loadData() {
      getDataJson(this.configProps.cptDataForm, this.cptId).then(res => {
        const temp = JSON.parse(JSON.stringify(this.configProps.attribute))
        const columns = JSON.parse(temp.columns)
        temp.header = []
        temp.columnWidth = []// 列宽
        temp.data = []
        temp.waitTime *= 1000
        temp.align = [temp.textAlign]// 对齐方式
        columns.forEach(item => {
          temp.header.push(item.title)
          if (item.width) {
            temp.columnWidth.push(item.width)
          }
        })
        res.forEach(item => {
          const row = []
          columns.forEach(column => {
            row.push(item[column.key])
          })
          temp.data.push(row)
        })
        !temp.hasHeader && delete temp.header
        this.config = temp
        this.refreshFlagKey = require('uuid').v1()
      })
    }
  }
}
</script>

<style scoped>

</style>
