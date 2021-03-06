<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
import Default from "./AppDefaultLayout";
import Empty from "./AppEmptyLayout";
export default {
  name: "AppLayout",
  components: { Default, Empty },
  computed: {
    layout() {
      return this.$route.meta.layout || Default;
    },
  },
};
</script>

<style lang="scss" scoped></style>
