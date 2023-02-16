<template>
  <div class="custom-form" :style="{ height: windowHeight - 140 + 'px' }">
    <el-form size="mini" label-position="top" @submit.native.prevent="refreshCptData(refName)">
      <el-form-item>
        <el-row>
          <el-col :span="8"> 数据类型 </el-col>
          <el-col :span="16" style="padding: 8px 0 0 0">
            <el-radio-group
              v-model="currentCpt.configProps.cptDataForm.dataSource"
              style="display: flex; flex-direction: column"
              size="mini"
              @change="changeDataSource"
            >
              <el-radio
                v-for="radio in dataSourceRadios"
                :key="radio.value"
                style="margin-bottom: 10px"
                :label="radio.value"
                >{{ radio.label }}</el-radio
              >
            </el-radio-group>
          </el-col>
        </el-row>
      </el-form-item>
      <el-row v-show="currentCpt.configProps.cptDataForm.dataSource === 4">
        <el-col :span="8"> 接口地址 </el-col>
        <el-col :span="16">
          <el-input v-model="currentCpt.configProps.cptDataForm.socketUrl" type="textarea" :rows="3" />
        </el-col>
      </el-row>
      <el-form-item v-show="![1, 4].includes(currentCpt.configProps.cptDataForm.dataSource)">
        <el-row>
          <el-col :span="8"> 轮询 </el-col>
          <el-col :span="16">
            <el-switch v-model="dataPollEnable" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item v-show="dataPollEnable && ![1, 4].includes(currentCpt.configProps.cptDataForm.dataSource)">
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
      <el-form-item v-show="currentCpt.configProps.cptDataForm.dataSource === 2">
        <el-row>
          <el-col :span="8"> 请求方式 </el-col>
          <el-col :span="16">
            <el-radio-group v-model="currentCpt.configProps.cptDataForm.reqType">
              <el-radio label="GET" value="GET" />
              <el-radio label="POST" value="POST" />
            </el-radio-group>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item v-show="currentCpt.configProps.cptDataForm.dataSource === 2">
        <el-row>
          <el-col :span="8">请求参数</el-col>
          <el-col :span="16">
            <el-button @click="showCodeEditor('params')">编辑</el-button>
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
          <el-col :span="8"> 接口地址 </el-col>
          <el-col :span="16">
            <el-input v-model="currentCpt.configProps.cptDataForm.apiUrl" type="textarea" :rows="3" />
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
        <el-row>
          <el-col :span="8">加载动画</el-col>
          <el-col :span="16">
            <el-switch v-model="currentCpt.configProps.cptDataForm.loading" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item v-show="currentCpt.configProps.cptDataForm.loading">
        <el-row>
          <el-col :span="8">加载文字</el-col>
          <el-col :span="16">
            <el-input v-model="currentCpt.configProps.cptDataForm.loadingText" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item v-show="currentCpt.configProps.cptDataForm.loading">
        <el-col :span="8">加载图标</el-col>
        <el-col :span="16">
          <el-input v-model="currentCpt.configProps.cptDataForm.loadingIcon" />
        </el-col>
      </el-form-item>
      <el-form-item v-show="currentCpt.configProps.cptDataForm.loading">
        <el-col :span="8">遮罩颜色</el-col>
        <el-col :span="16">
          <BColorPicker :data="currentCpt.configProps.cptDataForm" field="maskColor" show-alpha />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="refreshCptData(refName)">刷新数据</el-button>
      </el-form-item>
    </el-form>
    <!-- 代码编辑器 -->
    <BCodeMirror
      v-if="codeVisible"
      :field="codeField"
      :mode="codeMode"
      :currentCpt="currentCpt"
      @confirm="confirmEditCode"
      @cancel="cancelEditCode"
    />
  </div>
</template>

<script>
import BCodeMirror from '@/components/BCodeMirror.vue'
import BColorPicker from '@/components/BColorPicker.vue'
export default {
  name: 'CptDataConfig',
  components: {
    BColorPicker,
    BCodeMirror
  },
  inject: ['refreshCptData'],
  data() {
    return {
      codeVisible: false,
      codeMode: '',
      codeField: '',
      dataSourceRadios: [
        {
          value: 1,
          label: '静态数据'
        },
        {
          value: 2,
          label: '动态数据'
        },
        {
          value: 3,
          label: 'sql'
        },
        {
          value: 4,
          label: 'WebSocket'
        }
      ]
    }
  },
  computed: {
    currentCptIndex() {
      return this.$store.state.bigScreen.curComponentIndex
    },
    refName() {
      // return this.currentCpt.componentName + this.currentCptIndex
      return this.currentCpt.id
    },
    windowHeight() {
      return this.$store.state.bigScreen.windowHeight
    },
    currentCpt() {
      return this.$store.state.bigScreen.curComponent
    },
    dataPollEnable: {
      get() {
        return !!(
          this.currentCpt.configProps.cptDataForm &&
          this.currentCpt.configProps.cptDataForm.pollTime &&
          this.currentCpt.configProps.cptDataForm.pollTime !== 0
        )
      },
      set(newVal) {
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
    confirmEditCode(val) {
      if (val === 'reqParams') {
        // 修改传参时，需要同步更新当前组件的传参
        const id = this.currentCpt.id
        const params = JSON.parse(this.currentCpt.configProps.cptDataForm[this.codeField])
        this.$store.dispatch('bigScreen/changeReqParams', { id, params })
      }
      this.codeVisible = false
    },
    cancelEditCode(val) {
      this.codeVisible = false
    },
    showCodeEditor(type) {
      switch (type) {
        case 'val':
          this.codeMode = 'json'
          this.codeField = 'dataText'
          break

        case 'params':
          this.codeMode = 'json'
          this.codeField = 'reqParams'
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

    changeDataSource(val) {
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
