<template>
  <section class="auth">
    <p><router-link to="/">Back to main page</router-link></p>
    <div class="auth__block">
      <router-view />
    </div>
  </section>
</template>

<style scoped lang='scss'>
.auth {
  height: 100%;
  width: 100vw;
  background: #fff;

  p {
    position: absolute;
    left: 50px;
    top: 70px;
  }
  &__block {
    @include block_mixin;
    width: 300px;
    min-height: 300px;
    box-shadow: 0 0 4px 0 $color_gray;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>