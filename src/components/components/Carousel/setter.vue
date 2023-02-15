<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <el-form label-width="80px" size="mini">
      <el-form-item label="自动切换">
        <el-switch
          v-model="attribute.autoplay"
          size="mini"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item v-show="attribute.autoplay" label="切换时间">
        <el-input-number
          v-model="attribute.interval"
          size="mini"
          :step="500"
          controls-position="right"
          :min="1000"
          placeholder="自动切换的时间间隔"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="切换方向">
        <el-select
          v-model="attribute.direction"
          style="width: 100%"
          size="mini"
          placeholder="请选择切换方向"
        >
          <el-option label="横向" value="horizontal" />
          <el-option label="纵向" value="vertical" />
        </el-select>
      </el-form-item>
      <el-form-item label="切换箭头">
        <el-select
          v-model="attribute.arrow"
          style="width: 100%"
          size="mini"
          placeholder="请选择切换箭头显示时机"
        >
          <el-option label="总是显示" value="always" />
          <el-option label="鼠标悬停显示" value="hover" />
          <el-option label="从不显示" value="never" />
        </el-select>
      </el-form-item>
      <el-form-item label="切换触发">
        <el-select
          v-model="attribute.trigger"
          style="width: 100%"
          size="mini"
          placeholder="请选择触发切换方式"
        >
          <el-option label="鼠标悬停触发" value="hover" />
          <el-option label="鼠标点击触发" value="click" />
        </el-select>
      </el-form-item>
      <el-form-item label="轮播风格">
        <el-select
          v-model="attribute.carouseltype"
          style="width: 100%"
          size="mini"
          placeholder="请选择触发切换方式"
        >
          <el-option label="默认" value="default" />
          <el-option label="卡片" value="card" />
        </el-select>
      </el-form-item>
      <el-form-item label="图片填充">
        <el-select
          v-model="attribute.fit"
          style="width: 100%"
          size="mini"
          placeholder="请选择图片填充方式"
        >
          <el-option label="拉伸填充" value="fill" />
          <el-option label="比例缩放" value="contain" />
          <el-option label="封面比例" value="cover" />
          <el-option label="保持比例" value="none" />
          <!-- <el-option label="scale-down" value="scale-down" /> -->
        </el-select>
      </el-form-item>
      <el-form-item label="轮播图片">
        <el-upload
          :action="uploadUrl + '/file/upload?dir=imgPool'"
          :headers="uploadHeaders"
          :before-upload="beforeBgImgUpload"
          :show-file-list="false"
          :on-error="handleError"
          list-type="picture"
          :on-success="handleAvatarSuccess"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-row :gutter="4">
        <el-col
          v-for="(item, index) in attribute.imgUrls"
          :key="index"
          :span="12"
          class="imgBlock"
        >
          <el-image
            style="width: 100%; height: 100%"
            :src="item"
            fit="contain"
          />
          <div class="dleMask">
            <div
              style="width: 24px; margin: 40px auto"
              @click="handleRemove(index)"
            >
              <i class="el-icon-delete" />
            </div>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable handle-callback-err -->
<script>
// import { getToken } from '@/utils/auth'

export default {
  name: 'CarouselSetter',
  props: { attribute: { type: Object, default: () => {} }},
  data() {
    return {
      // todo 文件上传url
      uploadUrl: 'example/upload',
      // uploadHeaders: { 'X-Token': getToken() },
      uploadHeaders: {},
      fileList: []
    }
  },
  methods: {
    beforeBgImgUpload(file) {
      const isIMG = file.type.substr(0, 5) === 'image';
      const isLt5M = file.size / 1024 / 1024 < 25
      if (!isIMG) {
        this.$message.error('上传图片只能是图片格式!');
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 25MB!');
      }
      return isIMG && isLt5M
    },
    handleRemove(index) {
      this.attribute.imgUrls.splice(index, 1)
    },
    handleAvatarSuccess(res) {
      if (res.code !== 1) {
        this.$message.error(res.msg)
      }
      this.attribute.imgUrls.push(this.uploadUrl + '/file/img/' + res.data)
    },
    handleError(err, file) {
      console.log(
        '%c [ err ]-126',
        'font-size:13px; background:pink; color:#bf2c9f;',
        err
      )
      this.$message.error('图片上传失败，使用本地路径');
      this.attribute.imgUrls.push(file.url)
    },
  }
}
</script>

<style scoped>
.imgBlock {
  position: relative;
  height: 100px;
}
.imgBlock:hover .dleMask {
  display: block;
  cursor: pointer;
}
.dleMask {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background: #6667;
  color: #fff;
  font-size: 20px;
  display: none;
}
</style>
