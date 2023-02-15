<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="bar">
    <el-tabs v-model="activeTab" @tab-click="changeTab">
      <el-tab-pane label="组件" name="component" class="cpt-list">
        <div slot="label" style="display: flex; align-items: center">
          <SvgIcon style="width: 15px; margin-right: 5px" icon-class="puzzle" />
          组件
        </div>
        <div class="search-cpt">
          <el-input v-model="searchKeys" placeholder="搜索组件" size="mini" clearable />
          <div v-show="searchCptResult.length > 0">
            搜索结果
            <el-col v-for="(item, index) in searchCptResult" :key="item.name + index" :span="12">
              <div draggable="true" :config="JSON.stringify(item)" class="cpt-item" @dragstart="dragStart">
                <div style="line-height: 40px">
                  <SvgIcon v-if="item.icon" style="width: 20px" :icon-class="item.icon" />
                  <i v-else style="font-size: 20px" class="el-icon-question" />
                </div>
                <div style="font-size: 13px">{{ item.name }}</div>
              </div>
            </el-col>
          </div>
        </div>
        <el-collapse v-model="activeCptGroupNames" @change="changeCollapse">
          <el-collapse-item v-if="historyUsedCpts.length > 0" title="最近使用" name="最近使用">
            <template slot="title">
              <SvgIcon style="width: 15px; margin-right: 10px" class="cpt-icon" icon-class="history" />
              <span> 最近使用 </span>
            </template>
            <div class="history-used-cpts">
              <el-row>
                <el-col v-for="(item, index) in historyUsedCpts" :key="item.name + index" :span="6">
                  <div
                    draggable="true"
                    :config="JSON.stringify(item)"
                    class="history-cpt-item"
                    :title="item.name"
                    @dragstart="dragStart"
                  >
                    <!-- 图标 -->
                    <SvgIcon v-if="item.icon" class="cpt-icon" :icon-class="item.icon" />
                    <!-- 未设置图标时的占位图标 -->
                    <i v-else style="font-size: 10px" class="el-icon-question" />
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-collapse-item>
          <el-collapse-item v-for="group in componentList" :key="group.name" :title="group.name" :name="group.name">
            <el-row :gutter="2">
              <template v-for="(item, index) in group.children">
                <el-col v-if="!item.hidden" :key="item.name + index" :span="8">
                  <div
                    draggable="true"
                    :config="JSON.stringify(item)"
                    class="cpt-item"
                    :title="item.name"
                    @dragstart="dragStart"
                  >
                    <div class="cpt-icon-wrap">
                      <!-- 组件图标 -->
                      <SvgIcon v-if="item.icon" class="cpt-icon" :icon-class="item.icon" />
                      <!-- 未设置图标时的占位图标 -->
                      <i v-else class="cpt-icon-placeholder el-icon-question" />
                    </div>
                    <div class="cpt-title">{{ item.name }}</div>
                  </div>
                </el-col>
              </template>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="图层" name="layer">
        <div slot="label" style="display: flex; align-items: center">
          <SvgIcon style="width: 15px; margin-right: 5px" icon-class="layer" />

          图层
        </div>
        <div v-show="layerList.length === 0" style="text-align: center; line-height: 50px">
          <!-- todo 不存在图层则直接不可切换 tab -->
          暂无图层，请切换至组件面板进行设计
        </div>
        <draggable
          v-model="layerList"
          :disabled="!isLayerDraggable"
          animation="300"
          style="padding: 0 0 0 10px"
          @start="startMoveLayer"
          @end="endMoveLayer"
        >
          <!-- 图层 -->
          <el-row
            v-for="(item, index) in layerList"
            :key="item.id"
            class="selected-item"
            :gutter="1"
            :style="{
              background: isActiveLayer(index) ? '#2f3f62' : '#1c1f24',
              border: isActiveLayer(index) ? '1px solid #409eff' : ''
            }"
          >
            <el-col :span="3">
              <i class="el-icon-view" :style="{ opacity: item.hidden ? '0.2' : '1' }" @click="changeCptVisible(item)" />
            </el-col>
            <!-- 图层图标 -->
            <el-col :span="4" style="display: flex">
              <embed class="cpt-icon" :src="require('@/assets/icons/svg/' + item.icon + '.svg')" type="image/svg+xml" />
            </el-col>
            <!-- 图层名称 -->
            <el-col
              :title="item.layerName"
              class="layer-name"
              :span="12"
              @click.native="selectLayer($event, item, index)"
              >{{ item.layerName }}</el-col
            >
            <!-- 图层操作 -->
            <el-col :span="5" class="layer-operation">
              <!-- 复制图层 -->
              <i class="el-icon-copy-document" @click="copyCpt(item)" />
              <!-- 删除图层 -->
              <i class="el-icon-delete" @click="delCpt(item, index)" />
            </el-col>
          </el-row>
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
      searchCptResult: [],
      searchKeys: '',
      // 当前激活的 tab 面板
      activeTab: 'component',
      // 激活组件分组面板数组
      activeCptGroupNames: [],
      componentList,
      cptGroupKeys: [],
      // 图层是否可拖拽
      isLayerDraggable: true
    }
  },
  computed: {
    // 历史使用组件记录
    historyUsedCpts() {
      return this.$store.state.bigScreen.historyUsedCpts
    },
    // 图层列表
    layerList() {
      return this.$store.state.bigScreen.componentList
    }
  },
  watch: {
    // todo 搜索组件功能及样式待优化
    searchKeys(newVal, oldVal) {
      if (newVal === '') {
        this.searchCptResult = []
      } else {
        componentList.forEach(group => {
          group.children.forEach(_c => {
            if (_c.name.includes(newVal)) {
              this.searchCptResult.push(_c)
            }
          })
        })
      }
    }
  },
  methods: {
    changeCptVisible(cpt) {
      const { id, hidden } = cpt
      const params = {
        id,
        data: { hidden: !hidden }
      }
      this.$store.dispatch('bigScreen/updateCptProp', params)
    },
    // 切换左侧tab：组件/图层
    changeTab() {},
    // 折叠面板改变触发，即切换组件分组
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
    // 开始移动图层
    startMoveLayer(event) {},
    // 结束移动图层
    endMoveLayer() {}
  }
}
</script>

