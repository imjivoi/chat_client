<template>
  <header>
    <div class="header__right">
      <Button
        type="button"
        label="Login"
        style="margin-right: 10px"
        class="p-button-raised p-button-rounded p-button-sm"
      />
      <Button
        label="Sign up"
        class="p-button-outlined p-button-raised p-button-rounded p-button-sm"
      />
    </div>
  </header>
</template>

<script>
import Button from "primevue/button";
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