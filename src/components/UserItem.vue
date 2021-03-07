<template>
  <li class="p-mb-2 p-d-flex p-ai-center p-jc-between p-p-2">
    <Badge color="#1ee952" class="p-mr-5">
      <template v-slot:content
        ><Avatar :image="item.avatar" :nickname="item.nickname"/></template
    ></Badge>
    <div class="user__name">{{ item.nickname }}</div>
    <Button label="Send" rounded @click="createChat()" />
  </li>
</template>

<script lang="ts">
import Button from "./Button.vue";
import Badge from "./Badge.vue";

import Avatar from "./Avatar.vue";

import { defineComponent, inject, PropType } from "vue";
import { IUserData } from "@/store/auth/types/user";
import { AllActionTypes } from "@/store/types/actions.types";
import { useStore } from "@/composition-api/useStore";
import { ICreateChatData } from "@/utils/api/chatAPI";
export default defineComponent({
  props: {
    item: {
      type: Object as PropType<IUserData>,
      required: true,
    },
  },
  components: { Badge, Avatar, Button },
  setup(props, ctx) {
    const store = useStore();

    function createChat() {
      const userId = store.getters.userData?._id;
      if (userId) {
        const data: ICreateChatData = {};
        store.dispatch(AllActionTypes.CREATE_CHAT, data);
      }
    }

    return { createChat };
  },
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
