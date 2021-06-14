<template>
  <div class="pop" @mouseover="showContent = true" @mouseleave="showContent = false">
    <MoreIcon />
    <transition name="fade-to-top">
      <div class="content" v-show="showContent">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import { MoreVertical as MoreIcon } from '@/components/icons';

export default {
  name: 'Popover',
  components: { MoreIcon },
  data: () => ({
    showContent: false,
  }),
};
</script>

<style scoped lang="scss">
.pop {
  position: relative;
  cursor: pointer;

  svg {
    height: 20px;
  }

  //&:hover {
  //  .content {
  //    opacity: 1;
  //    display: block;
  //    transform: translateY(0);
  //  }
  //}
}

.content {
  top: 0;
  left: -150px;
  //transform: translateY(20px);
  transition: all 0.4s;
  position: absolute;
  min-width: 150px;
  border-radius: 10px;
  background: #fff;
  box-shadow: $box_shadow_hover;
  z-index: 10;
  max-height: 300px;
  height: fit-content;
  padding: 10px;
  text-align: center;
}

.pop-item {
  margin: 0 0 10px;
  font-size: 18px;

  &:hover {
    opacity: 0.8;
  }

  &:last-child {
    margin: 0;
  }
}
</style>
