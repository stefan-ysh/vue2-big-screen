<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <el-form label-width="85px" size="mini">
      <el-form-item label="类型">
        <el-select v-model="attribute.type" popper-class="big-screen-select">
          <el-option value="button" label="按钮" />
          <el-option value="radio" label="选项" />
        </el-select>
      </el-form-item>
      <el-form-item label="默认值">
        <el-select v-model="attribute.defaultValue" popper-class="big-screen-select">
          <el-option v-for="tab in tabList" :key="tab.value" :label="tab.label" :value="tab.value" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="按钮尺寸">
        <el-select v-model="attribute.size" popper-class="big-screen-select">
          <el-option value="mini" label="迷你" />
          <el-option value="small" label="小" />
          <el-option value="medium" label="中" />
        </el-select>
      </el-form-item> -->
      <el-form-item label="事件">
        <el-switch v-model="attribute.event" />
      </el-form-item>
      <el-form-item v-if="attribute.event" label="事件类型">
        <el-select v-model="attribute.eType" popper-class="big-screen-select">
          <el-option label="组件" value="cpt" />
          <el-option label="传参" value="params" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="attribute.event && attribute.eType === 'cpt'" class="event-wrap">
        <el-row :gutter="10">
          <el-col :span="11">选项</el-col>
          <el-col :span="11">组件</el-col>
          <el-col :span="2" />
        </el-row>
        <el-row v-for="(ev, index) in attribute.eventList" :key="index" :gutter="10">
          <el-col :span="11">
            <el-select v-model="ev.tab" popper-class="big-screen-select">
              <el-option v-for="tab in tabList" :key="tab.value" :label="tab.label" :value="tab.value" />
            </el-select>
          </el-col>
          <el-col :span="11">
            <el-select
              v-model="ev.cpt"
              multiple
              :style="{
                visibility: ev.tab === 'refreshCanvas' ? 'hidden' : ''
              }"
              popper-class="big-screen-select"
            >
              <el-option v-for="cpt in componentList" :key="cpt.id" :label="cpt.layerName" :value="cpt.id" />
            </el-select>
          </el-col>
          <el-col :span="2">
            <i class="del-row-btn el-icon-delete" title="删除事件" @click="delRow(index)" />
          </el-col>
        </el-row>
        <el-button class="add-row-btn" @click="addRow">+</el-button>
      </el-form-item>
      <el-form-item v-if="attribute.event && attribute.eType === 'params'" label="传参">
        <el-button @click="showParamsEdit('params')">编辑</el-button>
      </el-form-item>
      <el-form-item v-show="attribute.type === 'button'" label="文字颜色">
        <BColorPicker field="textColor" :data="attribute" />
      </el-form-item>
      <el-form-item v-show="attribute.type === 'button'" label="激活文字颜色">
        <BColorPicker field="activeTextColor" :data="attribute" />
      </el-form-item>
      <el-form-item v-show="attribute.type === 'button'" label="背景颜色">
        <BColorPicker field="fill" :data="attribute" />
      </el-form-item>
      <el-form-item v-show="attribute.type === 'button'" label="激活背景颜色">
        <BColorPicker field="activeFill" :data="attribute" />
      </el-form-item>
      <el-form-item v-show="attribute.type === 'button'" label="边框颜色">
        <BColorPicker field="borderColor" :data="attribute" />
      </el-form-item>
      <el-form-item v-show="attribute.type === 'button'" label="激活边框颜色">
        <BColorPicker field="activeBorderColor" :data="attribute" />
      </el-form-item>
      <el-form-item v-show="attribute.type === 'button'" label="按钮圆角">
        <el-input-number v-model="attribute.borderRadius" controls-position="right" style="width: 100%" />
      </el-form-item>
      <el-form-item label="排列方向">
        <el-radio-group v-model="attribute.flexDirection">
          <el-radio-button
            v-for="(item, index) in [
              { value: 'row', label: '横向' },
              { value: 'column', label: '纵向' }
            ]"
            :key="index"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="选项宽度">
        <el-input-number v-model="attribute.radioWidth" controls-position="right" style="width: 100%" />
      </el-form-item>
      <el-form-item label="选项高度">
        <el-input-number v-model="attribute.radioHeight" controls-position="right" style="width: 100%" />
      </el-form-item>
      <el-form-item v-show="attribute.type === 'button'" label="文字位置">
        <el-select v-model="attribute.textAlign" popper-class="big-screen-select">
          <el-option value="left" label="左" />
          <el-option value="center" label="中" />
          <el-option value="right" label="右" />
        </el-select>
      </el-form-item>
      <el-form-item label="按钮间距">
        <el-input-number v-model="attribute.gap" controls-position="right" style="width: 100%" />
      </el-form-item>
      <el-form-item label="文字大小">
        <el-input-number v-model="attribute.fontSize" controls-position="right" style="width: 100%" />
      </el-form-item>
    </el-form>
    <el-dialog :visible="visible" title="传参设置" @open="openParamsDialog">
      <div>
        <el-row>
          <el-col :span="6">组件</el-col>
          <el-col :span="6">参数名</el-col>
          <el-col :span="3">值来源</el-col>
          <el-col :span="6">参数值</el-col>
          <el-col :span="3">操作</el-col>
        </el-row>
        <el-row v-for="(p, i) in attribute.paramsList" :key="i">
          <el-col :span="6">
            <el-select v-model="p.paramsCpt" size="mini" multiple popper-class="big-screen-select">
              <el-option v-for="cpt in componentList" :key="cpt.id" :label="cpt.layerName" :value="cpt.id" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-input v-model="p.paramsName" size="mini" />
          </el-col>
          <el-col :span="3">
            <el-select v-model="p.paramsSource" size="mini" popper-class="big-screen-select">
              <el-option value="selectItemValue" label="选项值" />
              <el-option value="customValue" label="自定义" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-input
              v-model="p.paramsVal"
              :style="p.paramsSource !== 'customValue' ? 'visibility:hidden;' : ''"
              size="mini"
            />
          </el-col>
          <el-col :span="3">
            <i class="del-row-btn el-icon-delete" title="删除" @click="delParamsRow(i)" />
          </el-col>
        </el-row>
        <el-row>
          <el-button style="width: 100%; margin-top: 10px; border: none" size="mini" @click="addParamsRow">+</el-button>
        </el-row>
      </div>
      <div slot="footer">
        <el-button @click="clacelParamsSetting">取消</el-button>
        <el-button @click="confirmParamsSetting">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BColorPicker from '@/components/BColorPicker.vue'
