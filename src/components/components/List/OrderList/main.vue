<template>
  <ol
    :style="{
      width: width + 'px',
      height: height + 'px',
      overflow: 'auto',
      background: configProps.attribute.olBgColor,
      'border-top-right-radius': configProps.attribute.borderTopRightRadius + 'px',
      'border-bottom-right-radius': configProps.attribute.borderBottomRightRadius + 'px',
      'border-bottom-left-radius': configProps.attribute.borderBottomLeftRadius + 'px',
      'border-top-left-radius': configProps.attribute.borderTopLeftRadius + 'px',
      'font-family': configProps.attribute.textFamily
    }"
  >
    <li
      v-for="(item, index) in cptData"
      :key="index"
      :style="{
        background:
          index % 2 !== 0
            ? configProps.attribute.liEvenBgColor
            : configProps.attribute.liOddBgColor,
        ...style,
      }"
      :title="`${item.label}: ${item.value}`"
    >
      <span v-if="configProps.attribute.showIndex">
        {{ index + 1 }}.
      </span>
      <span :style="{ color: configProps.attribute.textColor }">
        {{ item.label }}
      </span>
    </li>
  </ol>
</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
import { getDataJson, pollingRefresh } from '@/utils'

export default {
  name: 'OList',
  props: {
    cptId: String,
    width: Number,
    height: Number,
    configProps: Object
  },
  data() {
    return {
      cptData: {},
      style: {}
    }
  },
  watch: {
    'configProps.attribute': {
      handler(newVal) {
        if (!newVal) {
          return
        }
        this.style = {
          height: `${newVal.liHeight}px`,
          'list-style-type': newVal.listStyle,
          'font-size': newVal.fontSize + 'px',
          color: newVal.indexColor,
          'font-weight': newVal.fontWeight,
          'text-align': newVal.textAlign,
          'padding-top': newVal.paddingTop + 'px',
          'padding-right': newVal.paddingRight + 'px',
          'padding-bottom': newVal.paddingBottom + 'px',
          'padding-left': newVal.paddingLeft + 'px',
          'margin-top': newVal.marginTop + 'px',
          'margin-right': newVal.marginRight + 'px',
          'margin-bottom': newVal.marginBottom + 'px',
          'margin-left': newVal.marginLeft + 'px'
        }
      },
      deep: true, // 深度监听
      immediate: true
    }
    // width() {
    // },
    // height() {
    // },
  },
  created() {},
  mounted() {
    this.refreshCptData()
  },
  methods: {
    refreshCptData() {
      pollingRefresh(this.uuid, this.configProps.cptDataForm, this.loadData)
    },
    loadData() {
      getDataJson(this.configProps.cptDataForm, this.cptId).then((res) => {
        this.cptData = res
      })
    }
  }
}
</script>

<style scoped>
/*滚动条整体样式*/
ol::-webkit-scrollbar {
  width: 25px;
  height: 25px;
  background-color: #ECECEC;
}

/*滚动条中间滑块*/
ol::-webkit-scrollbar-thumb {
  border-radius: 0px;
  background-color: rgba(163, 163, 163, .6);
}

/* 滚动条轨道 */
ol::-webkit-scrollbar-track:hover {
  background-color: transparent;
}
/* 外层轨道  与 ::-webkit-scrollbar 不同的是 ::-webkit-scrollbar-track 设置的是滑块滑动区域的样式。*/
ol::-webkit-scrollbar-track {
  background-color: #ECECEC;
}

/* 内层滚动槽 */
ol::-webkit-scrollbar-track-piece {
  /* background: red; */
}

ol::-webkit-scrollbar-button:decrement:start {
  width: 20px;
  height: 20px;
  display: block;
  background:rgba(236, 236, 236, 1);
}

/* // 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置 */
ol::-webkit-scrollbar-button:increment:end {
  width: 20px;
  height: 20px;
  display: block;
  background:rgba(236, 236, 236, 1);
}
</style>
