<template>
  <iframe
    loading="lazy"
    width="100%"
    height="100%"
    :src="configProps.attribute.url"
  />
</template>
<script>
export default {
  name: 'BIframe',
  props: {
    configProps: { type: Object, default: () => {} }
  }
}
</script>
