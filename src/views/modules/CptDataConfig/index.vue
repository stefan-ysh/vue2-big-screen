<template>
  <div class="custom-form" :style="{ height: windowHeight - 140 + 'px' }">
    <el-form size="mini" label-position="top">
      <el-form-item>
        <el-row>
          <el-col :span="8"> 数据类型 </el-col>
          <el-col :span="16">
            <el-radio-group
              v-model="currentCpt.configProps.cptDataForm.dataSource"
              size="mini"
              @change="changeDataSource"
            >
              <el-radio-button :label="1">静态</el-radio-button>
              <el-radio-button :label="2">接口</el-radio-button>
              <el-radio-button :label="3">sql</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        v-show="currentCpt.configProps.cptDataForm.dataSource !== 1"
      >
        <el-row>
          <el-col :span="8"> 轮询 </el-col>
          <el-col :span="16">
            <el-switch
              v-model="dataPollEnable"
              active-text="开启"
              inactive-text="关闭"
            />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item v-show="dataPollEnable">
        <el-row>
          <el-col :span="8"> 轮询时间(s) </el-col>
          <el-col :span="16">
            <el-input-number
              v-model="currentCpt.configProps.cptDataForm.pollTime"
              controls-position="right"
              :min="0"
              :max="100"
              label="描述文字"
              style="width: 100%"
            />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row v-if="currentCpt.configProps.cptDataForm.dataSource === 1">
          <el-col :span="8">数据值</el-col>
          <el-col :span="16">
            <el-button @click="showCodeEditor('val')">编辑</el-button>
          </el-col>
        </el-row>
        <el-row v-show="currentCpt.configProps.cptDataForm.dataSource === 2">
          <el-col :span="8">
            {{ dataLabels[currentCpt.configProps.cptDataForm.dataSource - 1] }}
          </el-col>
          <el-col :span="16">
            <el-input
              v-model="currentCpt.configProps.cptDataForm.apiUrl"
              type="textarea"
              :rows="3"
            />
          </el-col>
        </el-row>
        <el-row v-if="currentCpt.configProps.cptDataForm.dataSource === 3">
          <el-col :span="8">sql语句</el-col>
          <el-col :span="16">
            <el-button @click="showCodeEditor('sql')">编辑</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="8">数据处理</el-col>
          <el-col :span="16">
            <el-button @click="showCodeEditor('convertData')">编辑</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-col :span="8">图表处理</el-col>
        <el-col :span="16">
          <el-button @click="showCodeEditor('convertChart')">编辑</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="refreshCptData(refName)">刷新数据</el-button>
      </el-form-item>
    </el-form>
    <!-- 代码编辑器 -->
    <BCodeMirror v-if="codeVisible" :field="codeField" :mode="codeMode" :currentCpt="currentCpt" @confirm="confirmEditCode" @cancel="cancelEditCode" />
  </div>
</template>

<script>
import BCodeMirror from '@/components/BCodeMirror.vue'
export default {
  name: 'CptDataConfig',
  components: {
    BCodeMirror
  },
  inject: ['refreshCptData'],
  data () {
    return {
      codeVisible: false,
      codeMode: '',
      codeField: '',
      dataLabels: ['数据', '接口地址', 'sql']
    }
  },
  computed: {
    currentCptIndex () {
      return this.$store.state.bigScreen.curComponentIndex
    },
    refName () {
      return this.currentCpt.componentName + this.currentCptIndex
    },
    windowHeight () {
      return this.$store.state.bigScreen.windowHeight
    },
    currentCpt () {
      return this.$store.state.bigScreen.curComponent
    },
    dataPollEnable: {
      get () {
        return !!(
          this.currentCpt.configProps.cptDataForm &&
          this.currentCpt.configProps.cptDataForm.pollTime &&
          this.currentCpt.configProps.cptDataForm.pollTime !== 0
        )
      },
      set (newVal) {
        if (newVal) {
          this.currentCpt.configProps.cptDataForm.pollTime = 8
        } else {
          this.currentCpt.configProps.cptDataForm.pollTime = 0
          // 清除定时器
          const refName = this.currentCpt.componentName + this.currentCptIndex
          this.refreshCptData(refName)
        }
        return newVal
      }
    }
  },
  methods: {
    confirmEditCode (val) {
      this.codeVisible = false
    },
    cancelEditCode (val) {
      this.codeVisible = false
    },
    showCodeEditor (type) {
      switch (type) {
        case 'val':
          this.codeMode = 'json'
          this.codeField = 'dataText'
          break

        case 'sql':
          this.codeMode = 'sql'
          this.codeField = 'sql'
          break

        case 'convertData':
          this.codeMode = 'javascript'
          this.codeField = 'convertData'

          break
        case 'convertChart':
          this.codeMode = 'javascript'
          this.codeField = 'convertChart'

          break

        default:
          break
      }
      this.codeVisible = true
    },

    changeDataSource (val) {
      // 静态数据不显示轮询按钮
      if (val === 1) {
        this.currentCpt.configProps.cptDataForm.pollTime = 0
      }
      // 解决接口切换到 sql 产生的 codemirror mode 污染
      this.currentCpt.configProps.cptDataForm.dataSource = val
    }
  }
}
</script>

<style lang="less" scoped>
.custom-form {
  padding: 10px;
  overflow-y: auto;
  background: #2b3340;
  .cur-cpt-title {
    margin-bottom: 10px;
    font-size: 12px;
    &-content {
      text-align: center;
    }
  }
}
</style>
