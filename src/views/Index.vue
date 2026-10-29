<template>
  <div class="home-page">
    <div class="header">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo">
        <span>大屏设计系统</span>
      </div>
      <div class="user-info">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            管理员 <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="banner">
      <div class="banner-content">
        <h1>数据可视化大屏设计系统</h1>
        <p>基于Vue2的拖拽式大屏设计工具，快速创建各类数据大屏</p>
        <el-button type="primary" size="large" @click="goToAllScreens">浏览全部大屏</el-button>
      </div>
    </div>

    <div class="screen-type-section">
      <h2>选择大屏类型</h2>
      <p>我们提供多种类型的数据大屏模板，满足不同场景需求</p>

      <div class="screen-type-cards">
        <el-card v-for="type in screenTypes" :key="type.key" shadow="hover" class="screen-type-card">
          <div class="screen-type-card-content">
            <div class="icon">
              <i :class="`el-icon-${type.icon}`"></i>
            </div>
            <h3>{{ type.name }}</h3>
            <p>{{ type.description }}</p>
            <div class="action-buttons">
              <el-button type="primary" @click="goToTemplates(type.key)">选择模板</el-button>
              <el-button type="text" @click="goToList(type.key)">浏览{{ type.name }}大屏</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <div class="feature-section">
      <h2>系统特性</h2>
      <div class="feature-list">
        <div class="feature-item">
          <i class="el-icon-s-grid"></i>
          <h3>拖拽式设计</h3>
          <p>简单拖拽即可完成大屏布局设计，无需编码</p>
        </div>
        <div class="feature-item">
          <i class="el-icon-s-data"></i>
          <h3>丰富组件</h3>
          <p>提供丰富的图表组件和数据展示形式</p>
        </div>
        <div class="feature-item">
          <i class="el-icon-s-order"></i>
          <h3>模板系统</h3>
          <p>多种类型模板，快速构建符合需求的大屏</p>
        </div>
        <div class="feature-item">
          <i class="el-icon-s-platform"></i>
          <h3>多端适配</h3>
          <p>支持PC、大屏、平板等多种终端展示</p>
        </div>
        <div class="feature-item">
          <i class="el-icon-document-copy"></i>
          <h3>示例数据</h3>
          <p>提供多种行业示例数据，快速预览效果</p>
        </div>
        <div class="feature-item">
          <i class="el-icon-refresh"></i>
          <h3>实时更新</h3>
          <p>支持数据实时刷新和动态更新</p>
        </div>
      </div>
    </div>

    <!-- 示例展示区域 -->
    <div class="example-showcase">
      <h2>数据示例展示</h2>
      <p>体验不同行业场景的数据大屏效果</p>
      
      <div class="example-categories">
        <el-tabs v-model="activeExampleType" @tab-click="handleExampleTypeChange">
          <el-tab-pane 
            v-for="type in screenTypes" 
            :key="type.key" 
            :label="type.name" 
            :name="type.key"
          >
            <div class="example-grid">
              <div 
                v-for="example in getExamplesByType(type.key)" 
                :key="example.key"
                class="example-card"
                @click="previewExample(type.key, example)"
              >
                <div class="example-card-icon" :style="{ backgroundColor: example.color }">
                  <i :class="`el-icon-${example.icon}`"></i>
                </div>
                <div class="example-card-content">
                  <h4>{{ example.name }}</h4>
                  <p>{{ example.description }}</p>
                  <el-button type="text" size="small">
                    <i class="el-icon-view"></i>
                    预览效果
                  </el-button>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- 数据预览对话框 -->
    <DataPreview 
      :visible.sync="previewVisible"
      :example-info="currentPreviewExample"
      @use-example="handleUseExample"
    />

    <div class="footer">
      <p>© 2023 数据可视化大屏设计系统 版权所有</p>
    </div>
  </div>
</template>

<script>
import { getBigscreenTypes } from '@/api/bigscreen'
import mockDataManager from '@/utils/mockDataManager'
import DataPreview from '@/components/DataPreview'

