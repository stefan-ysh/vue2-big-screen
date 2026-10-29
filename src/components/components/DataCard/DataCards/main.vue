<template>
  <div class="data-cards" :style="cardsStyle">
    <div
      v-for="(item, index) in cardItems"
      :key="index"
      class="card-item"
      :style="cardItemStyle"
    >
      <DataCard
        :configProps="{
          title: item.title,
          value: item.value,
          unit: item.unit || '',
          prefix: item.prefix || '',
          growth: item.growth,
          growthStatus: getGrowthStatus(item.growth),
          iconClass: item.icon || '',
          backgroundColor: attribute.backgroundColor || 'rgba(12, 26, 60, 0.7)',
          borderColor: attribute.borderColor || '#1D2C5E',
          valueColor: attribute.valueColor || '#ffffff',
          titleColor: attribute.titleColor || '#a0c4ff'
        }"
        :width="cardWidth"
        :height="cardHeight"
      />
    </div>
    <div v-if="cardItems.length === 0" class="cards-empty">暂无数据</div>
  </div>
</template>

<script>
import { v1 as uuidv1 } from 'uuid'
import { getDataJson, pollingRefresh, clearCptInterval } from '@/utils'

export default {
  name: 'DataCards',
  props: {
    cptId: String,
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 120
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
    cardItems() {
      const items = this.cptData.items || this.attribute.items || []
      if (!Array.isArray(items)) return []
      // 兼容 ratio / trend / growth 三种字段命名
      return items.map(item => ({
        ...item,
        growth: item.growth || item.ratio || item.trend || ''
      }))
    },
    layout() {
      return this.attribute.layout || 'horizontal'
    },
    cardsStyle() {
      return {
        width: this.width + 'px',
        height: this.height + 'px',
        display: 'flex',
        flexDirection: this.layout === 'vertical' ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    },
    cardItemStyle() {
      return {
        margin: this.layout === 'vertical' ? '5px 0' : '0 5px',
        flex: 1,
        height: '100%'
      }
    },
    cardWidth() {
      const count = this.cardItems.length
      if (count === 0) return this.width
      if (this.layout === 'vertical') return this.width
      const spacing = (count - 1) * 10
      return Math.floor((this.width - spacing) / count)
    },
    cardHeight() {
      const count = this.cardItems.length
      if (count === 0) return this.height
      if (this.layout === 'horizontal') return this.height
      const spacing = (count - 1) * 10
      return Math.floor((this.height - spacing) / count)
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
    getGrowthStatus(growth) {
      if (!growth) return 'none'
      return String(growth).includes('-') ? 'down' : 'up'
    },
    refreshCptData() {
      if (this.configProps.cptDataForm) {
        pollingRefresh(this.uuid, this.configProps.cptDataForm, this.loadData)
      }
    },
    loadData() {
      getDataJson(this.configProps.cptDataForm, this.cptId).then(res => {
        this.cptData = res && typeof res === 'object' ? res : {}
      }).catch(() => {
        this.cptData = {}
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.data-cards {
  position: relative;
  overflow: hidden;

  .card-item {
    position: relative;
    min-width: 0;
  }

  .cards-empty {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #7a8ba6;
    font-size: 14px;
  }
}
</style>
