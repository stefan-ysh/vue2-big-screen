<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="bar">
    <el-tabs v-model="activeTab" @tab-click="changeTab">
      <el-tab-pane label="组件" name="component" class="cpt-list">
        <div slot="label" style="display: flex; align-items: center">
          <BSvgIcon fill="#4a9eff" style="width: 15px; margin-right: 5px" icon-class="puzzle" />
          组件
        </div>
        <div class="search-cpt">
          <div class="search-operation">
            <el-input 
              v-model="searchKeys" 
              placeholder="搜索组件" 
              class="search-ipt" 
              size="mini" 
              prefix-icon="el-icon-search"
              clearable 
            />
            <div class="switch-cpt-view-mode">
              <span
                title="双列显示"
                :class="`switch-cpt-view-mode-btn ${cptItemSpan === 12 ? 'active' : ''}`"
                @click="changeColSpan(12)"
              >
                <i class="el-icon-menu"></i>
              </span>
              <span
                title="三列显示"
                :class="`switch-cpt-view-mode-btn ${cptItemSpan === 8 ? 'active' : ''}`"
                @click="changeColSpan(8)"
              >
                <i class="el-icon-s-grid"></i>
              </span>
            </div>
          </div>
          <div v-show="searchCptResult.length > 0" class="search-result">
            <div class="search-result-header">
              找到 {{ searchCptResult.length }} 个组件
              <span class="close-search" @click="clearSearch"><i class="el-icon-close"></i></span>
            </div>
            <div class="search-result-list">
              <div 
                v-for="(item, index) in searchCptResult" 
                :key="item.name + index"
                class="search-result-item-wrapper"
              >
                <div
                  draggable="true"
                  :data-config="JSON.stringify(item)"
                  class="search-result-cpt-item"
                  :title="item.name"
                  @dragstart="dragStart"
                >
                  <div class="search-item-icon">
                    <BSvgIcon v-if="item.icon" :icon-class="item.icon" />
                    <i v-else class="el-icon-question" />
                  </div>
                  <div class="search-item-name">{{ item.name }}</div>
                  <div class="favorite-btn" @click.stop="toggleFavorite(item)">
                    <i :class="isFavorite(item) ? 'el-icon-star-on' : 'el-icon-star-off'"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="favoriteCpts.length > 0" class="favorite-cpts-section">
          <div class="section-header" @click="showFavorites = !showFavorites">
            <BSvgIcon style="width: 15px; margin-right: 5px" icon-class="star" />
            收藏组件
            <div class="section-toggle">
              <i :class="showFavorites ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
            </div>
          </div>
          <div v-show="showFavorites" class="favorite-cpts-container">
            <el-row :gutter="4">
              <el-col 
                v-for="(item, index) in favoriteCpts" 
                :key="'fav-'+item.name+index" 
                :span="8"
              >
                <div
                  draggable="true"
                  :data-config="JSON.stringify(item)"
                  class="favorite-cpt-item"
                  :title="item.name"
                  @dragstart="dragStart"
                >
                  <BSvgIcon v-if="item.icon" class="favorite-cpt-icon" :icon-class="item.icon" />
                  <i v-else class="el-icon-question favorite-cpt-icon" />
                  <!-- <div class="favorite-cpt-name">{{ item.name }}</div> -->
                  <div class="remove-favorite" @click.stop="toggleFavorite(item)">
                    <i class="el-icon-close"></i>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div v-if="historyUsedCpts.length > 0" class="history-cpts-section">
          <div class="section-header" @click="showHistory = !showHistory">
            <BSvgIcon style="width: 15px; margin-right: 5px" icon-class="history" />
            最近使用
            <div class="section-toggle">
              <i :class="showHistory ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
            </div>
          </div>
          <div v-show="showHistory" class="history-used-cpts">
            <el-row :gutter="4">
              <el-col 
                v-for="(item, index) in historyUsedCpts.slice(0, 8)" 
                :key="'hist-'+item.name+index" 
                :span="6"
              >
                <div
                  draggable="true"
                  :data-config="JSON.stringify(item)"
                  class="history-cpt-item"
                  :title="item.name"
                  @dragstart="dragStart"
                >
                  <BSvgIcon v-if="item.icon" class="history-cpt-icon" :icon-class="item.icon" />
                  <i v-else class="el-icon-question history-cpt-icon" />
                  <div class="favorite-btn" @click.stop="toggleFavorite(item)">
                    <i :class="isFavorite(item) ? 'el-icon-star-on' : 'el-icon-star-off'"></i>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-collapse v-model="activeCptGroupNames" @change="changeCollapse" class="component-categories">
          <el-collapse-item 
            v-for="group in componentList" 
            :key="group.name" 
            :title="group.name" 
            :name="group.name"
          >
            <template slot="title">
              <div class="category-title">
                <BSvgIcon style="width: 15px; margin-right: 10px" icon-class="folder" />
                <span>{{ group.name }}</span>
                <span class="category-count">{{ group.children.filter(c => !c.hidden).length }}</span>
              </div>
            </template>
            
            <el-row :gutter="4">
              <template v-for="(item, index) in group.children">
                <el-col 
                  v-if="!item.hidden" 
                  :key="item.name + index" 
                  :span="cptItemSpan" 
                  class="cpt-item-col"
                >
                  <div
                    draggable="true"
                    :data-config="JSON.stringify(item)"
                    class="cpt-item"
                    :title="item.name"
                    :style="{
                      height: cptItemSpan === 8 ? '50px' : '70px'
                    }"
                    @dragstart="dragStart"
                  >
                    <div class="cpt-icon-wrap">
                      <BSvgIcon
                        v-if="item.icon"
                        class="cpt-icon"
                        :style="{
                          'font-size': cptItemSpan === 8 ? '20px' : '30px',
                          transition: 'all .3s'
                        }"
                        :icon-class="item.icon"
                      />
                      <i v-else class="cpt-icon-placeholder el-icon-question" />
                    </div>
                    <div v-show="cptItemSpan !== 8" class="cpt-title">{{ item.name }}</div>
                    <div class="cpt-actions">
                      <span class="favorite-btn" @click.stop="toggleFavorite(item)">
                        <i :class="isFavorite(item) ? 'el-icon-star-on' : 'el-icon-star-off'"></i>
                      </span>
                    </div>
                  </div>
                </el-col>
              </template>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="图层" name="layer" class="layer-tab">
        <div slot="label" style="display: flex; align-items: center">
          <BSvgIcon style="width: 15px; margin-right: 5px" icon-class="layer" />
          图层
          <span v-if="layerList.length" class="layer-count">{{ layerList.length }}</span>
        </div>
        <div v-if="layerList.length > 0" class="layer-actions">
          <el-button size="mini" type="text" @click="selectAllLayers">全选</el-button>
          <el-button size="mini" type="text" @click="hideAllLayers">隐藏全部</el-button>
          <el-button size="mini" type="text" @click="showAllLayers">显示全部</el-button>
          <el-input
            v-model="layerSearchKeys"
            placeholder="搜索图层"
            size="mini"
            clearable
            prefix-icon="el-icon-search"
            class="layer-search"
          />
        </div>
        <div v-show="layerList.length === 0" class="no-layers-tip">
          暂无图层，请切换至组件面板进行设计
        </div>
        <draggable
          v-model="layerList"
          :disabled="!isLayerDraggable"
          animation="300"
          class="layer-list"
          @start="startMoveLayer"
          @end="endMoveLayer"
        >
          <div
            v-for="(item, index) in filteredLayers"
            :id="`layer${item.id}`"
            :key="item.id"
            class="selected-item"
            :class="{ 'active-layer': isActiveLayer(index) }"
          >
            <div class="layer-drag-handle">
              <i class="el-icon-rank"></i>
            </div>
            <div class="layer-visibility" @click="changeCptVisible(item)">
              <i :class="item.hidden ? 'el-icon-view visibility-off' : 'el-icon-view'"></i>
            </div>
            <div class="layer-icon">
              <BSvgIcon :icon-class="item.icon" />
            </div>
            <div
              class="layer-name"
              :title="item.layerName"
              @click="selectLayer($event, item, index)"
            >
              {{ item.layerName }}
            </div>
            <div class="layer-info">
              <span class="layer-size">{{ Math.round(item.cptWidth) }}×{{ Math.round(item.cptHeight) }}</span>
            </div>
            <div class="layer-operation">
              <i class="el-icon-copy-document" title="复制图层" @click="copyCpt(item)" />
              <i class="el-icon-delete" title="删除图层" @click="delCpt(item, index)" />
            </div>
          </div>
        </draggable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
