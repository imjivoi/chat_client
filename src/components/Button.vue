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
    <div class="icon"><slot name="icon"></slot></div>

    {{ label }}
    <template v-if="link">
      <router-link :to="link"></router-link>
    </template>
  </button>
</template>

<script>
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
};
</script>

<style scoped lang="scss">
button {
  height: fit-content;
  border-radius: 6px;
  background: $background_blue_gradient;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  color: #fff;
  position: relative;
  overflow: hidden;
  transition: 0.4s;
  display: flex;
  align-items: center;
  box-shadow: $box_shadow2;
  transition: $transition;

  &:hover {
    box-shadow: none;
    transition: $transition;
  }

  &.disabled {
    background: $color_gray2;
  }
  .icon {
    margin: 0 7px 0 0;
    height: 24px;
    width: 24px;
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
