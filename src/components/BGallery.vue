<template>
  <el-dialog title="图库" :visible="galleryVisvible" width="75%" close-on-click-modal @close="closeDialog">
    <el-row :gutter="6" class="gallery-row">
      <el-col v-for="img in imgList" :key="img.id" :span="4" class="gallery-col" @click.native="checkImg(img)">
        <div class="img-item-wrap" :class="isCurrentImg(img) ? 'selected-img' : ''">
          <el-image style="" :src="img.src" fit="contain" @dblclick="dbclickImg(img)" />
          <!-- <el-image
                  style="width: 100%; height: 100%"
                  :src="imgUploadUrl + img.src"
                  fit="fill"
                /> -->
        </div>
        <div class="img-title" :class="isCurrentImg(img) ? 'selected-title' : ''">
          {{ img.title }}
        </div>
      </el-col>
    </el-row>

    <span slot="footer" class="dialog-footer">
      <el-button class="cancel-btn" size="small" @click="galleryVisvible = false">取 消</el-button>
      <el-button class="confirm-btn" type="primary" size="small" @click="confirmCheck">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import ImgList from '@/components/register/img-list'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Gallery',
  props: {
    imgType: {
      type: String,
      default: 'img'
    }
  },
  data() {
    return {
      imgUploadUrl: process.env.VUE_APP_SERVER_URL,
      imgList: [],
      galleryVisvible: false,
      checkedItem: {},
      formGroup: { name: '' }
    }
  },
  methods: {
    closeDialog() {
      this.galleryVisvible = false
    },
    isCurrentImg(item) {
      return this.checkedItem.id === item.id
    },
    opened() {
      this.imgList = ImgList.filter(img => {
        return img.type === this.imgType
      })
      this.checkedItem = {}
      this.loadData()
      this.galleryVisvible = true
    },
    loadData() {
      // 动态拉取
      // this.imgList = []
    },
    // 点击确认选择
    confirmCheck() {
      if (!this.checkedItem || !this.checkedItem.id) {
        this.$message.info('请选择图片')
      } else {
        this.$emit('confirmCheck', this.checkedItem.src)
        this.closeDialog()
      }
    },
    // 点击图片
    checkImg(item) {
      this.checkedItem = item
    },
    // 双击图片
    dbclickImg(item) {
      this.checkedItem = item
      this.confirmCheck()
    }
  }
}
</script>

<style scoped lang="less">
.gallery-row {
  .gallery-col {
    .img-item-wrap {
      cursor: pointer;
      border: 1px solid rgb(58, 51, 51);
      height: 100px;
      transition: all 0.2s linear;
      .el-image {
        width: 100%;
        height: 100%;
      }
    }
    .img-title {
      transition: all 0.3s;
      text-align: center;
      height: 20px;
      margin-bottom: 6px;
      overflow: hidden;
      font-family: hooge;
      color: #4d7297;
    }
    .selected-title {
      color: #fff;
    }
    .selected-img {
      border: 2px solid #215c97;
      border-radius: 10px;
      position: relative;
      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        content: '';
        width: 20px;
        height: 40px;
        border-color: green;
        border-style: solid;
        border-width: 0 3px 5px 0;
        transform: rotate(45deg) translate(-100%, -50%);
      }
    }
  }
}
// .dialog-footer{
//   .cancel-btn {
//     background: #3b4044;
//   }
//   .confirm-btn {
//     background: #4e3668;
//     color: rgb(109, 123, 138);
//   }

//   .el-button{
//     text-decoration: none;
//     // color: #fff;
//     border: 2px solid rgb(87, 72, 72);
//     position:relative;
//     transition: all .5s;
//     padding: 5px 25px;
//   }

//   .el-button:hover{
//     text-decoration:none;
//     color: #fff;
//     background-color:rgb(87, 72, 72);
//   }

//   .el-button::before,
//   .el-button::after{
//     content:"";
//     position:absolute;
//     width:3rem;
//     height:3rem;
//     border-style: solid;
//     border-color: rgb(87, 72, 72);
//     transition: all .3s
//   }

//   .el-button::before{
//     top: -0.5rem;
//     left:-0.5rem;
//     border-width: 1px 0 0 1px;
//   }

//   .el-button::after{
//     bottom:-0.5rem;
//     right:-0.5rem;
//     border-width: 0px 1px 1px 0px;
//   }

//   .el-button:hover::before,
//   .el-button:hover::after{
//     width:calc(100% + 1.5rem);
//     height:calc(100% + 1.5rem);
//     border-color:rgb(92, 135, 230);
//   }
// }
</style>
