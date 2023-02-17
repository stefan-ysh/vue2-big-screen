<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <el-form labelWidth="100px" size="mini">
      <el-form-item label="显示序号">
        <el-switch v-model="attribute.showIndex" size="mini" />
      </el-form-item>
      <el-form-item label="显示表头">
        <el-switch v-model="attribute.thead" size="mini" />
      </el-form-item>
      <el-form-item v-show="attribute.thead" label="表头高度">
        <el-input-number
          v-model="attribute.theadHeight"
          style="width: 100%"
          controls-position="right"
          size="mini"
          :min="1"
          :max="800"
        />
      </el-form-item>
      <el-form-item v-show="attribute.thead" label="表头背景">
        <el-color-picker v-model="attribute.theadBg[0]" size="mini" />
        <el-color-picker v-model="attribute.theadBg[1]" size="mini" />
      </el-form-item>
      <el-form-item v-show="attribute.thead" label="表头字色">
        <BColorPicker :data="attribute" field="theadColor" size="mini" />
      </el-form-item>
      <el-form-item v-show="attribute.thead" label="表头字号">
        <el-input-number
          v-model="attribute.theadSize"
          controls-position="right"
          size="mini"
          style="width: 100%"
          :min="1"
          :max="200"
        />
      </el-form-item>
      <el-form-item label="表格字色">
        <BColorPicker :data="attribute" field="tbodyColor" size="mini" />
      </el-form-item>
      <el-form-item label="表格字号">
        <el-input-number
          v-model="attribute.tbodySize"
          controls-position="right"
          size="mini"
          :min="1"
          style="width: 100%"
          :max="200"
        />
      </el-form-item>
      <el-form-item label="表格字重">
        <el-select v-model="attribute.tbodyFontWeight" popper-class="big-screen-select">
          <el-option label="更细" value="lighter" />
          <el-option label="正常" value="normal" />
          <el-option label="加粗" value="bold" />
        </el-select>
      </el-form-item>
      <el-form-item label="表格斜体">
        <el-select v-model="attribute.tbodyFontStyle" popper-class="big-screen-select">
          <el-option label="正常" value="normal" />
          <el-option label="斜体" value="italic" />
        </el-select>
      </el-form-item>
      <el-form-item label="表格字体">
        <el-select v-model="attribute.tbodyFontFamily" popper-class="big-screen-select">
          <el-option v-for="(item, index) in textFamilyList" :key="index + item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="奇数行背景">
        <BColorPicker :data="attribute" field="oddRowBg" size="mini" show-alpha />
      </el-form-item>
      <el-form-item label="偶数行背景">
        <BColorPicker :data="attribute" field="evenRowBg" size="mini" show-alpha />
      </el-form-item>
      <el-form-item label="显示行数">
        <el-input-number
          v-model="attribute.showLine"
          controls-position="right"
          style="width: 100%"
          size="mini"
          :min="1"
          :max="200"
        />
      </el-form-item>
      <el-form-item label="滚动间隔(s)">
        <el-input-number
          v-model="attribute.interval"
          controls-position="right"
          style="width: 100%"
          :min="1"
          :max="100"
          :step="1"
        />
      </el-form-item>

      <div style="text-indent: 1em">
        表格列设置：<el-button size="mini" theme="primary" @click="addCol">新增列</el-button>
      </div>
      <el-table style="font-size: 12px; margin-top: 10px" size="mini" :data="attribute.columns" @row-click="editRow">
        <el-table-column label="标识" prop="colKey" />
        <el-table-column label="名称" prop="title" />
        <el-table-column label="宽度" prop="width" />
      </el-table>
    </el-form>
    <el-dialog :title="currentRow.id ? '编辑' : '添加'" :visible.sync="modelShow" :append-to-body="true" width="400px">
      <el-form labelWidth="100px" size="mini">
        <el-form-item label="字段标识">
          <el-input v-model="currentRow.colKey" />
        </el-form-item>
        <el-form-item label="字段名">
          <el-input v-model="currentRow.title" />
        </el-form-item>
        <el-form-item label="字段类型">
          <el-select v-model="currentRow.type" popper-class="big-screen-select">
            <el-option label="文本" value="text" />
            <el-option label="图片" value="img" />
          </el-select>
        </el-form-item>
        <el-form-item label="宽度">
          <el-input-number
            v-model="currentRow.width"
            style="width: 100%"
            controls-position="right"
            :min="0"
            :max="1000"
          />
        </el-form-item>
        <el-form-item v-show="currentRow.id">
          <el-button theme="danger" @click="delCol">删除此列</el-button>
        </el-form-item>
        <el-button v-show="!currentRow.id" @click="confirmRow">添加</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import BColorPicker from '@/components/BColorPicker.vue'
export default {
  name: 'ScrollTable2Setter',
  components: { BColorPicker },
  props: {
    attribute: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      columns: [
        { colKey: 'colKey', title: '字段标识' },
        { colKey: 'title', title: '字段名' },
        { colKey: 'width', title: '宽度' }
      ],
      modelShow: false,
      currentIndex: 0,
      textFamilyList: Object.freeze([
        '微软雅黑',
        '黑体',
        '宋体',
        '仿宋',
        '楷体',
        '华文宋体',
        '优设标题黑',
        'SourceHanSans-Medium'
      ]),
      currentRow: {}
    }
  },
  methods: {
    confirmRow() {
      if (!this.currentRow.colKey || !this.currentRow.title) {
        this.$message.error('请输入字段标识或字段名称')
        return
      }
      const id = new Date().getTime()
      // eslint-disable-next-line vue/no-mutating-props
      this.attribute.columns.push(Object.assign(this.currentRow, { id: id }))
      this.modelShow = false
    },
    addCol() {
      this.currentRow = { width: 0 }
      this.modelShow = true
    },
    editRow(row) {
      this.currentRow = row
      this.currentIndex = this.attribute.columns.indexOf(row)
      this.modelShow = true
    },
    delCol() {
      // eslint-disable-next-line vue/no-mutating-props
      this.attribute.columns.splice(this.currentIndex, 1)
      this.modelShow = false
    }
  }
}
</script>

<style scoped></style>
