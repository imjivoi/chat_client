<template>
  <header>
    <div class="header__right">
      <Button label="Login" style="margin-right: 10px" />
      <Button label="Sign up" outline />
    </div>
  </header>
</template>

<script>
import Button from "./Button";
export default {
  components: {
    Button,
  },
};
</script>

<style scoped>
header {
  height: 8vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #fff;
  padding: 0 15px;
}
.header__right {
  float: right;
}
</style>