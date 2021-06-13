<template>
  <button
    :disabled="disabled"
    class="button"
    :class="{
      button__primary: color === 'primary',
      button__danger: color === 'danger',
      button__disabled: disabled,
      button__icon: isIcon,
      button__outline: type === 'outline',
    }"
  >
    <component class="icon" v-if="icon" :is="icon" />
    <span v-if="label">{{ label }}</span>
  </button>
</template>
<script lang="ts">
import {
  CheckmarkCircle,
  Close,
  Cloud,
  CrossCircle,
  Edit,
  Microphone as micro,
  MicrophoneOff as MicroOff,
  Pause,
  Play,
  Plus,
  SendIcon as send,
  Trash,
} from '@/components/icons';

import { defineComponent, PropType } from 'vue';

type Icons =
  | 'send'
  | 'plus'
  | 'micro'
  | 'cloud'
  | 'checkmark-circle'
  | 'cross-circle'
  | 'micro-off';

type BtnType = 'outline' | '';
export default defineComponent({
  name: 'Button',
  components: {
    Plus,
    send,
    micro,
    Cloud,
    CheckmarkCircle,
    CrossCircle,
    MicroOff,
    Edit,
    Trash,
    Play,
    Pause,
    Close,
  },
  props: {
    label: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    color: {
      type: String as PropType<'primary' | 'danger'>,
      required: false,
      default: 'primary',
    },
    size: {
      type: String as PropType<'small' | 'medium' | 'big'>,
      default: 'medium',
    },
    icon: {
      type: String as PropType<'' | Icons>,
      default: '',
      required: false,
    },
    isIcon: {
      type: Boolean,
      required: false,
      default: false,
    },
    type: {
      type: String as PropType<BtnType>,
      required: false,
      default: '',
    },
  },
});
</script>
<style scoped lang="scss">
.button {
  padding: 12px 20px;
  border-radius: 5px;
  color: #fff;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: white;

    :deep() path {
      color: white;
    }
  }

  span {
    line-height: 14px;
  }

  &:hover {
    opacity: 0.8;
  }

  &:focus,
  &:active {
    opacity: 1;
  }

  &__primary {
    background: $primary;
  }

  &__danger {
    background: $color_red;
  }

  &__disabled {
    background: #707c9782;

    &:hover {
      opacity: 1;
    }
  }

  &__outline {
    background: white;
    color: $primary;
    border: 1px solid $primary;

    &:hover {
      opacity: 1;
      background: #66b1ff30;
    }
  }

  &__icon {
    background: none;

    svg {
      width: 25px;
      fill: $primary;

      :deep() path {
        fill: $primary;
      }
    }
  }
}
</style>