import componentList from '@/components/register/component-list'
import draggable from 'vuedraggable'

export default {
  name: 'ComponentPane',
  components: {
    draggable
  },
  data() {
    return {
      cptItemSpan: 12,
      searchCptResult: [],
      show: false,
      searchKeys: '',
      layerSearchKeys: '',
      activeTab: 'component',
      activeCptGroupNames: [],
      componentList: [],
      cptGroupKeys: [],
      isLayerDraggable: true,
      favoriteCpts: [],
      showFavorites: true,
      showHistory: true,
      currentExample: null,
      currentScreenType: null
    }
  },
  computed: {
    historyUsedCpts() {
      return this.$store.state.bigScreen.historyUsedCpts
    },
    layerList: {
      get() {
        return this.$store.state.bigScreen.componentList
      },
      set(value) {
        value.forEach((item, index) => {
          if (item.cptZ !== value.length - index) {
            const params = {
              id: item.id,
              data: { cptZ: value.length - index }
            }
            this.$store.dispatch('bigScreen/updateCptProp', params)
          }
        })
      }
    },
    filteredLayers() {
      if (!this.layerSearchKeys) return this.layerList
      return this.layerList.filter(layer => 
        layer.layerName.toLowerCase().includes(this.layerSearchKeys.toLowerCase())
      )
    }
  },
  watch: {
    searchKeys(newVal) {
      if (newVal === '') {
        this.searchCptResult = []
      } else {
        this.searchCptResult = []
        this.componentList.forEach(group => {
          group.children.forEach(_c => {
            if (_c.name.toLowerCase().includes(newVal.toLowerCase())) {
              this.searchCptResult.push(_c)
            }
          })
        })
      }
    },
    '$route'() {
      // 监听路由变化，更新组件数据
      this.updateComponentData()
    }
  },
  created() {
    const savedFavorites = localStorage.getItem('favoriteCpts')
    if (savedFavorites) {
      try {
        this.favoriteCpts = JSON.parse(savedFavorites)
      } catch (e) {
        this.favoriteCpts = []
      }
    }
    
    // 初始化组件数据
    this.updateComponentData()
  },
  methods: {
    async updateComponentData() {
      const { type } = this.$route.params
      const { example } = this.$route.query
      
      // 如果参数没有变化，不需要重新加载
      if (this.currentScreenType === type && this.currentExample === example) {
        return
      }
      
      this.currentScreenType = type
      this.currentExample = example
      
      try {
        if (type && example) {
          // 如果有类型和示例，尝试获取对应的组件数据
          const { getBigscreenComponents } = await import('@/api/bigscreen')
          const componentsData = await getBigscreenComponents(type, example)

          // 基于原始组件列表，更新组件的默认数据
          this.componentList = this.updateComponentListWithExampleData(componentList, componentsData)
        } else {
          // 没有示例时使用默认组件列表
          this.componentList = [...componentList]
        }
      } catch (error) {
        // 获取失败时使用默认数据
        this.componentList = [...componentList]
      }
      
      // 更新折叠面板状态
      if (this.componentList.length > 0) {
        this.activeCptGroupNames = [this.componentList[0].name]
      }
    },
    
    updateComponentListWithExampleData(originalList, exampleData) {
      if (!exampleData) return [...originalList]
      
      return originalList.map(group => ({
        ...group,
        children: group.children.map(component => {
          const componentType = component.componentName
          if (exampleData[componentType]) {
            // 更新组件的默认配置
            return {
              ...component,
              props: {
                ...component.props,
                ...exampleData[componentType]
              }
            }
          }
          return { ...component }
        })
      }))
    },
    
    changeColSpan(span) {
      this.cptItemSpan = span
    },
    changeCptVisible(cpt) {
      const { id, hidden } = cpt
      const params = {
        id,
        data: { hidden: !hidden }
      }
      this.$store.dispatch('bigScreen/updateCptProp', params)
    },
    changeTab() {
      if (this.activeTab === 'layer') {
        const currentIndex = this.$store.state.bigScreen.curComponentIndex
        if (currentIndex >= 0) {
          this.$nextTick(() => {
            const activeLayer = document.getElementById(`layer${this.layerList[currentIndex].id}`)
            if (activeLayer) {
              activeLayer.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
          })
        }
      }
    },
    changeCollapse() {},
    isActiveLayer(index) {
      return this.$store.state.bigScreen.curComponentIndex === index
    },
    dragStart(e) {
      const copyDom = e.currentTarget.cloneNode(true)
      this.$emit('dragStart', copyDom)
    },
    selectLayer(e, item, index) {
      this.$emit('showConfigPane', e, item, index)
    },
    copyCpt(item) {
      this.$emit('copyCpt', item)
    },
    delCpt(item, index) {
      this.$emit('delCpt', item, index)
    },
    startMoveLayer() {
      // 动画效果可以在这里添加
    },
    endMoveLayer() {
      this.$message({
        message: '图层顺序已更新',
        type: 'success',
        duration: 1000
      })
    },
    clearSearch() {
      this.searchKeys = ''
      this.searchCptResult = []
    },
    isFavorite(item) {
      return this.favoriteCpts.some(fav => fav.componentName === item.componentName && fav.name === item.name)
    },
    toggleFavorite(item) {
      const isAlreadyFavorite = this.isFavorite(item)
      
      if (isAlreadyFavorite) {
        this.favoriteCpts = this.favoriteCpts.filter(
          fav => !(fav.componentName === item.componentName && fav.name === item.name)
        )
        this.$message({
          message: `已从收藏中移除 ${item.name}`,
          type: 'info',
          duration: 1000
        })
      } else {
        this.favoriteCpts.push({ ...item })
        this.$message({
          message: `已将 ${item.name} 添加到收藏`,
          type: 'success',
          duration: 1000
        })
      }
      
      localStorage.setItem('favoriteCpts', JSON.stringify(this.favoriteCpts))
    },
    selectAllLayers() {
      this.$emit('selectAllLayers')
    },
    hideAllLayers() {
      this.layerList.forEach(layer => {
        if (!layer.hidden) {
          this.changeCptVisible(layer)
        }
      })
    },
    showAllLayers() {
      this.layerList.forEach(layer => {
        if (layer.hidden) {
          this.changeCptVisible(layer)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.bar {
  position: relative;
  width: 100%;
  height: 100%;
  color: #fff;
  overflow-x: hidden;
  overflow-y: scroll;
  
  // 标签样式优化
  /deep/ .el-tabs {
    height: 100%;
    background: #2c2c2c;
    color: #fff;
    
    .el-tabs__header {
      margin: 0;
      border-bottom: 1px solid #1a1a1a;
      
      .el-tabs__nav-wrap {
        .el-tabs__nav-scroll {
          .el-tabs__nav {
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            background: #333;
            user-select: none;
            
            .el-tabs__item {
              transition: all 0.2s ease;
              padding: 10px 0 !important;
              font-size: 13px;
              height: 40px;
              line-height: 20px;
              opacity: 0.7;
              
              &.is-active {
                color: #4a9eff !important;
                border-bottom: 2px solid #4a9eff;
                opacity: 1;
              }
            }
          }
        }
        &::after {
          display: none;
        }
      }
    }
    
    // Tab内容区域
    .el-tabs__content {
      background: #2d333f;
      height: calc(100% - 40px);
      overflow-x: hidden;
      overflow-y: scroll;
      
      .el-tab-pane {
        padding: 10px 0;
        
        // 组件分类折叠面板
        .component-categories {
          border: none;
          margin-top: 10px;
          
          .el-collapse-item {
            &__header {
              height: 40px !important;
              padding: 0 10px;
              color: #e0e0e0;
              background: #3a3a3a;
              border-bottom: 1px solid #222;
              
              &:hover {
                background: #444;
                .category-title {
                  .category-count {
                    visibility: visible;
                  }
                }
              }
              
              .category-title {
                display: flex;
                align-items: center;
                width: 100%;
                
                .category-count {
                  width: 10px;
                  height: 10px;
                  line-height: 10px;
                  margin-left: auto;
                  visibility: hidden;
                  // background: #555;
                  padding: 2px 8px;
                  // border-radius: 10px;
                  font-size: 10px;
                }
              }
            }
            
            &__wrap {
              border-bottom: none;
            }
            
            &__content {
              background: #2d333f;
              padding: 10px 0;
              color: #fff;
            }
          }
        }
      }
    }
  }
  
  // 搜索组件样式优化
  .search-cpt {
    margin: 10px;
    position: relative;
    
    .search-operation {
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      .el-input {
        flex-grow: 1;
        margin-right: 8px;
        
        /deep/ .el-input__inner {
          background: #3a3a3a;
          color: #fff;
          border-color: #555;
          border-radius: 4px;
          height: 32px;
          
          &:focus {
            border-color: #4a9eff;
            box-shadow: 0 0 5px rgba(74, 158, 255, 0.3);
          }
        }
      }
      
      .switch-cpt-view-mode {
        display: flex;
        align-items: center;
        
        &-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          color: #999;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
          
          &:hover {
            color: #fff;
            background: #444;
          }
          
          &.active {
            color: #4a9eff;
            background: #2a2a2a;
          }
        }
      }
    }
    
    // 搜索结果优化
    .search-result {
      position: absolute;
      z-index: 100;
      top: 40px;
      left: 0;
      right: 0;
      background: #3a3a3a;
      border-radius: 4px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
      overflow: hidden;
      
      .search-result-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 12px;
        background: #444;
        font-size: 12px;
        color: #ccc;
        
        .close-search {
          cursor: pointer;
          
          &:hover {
            color: #fff;
          }
        }
      }
      
      .search-result-list {
        max-height: 300px;
        overflow-y: auto;
        
        .search-result-item-wrapper {
          padding: 4px 8px;
          
          &:hover {
            background: #444;
          }
        }
        
        .search-result-cpt-item {
          display: flex;
          align-items: center;
          padding: 8px;
          border-radius: 4px;
          cursor: grab;
          
          .search-item-icon {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 8px;
            color: #4a9eff;
          }
          
          .search-item-name {
            flex-grow: 1;
            font-size: 13px;
          }
          
          .favorite-btn {
            opacity: 0.6;
            cursor: pointer;
            color: #f8d255;
            
            &:hover {
              opacity: 1;
            }
            
            .el-icon-star-on {
              color: #f8d255;
            }
          }
        }
      }
    }
  }
  
  // 收藏组件区域样式
  .favorite-cpts-section, .history-cpts-section {
    margin: 10px;
    background: #343a47;
    border-radius: 4px;
    overflow: hidden;
    
    .section-header {
      display: flex;
      align-items: center;
      padding: 10px;
      background: #3a3a3a;
      color: #e0e0e0;
      font-size: 13px;
      border-bottom: 1px solid #262626;
      cursor: pointer;
      user-select: none;
      
      .section-toggle {
        margin-left: auto;
        cursor: pointer;
        
        &:hover {
          color: #4a9eff;
        }
      }
    }
    
    .favorite-cpts-container {
      padding: 10px;
      
      .favorite-cpt-item {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 70px;
        margin-bottom: 8px;
        background: #3a3a3a;
        border-radius: 4px;
        cursor: grab;
        overflow: hidden;
        transition: all 0.2s;
        
        &:hover {
          background: #444;
          transform: translateY(-2px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          
          .remove-favorite {
            opacity: 1;
          }
        }
        
        .favorite-cpt-icon {
          font-size: 24px;
          color: #4a9eff;
          margin-bottom: 6px;
        }
        
        .favorite-cpt-name {
          font-size: 11px;
          max-width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 0 8px;
        }
        
        .remove-favorite {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.2s;
          
          &:hover {
            background: rgba(255, 0, 0, 0.5);
          }
        }
      }
    }
  }
  
  // 最近使用组件区域
  .history-used-cpts {
    padding: 10px;
    
    .history-cpt-item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      margin-bottom: 8px;
      background: #3a3a3a;
      border-radius: 4px;
      cursor: grab;
      transition: all 0.2s;
      
      &:hover {
        background: #444;
        transform: translateY(-2px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        
        .favorite-btn {
          opacity: 1;
        }
      }
      
      .history-cpt-icon {
        font-size: 20px;
        color: #4a9eff;
      }
      
      .favorite-btn {
        position: absolute;
        bottom: 4px;
        right: 4px;
        opacity: 0;
        transition: opacity 0.2s;
        color: #f8d255;
        
        .el-icon-star-on {
          color: #f8d255;
        }
      }
    }
  }
  
  // 组件项样式优化
  .cpt-item-col {
    transition: all 0.3s;
  }
  
  .cpt-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: grab;
    background-color: #3a3a3a;
    text-align: center;
    margin-bottom: 8px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.2s;
    overflow: hidden;
    
    .cpt-icon-wrap {
      line-height: 40px;
      
      .cpt-icon {
        color: #4a9eff;
      }
      
      .cpt-icon-placeholder {
        font-size: 20px;
      }
    }
    
    .cpt-title {
      font-size: 11px;
      padding: 0 8px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 100%;
    }
    
    .cpt-actions {
      position: absolute;
      bottom: 4px;
      right: 4px;
      opacity: 0;
      transition: opacity 0.2s;
      
      .favorite-btn {
        cursor: pointer;
        color: #f8d255;
        
        .el-icon-star-on {
          color: #f8d255;
        }
      }
    }
    
    &:hover {
      background-color: #444;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      
      .cpt-actions {
        opacity: 1;
      }
    }
  }
  
  // 图层面板样式优化
  .layer-tab {
    .layer-count {
      margin-left: 5px;
      background: #4a9eff;
      color: #fff;
      padding: 0 6px;
      border-radius: 10px;
      font-size: 11px;
    }
    
    .layer-actions {
      display: flex;
      align-items: center;
      padding: 5px 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #444;
      
      .el-button {
        margin-right: 8px;
        color: #ccc;
        font-size: 12px;
        
        &:hover {
          color: #4a9eff;
        }
      }
      
      .layer-search {
        margin-left: auto;
        width: 120px;
        
        /deep/ .el-input__inner {
          background: #3a3a3a;
          color: #fff;
          border-color: #555;
          border-radius: 4px;
          height: 28px;
        }
      }
    }
    
    .no-layers-tip {
      text-align: center;
      padding: 30px 0;
      color: #999;
      font-size: 13px;
    }
    
    .layer-list {
      padding: 0 10px;
    }
  }
  
  // 图层项样式优化
  .selected-item {
    display: flex;
    align-items: center;
    padding: 8px;
    margin-bottom: 8px;
    background: #3a3a3a;
    border-radius: 4px;
    border: 1px solid transparent;
    transition: all 0.2s;
    
    &.active-layer {
      background: #344056;
      border-color: #4a9eff;
    }
    
    .layer-drag-handle {
      margin-right: 8px;
      cursor: move;
      color: #777;
      
      &:hover {
        color: #ccc;
      }
    }
    
    .layer-visibility {
      margin-right: 8px;
      cursor: pointer;
      
      .el-icon-view {
        font-size: 16px;
        color: #4a9eff;
        
        &.visibility-off {
          color: #999;
          opacity: 0.6;
        }
      }
    }
    
    .layer-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      margin-right: 8px;
      
      .bs-svg-icon {
        font-size: 16px;
        color: #ccc;
      }
    }
    
    .layer-name {
      flex-grow: 1;
      font-size: 13px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
    }
    
    .layer-info {
      margin-right: 8px;
      
      .layer-size {
        font-size: 11px;
        color: #999;
        background: #2a2a2a;
        padding: 2px 4px;
        border-radius: 2px;
      }
    }
    
    .layer-operation {
      display: flex;
      align-items: center;
      opacity: 0;
      transition: opacity 0.2s;
      
      i {
        margin-left: 8px;
        font-size: 16px;
        cursor: pointer;
        color: #ccc;
        
        &:hover {
          color: #4a9eff;
          
          &.el-icon-delete {
            color: #ff0000;
          }
        }
      }
    }
  }
}
</style>
