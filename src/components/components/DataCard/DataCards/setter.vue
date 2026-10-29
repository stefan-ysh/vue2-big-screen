<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <el-form label-width="90px" size="mini">
      <el-form-item label="排列方向">
        <el-select v-model="attribute.layout" popper-class="big-screen-select">
          <el-option label="横向排列" value="horizontal" />
          <el-option label="纵向排列" value="vertical" />
        </el-select>
      </el-form-item>
      <el-form-item label="背景色">
        <BColorPicker :data="attribute" field="backgroundColor" show-alpha />
      </el-form-item>
      <el-form-item label="边框色">
        <BColorPicker :data="attribute" field="borderColor" show-alpha />
      </el-form-item>
      <el-form-item label="数值颜色">
        <BColorPicker :data="attribute" field="valueColor" show-alpha />
      </el-form-item>
      <el-form-item label="标题颜色">
        <BColorPicker :data="attribute" field="titleColor" show-alpha />
      </el-form-item>
      <el-form-item
        v-for="(item, index) in cardItems"
        :key="index"
        :label="'卡片' + (index + 1)"
      >
        <div class="card-item-editor">
          <el-input v-model="item.title" placeholder="标题" />
          <el-input v-model="item.value" placeholder="数值" />
          <el-input v-model="item.growth" placeholder="涨幅，如 +12.5%" />
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            @click="removeItem(index)"
          />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain size="mini" icon="el-icon-plus" @click="addItem">
          添加卡片
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/* eslint-disable vue/no-mutating-props */
import BColorPicker from '@/components/BColorPicker.vue'

export default {
  name: 'DataCardsSetter',
  components: { BColorPicker },
  props: {
    attribute: {
      type: Object,
      default: () => ({})
    }
  },
  created() {
    if (!Array.isArray(this.attribute.items)) {
      this.$set(this.attribute, 'items', [])
    }
  },
  computed: {
    cardItems() {
      return Array.isArray(this.attribute.items) ? this.attribute.items : []
    }
  },
  methods: {
    addItem() {
      this.attribute.items.push({ title: '新卡片', value: '0', growth: '', icon: '' })
    },
    removeItem(index) {
      this.attribute.items.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.card-item-editor {
  display: flex;
  align-items: center;
  gap: 4px;
}

.card-item-editor .el-input {
  margin-right: 4px;
}
</style>
