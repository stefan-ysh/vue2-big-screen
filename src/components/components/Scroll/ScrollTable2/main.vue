<template>
  <table
    :style="{ width: width + 'px', height: height + 'px' }"
    style="border-collapse: collapse; color: #fff; text-align: center"
  >
    <colgroup v-if="configProps.attribute.showIndex" style="width: 60px" />
    <colgroup
      v-for="item in configProps.attribute.columns"
      :key="item.colKey"
      :style="{ width: item.width > 0 ? item.width + 'px' : '' }"
    />
    <thead
      v-if="configProps.attribute.thead"
      style="background-color: #001a59"
      :style="{
        backgroundImage: 'linear-gradient(' + configProps.attribute.theadBg.toString() + ')',
        height: configProps.attribute.theadHeight + 'px',
        color: configProps.attribute.theadColor,
        fontSize: configProps.attribute.theadSize + 'px'
      }"
    >
      <tr>
        <td v-if="configProps.attribute.showIndex">序号</td>
        <td v-for="column in configProps.attribute.columns" :key="column.colKey" :ref="column.colKey">
          {{ column.title }}
        </td>
      </tr>
    </thead>
    <tbody is="transition-group" name="bounce" appear>
      <tr
        v-for="(temp, index) in rollData"
        :key="temp.rowNum"
        style="position: absolute"
        :style="{
          width: width + 'px',
          height: rowHeight + 'px',
          marginTop: index * rowHeight + 'px',
          backgroundColor: temp.rowNum % 2 === 0 ? configProps.attribute.oddRowBg : configProps.attribute.evenRowBg,
          color: configProps.attribute.tbodyColor,
          fontSize: configProps.attribute.tbodySize + 'px'
        }"
      >
        <td v-if="configProps.attribute.showIndex" style="width: 60px" :style="{ lineHeight: rowHeight + 'px' }">
          {{ temp.rowNum + 1 }}
        </td>
        <td
          v-for="column in configProps.attribute.columns"
          :key="column.colKey"
          :style="{ width: colWidths[column.colKey] + 'px' }"
        >
          <div
            style="position: absolute; top: 50%; transform: translateY(-50%)"
            :style="{
              width: colWidths[column.colKey] + 'px',
              fontWeight: configProps.attribute.tbodyFontWeight,
              fontFamily: configProps.attribute.tbodyFontFamily,
              fontStyle: configProps.attribute.tbodyFontStyle
            }"
          >
            <img
              v-if="column.type === 'img'"
              style="width: 60px; height: 60px"
              :src="temp[column.colKey].indexOf('http') === 0 ? temp[column.colKey] : uploadUrl + temp[column.colKey]"
            />
            <span v-else>{{ temp[column.colKey] }}</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { getDataJson, pollingRefresh } from '@/utils'
export default {
  name: 'ScrollTable2',
  props: {
    cptId: {
      type: String,
      default: ''
    },
    configProps: { type: Object, default: () => {} },
    // eslint-disable-next-line vue/require-default-prop
    width: Number,
    // eslint-disable-next-line vue/require-default-prop
    height: Number,
    show: Boolean
  },
  data() {
    return {
      // todo 文件上传url
      uploadUrl: 'example/upload',
      colWidths: {},
      rowHeight: 10,
      tableData: [],
      rollData: [],
      cptData: '',
      uuid: null,
      timer: null
    }
  },
  computed: {
    showLine() {
      if (this.tableData.length <= this.configProps.attribute.showLine) {
        return this.tableData.length
      } else {
        return this.configProps.attribute.showLine
      }
    },
    interval() {
      return this.configProps.attribute.interval
    }
  },
  watch: {
    showLine: {
      handler() {
        this.computeRowHeight()
        this.scrollTable()
      },
      deep: true // 深度监听
    },
    interval: {
      handler() {
        this.scrollTable()
      },
      deep: true // 深度监听
    },
    width() {
      this.computeColWidth()
    },
    height() {
      this.computeRowHeight()
    },
    show(val) {
      if (val) {
        this.computeColWidth()
      }
    }
  },
  created() {
    this.uuid = require('uuid').v1()
    this.refreshCptData()
  },
  mounted() {
    this.computeColWidth()
    this.computeRowHeight()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    computeRowHeight() {
      if (!this.configProps.attribute.thead) {
        this.rowHeight = this.height / this.showLine
      } else {
        this.rowHeight = (this.height - this.configProps.attribute.theadHeight) / this.showLine
      }
    },
    computeColWidth() {
      const that = this
      that.colWidths = {}
      this.configProps.attribute.columns.forEach(item => {
        this.$nextTick(() => {
          that.colWidths[item.colKey] = that.$refs[item.colKey][0].clientWidth
        })
      })
    },
    refreshCptData() {
      pollingRefresh(this.uuid, this.configProps.cptDataForm, this.loadData)
    },
    loadData() {
      getDataJson(this.configProps.cptDataForm, this.cptId).then(res => {
        const parse = res
        for (let i = 0; i < parse.length; i++) {
          parse[i].rowNum = i
        }
        this.tableData = parse
        this.scrollTable()
      })
    },
    scrollTable() {
      const that = this
      if (this.timer) {
        clearInterval(this.timer)
      }
      that.rollData = that.tableData.slice(0, this.showLine)
      if (this.showLine >= that.tableData.length) {
        return
      }
      let i = this.showLine
      this.timer = setInterval(() => {
        that.rollData.shift()
        that.rollData.push(that.tableData[i])
        i++
        if (i >= that.tableData.length) {
          i = 0
        }
      }, this.interval * 1000)
    }
  }
}
</script>

<style scoped>
.bounce-enter {
  transform: scaleY(0.5);
  transform-origin: 100% 100%;
}
.bounce-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.bounce-enter-active,
.bounce-leave-active {
  transition: all 0.5s;
}
.bounce-move {
  transition: transform 0.5s;
}
</style>
