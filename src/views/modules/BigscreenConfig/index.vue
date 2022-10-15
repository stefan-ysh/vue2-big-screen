<template>
  <div
    class="custom-form"
    :style="{ height: windowHeight - 130 + 'px' }"
  >
    <el-form
      class="big-screen-config-form"
      :model="designData"
      label-width="70px"
      size="mini"
    >
      <el-form-item label="大屏名称">
        <el-input v-model="designData.title" size="mini" autocomplete="off" />
      </el-form-item>
      <el-form-item label="大屏简介">
        <el-input
          v-model="designData.description"
          size="mini"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="大屏尺寸">
        <div>
          <el-row>
            <el-col :span="11">
              <el-input-number
                v-model="designData.scaleX"
                size="mini"
                controls-position="right"
                :min="640"
                :max="10240"
                style="width: 100%"
              /></el-col>
            <el-col :span="2" style="text-align: center; color: #fff">
              x
            </el-col>
            <el-col :span="11">
              <el-input-number
                v-model="designData.scaleY"
                size="mini"
                controls-position="right"
                :min="320"
                :max="10240"
                style="width: 100%"
              /></el-col>
          </el-row>
        </div>
      </el-form-item>
      <el-form-item label="背景颜色">
        <BColorPicker field="bgColor" :data="designData" />
      </el-form-item>
      <el-form-item label="背景图片" class="bg-img-config">
        <div v-if="designData.bgImg" class="bg-img-wrap">
          <img class="bg-img-screenshot" :src="designData.bgImg">
          <!-- <i
              class="edit-bg-img-btn el-icon-edit"
              title="更改背景图片"
              @click.stop="handleChangePic"
            /> -->
          <i
            class="del-bg-img-btn el-icon-delete"
            title="删除背景图片"
            @click.stop="handleRemoveBgImg"
          />
        </div>
        <div v-else>
          <el-button
            class="select-bg-img"
            type="primary"
            size="mini"
            plain
            @click="showGallery"
          >选择图片</el-button>
        </div>
      </el-form-item>
      <el-form-item label="公开">
        <el-switch v-model="designData.isPublic" />
      </el-form-item>
      <el-form-item v-if="!designData.isPublic" label="访问密钥">
        <el-input v-model="designData.password" />
      </el-form-item>
    </el-form>
    <BGallery ref="gallery" imgType="bg" @confirmCheck="confirmCheck" />

  </div>
</template>

<script>
// 图片集
import BGallery from '@/components/BGallery'
import BColorPicker from '@/components/BColorPicker.vue'

export default {
  name: 'BigscreenConfig',
  components: {
    BGallery,
    BColorPicker
  },
  computed: {
    designData () {
      return this.$store.state.bigScreen.bigScreenData
    },
    windowHeight () {
      return this.$store.state.bigScreen.windowHeight
    }
  },
  methods: {
    confirmCheck (bgImg) {
      this.$store.dispatch('bigScreen/setBigScreenData', { bgImg })
    },
    showGallery () {
      this.$refs.gallery.opened()
    },
    handleRemoveBgImg () {
      this.$store.dispatch('bigScreen/setBigScreenData', { bgImg: '' })
    }
    // handleChangePic() {}
  }
}
</script>

<style lang='less' scoped>
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
  .big-screen-config-form{
    .bg-img-config{
      .bg-img-wrap{
        width: 100%;
        height: 100%;
        position:relative;
        .bg-img-screenshot{
          width: 100%;
          height: 100%;
        }
        .edit-bg-img-btn,
        .del-bg-img-btn{
          z-index:5;
          font-size: 15px;
          cursor:pointer;
          color:#fff;
          position:absolute;
          top: 5px;
        }
        .edit-bg-img-btn{
          right: 30px;
        }
        .del-bg-img-btn{
          right: 5px;
        }
      }
    }
  }
}
</style>
