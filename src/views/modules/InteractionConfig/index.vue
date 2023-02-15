<template>
  <div class="custom-form" :style="{ height: windowHeight - 140 + 'px' }">
    <el-form size="mini" label-position="top">
      <el-form-item>
        <el-row>
          <el-col :span="8"> 开启 </el-col>
          <el-col :span="16">
            <el-switch
              v-model="currentCpt.configProps.interaction.interactable"
            />
          </el-col>
        </el-row>
        <el-row v-if="currentCpt.configProps.interaction.interactable">
          <el-col :span="8"> 点击跳转 </el-col>
          <el-col :span="16">
            <el-switch v-model="currentCpt.configProps.interaction.clickAble" />
          </el-col>
        </el-row>
        <el-row
          v-if="
            currentCpt.configProps.interaction.interactable &&
            currentCpt.configProps.interaction.clickAble
          "
        >
          <el-col :span="8"> 跳转链接 </el-col>
          <el-col :span="16">
            <el-input v-model="currentCpt.configProps.interaction.url" />
          </el-col>
        </el-row>
        <el-row
          v-if="
            currentCpt.configProps.interaction.interactable &&
            currentCpt.configProps.interaction.clickAble
          "
        >
          <el-col :span="8"> 携带参数 </el-col>
          <el-col :span="16">
            <el-input v-model="currentCpt.configProps.interaction.params" />
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

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
  }
}
</script>

<style></style>