<style scoped lang="less">
.bar {
  position: relative;
  width: 100%;
  height: 100%;
  // background: #2d333f;
  color: #fff;
  overflow-x: hidden;
  overflow-y: scroll;
  /deep/ .el-tabs {
    height: 100%;
    background: rgb(57, 57, 58);
    color: #fff;
    .el-tabs__header {
      margin: 0;
      .el-tabs__nav-wrap {
        .el-tabs__nav-scroll {
          .el-tabs__nav {
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            // tab 切换栏背景色
            background: #414c5c;
            // 标题禁止选中，减少视觉压力
            user-select: none;
            &.is-top {
              // background: red;
            }
            .el-tabs__item {
              transition: all 0.3s linear;
              padding: 5px 0 5px !important;
              opacity: 0.5;
              &.is-active {
                color: #fff !important;
                // border-right: 2px solid #33B8EC;
                border-bottom: 2px solid #33b8ec;
                // border-left: 3px solid #000;
                // border-top: 3px solid #000;
                opacity: 1;
                padding: 0 5px !important;
              }
            }
          }
        }
        &::after {
          display: none;
        }
      }
    }
    .el-tabs__content {
      background: #2d333f;
      height: calc(100% - 40px);
      overflow-x: hidden;
      overflow-y: scroll;
      .el-tab-pane {
        .el-collapse {
          border-top: none;
          margin-top: 10px;
          &-item {
            &__header {
              padding: 0 10px;
              color: #fff;
              background: #39393a;
              border-bottom: 1px solid #1d1e1f;
            }
            &__wrap {
              border-bottom: none;
            }
            &__content {
              background: #2d333f;
              color: #fff;
            }
          }
        }
      }
      .cpt-list {
        .search-cpt {
          margin-top: 10px;
          .el-input {
            &__inner {
              background: #39393a;
              color: #fff;
              border-color: #666666;
            }
          }
        }
        .history-used-cpts {
          background: rgb(29, 30, 31);
          width: 200px;
          height: 90px;
          text-align: center;
          overflow: scroll;
          .history-cpt-item {
            width: 40px;
            height: 40px;
            transition: all 0.3s;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            &:hover {
              border-right: 1px solid #33b8ec;
              border-bottom: 1px solid #33b8ec;
              border-left: 3px solid #000;
              border-top: 3px solid #000;
            }
          }
        }
      }
    }
    .el-tabs__item {
      color: #fff;
      background: #414c5c;
      &.is-active {
        color: #1890ff;
      }
    }
    .el-tabs__active-bar {
      display: none;
    }
  }
}

.selected-item {
  border-radius: 10px;
  cursor: pointer;
  // box-shadow: 0 1px 3px #2b3340 inset;
  margin: 10px;
  padding: 0 5px;
  border: 1px solid #2a2e33;
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .cpt-icon {
    width: 60%;
  }
  .layer-name {
    // 文字长度超出限定宽度，则隐藏超出的内容
    overflow: hidden;
    // 设置文字在一行显示，不能换行
    white-space: nowrap;
    // 规定当文本溢出时，显示省略符号来代表被修剪的文本
    text-overflow: ellipsis;
  }
  .layer-operation {
    visibility: hidden;
    display: flex;
    justify-content: space-between;
  }
  &:hover {
    background: #313132 !important;
    .layer-operation {
      visibility: visible;
    }
  }
}
.cpt-item {
  cursor: pointer;
  background-color: #3f4b5f;
  height: 70px;
  text-align: center;
  margin-top: 10px;
  box-sizing: border-box;
  position: relative;
  box-shadow: none;
  transition: all 0.2s ease-in;
  .cpt-icon-wrap {
    line-height: 40px;
    .cpt-icon {
      // width: 20px;
      font-size: 16px;
    }
    .cpt-icon-placeholder {
      font-size: 20px;
    }
  }
  .cpt-title {
    font-size: 13px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &:hover {
    background-color: #4b689b;
    z-index: 2;
    transform: scale(1.1);
    animation: 0.5s draw linear forwards;
  }
}
</style>
