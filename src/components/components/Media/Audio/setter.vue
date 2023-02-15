<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-form label-width="80px" size="mini">
    <el-form-item label="音频">
      <el-select v-model="attribute.audioSrc" style="width: 100%" placeholder="请选择" popper-class="big-screen-select">
        <el-option v-for="item in audioOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="颜色">
      <BColorPicker field="color" :data="attribute" />
    </el-form-item>
    <el-form-item label="大小">
      <el-input-number v-model="attribute.fontSize" controls-position="right" style="width: 100%" />
    </el-form-item>
    <el-form-item label="循环播放">
      <el-switch v-model="attribute.isLoop" />
    </el-form-item>
    <el-form-item class="trigger-type">
      <el-row :gutter="5">
        <el-col :span="11"> 对比方式 </el-col>
        <el-col :span="11"> 目标值 </el-col>
        <el-col :span="2" />
      </el-row>
      <el-row v-for="(con, idx) in attribute.playCondition" :key="idx" :gutter="5">
        <el-col :span="11">
          <el-select
            v-model="con.compareStyle"
            style="width: 100%"
            placeholder="请选择"
            popper-class="big-screen-select"
          >
            <el-option v-for="_t in compareTypes" :key="_t.value" :label="_t.label" :value="_t.value" />
          </el-select>
        </el-col>
        <el-col :span="11">
          <el-input-number v-model="con.target" style="width: 100%" controls-position="right" />
        </el-col>
        <el-col :span="2">
          <i class="el-icon-delete" style="cursor: pointer" @click="delRow(idx)" />
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col>
          <el-button style="width: 100%; border: none" @click="addRow">+</el-button>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<script>
import BColorPicker from '@/components/BColorPicker.vue'
export default {
  name: 'BAudioSetter',
  components: { BColorPicker },
  props: {
    attribute: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      audioOptions: [
        {
          label: '气泡',
          value: 'Bubble'
        },
        {
          label: '瓶盖',
          value: 'Bottle'
        },
        {
          label: '牛蛙',
          value: 'Bullfrog'
        },
        {
          label: '爆炸',
          value: 'Burst'
        },
        {
          label: '叮当',
          value: 'Clank'
        },
        {
          label: '渐强',
          value: 'FadeIn'
        },
        {
          label: '未知',
          value: 'NotificationXylophone'
        },
        {
          label: '雷达',
          value: 'Radar'
        },
        {
          label: '风铃',
          value: 'WindChime'
        }
      ],
      compareTypes: [
        {
          label: '>',
          value: '>'
        },
        {
          label: '<',
          value: '<'
        },
        {
          label: '=',
          value: '='
        },
        {
          label: '>=',
          value: '>='
        },
        {
          label: '<=',
          value: '<='
        }
      ]
    }
  },
  methods: {
    addRow() {
      // eslint-disable-next-line vue/no-mutating-props
      this.attribute.playCondition.push({})
    },
    delRow(idx) {
      // eslint-disable-next-line vue/no-mutating-props
      this.attribute.playCondition.splice(idx, 1)
    }
  }
}
</script>

<style scoped lang="less">
.trigger-type {
  /deep/ .el-form-item__content {
    font-size: 12px;
    margin-left: 0 !important;
  }
}
</style>