export default {
  name: 'BRadioSetter',
  components: {
    BColorPicker
  },
  props: {
    attribute: { type: Object, default: () => {} },
    cptDataForm: { type: Object, default: () => {} },
    currentCpt: { type: Object, default: () => {} }
  },
  data() {
    return {
      visible: false,
      tempValParams: []
    }
  },
  computed: {
    componentList() {
      return this.$store.state.bigScreen.componentList
    },
    tabList() {
      return JSON.parse(this.cptDataForm.dataText)
    }
  },
  methods: {
    addRow() {
      // eslint-disable-next-line vue/no-mutating-props
      this.attribute.eventList.push({})
    },
    addParamsRow() {
      // eslint-disable-next-line vue/no-mutating-props
      this.attribute.paramsList.push({})
    },
    delParamsRow(i) {
      // eslint-disable-next-line vue/no-mutating-props
      this.attribute.paramsList.splice(i, 1)
    },
    delRow(idx) {
      // eslint-disable-next-line vue/no-mutating-props
      this.attribute.eventList.splice(idx, 1)
    },
    showParamsEdit() {
      this.visible = true
    },
    openParamsDialog() {
      this.tempValParams = this._.cloneDeep(this.attribute.paramsList)
    },
    clacelParamsSetting() {
      // eslint-disable-next-line vue/no-mutating-props
      this.attribute.paramsList = this.tempValParams
      this.visible = false
    },
    confirmParamsSetting() {
      this.visible = false
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

  /deep/ .el-form-item__content {
    margin-left: 0 !important;
  }
}
</style>
