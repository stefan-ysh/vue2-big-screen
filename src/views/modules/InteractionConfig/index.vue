<template>
  <div class="custom-form" :style="{ height: windowHeight - 140 + 'px' }">
    <el-form size="mini" label-position="top">
      <el-form-item>
        <el-row>
          <el-col :span="8"> 开启 </el-col>
          <el-col :span="16">
            <el-switch v-model="interaction.interactable" />
          </el-col>
        </el-row>
        <el-row v-if="interaction.interactable">
          <el-col :span="8"> 点击跳转 </el-col>
          <el-col :span="16">
            <el-switch v-model="interaction.clickAble" />
          </el-col>
        </el-row>
        <el-row v-if="interaction.interactable && interaction.clickAble">
          <el-col :span="8"> 跳转链接 </el-col>
          <el-col :span="16">
            <el-input v-model="interaction.url" />
          </el-col>
        </el-row>
        <el-row v-if="interaction.interactable && interaction.clickAble">
          <el-col :span="8"> 携带参数 </el-col>
          <el-col :span="16">
            <el-input v-model="interaction.params" />
          </el-col>
        </el-row>
        <el-row v-if="interaction.interactable">
          <el-col :span="8"> 联动刷新 </el-col>
          <el-col :span="16">
            <el-select
              v-model="interaction.linkageIds"
              multiple
              collapse-tags
              placeholder="点击该组件时刷新所选组件的数据"
              popper-class="big-screen-select"
              style="width: 100%"
            >
              <el-option
                v-for="item in otherComponents"
                :key="item.id"
                :label="item.layerName || item.cptTitle"
                :value="item.id"
              />
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<!-- eslint-disable vue/no-mutating-props -->
<script>
export default {
  name: 'InteractionConfig',
  computed: {
    currentCpt() {
      return this.$store.state.bigScreen.curComponent
    },
    windowHeight() {
      return this.$store.state.bigScreen.windowHeight
    },
    // 组件的交互配置；交互对象在组件加入画布时不一定初始化，此处保证可写
    interaction() {
      return (this.currentCpt.configProps && this.currentCpt.configProps.interaction) || {}
    },
    // 可选的联动目标：除当前组件外的所有画布组件
    otherComponents() {
      return this.$store.state.bigScreen.componentList.filter(
        c => c.id !== this.currentCpt.id
      )
    }
  },
  watch: {
    currentCpt: {
      handler() {
        this.ensureInteraction()
      },
      immediate: true
    }
  },
  methods: {
    // 为没有交互配置的组件补齐默认结构
    ensureInteraction() {
      const cpt = this.currentCpt
      if (!cpt || !cpt.configProps) return
      if (!cpt.configProps.interaction) {
        this.$set(cpt.configProps, 'interaction', {
          interactable: false,
          clickAble: false,
          url: '',
          params: '',
          linkageIds: []
        })
      }
      if (!Array.isArray(cpt.configProps.interaction.linkageIds)) {
        this.$set(cpt.configProps.interaction, 'linkageIds', [])
      }
    }
  }
}
</script>

<style></style>
