<template>
  <div class="example-selector">
    <div class="selector-header">
      <h3>数据示例</h3>
      <el-tooltip content="选择不同的数据示例来预览不同场景下的大屏效果" placement="top">
        <i class="el-icon-question"></i>
      </el-tooltip>
    </div>
    
    <div class="example-list">
      <div 
        v-for="example in examples" 
        :key="example.key"
        class="example-item"
        :class="{ active: currentExample === example.key }"
        @click="selectExample(example.key)"
      >
        <div class="example-icon" :style="{ backgroundColor: example.color }">
          <i :class="`el-icon-${example.icon}`"></i>
        </div>
        <div class="example-info">
          <h4>{{ example.name }}</h4>
          <p>{{ example.description }}</p>
        </div>
        <div class="example-status" v-if="currentExample === example.key">
          <i class="el-icon-check"></i>
        </div>
      </div>
      
      <!-- 默认示例 -->
      <div 
        class="example-item"
        :class="{ active: currentExample === null || currentExample === '' }"
        @click="selectExample(null)"
      >
        <div class="example-icon" style="backgroundColor: #909399">
          <i class="el-icon-document"></i>
        </div>
        <div class="example-info">
          <h4>标准示例</h4>
          <p>使用默认的标准数据模板</p>
        </div>
        <div class="example-status" v-if="currentExample === null || currentExample === ''">
          <i class="el-icon-check"></i>
        </div>
      </div>
    </div>
    
    <div class="selector-actions">
      <el-button size="small" @click="refreshData">
        <i class="el-icon-refresh"></i>
        刷新数据
      </el-button>
      <el-button size="small" type="primary" @click="previewExample" :disabled="!currentExample">
        <i class="el-icon-view"></i>
        预览效果
      </el-button>
    </div>
  </div>
</template>

<script>
import mockDataManager from '@/utils/mockDataManager'

export default {
  name: 'ExampleSelector',
  props: {
    screenType: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      currentExample: this.value,
      examples: []
    }
  },
  watch: {
    screenType: {
      handler(newType) {
        this.loadExamples(newType)
      },
      immediate: true
    },
    value(newValue) {
      this.currentExample = newValue
    },
    currentExample(newValue) {
      this.$emit('input', newValue)
      this.$emit('change', newValue)
    }
  },
  methods: {
    loadExamples(type) {
      this.examples = mockDataManager.getExampleConfigs(type)
    },
    
    selectExample(exampleKey) {
      this.currentExample = exampleKey
      mockDataManager.setCurrentExample(exampleKey)
      
      this.$emit('example-change', {
        key: exampleKey,
        example: this.examples.find(e => e.key === exampleKey)
      })
      
      this.$message.success(`已切换到${exampleKey ? this.getExampleName(exampleKey) : '标准示例'}`)
    },
    
    getExampleName(key) {
      const example = this.examples.find(e => e.key === key)
      return example ? example.name : '未知示例'
    },
    
    refreshData() {
      this.$emit('refresh-data')
      this.$message.success('数据已刷新')
    },
    
    previewExample() {
      if (!this.currentExample) return
      
      this.$emit('preview-example', {
        key: this.currentExample,
        example: this.examples.find(e => e.key === this.currentExample)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.example-selector {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  .selector-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    
    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #303133;
    }
    
    i {
      color: #909399;
      cursor: help;
    }
  }
  
  .example-list {
    max-height: 400px;
    overflow-y: auto;
    margin-bottom: 16px;
    
    .example-item {
      display: flex;
      align-items: center;
      padding: 12px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s;
      margin-bottom: 8px;
      border: 1px solid #e4e7ed;
      
      &:hover {
        background-color: #f5f7fa;
        border-color: #c0c4cc;
      }
      
      &.active {
        background-color: #ecf5ff;
        border-color: #409eff;
        
        .example-info h4 {
          color: #409eff;
        }
      }
      
      .example-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
        
        i {
          color: #fff;
          font-size: 18px;
        }
      }
      
      .example-info {
        flex: 1;
        
        h4 {
          margin: 0 0 4px 0;
          font-size: 14px;
          font-weight: 600;
          color: #303133;
          transition: color 0.3s;
        }
        
        p {
          margin: 0;
          font-size: 12px;
          color: #606266;
          line-height: 1.4;
        }
      }
      
      .example-status {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        
        i {
          color: #67c23a;
          font-size: 16px;
        }
      }
    }
  }
  
  .selector-actions {
    display: flex;
    gap: 8px;
    
    .el-button {
      flex: 1;
    }
  }
}

/* 滚动条样式 */
.example-list::-webkit-scrollbar {
  width: 4px;
}

.example-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.example-list::-webkit-scrollbar-thumb {
  background: #c0c4cc;
  border-radius: 2px;
}

.example-list::-webkit-scrollbar-thumb:hover {
  background: #909399;
}
</style> 