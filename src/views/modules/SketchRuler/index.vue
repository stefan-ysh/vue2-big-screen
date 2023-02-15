<template>
  <SketchRule
    v-if="showRuler"
    id="mb-ruler"
    :thick="thick"
    :scale="scale"
    :width="width"
    :height="height"
    :startX="startX"
    :startY="startY"
    :lines="lines"
    :palette="palette"
    :corner-active="true"
  />
  <!--
    :hor-line-arr="lines.h"
    :ver-line-arr="lines.v"
    -->
</template>

<script>
import SketchRule from 'vue3-sketch-ruler'
import 'vue3-sketch-ruler/lib/style.css'
export default {
  name: 'SketchRuler',
  components: { SketchRule },
  props: {
    scale: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showRuler: true,
      // scale: 2, // 658813476562495, //1,
      startX: 0,
      startY: 0,
      lines: {
        h: [],
        v: []
      },
      thick: 20,
      isShowRuler: true,
      isShowReferLine: true,
      palette: {
        bgColor: 'rgba(225,225,225, 0)',
        longfgColor: '#BABBBC',
        shortfgColor: '#C8CDD0',
        fontColor: '#7D8694',
        shadowColor: '#E8E8E8',
        lineColor: '#EB5648',
        borderColor: '#DADADC',
        cornerActiveColor: 'rgb(235, 86, 72, 0.6)'
      }
    }
  },
  watch: {
    // 重绘
    scale() {
      this.showRuler = false
      setTimeout(() => {
        this.showRuler = true
      }, 0)
    }
  }
}
</script>

<style>
#mb-ruler {
  top: 0;
  left: 0;
}

/* 适配底部的工具栏不遮盖 */
/* #mb-ruler .v-container {
  height: calc(100% - 65px) !important;
} */
/* 横线 */
#mb-ruler .v-container .lines .line {
  /* 最大缩放 200% */
  width: 200vw !important;
  border-top: 1px dashed #fcd337 !important;
}
#mb-ruler .v-container .indicator {
  border-bottom: 1px dashed #fcd337 !important;
}
/* 竖线 */
#mb-ruler .h-container .lines .line {
  /* 最大缩放 200% */
  height: 200vh !important;
  border-left: 1px dashed #fcd337 !important;
  padding: 0;
}
/* 文字 */
#mb-ruler .h-container .lines .line .action,
#mb-ruler .v-container .lines .line .action {
  color: rgb(252, 252, 252);
  top: 0px !important;
  left: 0px !important;
}
/* 水平文字 */
#mb-ruler .h-container .lines .line .action .value {
  color: rgb(252, 252, 252);
  left: 0px !important;
}
/* 垂直文字 */
#mb-ruler .v-container .lines .line .action .value {
  color: rgb(252, 252, 252);
  top: 0px !important;
}
/* 删除符号 */
#mb-ruler .h-container .lines .line .del,
#mb-ruler .v-container .lines .line .del {
  color: #fcd337;
  font-size: 20px;
  font-weight: bold;
  user-select: none;
}
/* 水平 */
#mb-ruler .h-container {
  height: auto !important;
}
/* 垂直 */
#mb-ruler .v-container {
  width: auto !important;
}
/* 水平删除符号 */
#mb-ruler .h-container .lines .line .del {
  margin-left: -20px !important;
}

/* 垂直删除符号 */
#mb-ruler .v-container .lines .line .del {
  margin-top: -10px !important;
}

#mb-ruler .h-container .indicator {
  border-left: 1px dashed #fcd337 !important;
}

/* 左上角与眼睛 */
#mb-ruler .corner {
  border: none !important;
}
</style>
