<!-- eslint-disable vue/no-mutating-props -->

<template>
  <div>
    <el-form label-width="80px" size="mini">
      <el-form-item label="图库选择">
        <!--        <div class="formItemDiv" @click="showGallery">图库选择</div>-->
        <!-- <el-image
          style="width: 168px; height: 160px"
          :src="
            attribute.url
              ? uploadUrl + attribute.url
              : require('@/assets/logo/logo.png')
          "
          fit="fill"
          @click="showGallery"
        /> -->
        <el-image
          style="width: 168px; height: 160px"
          :src="
            attribute.url ? attribute.url : require('@/assets/logo/logo.png')
          "
          fit="fill"
          @click="showGallery"
        />
      </el-form-item>
      <el-form-item label="旋转">
        <el-col>
          <el-switch
            v-model="attribute.rotatable"
            :active-value="true"
            :inactive-value="false"
          />
        </el-col>
      </el-form-item>
      <el-form-item v-if="attribute.rotatable" label="旋转时间(s)">
        <el-col>
          <el-input-number
            v-model="attribute.rotateDuration"
            :min="0.1"
            :step="0.1"
            style="width: 100%"
            controls-position="right"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="填充方式">
        <el-select
          v-model="attribute.fit"
          placeholder="请选择填充方式"
          style="width: 100%"
        >
          <el-option label="拉伸填充" value="fill" />
          <el-option label="比例缩放" value="contain" />
          <el-option label="封面比例" value="cover" />
          <el-option label="保持比例" value="none" />
          <!-- <el-option label="scale-down" value="scale-down" /> -->
        </el-select>
      </el-form-item>
      <el-form-item label="点击放大">
        <el-switch
          v-model="attribute.preview"
          style="width: 100%"
          :active-value="true"
          :inactive-value="false"
        />
      </el-form-item>
    </el-form>
    <BGallery ref="gallery" type="img" @confirmCheck="confirmCheck" />
  </div>
</template>
<!-- eslint-disable vue/no-mutating-props -->
<script>
import BGallery from '@/components/BGallery';

export default {
  name: 'BImageSetter',
  components: { BGallery },
  props: {
    attribute: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // todo 文件上传url
      uploadUrl: 'example/upload',
    }
  },
  methods: {
    showGallery() {
      this.$refs.gallery.opened()
    },
    confirmCheck(imgSrc) {
      this.attribute.url = imgSrc
    },
  }
}
</script>

<style scoped>
.formItemUpload {
  width: 120px;
  height: 120px;
  background-color: #fff;
  border-radius: 6px;
  text-align: center;
  line-height: 120px;
  font-size: 40px;
  color: #aaa;
}
</style>
