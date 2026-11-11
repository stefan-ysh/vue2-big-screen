<template>
  <div class="table-component" :style="{ width: width + 'px', height: height + 'px' }">
    <div class="table-title" v-if="attribute.showTitle" :style="{ color: attribute.headerColor }">
      {{ tableTitle }}
    </div>
    <div class="table-container" :style="tableContainerStyle">
      <table :style="tableStyle">
        <thead>
          <tr>
            <th v-for="(column, index) in tableColumns" :key="index" :style="thStyle">
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in tableRows" :key="rowIndex">
            <td v-for="(column, colIndex) in tableColumns" :key="colIndex" :style="tdStyle">
              <span
                v-if="isRankCell(column, row)"
                class="rank-badge"
                :class="'rank-' + row[column.prop]"
              >{{ row[column.prop] }}</span>
              <template v-else>{{ row[column.prop] }}</template>
            </td>
          </tr>
          <tr v-if="tableRows.length === 0">
            <td :colspan="tableColumns.length || 1" class="empty-row">暂无数据</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { v1 as uuidv1 } from 'uuid'
import { getDataJson, pollingRefresh, clearCptInterval } from '@/utils'

export default {
  name: 'TableComponent',
  props: {
    cptId: String,
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 300
    },
    configProps: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      uuid: '',
      cptData: {}
    }
  },
  computed: {
    attribute() {
      return this.configProps.attribute || {}
    },
    tableTitle() {
      return this.cptData.title || this.attribute.title || '数据表格'
    },
    // 兼容 attribute.columns / attribute.tableConfig.columns 两种来源，
    // 以及 label/title、prop/dataIndex 两种字段命名
    tableColumns() {
      let columns = this.cptData.columns || this.attribute.columns
      if (!columns && this.attribute.tableConfig) {
        columns = this.attribute.tableConfig.columns
      }
      if (!Array.isArray(columns)) return []
      return columns.map(col => ({
        label: col.label || col.title || '',
        prop: col.prop || col.dataIndex || ''
      }))
    },
    tableRows() {
      const rows =
        this.cptData.data ||
        this.attribute.data ||
        (this.attribute.tableConfig && this.attribute.tableConfig.data)
      return Array.isArray(rows) ? rows : []
    },
    // 排名列高亮：开启 rankHighlight 且当前列为排名列、值为前三名时渲染奖牌色徽标
    isRankCell() {
      return (column, row) => {
        if (!this.attribute.rankHighlight || column.prop !== 'rank') return false
        const value = String(row[column.prop])
        return ['1', '2', '3'].includes(value)
      }
    },
    tableContainerStyle() {
      return {
        width: '100%',
        height: this.attribute.showTitle
          ? `calc(100% - ${this.attribute.titleHeight || 40}px)`
          : '100%',
        overflowY: 'auto',
        backgroundColor: this.attribute.backgroundColor || 'rgba(12, 26, 60, 0.2)',
        border: `1px solid ${this.attribute.borderColor || '#1D2C5E'}`,
        borderRadius: '4px'
      }
    },
    tableStyle() {
      return {
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'center',
        color: this.attribute.textColor || '#ffffff'
      }
    },
    thStyle() {
      return {
        padding: '8px 12px',
        backgroundColor: this.attribute.headerBgColor || 'rgba(16, 31, 68, 0.6)',
        color: this.attribute.headerColor || '#a0c4ff',
        borderBottom: `1px solid ${this.attribute.borderColor || '#1D2C5E'}`
      }
    },
    tdStyle() {
      return {
        padding: '8px 12px',
        borderBottom: `1px solid ${this.attribute.borderColor || '#1D2C5E'}`
      }
    }
  },
  watch: {
    'configProps.attribute': {
      handler() {
        this.cptData = {}
      },
      deep: true
    }
  },
  created() {
    this.uuid = uuidv1()
    this.refreshCptData()
  },
  beforeDestroy() {
    clearCptInterval(this.uuid)
  },
  methods: {
    refreshCptData() {
      if (this.configProps.cptDataForm) {
        pollingRefresh(this.uuid, this.configProps.cptDataForm, this.loadData)
      }
    },
    loadData() {
      getDataJson(this.configProps.cptDataForm, this.cptId)
        .then(res => {
          // 支持 { columns, data, title } 或纯数组两种数据格式
          if (Array.isArray(res)) {
            this.cptData = { data: res }
          } else {
            this.cptData = res && typeof res === 'object' ? res : {}
          }
        })
        .catch(() => {
          this.cptData = {}
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-component {
  position: relative;

  .table-title {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }

  .table-container {
    position: relative;

    tbody tr {
      &:nth-child(odd) {
        background-color: rgba(22, 41, 90, 0.4);
      }

      &:nth-child(even) {
        background-color: rgba(28, 52, 117, 0.4);
      }

      &:hover {
        background-color: rgba(61, 90, 254, 0.2);
      }
    }

    .empty-row {
      color: #7a8ba6;
      padding: 16px 0;
    }

    .rank-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      font-weight: bold;
      line-height: 1;

      &.rank-1 {
        color: #ffd700;
        background: rgba(255, 215, 0, 0.15);
        border: 1px solid rgba(255, 215, 0, 0.55);
      }

      &.rank-2 {
        color: #c0c0c0;
        background: rgba(192, 192, 192, 0.15);
        border: 1px solid rgba(192, 192, 192, 0.5);
      }

      &.rank-3 {
        color: #cd7f32;
        background: rgba(205, 127, 50, 0.15);
        border: 1px solid rgba(205, 127, 50, 0.5);
      }
    }
  }
}
</style>
