<template>
  <div style="font-family: hooge; height: 100%">
    <table
      style="width: 100%; height: 100%; text-align: center"
      :style="{ ...rotateDeg }"
    >
      <tr style="height: 100%">
        <td
          v-for="item in cptData.value.length"
          :key="item"
          :style="{
            width: (1 / cptData.value.length) * 100 + '%',
            padding: configProps.attribute.padding + 'px',
          }"
        >
          <div
            style="border: 1px solid; width: 100%; height: 100%"
            :style="{
              lineHeight: height - configProps.attribute.padding * 2 + 'px',
              backgroundColor: configProps.attribute.bgColor,
              borderColor: configProps.attribute.borderColor,
              fontSize: configProps.attribute.fontSize + 'px',
              color: configProps.attribute.color,
            }"
          >
            {{ cptData.value.substr(item - 1, 1) }}
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { getDataJson, pollingRefresh } from '@/utils/big-screen';

export default {
  name: 'RectNum',
  props: {
    rotateDeg: { type: Object, default: () => {} },
    configProps: { type: Object, default: () => {} },
    // eslint-disable-next-line vue/require-default-prop
    height: Number
  },
  data() {
    return {
      cptData: { value: '12345' },
      uuid: null
    }
  },
  created() {
    this.uuid = require('uuid').v1()
    this.refreshCptData()
  },
  methods: {
    refreshCptData() {
      pollingRefresh(this.uuid, this.configProps.cptDataForm, this.loadData)
    },
    loadData() {
      getDataJson(this.configProps.cptDataForm).then((res) => {
        this.cptData = res
      });
    }
  }
}
</script>

<style scoped></style>
