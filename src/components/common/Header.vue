<template>
  <header>
    <div class="header__right flex" >
        <el-button @click="routeTo('Login')">Login</el-button>
        <el-button type="primary" @click="routeTo('Signup')">Sign up</el-button>
    </div>
  </header>
</template>

<script lang="ts">
import Button from "./Button.vue";

import {  defineComponent } from "vue";
export default defineComponent({
  components: {
    Button,
  },

  methods:{
    routeTo(name:string){
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
