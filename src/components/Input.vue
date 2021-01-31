<template>
  <div class="input">
    <div class="icon"><slot name="icon"></slot></div>
    <input :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "Search",
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  width: fit-content;
  position: relative;
}
input {
  width: 300px;
  height: 50px;
  background: #fff;
  border-radius: 6px;
  border: none;
  padding: 0 0 0 65px;
  color: $color_gray;

  &:focus {
    outline: none;
    box-shadow: $box_shadow;
  }
}
.icon {
  width: 24px;
  height: 24px;
  position: absolute;
  left: 60px;
  top: 50%;
  transform: translate(-41px, -50%);
  svg {
    width: 100%;
  }
}
</style>
