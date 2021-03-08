<template>
  <li class="p-mb-2 p-d-flex p-ai-center p-jc-between p-p-2">
    <div class="user__name">{{ item.username }}</div>
  </li>
</template>

<script lang="ts">
import Button from "./Button.vue";
import Badge from "./Badge.vue";

import Avatar from "./Avatar.vue";

import { defineComponent, inject, PropType } from "vue";
import { IUserData } from "@/store/auth/types/user";
export default defineComponent({
  props: {
    item: {
      type: Object as PropType<IUserData>,
      required: true,
    },
  },
  components: { Badge, Avatar, Button },
  setup(props, ctx) {},
});
</script>

<style scoped lang="scss">
li {
  @include list_item_mixin;
}
.user__name {
  font-weight: 600;
  font-size: 0.95em;
}
</style>