export default {
  name: 'HomePage',
  components: {
    DataPreview
  },
  data() {
    return {
      screenTypes: [],
      activeExampleType: '',
      previewVisible: false,
      currentPreviewExample: null
    }
  },
  created() {
    this.fetchScreenTypes()
  },
  methods: {
    async fetchScreenTypes() {
      try {
        this.screenTypes = await getBigscreenTypes()
        if (this.screenTypes.length > 0) {
          this.activeExampleType = this.screenTypes[0].key
        }
      } catch (error) {
        console.error('获取大屏类型失败', error)
        this.$message.error('获取大屏类型失败')
      }
    },
    goToAllScreens() {
      this.$router.push('/list')
    },
    goToTemplates(type) {
      this.$router.push(`/template/${type}`)
    },
    goToList(type) {
      this.$router.push(`/list/${type}`)
    },
    getExamplesByType(type) {
      return mockDataManager.getExampleConfigs(type)
    },
    previewExample(type, example) {
      this.currentPreviewExample = {
        ...example,
        screenType: type
      }
      this.previewVisible = true
    },
    handleExampleTypeChange(tab) {
      this.activeExampleType = tab.name
    },
    handleUseExample(exampleInfo) {
      // 跳转到模板选择页面，并传递示例参数
      this.$router.push({
        path: `/template/${exampleInfo.screenType}`,
        query: { example: exampleInfo.key }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  .logo {
    display: flex;
    align-items: center;

    img {
      height: 32px;
      margin-right: 10px;
    }

    span {
      font-size: 18px;
      font-weight: 600;
      color: #303133;
    }
  }

  .user-info {
    .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }
  }
}

.banner {
  height: 400px;
  background: linear-gradient(135deg, #3a3d98 0%, #1f2c6c 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  .banner-content {
    max-width: 800px;
    padding: 0 20px;

    h1 {
      font-size: 36px;
      margin-bottom: 20px;
    }

    p {
      font-size: 18px;
      margin-bottom: 30px;
      opacity: 0.8;
    }
  }
}

.screen-type-section {
  padding: 60px 30px;
  text-align: center;

  h2 {
    font-size: 28px;
    margin-bottom: 15px;
    color: #303133;
  }

  > p {
    font-size: 16px;
    color: #606266;
    margin-bottom: 40px;
  }

  .screen-type-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
  }

  .screen-type-card {
    width: 280px;
    height: 320px;
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-10px);
    }

    .screen-type-card-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px 20px;
    }

    .icon {
      font-size: 50px;
      margin-bottom: 20px;
      color: #409EFF;
    }

    h3 {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 15px;
      color: #303133;
    }

    p {
      flex-grow: 1;
      font-size: 14px;
      color: #606266;
      margin-bottom: 20px;
      line-height: 1.6;
    }

    .action-buttons {
      margin-top: auto;
    }
  }
}

.feature-section {
  padding: 60px 30px;
  background-color: #fff;
  text-align: center;

  h2 {
    font-size: 28px;
    margin-bottom: 50px;
    color: #303133;
  }

  .feature-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 60px;
  }

  .feature-item {
    width: 220px;

    i {
      font-size: 50px;
      color: #409EFF;
      margin-bottom: 20px;
    }

    h3 {
      font-size: 18px;
      margin-bottom: 15px;
      color: #303133;
    }

    p {
      font-size: 14px;
      color: #606266;
      line-height: 1.6;
    }
  }
}

.example-showcase {
  padding: 60px 30px;
  background-color: #fff;
  text-align: center;

  h2 {
    font-size: 28px;
    margin-bottom: 15px;
    color: #303133;
  }

  > p {
    font-size: 16px;
    color: #606266;
    margin-bottom: 40px;
  }

  .example-categories {
    display: flex;
    justify-content: center;
    gap: 30px;
  }

  .example-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
  }

  .example-card {
    width: 280px;
    height: 320px;
    transition: transform 0.3s;
    cursor: pointer;

    &:hover {
      transform: translateY(-10px);
    }

    .example-card-icon {
      width: 100%;
      height: 160px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;

      i {
        font-size: 50px;
        color: #fff;
      }
    }

    .example-card-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px 20px;

      h4 {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 15px;
        color: #303133;
      }

      p {
        flex-grow: 1;
        font-size: 14px;
        color: #606266;
        margin-bottom: 20px;
        line-height: 1.6;
      }

      .el-button {
        margin-top: auto;
      }
    }
  }
}

.footer {
  padding: 30px;
  text-align: center;
  background-color: #303133;
  color: rgba(255, 255, 255, 0.6);
}
</style>
