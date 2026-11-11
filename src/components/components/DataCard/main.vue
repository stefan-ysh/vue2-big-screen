<template>
  <div class="data-card" :style="cardStyle">
    <div class="card-title" :style="{ color: attribute.titleColor }">{{ attribute.title }}</div>
    <div class="card-value">
      <span class="prefix" v-if="attribute.prefix">{{ attribute.prefix }}</span>
      <span class="value" :style="{ color: attribute.valueColor }">{{ displayValue }}</span>
      <span class="unit" v-if="attribute.unit">{{ attribute.unit }}</span>
    </div>
    <div class="card-growth" v-if="attribute.growth">
      <span :class="['growth-value', attribute.growthStatus]">{{ attribute.growth }}</span>
    </div>
    <i v-if="attribute.iconClass" :class="['card-icon', attribute.iconClass]"></i>
  </div>
</template>

<script>
import { v1 as uuidv1 } from 'uuid'
import { getDataJson, pollingRefresh, clearCptInterval } from '@/utils'

export default {
  name: 'DataCard',
  props: {
    cptId: String,
    width: {
      type: Number,
      default: 320
    },
    height: {
      type: Number,
      default: 160
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
    // 兼容两种配置形态：标准 attribute 形态与旧的扁平形态
    attribute() {
      return this.configProps.attribute || this.configProps
    },
    displayValue() {
      if (this.cptData.value !== undefined && this.cptData.value !== null) {
        return this.cptData.value
      }
      return this.attribute.value !== undefined ? this.attribute.value : '0'
    },
    cardStyle() {
      return {
        width: '100%',
        height: '100%',
        backgroundColor: this.attribute.backgroundColor || 'rgba(12, 26, 60, 0.7)',
        borderColor: this.attribute.borderColor || '#1D2C5E'
      }
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
          this.cptData = res && typeof res === 'object' ? res : {}
        })
        .catch(() => {
          this.cptData = {}
        })
    }
  }
}
</script>

<style lang="less" scoped>
.data-card {
  border-radius: 4px;
  padding: 16px;
  position: relative;
  border-left: 4px solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
  }

  .card-title {
    font-size: 16px;
    margin-bottom: 12px;
  }

  .card-value {
    display: flex;
    align-items: baseline;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 8px;

    .prefix {
      margin-right: 4px;
    }

    .unit {
      font-size: 14px;
      margin-left: 4px;
    }
  }

  .card-growth {
    font-size: 14px;

    .growth-value {
      &.up {
        color: #52c41a;
      }

      &.down {
        color: #ff4d4f;
      }
    }
  }

  .card-icon {
    position: absolute;
    right: 16px;
    top: 16px;
    font-size: 28px;
    opacity: 0.6;
  }
}
</style>
