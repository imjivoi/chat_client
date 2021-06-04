<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Select',
  emits: { input: null },
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default ? this.default : this.options.length > 0 ? this.options[0] : null,
      open: false,
    };
  },
  mounted() {
    this.$emit('input', this.selected);
  },
};
</script>

<style scoped lang="scss">
.custom-select {
  position: relative;
  width: fit-content;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 47px;
}

.custom-select .selected {
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid $primary;
  padding: 0 2em 0 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected.open {
  border-radius: 6px 6px 0px 0px;
}

.custom-select .selected:after {
  position: absolute;
  content: '';
  top: 22px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #000 transparent transparent transparent;
}

.custom-select .items {
  color: #fff;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  border-right: 1px solid $primary;
  border-left: 1px solid $primary;
  border-bottom: 1px solid $primary;
  position: absolute;
  background-color: #fff;
  left: 0;
  right: 0;
  top: 100%;
  z-index: 1;
}

.custom-select .items div {
  color: $primary;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  background-color: $primary;
  color: #fff;
}

.selectHide {
  display: none;
}
</style>
