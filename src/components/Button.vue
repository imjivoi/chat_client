<template>
  <button
    :class="{ outline: outline, icon: icon.length, ripple: !icon.length }"
  >
    {{ label }}
    <slot v-if="icon">
      <i
        :data-eva="icon"
        :data-eva-fill="iconColor"
        data-eva-height="20"
        data-eva-width="20"
      ></i>
    </slot>
  </button>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
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
      default: "",
    },
    iconColor: {
      type: String,
      default: "#2196F3",
    },
    rounded: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({}),
  computed: {},
  mounted() {
    //@ts-ignore
    eva.replace();
  },
});
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
  transition-duration: 0.4s;
  svg {
    width: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
  }

  &.icon {
    color: #131313;
    background: transparent;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
}

button.ripple:after {
  content: "";
  background: #90b9ee;
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px !important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.8s;
  border-radius: 5px;
}

button:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s;
}
</style>