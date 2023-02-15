<template>
  <div>
    <!--    组件内部没有设置deep监听props，数据变更时，请生成新的props，不然组件将无法刷新状态-->
    <dv-scroll-board
      :key="refreshFlagKey"
      :config="config"
      :style="{ width: width + 'px', height: height + 'px', ...rotateDeg }"
    />
  </div>
</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
import { getDataJson, pollingRefresh } from '@/utils/big-screen';
export default {
  name: 'ScrollTable',
  props: {
    width: Number,
    height: Number,
    rotateDeg: Object,
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
      deep: true // 深度监听
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
      getDataJson(this.configProps.cptDataForm).then((res) => {
        const temp = JSON.parse(JSON.stringify(this.configProps.attribute))
        const columns = JSON.parse(temp.columns)
        temp.header = []
        temp.columnWidth = [80] // 列宽
        temp.data = []
        temp.align = ['center']; // 对齐方式
        columns.forEach((item) => {
          temp.header.push(item.title)
          if (item.width) {
            temp.columnWidth.push(item.width)
          }
          temp.align.push('center');
        })
        res.forEach((item) => {
          const row = []
          columns.forEach((column) => {
            row.push(item[column.key])
          });
          temp.data.push(row)
        });
        this.config = temp
        this.refreshFlagKey = require('uuid').v1()
      });
    }
  }
}
</script>

<style scoped></style>
