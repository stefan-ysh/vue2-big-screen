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
      </div>
    </div>

    <div class="footer">
      <p>© 2023 数据可视化大屏设计系统 版权所有</p>
    </div>
  </div>
</template>

<script>
import { getBigscreenTypes } from '@/api/bigscreen'

export default {
  name: 'HomePage',
  data() {
    return {
      screenTypes: []
    }
  },
  created() {
    this.fetchScreenTypes()
  },
  methods: {
    async fetchScreenTypes() {
      try {
        this.screenTypes = await getBigscreenTypes()
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

.footer {
  padding: 30px;
  text-align: center;
  background-color: #303133;
  color: rgba(255, 255, 255, 0.6);
}
</style>
