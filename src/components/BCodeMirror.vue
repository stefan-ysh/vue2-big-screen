<!-- eslint-disable-->
<template>
    <el-dialog :visible="true" class="code-editor-dialog" title="代码编辑">
      <editor
        ref="bigScreenCodeEditor"
        v-model="currentCpt.configProps.cptDataForm[field]"
        class="code-editor"
        :lang="language"
        theme="monokai"
        :options="options"
        @init="editorInit"
      />
      <div slot="footer">
        <el-button @click="cancel">取消</el-button>
        <el-button @click="confirm">确认</el-button>
      </div>
    </el-dialog>
</template>

<script>
import Editor from 'vue2-ace-editor'
// 主题
import 'brace/theme/monokai'
// 代码片段
import 'brace/snippets/javascript'
import 'brace/snippets/json'
import 'brace/snippets/sql'
// import 'brace/snippets/dockerfile'
// import 'brace/snippets/python'
// import 'brace/snippets/php'
// import 'brace/snippets/html'
// import 'brace/snippets/css'
// import 'brace/snippets/ruby'
// 代码语言
import 'brace/mode/javascript'
import 'brace/mode/json'
import 'brace/mode/sql'
// import 'brace/mode/dockerfile'
// import 'brace/mode/python'
// import 'brace/mode/php'
// import 'brace/mode/html'
// import 'brace/mode/ruby'
// import 'brace/mode/css'
// 语言扩展
import 'brace/ext/language_tools'
import 'brace/ext/emmet'
import 'brace/ext/beautify'
import 'brace/ext/searchbox'
import 'brace/ext/chromevox'
import 'brace/ext/error_marker'
import 'brace/ext/keybinding_menu'
import 'brace/ext/linking'
import 'brace/ext/modelist'
import 'brace/ext/old_ie'
import 'brace/ext/settings_menu'
import 'brace/ext/spellcheck'
import 'brace/ext/split'
import 'brace/ext/static_highlight'
import 'brace/ext/statusbar'
import 'brace/ext/whitespace'
import 'brace/ext/textarea'
import 'brace/ext/themelist'
export default {
  components: {
    Editor
  },

  // model: {
  //   prop: 'value',
  //   event: 'change'
  // },

  props: {
    value: {
      type: String,
      default: ''
    },
    mode: { type: String, default: 'sql' },
    currentCpt: {
      type: Object,
      default: () => {}
    },
    field: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      originVal: '',
      language: 'javascript',
      options: {
        // 启用基本自动完成
        enableBasicAutocompletion: true,
        // 启用代码段
        enableSnippets: true,
        // 启用实时自动完成
        enableLiveAutocompletion: true,
        printMarginColumn: 30,
        // 显示参考线
        displayIndentGuides: false,
        // 启用Emmet
        enableEmmet: true,
        // 标签大小
        tabSize: 6,
        // 设置字号
        fontSize: 14,
        // 使用辅助对象
        useWorker: true,
        // 去除编辑器里的竖线
        showPrintMargin: false,
        // 选中多处
        enableMultiselect: true,
        // 是否只读
        readOnly: false,
        // 显示折叠部件
        showFoldWidgets: true,
        // 淡入折叠部件
        fadeFoldWidgets: true,
        // 换行
        wrap: true
      }
    }
  },
  watch: {
    currentCpt: {
      handler(newVal, oldVal) {
        if (!oldVal) {
          this.originVal = newVal.configProps.cptDataForm[this.field]
        }
      },
      deep: true,
      immediate: true
    },
    mode: {
      handler(newVal, oldVal) {
        this.language = newVal
      },
      immediate: true
    }
  },
  methods: {
    editorInit: function(editor) {
      console.log('%c [ editor ]-149', 'font-size:13px; background:pink; color:#bf2c9f;', editor)
      // console.log('debug log --> ', editor)
      // // 窗口自适应
      // // editor.resize();
      // // 监听编辑器变化
      // editor.getSession().on('change', (val) => {
      //   console.log('debug log --> ', editor.getValue())

      //   this.$emit('change', editor.getValue())
      // })
    },
    confirm() {
      this.$emit('confirm')
    },
    cancel() {
      // eslint-disable-next-line vue/no-mutating-props
      this.currentCpt.configProps.cptDataForm[this.field] = this.originVal
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="less" scoped>
.code-editor-dialog {
  /deep/ .el-dialog__body {
    overflow: hidden !important;
  }
}
.code-editor {
  min-height: 300px !important;
  position: relative;
  // 代码问题提示框
  /deep/ .ace_tooltip {
    top: 0 !important;
    left: 0 !important;
  }
}
</style>
