<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
import Main from "./AppMainLayout";
import Empty from "./AppEmptyLayout";
export default {
  name: "AppLayout",
  components: { Main, Empty },
  computed: {
    layout() {
      console.log(this.$route.meta.layout);
      return this.$route.meta.layout || Empty;
    },
  },
};
</script>

<style lang="scss" scoped></style>
