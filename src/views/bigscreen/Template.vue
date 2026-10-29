<template>
  <div class="template-container">
    <div class="header">
      <div class="back-button">
        <el-button icon="el-icon-arrow-left" @click="goBack">返回</el-button>
      </div>
      <div class="title">
        <h1>{{ screenTypeInfo ? `选择${screenTypeInfo.name}模板` : '选择模板' }}</h1>
        <p class="subtitle">选择适合的模板快速创建大屏，或选择不同示例查看效果</p>
      </div>
      <div class="example-selector" v-if="exampleList.length > 0">
        <el-select v-model="selectedExample" placeholder="选择示例数据" @change="handleExampleChange">
          <el-option label="标准数据" value=""></el-option>
          <el-option v-for="item in exampleList" :key="item.key" :label="item.name" :value="item.key">
            <span>{{ item.name }}</span>
            <span class="example-description">{{ item.description }}</span>
          </el-option>
        </el-select>
      </div>
    </div>

    <!-- 示例选择器 -->
    <div class="example-section">
      <ExampleSelector 
        :screen-type="type"
        v-model="selectedExample"
        @example-change="handleExampleChange"
        @refresh-data="handleRefreshData"
        @preview-example="handlePreviewExample"
      />
    </div>

    <div class="template-cards">
      <el-row :gutter="30">
        <el-col :xs="24" :sm="12" :md="8" v-for="template in templates" :key="template.id" class="template-col">
          <el-card shadow="hover" class="template-card" :body-style="{ padding: '0px' }">
            <div class="template-preview">
              <img v-if="hasRealPreview(template)" :src="template.preview" alt="模板预览图">
              <div v-else class="template-cover-placeholder" :style="{ background: coverGradient }">
                <i :class="typeIcon"></i>
                <span>{{ template.name }}</span>
              </div>
              <div class="template-hover">
                <el-button type="primary" @click="selectTemplate(template)">选择此模板</el-button>
                <el-button type="text" @click="previewTemplate(template)">预览效果</el-button>
                <el-button
                  v-if="template.isCustom"
                  type="text"
                  icon="el-icon-delete"
                  class="delete-custom-btn"
                  @click.stop="removeCustomTemplate(template)"
                >删除模板</el-button>
              </div>
            </div>
            <div class="template-info">
              <h3>{{ template.name }}</h3>
              <p>{{ template.description }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 预览模板对话框 -->
    <el-dialog title="模板预览" :visible.sync="previewDialogVisible" fullscreen append-to-body>
      <div class="template-preview-dialog">
        <div class="preview-image" v-if="selectedTemplate">
          <img v-if="hasRealPreview(selectedTemplate)" :src="selectedTemplate.preview" alt="模板预览图">
          <div v-else class="template-cover-placeholder" :style="{ background: coverGradient }">
            <i :class="typeIcon"></i>
            <span>{{ selectedTemplate.name }}</span>
          </div>
        </div>
        <div class="preview-info" v-if="selectedTemplate">
          <h2>{{ selectedTemplate.name }}</h2>
          <p>{{ selectedTemplate.description }}</p>
          <div class="preview-actions">
            <el-button type="primary" @click="selectTemplate(selectedTemplate)">使用此模板</el-button>
            <el-button @click="previewDialogVisible = false">取消</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBigscreenTypes, getBigscreenTemplates, createBigscreen, getAvailableExamples, getCustomTemplates, deleteCustomTemplate } from '@/api/bigscreen'
import ExampleSelector from '@/components/ExampleSelector.vue'

