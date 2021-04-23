<template>
  <li class="flex align-center mb-1">
    <el-row class="flex align-center">
      <el-avatar size="medium" :src="isAvatar" class="mr-1"></el-avatar>
      <div class="user__name">{{ username }}</div>
    </el-row>

    <span class="role" v-if="isAdmin">Admin</span>
  </li>
</template>

<script lang="ts">

import { defineComponent, inject, PropType } from "vue";
import { IUserData } from "@/store/auth/types/user";
export default defineComponent({
  props: {
    username: {
      type:String,
      required: true,
    },
    avatar:{
      type:String,
    },
    isAdmin:{
      type:Boolean,
      required:true
    }
  },
  computed:{
    isAvatar():string{
      return this.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  }
});
</script>

<style scoped lang="scss">
li {
  @include list_item_mixin;
  position: relative;
  .role{
    font-size: 12px;
    position: absolute;
    right: 10px;
    top: 10px;
    color: $color_gray;
  }
}
.user__name {
  font-weight: 600;
  font-size: 0.95em;
}
</style>
