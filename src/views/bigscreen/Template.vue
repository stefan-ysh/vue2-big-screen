<template>
  <div class="template-container">
    <div class="header">
      <div class="back-button">
        <el-button icon="el-icon-arrow-left" @click="goBack">返回</el-button>
      </div>
      <div class="title">
        <h1>{{ screenTypeInfo ? `选择${screenTypeInfo.name}模板` : '选择模板' }}</h1>
      </div>
    </div>

    <div class="template-cards">
      <el-row :gutter="30">
        <el-col :xs="24" :sm="12" :md="8" v-for="template in templates" :key="template.id" class="template-col">
          <el-card shadow="hover" class="template-card" :body-style="{ padding: '0px' }">
            <div class="template-preview">
              <img :src="template.preview || defaultPreview" alt="模板预览图">
              <div class="template-hover">
                <el-button type="primary" @click="selectTemplate(template)">选择此模板</el-button>
                <el-button type="text" @click="previewTemplate(template)">预览效果</el-button>
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
          <img :src="selectedTemplate.preview || defaultPreview" alt="模板预览图">
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
import { getBigscreenTypes, getBigscreenTemplates, createBigscreen } from '@/api/bigscreen'
import defaultPreview from '@/assets/default-template.png'

export default {
  name: 'TemplateSelection',
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
      loading: false,
      previewDialogVisible: false,
      selectedTemplate: null,
      defaultPreview
    }
  },
  computed: {
    screenTypeInfo() {
      return this.screenTypes.find(item => item.key === this.type);
    },
    createParams() {
      // 从URL参数中获取创建大屏的基本信息
      const query = this.$route.query;
      return {
        name: query.name || '',
        description: query.description || '',
        type: this.type
      };
    }
  },
  created() {
    this.fetchScreenTypes();
    this.fetchTemplates();
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
    async fetchTemplates() {
      this.loading = true;
      try {
        this.templates = await getBigscreenTemplates(this.type);
      } catch (error) {
        console.error('获取模板列表失败', error);
        this.$message.error('获取模板列表失败');
      } finally {
        this.loading = false;
      }
    },
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        this.$router.push('/list');
      }
    },
    previewTemplate(template) {
      this.selectedTemplate = template;
      this.previewDialogVisible = true;
    },
    async selectTemplate(template) {
      try {
        // 如果是从预览对话框选择的，先关闭对话框
        if (this.previewDialogVisible) {
          this.previewDialogVisible = false;
        }
        
        // 显示确认对话框
        await this.$confirm(
          `确定使用"${template.name}"模板创建新大屏吗？`, 
          '创建确认', 
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }
        );
        
        // 构建创建大屏的数据
        const createData = {
          ...this.createParams,
          template: template.id
        };
        
        // 调用创建API
        const loading = this.$loading({
          lock: true,
          text: '正在创建大屏...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        
        try {
          const result = await createBigscreen(createData);
          
          this.$message.success('创建成功！');
          
          // 跳转到编辑页面
          this.$router.push(`/design/${this.type}/${result.data.id}`);
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
  }
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
        /* 显示两行，超出部分显示省略号 */
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