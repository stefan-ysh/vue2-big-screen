<template>
  <iframe
    loading="lazy"
    width="100%"
    height="100%"
    :style="{ ...rotateDeg }"
    :src="configProps.attribute.url"
  />
</template>
<script>
export default {
  name: 'BIframe',
  props: {
    rotateDeg: {
      type: Object,
      default: () => {}
    },
    configProps: { type: Object, default: () => {} }
  }
}
</script>
