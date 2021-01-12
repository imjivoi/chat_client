<template>
  <button
    :class="{
      outline: outline,
      link: link,
      disabled: disabled,
      icon: isIcon,
      rounded: rounded,
    }"
    :style="{ width: width }"
    :disabled="disabled"
  >
    {{ label }}
    <slot name="icon" class="svg"></slot>
    <template v-if="link">
      <router-link :to="link"></router-link>
    </template>
  </button>
</template>

<script >
export default {
  props: {
    label: {
      type: String,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
    },
    iconColor: {
      type: String,
      default: "#2196F3",
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
    },
    width: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
  },
  data: () => ({
    isIcon: false,
  }),
  mounted() {
    if (this.$slots.icon) {
      this.isIcon = true;
    }
  },
};
</script>

<style scoped lang='scss'>
button {
  height: fit-content;
  border-radius: 5px;
  background: var(--primary-color);
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  color: #fff;
  position: relative;
  overflow: hidden;
  transition: 0.4s;

  &.disabled {
    background: $color_gray2;
  }
  &.icon {
    width: 40px;
    padding: 5px 10px;
    background: transparent;

    &:after {
      transform: none;
    }
  }

  &.outline {
    background: #fff;
    box-shadow: 0 0 0 1px var(--primary-color);
    color: var(--primary-color);
  }

  &:focus {
    outline: none;
  }

  &.rounded {
    padding: 10px;
    border-radius: 20px;
  }

  a {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
  }

  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    top: 50%;
    left: 50%;
    transform-style: flat;
    transform: translate3d(-50%, -50%, 0);
    background: rgba(white, 0.1);
    border-radius: 100%;
    transition: width 0.3s ease, height 0.3s ease;
  }
  &.outline:after {
    background: rgba(rgb(175, 188, 228), 0.1);
  }
  &:focus,
  &:active {
    &:after {
      width: 200px;
      height: 200px;
    }
  }
}
</style>