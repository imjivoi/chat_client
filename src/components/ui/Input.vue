<template>
  <div class="input-block">
    <div class="input-container">
      <div class="icon">
        <slot name="icon"></slot>
      </div>
      <input type="text"
             :placeholder="placeholder"
             :value="text"
             :disabled="disabled"
             @input="onInput"
             ref="input"/>
    </div>
    <p class="input-error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "Input",
  model: {
    prop: 'text',
    event: 'update'
  },
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: ''
    },
    error: {
      type: String, required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  emits: {
    'update:text': null
  },


  methods: {
    focus() {
      this.$refs.input.focus()
    },
    onInput(event) {
      this.$emit('update:text', event.target.value)
    }
  },

};
</script>

<style lang="scss" scoped>
.input-container {
  position: relative;
}

input {
  height: 50px;
  width: 100%;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #707c9766;
  padding: 5px 10px;
  color: #000;
  font-size: 14px;
  font-weight: 400;

  ::placeholder {
    color: $color_gray;

  }

  &:focus, &:active {
    outline: none;
    box-shadow: 0 0px 4px #66b1ff;
    border-color: #66b1ff;
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

.input-error {
  color: $color_red;
  font-size: 12px;
}
</style>
