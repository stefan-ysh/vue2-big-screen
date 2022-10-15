<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <el-form label-width="80px" size="mini">
      <el-form-item label="事件">
        <el-switch v-model="attribute.event" />
      </el-form-item>
      <el-form-item v-if="attribute.event" label="事件类型">
        <el-select v-model="attribute.eType">
          <el-option label="跳转" value="url" />
          <el-option label="组件" value="cpt" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="attribute.event && attribute.eType === 'url'">
        <span slot="label">
          跳转链接
          <el-tooltip
            effect="dark"
            content="跳转至外部链接请填写完整路径，如：https://www.baidu.com"
            placement="left"
          >
            <i class="el-icon-warning" />
          </el-tooltip>
        </span>
        <el-input v-model="attribute.url" :rows="3" />
      </el-form-item>
      <el-form-item v-if="attribute.event && attribute.eType === 'cpt'" class="event-wrap">
        <el-row :gutter="10">
          <el-col :span="11">交互方式</el-col>
          <el-col :span="11">交互组件</el-col>
          <el-col :span="2" />
        </el-row>
        <el-row v-for="(ev, index) in attribute.eventList" :key="index" :gutter="10">
          <el-col :span="11">
            <el-select v-model="ev.eMode">
              <el-option label="刷新组件" value="refreshCpt" />
              <el-option label="刷新页面" value="refreshCanvas" />
              <el-option label="组件显隐" value="hidden" />
            </el-select>
          </el-col>
          <el-col :span="11">
            <el-select v-model="ev.cpt" :style="{visibility: ev.eMode === 'refreshCanvas' ? 'hidden' : ''}">
              <el-option v-for="cpt in componentList" :key="cpt.id" :label="cpt.layerName" :value="cpt.id" />
            </el-select>
          </el-col>
          <el-col :span="2">
            <i class="del-row-btn el-icon-delete" title="删除事件" @click="delRow(index)" />
          </el-col>
        </el-row>
        <el-button class="add-row-btn" @click="addRow">+</el-button>
      </el-form-item>
      <el-form-item label="背景颜色">
        <BColorPicker field="bgColor" :data="attribute" />

      </el-form-item>
      <el-form-item label="文字大小">
        <el-input-number v-model="attribute.fontSize" controls-position="right" style="width: 100%" />
      </el-form-item>
      <el-form-item label="文本颜色">
        <BColorPicker field="textColor" :data="attribute" />
      </el-form-item>
      <el-form-item label="按钮圆角">
        <el-input-number v-model="attribute.radius" controls-position="right" style="width: 100%" :min="0" :max="500" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import BColorPicker from '@/components/BColorPicker.vue'
export default {
  name: 'BButtonSetter',
  components: {
    BColorPicker
  },
  props: { attribute: { type: Object, default: () => {} } },
  data () {
    return {}
  },
  computed: {
    componentList () {
      return this.$store.state.bigScreen.componentList
    }
  },
  methods: {
    addRow () {
      // eslint-disable-next-line vue/no-mutating-props
      this.attribute.eventList.push({})
    },
    delRow (idx) {
      // eslint-disable-next-line vue/no-mutating-props
      this.attribute.eventList.splice(idx, 1)
    }
  }
}
</script>

<style scoped lang="less">
.event-wrap {
    background: #353b47;
    // padding-bottom: 10px;
    padding: 0 10px;
    border-radius: 5px;
  .el-row {
    font-size: 12px !important;
    .el-col {
      margin-top: 10px;
      .del-row-btn {
        cursor: pointer;
        &:hover {
          color: red;
        }
      }
    }
  }

  .add-row-btn {
    width: 100%;
    margin-top: 5px;
    border: none;
  }

  /deep/  .el-form-item__content {
    margin-left: 0 !important;
  }
}

</style>
