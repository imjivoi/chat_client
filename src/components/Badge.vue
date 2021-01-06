<template>
  <div>
    <span
      class="badge"
      :style="{
        background: active ? color : 'transparent',
        fontSize: `${fontSize}em`,
      }"
      :class="{ positioned: hasContent, sized: value >= 100 }"
    >
      <p>{{ value }}</p>
    </span>
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
    },
    color: {
      type: String,
      default: "rgb(156 39 176 / 60%)",
    },
    size: {
      type: Number,
      default: 20,
    },
    fontSize: {
      type: Number,
      default: 1,
    },
    active: {
      type: Boolean,
      required: true,
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
  width: 2rem;
}
.badge {
  border-radius: 50%;
  color: #fff;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 32px;
  padding: 3px;
  width: fit-content;

  p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &.positioned {
    position: absolute;
    top: 0;
    right: 0;
    width: 10px;
    height: 10px;
    z-index: 10;
  }

  &.sized {
    border-radius: 5px;
    padding: 2px;
    width: auto !important;
    height: auto !important;
    max-width: 28px !important;
  }
}
</style>