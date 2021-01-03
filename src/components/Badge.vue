<template>
  <div>
    <span
      class="badge"
      :style="{
        background: color,
        width: [hasContent ? '' : `${size}px`],
        height: [hasContent ? '' : `${size}px`],
        fontSize: `${fontSize}em`,
      }"
      :class="{ positioned: hasContent }"
    >
      {{ value }}
    </span>
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "#e91e63",
    },
    size: {
      type: Number,
      default: 20,
    },
    fontSize: {
      type: Number,
      default: 1,
    },
  },
  data: () => ({
    hasContent: false,
  }),
  mounted() {
    if (this.$slots.content) {
      this.hasContent = true;
    }
  },
};
</script>

<style scoped lang='scss'>
div {
  position: relative;
}
.badge {
  border-radius: 50%;
  color: #fff;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  &.positioned {
    position: absolute;
    top: 0;
    right: 0;
    width: 10px;
    height: 10px;
  }
}
</style>