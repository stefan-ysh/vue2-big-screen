# Mock数据示例系统使用说明

## 概述

本系统为Vue2大屏设计器提供了完整的mock数据示例管理功能，支持不同行业场景的数据展示，让用户能够快速预览和体验各种类型的大屏效果。

## 功能特性

### 1. 多行业示例支持
- **数据分析类型**：电商、零售、教育、金融等行业数据分析
- **营销活动类型**：社交媒体、营销活动、线下活动等营销数据
- **业务监控类型**：系统监控、业务监控、安全监控等监控数据
- **地图可视化类型**：物流、人口分布、经济地图等地理数据

### 2. 动态数据生成
- 支持销售数据、用户数据、流量数据、财务数据等多种类型
- 自动生成带有趋势性的模拟数据
- 可配置数据范围和参数

### 3. 实时预览功能
- 图表预览：展示各种图表类型的效果
- 数据表格：展示表格形式的数据
- JSON数据：查看原始数据结构

## 使用方法

### 1. 在主页面浏览示例
```javascript
// 访问主页面，在"数据示例展示"区域
// 选择不同的大屏类型标签页
// 点击示例卡片预览效果
```

### 2. 在大屏列表页面选择示例
```javascript
// 访问大屏列表页面 /list 或 /list/:type
// 在右侧示例选择器中选择不同的示例
// 系统会自动刷新列表显示对应示例的大屏
```

### 3. 在模板选择页面使用示例
```javascript
// 访问模板选择页面 /template/:type
// 使用示例选择器切换不同的数据示例
// 选择模板时会应用当前选择的示例数据
```

### 4. 在设计器中应用示例数据
```javascript
// 在设计器中，组件会自动获取当前选择的示例数据
// 可以通过mockDataManager获取动态生成的数据
import mockDataManager from '@/utils/mockDataManager'

// 获取当前示例
const currentExample = mockDataManager.getCurrentExample()

// 生成特定类型的数据
const salesData = mockDataManager.generateDynamicData('sales', { days: 30 })
```

## API参考

### MockDataManager类

#### 方法列表

##### setCurrentExample(example)
设置当前示例
- `example` (string): 示例名称

##### getCurrentExample()
获取当前示例
- 返回: (string) 当前示例名称

##### generateDynamicData(type, config)
生成动态数据
- `type` (string): 数据类型 ('sales', 'user', 'traffic', 'financial')
- `config` (object): 配置参数
- 返回: (any) 生成的数据

##### getExampleConfigs(type)
获取示例配置
- `type` (string): 大屏类型
- 返回: (Array) 示例配置列表

### 组件API

#### ExampleSelector组件

##### Props
- `screenType` (string, required): 大屏类型
- `value` (string): 当前选择的示例

##### Events
- `input`: 示例值变化
- `change`: 示例变化
- `example-change`: 示例切换事件
- `refresh-data`: 刷新数据事件
- `preview-example`: 预览示例事件

#### DataPreview组件

##### Props
- `visible` (boolean): 是否显示对话框
- `exampleInfo` (object): 示例信息

##### Events
- `update:visible`: 更新显示状态
- `close`: 关闭事件
- `use-example`: 使用示例事件

## 数据结构

### 示例配置结构
```javascript
{
  key: 'ecommerce',           // 示例唯一标识
  name: '电商数据分析',        // 示例名称
  description: '电商平台...',  // 示例描述
  icon: 'shopping-cart-full', // 图标
  color: '#409EFF'           // 主题色
}
```

### 生成数据结构
```javascript
// 销售数据
{
  labels: ['2023-01-01', '2023-01-02', ...],
  data: [10000, 12000, ...]
}

// 用户数据
[
  { name: '新用户', value: 1000 },
  { name: '活跃用户', value: 5000 },
  ...
]

// 财务数据
{
  labels: ['1月', '2月', ...],
  revenue: [100000, 120000, ...],
  profit: [10000, 15000, ...]
}
```

## 扩展开发

### 添加新的示例类型

1. 在`mockDataManager.js`中的`getExampleConfigs`方法中添加新的示例配置
2. 在对应的mock数据文件中添加examples结构
3. 更新API接口支持新的示例参数

### 添加新的数据生成器

1. 在`mockDataManager.js`中添加新的生成方法
2. 在`generateDynamicData`方法中添加新的case
3. 在组件中调用新的数据生成器

### 自定义示例组件

```javascript
// 创建自定义示例选择器
<template>
  <div class="custom-example-selector">
    <ExampleSelector 
      :screen-type="screenType"
      v-model="selectedExample"
      @example-change="handleExampleChange"
    />
    <!-- 自定义内容 -->
  </div>
</template>

<script>
import ExampleSelector from '@/components/ExampleSelector'

export default {
  components: { ExampleSelector },
  // ...
}
</script>
```

## 最佳实践

1. **示例命名**：使用有意义的示例名称，便于用户理解
2. **数据真实性**：生成的mock数据应该接近真实业务场景
3. **性能优化**：大量数据生成时注意性能，可以使用分页或虚拟滚动
4. **用户体验**：提供清晰的示例说明和预览功能
5. **扩展性**：设计时考虑未来可能的扩展需求

## 故障排除

### 常见问题

1. **示例数据不显示**
   - 检查mock数据文件是否正确导入
   - 确认示例配置是否正确

2. **图表不渲染**
   - 检查ECharts是否正确初始化
   - 确认数据格式是否符合图表要求

3. **示例切换无效**
   - 检查事件监听是否正确绑定
   - 确认数据更新逻辑是否正确

### 调试方法

```javascript
// 开启调试模式
mockDataManager.addListener((example) => {
  console.log('示例切换:', example)
})

// 查看生成的数据
const data = mockDataManager.generateDynamicData('sales')
console.log('生成的销售数据:', data)
```

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基本的示例数据管理
- 提供4种大屏类型的示例

### v1.1.0
- 添加动态数据生成功能
- 优化示例选择器UI
- 增加数据预览功能

---

如有问题或建议，请联系开发团队。 