export default {
  name: 'TemplateSelection',
  components: {
    ExampleSelector
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      templates: [],
      screenTypes: [],
      loading: true,
      previewDialogVisible: false,
      selectedTemplate: null,
      selectedExample: '',
      exampleList: []
    }
  },
  computed: {
    screenTypeInfo() {
      return this.screenTypes.find(item => item.key === this.type);
    },
    // mock 模板的 preview 字段指向不存在的 /images 静态资源，
    // 仅当配置了真实可用的预览图时才用 img 展示，否则渲染渐变占位封面
    hasRealPreview() {
      return template => {
        return Boolean(template.preview) && !template.preview.startsWith('/images')
      }
    },
    typeIcon() {
      const iconMap = {
        dataAnalysis: 'el-icon-data-analysis',
        businessMonitor: 'el-icon-monitor',
        mapVisualization: 'el-icon-map-location',
        marketing: 'el-icon-present'
      }
      return iconMap[this.type] || 'el-icon-data-board'
    },
    coverGradient() {
      const gradientMap = {
        dataAnalysis: 'linear-gradient(135deg, #1b2a4a 0%, #2d5aa8 100%)',
        businessMonitor: 'linear-gradient(135deg, #12324a 0%, #1a7a8a 100%)',
        mapVisualization: 'linear-gradient(135deg, #143a2a 0%, #1e8a5a 100%)',
        marketing: 'linear-gradient(135deg, #3a1440 0%, #a82d7a 100%)'
      }
      return gradientMap[this.type] || 'linear-gradient(135deg, #1b2a4a 0%, #2d5aa8 100%)'
    },
    createParams() {
      const query = this.$route.query;
      return {
        name: query.name || '',
        description: query.description || '',
        type: this.type,
        example: this.selectedExample
      };
    }
  },
  created() {
    this.fetchScreenTypes();
    this.fetchExampleList();
    this.loadTemplates();
  },
  methods: {
    async fetchScreenTypes() {
      try {
        this.screenTypes = await getBigscreenTypes();
      } catch (error) {
        console.error('获取大屏类型失败', error);
        this.$message.error('获取大屏类型失败');
      }
    },
    async fetchExampleList() {
      try {
        this.exampleList = await getAvailableExamples(this.type);
      } catch (error) {
        console.error('获取示例数据列表失败', error);
      }
    },
    handleExampleChange() {
      this.loadTemplates();
    },
    handleRefreshData() {
      this.loadTemplates();
    },
    handlePreviewExample(example) {
      this.selectedExample = example.key;
      this.loadTemplates();
    },
    loadTemplates() {
      this.loading = true;

      // 自定义模板排在内置模板之前
      const customTemplates = getCustomTemplates().filter(t => t.type === this.type);

      getBigscreenTemplates(this.type, this.selectedExample)
        .then(templates => {
          this.templates = [...customTemplates, ...templates];
          this.loading = false;
        })
        .catch(error => {
          console.error('加载模板列表失败', error);
          this.$message.error('加载模板列表失败');
          this.loading = false;
        });
    },
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        this.$router.push('/list');
      }
    },
    removeCustomTemplate(template) {
      this.$confirm(`确定删除自定义模板"${template.name}"吗？`, '删除确认', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteCustomTemplate(template.id);
          this.loadTemplates();
          this.$message.success('模板已删除');
        })
        .catch(() => {});
    },
    previewTemplate(template) {
      const exampleParam = this.selectedExample ? `?example=${this.selectedExample}` : '';
      window.open(`/preview/${template.type}/${template.id}${exampleParam}`, '_blank');
    },
    async selectTemplate(template) {
      try {
        if (this.previewDialogVisible) {
          this.previewDialogVisible = false;
        }
        
        await this.$confirm(
          `确定使用"${template.name}"模板创建新大屏吗？`, 
          '创建确认', 
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }
        );
        
        // 自定义模板已持久化在本地，直接进入设计器
        if (template.isCustom) {
          this.$router.push(`/design/${template.type}/${template.id}`);
          return;
        }

        const createData = {
          ...this.createParams,
          template: template.id
        };
        
        const loading = this.$loading({
          lock: true,
          text: '正在创建大屏...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        
        try {
          const result = await createBigscreen(createData);
          
          this.$message.success('创建成功！');
          
          const exampleParam = this.selectedExample ? `?example=${this.selectedExample}` : '';
          this.$router.push(`/design/${this.type}/${result.data.id}${exampleParam}`);
        } finally {
          loading.close();
        }
      } catch (error) {
        if (error !== 'cancel') {
          console.error('创建大屏失败', error);
          this.$message.error('创建大屏失败');
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.template-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 40px);
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  
  .back-button {
    margin-right: 20px;
  }
  
  .title {
    h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
      color: #303133;
    }
    margin-right: auto;
  }
  
  .example-selector {
    margin-left: 20px;
    width: 200px;
  }
}

.example-description {
  font-size: 12px;
  color: #999;
  margin-left: 5px;
}

.template-cards {
  .template-col {
    margin-bottom: 30px;
  }
  
  .template-card {
    height: 100%;
    transition: all 0.3s;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
    
    .template-preview {
      position: relative;
      overflow: hidden;
      height: 220px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s;
      }

      .template-cover-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        color: rgba(255, 255, 255, 0.9);

        i {
          font-size: 56px;
          opacity: 0.9;
        }

        span {
          font-size: 15px;
          letter-spacing: 1px;
          opacity: 0.85;
        }
      }

      .template-hover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.3s;

        button {
          margin: 5px 0;
        }

        .delete-custom-btn {
          color: #f78989;
        }
      }
      
      &:hover {
        img {
          transform: scale(1.1);
        }
        
        .template-hover {
          opacity: 1;
        }
      }
    }
    
    .template-info {
      padding: 15px;
      
      h3 {
        margin: 0 0 10px;
        font-size: 18px;
        font-weight: 500;
        color: #303133;
      }
      
      p {
        margin: 0;
        font-size: 14px;
        color: #606266;
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}

.template-preview-dialog {
  display: flex;
  height: 100%;
  
  .preview-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #f5f7fa;
    
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    }
  }
  
  .preview-info {
    width: 300px;
    padding: 20px;
    border-left: 1px solid #ebeef5;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    
    h2 {
      margin-top: 0;
      font-size: 20px;
      font-weight: 600;
      color: #303133;
    }
    
    p {
      margin: 15px 0;
      font-size: 14px;
      color: #606266;
      line-height: 1.6;
      flex: 1;
    }
    
    .preview-actions {
      margin-top: auto;
      display: flex;
      flex-direction: column;
      
      .el-button {
        margin-left: 0;
        margin-bottom: 10px;
      }
    }
  }
}
</style> 