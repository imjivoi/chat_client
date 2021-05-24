<template>
  <transition name="fade">
    <div class="context-menu" ref="context" :style="style"
         v-show="show" v-click-outside="close">
      <slot/>
    </div>
  </transition>

</template>
<script>
export default {
  name: 'ContextMenu',

  data: () => ({
    left: 0,
    top: 0,
    show: false
  }),
  computed: {
    style() {
      return {
        top: this.top + 'px',
        left: this.left + 'px',
      };
    },
  },
  methods: {
    open(evt) {
      this.left = (evt.pageX || evt.clientX) - window.pageXOffset + 30;
      this.top = (evt.pageY || evt.clientY) - window.pageYOffset;
      this.$nextTick(() =>
        this.$el.focus());
      this.show = true;
    },
    close(e) {
      this.show = false
    }
  }
}
</script>
<style lang="scss">
.context-menu {
  position: fixed;
  background: white;
  z-index: 999;
  outline: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  border-radius: 10px;

  div {
    width: 100%;
    text-align: center;
    font-size: 18px;
    color: $primary;
    font-weight: 600;
    padding: 10px 30px;
    transition: all .4s;
    border-radius: 10px;



    &:hover {
      background: #66b1ff5c;
    }
  }
}
</style>
