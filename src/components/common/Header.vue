<template>
  <header>
    <div class="header__right flex">
      <Button type="outline" label="Login" @click="routeTo('Login')"
              class="mr-1"/>
      <Button @click="routeTo('Signup')" label="Sign up"/>
    </div>
  </header>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import Button from "@/components/ui/Button.vue";

export default defineComponent({
  components: {Button},
  methods: {
    routeTo(name: string) {
      this.$router.push({name})
    }
  }
});
</script>

<style scoped>
header {
  height: 8vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #fff;
  padding: 0 15px;
  z-index: 10;
}

.header__right {
  float: right;
}
</style>
