<template>
  <div class="bigscreen-list-container">
    <div class="header">
      <div class="header-left">
        <h1 class="title">{{ typeTitle }}</h1>
        <div class="type-selector" v-if="!type">
          <el-radio-group v-model="selectedType" @change="handleTypeChange">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button v-for="item in screenTypes" :key="item.key" :label="item.key">{{ item.name }}</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="header-right">
        <el-button type="primary" icon="el-icon-plus" @click="createBigscreen">新建大屏</el-button>
      </div>
    </div>

    <div class="search-bar">
      <el-input
        placeholder="请输入大屏名称搜索"
        v-model="searchQuery"
        prefix-icon="el-icon-search"
        clearable
        @clear="handleSearchClear"
        @input="handleSearch"
        class="search-input"
      ></el-input>
      <el-select v-model="statusFilter" placeholder="状态筛选" @change="handleFilter" class="status-filter">
        <el-option label="全部" value=""></el-option>
        <el-option label="已发布" value="published"></el-option>
        <el-option label="未发布" value="unpublished"></el-option>
      </el-select>
    </div>

    <div class="screen-card-view" v-if="viewMode === 'card'">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="item in screenList" :key="item.id" class="card-col">
          <el-card shadow="hover" class="screen-card">
            <div class="card-header">
              <span class="card-title">{{ item.name }}</span>
              <el-tag size="small" :type="getStatusTagType(item.isPublished)">
                {{ item.isPublished ? '已发布' : '未发布' }}
              </el-tag>
            </div>
            <div class="card-content">
              <p class="description">{{ item.description }}</p>
              <div class="card-meta">
                <div class="meta-item">
                  <i class="el-icon-user"></i>
                  <span>{{ item.creator }}</span>
                </div>
                <div class="meta-item">
                  <i class="el-icon-date"></i>
                  <span>{{ formatDate(item.createTime) }}</span>
                </div>
                <div class="meta-item">
                  <i class="el-icon-view"></i>
                  <span>{{ item.accessCount }}</span>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <el-button size="mini" type="primary" @click="editBigscreen(item.id, item.type)" icon="el-icon-edit">编辑</el-button>
              <el-button size="mini" type="info" @click="previewBigscreen(item.id, item.type)" icon="el-icon-view">预览</el-button>
              <el-dropdown size="mini" @command="(command) => handleCommand(command, item)">
                <el-button size="mini" type="text">
                  更多<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="item.isPublished ? 'unpublish' : 'publish'">
                    {{ item.isPublished ? '取消发布' : '发布' }}
                  </el-dropdown-item>
                  <el-dropdown-item command="copy">复制</el-dropdown-item>
                  <el-dropdown-item command="delete" divided>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-else
      :data="screenList"
      border
      v-loading="loading"
      element-loading-text="加载中..."
      class="bigscreen-table"
      empty-text="暂无数据"
    >
      <el-table-column prop="name" label="大屏名称" min-width="200">
        <template slot-scope="scope">
          <el-link type="primary" @click="editBigscreen(scope.row.id, scope.row.type)">{{ scope.row.name }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" min-width="300" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="120">
        <template slot-scope="scope">
          {{ formatDate(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="creator" label="创建者" width="100"></el-table-column>
      <el-table-column prop="isPublished" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="getStatusTagType(scope.row.isPublished)">
            {{ scope.row.isPublished ? '已发布' : '未发布' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-tooltip content="预览大屏" placement="top">
            <el-button
              size="mini"
              plain
              icon="el-icon-view"
              type="info"
              @click="previewBigscreen(scope.row.id, scope.row.type)"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="编辑大屏" placement="top">
            <el-button
              size="mini"
              plain
              icon="el-icon-edit-outline"
              type="primary"
              @click="editBigscreen(scope.row.id, scope.row.type)"
            ></el-button>
          </el-tooltip>
          <el-tooltip :content="scope.row.isPublished ? '取消发布' : '发布'" placement="top">
            <el-button
              size="mini"
              plain
              :type="scope.row.isPublished ? 'warning' : 'success'"
              :icon="!scope.row.isPublished ? 'el-icon-upload2' : 'el-icon-turn-off'"
              @click="changeBigscreenStatus(scope.row.id, scope.row.isPublished)"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="删除大屏" placement="top">
            <el-button
              size="mini"
              plain
              icon="el-icon-delete"
              type="danger"
              @click="deleteBigscreen(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <div class="table-footer">
      <div class="view-toggle">
        <el-radio-group v-model="viewMode" size="small">
          <el-radio-button label="card">卡片视图</el-radio-button>
          <el-radio-button label="table">表格视图</el-radio-button>
        </el-radio-group>
      </div>
      <div class="pagination-container">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.page"
          :page-sizes="[8, 12, 24, 36]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 创建大屏对话框 -->
    <el-dialog title="新建大屏" :visible.sync="createDialogVisible" width="500px">
      <el-form :model="createForm" :rules="createRules" ref="createForm" label-width="80px">
        <el-form-item label="大屏名称" prop="name">
          <el-input v-model="createForm.name" placeholder="请输入大屏名称"></el-input>
        </el-form-item>
        <el-form-item label="大屏类型" prop="type">
          <el-select v-model="createForm.type" placeholder="请选择大屏类型" style="width: 100%;">
            <el-option 
              v-for="item in screenTypes" 
              :key="item.key" 
              :label="item.name" 
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input 
            type="textarea" 
            :rows="3" 
            v-model="createForm.description" 
            placeholder="请输入大屏描述">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmCreate">下一步</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBigscreenTypes, getBigscreenList, deleteBigscreen, publishBigscreen } from '@/api/bigscreen'
import { formatDate } from '@/utils/date'

export default {
  name: 'BigScreenList',
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      screenTypes: [],
      screenList: [],
      selectedType: '',
      searchQuery: '',
      statusFilter: '',
      viewMode: 'card',
      pagination: {
        page: 1,
        pageSize: 12,
        total: 0
      },
      createDialogVisible: false,
      createForm: {
        name: '',
        type: '',
        description: ''
      },
      createRules: {
        name: [
          { required: true, message: '请输入大屏名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择大屏类型', trigger: 'change' }
        ],
        description: [
          { max: 200, message: '描述不能超过200个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    typeTitle() {
      if (!this.type) {
        return '所有大屏';
      }
      const typeInfo = this.screenTypes.find(item => item.key === this.type);
      return typeInfo ? `${typeInfo.name}大屏` : '大屏列表';
    }
  },
  created() {
    this.fetchScreenTypes();
    this.selectedType = this.type;
    this.fetchScreenList();
  },
  methods: {
    formatDate,
    async fetchScreenTypes() {
      try {
        this.screenTypes = await getBigscreenTypes();
      } catch (error) {
        console.error('获取大屏类型失败', error);
        this.$message.error('获取大屏类型失败');
      }
    },
    async fetchScreenList() {
      this.loading = true;
      try {
        const typeToUse = this.type || this.selectedType;
        
        const params = {
          type: typeToUse,
          keyword: this.searchQuery,
          page: this.pagination.page,
          pageSize: this.pagination.pageSize
        };
        
        const result = await getBigscreenList(params);
        this.screenList = result.list;
        this.pagination = result.pagination;
      } catch (error) {
        console.error('获取大屏列表失败', error);
        this.$message.error('获取大屏列表失败');
      } finally {
        this.loading = false;
      }
    },
    handleTypeChange(type) {
      if (type !== this.selectedType) {
        this.pagination.page = 1;
        this.fetchScreenList();
        
        // 更新路由但不重新加载组件
        if (type) {
          this.$router.push(`/list/${type}`);
        } else {
          this.$router.push('/list');
        }
      }
    },
    handleSearch() {
      this.pagination.page = 1;
      this.fetchScreenList();
    },
    handleSearchClear() {
      this.searchQuery = '';
      this.pagination.page = 1;
      this.fetchScreenList();
    },
    handleFilter() {
      this.pagination.page = 1;
      this.fetchScreenList();
    },
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.pagination.page = 1;
      this.fetchScreenList();
    },
    handleCurrentChange(page) {
      this.pagination.page = page;
      this.fetchScreenList();
    },
    getStatusTagType(isPublished) {
      return isPublished ? 'success' : 'info';
    },
    createBigscreen() {
      // 如果当前在特定类型的列表页，默认选中该类型
      if (this.type) {
        this.createForm.type = this.type;
      }
      this.createDialogVisible = true;
    },
    confirmCreate() {
      this.$refs.createForm.validate(valid => {
        if (valid) {
          this.createDialogVisible = false;
          
          // 跳转到模板选择页面
          this.$router.push({
            path: `/template/${this.createForm.type}`,
            query: {
              name: this.createForm.name,
              description: this.createForm.description
            }
          });
        }
      });
    },
    editBigscreen(id, type) {
      this.$router.push(`/design/${type}/${id}`);
    },
    previewBigscreen(id, type) {
      window.open(`/preview/${type}/${id}`, '_blank');
    },
    async changeBigscreenStatus(id, isPublished) {
      try {
        const action = isPublished ? '取消发布' : '发布';
        
        await this.$confirm(`确定要${action}该大屏吗？`, '状态变更', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: isPublished ? 'warning' : 'success'
        });
        
        await publishBigscreen(id);
        
        this.$message.success(`${action}成功！`);
        this.fetchScreenList();
      } catch (error) {
        if (error !== 'cancel') {
          console.error(`${isPublished ? '取消发布' : '发布'}大屏失败`, error);
          this.$message.error(`操作失败：${error.message || '未知错误'}`);
        }
      }
    },
    async deleteBigscreen(screen) {
      try {
        await this.$confirm(`确定要删除"${screen.name}"大屏吗？删除后无法恢复！`, '删除确认', {
          confirmButtonText: '确定删除',
          cancelButtonText: '取消',
          type: 'warning'
        });
        
        await deleteBigscreen(screen.id);
        
        this.$message.success('删除成功！');
        this.fetchScreenList();
      } catch (error) {
        if (error !== 'cancel') {
          console.error('删除大屏失败', error);
          this.$message.error(`删除失败：${error.message || '未知错误'}`);
        }
      }
    },
    handleCommand(command, item) {
      switch (command) {
        case 'publish':
          this.changeBigscreenStatus(item.id, false);
          break;
        case 'unpublish':
          this.changeBigscreenStatus(item.id, true);
          break;
        case 'copy':
          this.$message.info('复制功能开发中...');
          break;
        case 'delete':
          this.deleteBigscreen(item);
          break;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bigscreen-list-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 40px);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .header-left {
    display: flex;
    align-items: center;

    .title {
      font-size: 24px;
      color: #303133;
      margin: 0 20px 0 0;
      font-weight: 600;
    }
  }
}

.search-bar {
  display: flex;
  margin-bottom: 20px;

  .search-input {
    width: 300px;
    margin-right: 15px;
  }

  .status-filter {
    width: 120px;
    margin-right: 15px;
  }
}

.screen-card-view {
  margin-bottom: 20px;

  .card-col {
    margin-bottom: 20px;
  }

  .screen-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      .card-title {
        font-size: 16px;
        font-weight: 600;
        color: #303133;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .card-content {
      flex: 1;

      .description {
        font-size: 13px;
        color: #606266;
        margin-bottom: 15px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.5;
      }

      .card-meta {
        display: flex;
        flex-wrap: wrap;
        font-size: 12px;
        color: #909399;

        .meta-item {
          margin-right: 15px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;

          i {
            margin-right: 5px;
          }
        }
      }
    }

    .card-footer {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
    }
  }
}

.bigscreen-table {
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
</style> 