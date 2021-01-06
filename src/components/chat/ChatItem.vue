<template>
  <router-link :to="`/chats/${chat.id}`">
    <li class="p-mb-2 p-p-2">
      <Badge
        color="#1ee952"
        :active="chat.type === 'D' ? participants[0].is_online : false"
      >
        <template v-slot:content
          ><Avatar label="P" class="p-avatar-circle"
        /></template>
      </Badge>
      <div class="chat__info">
        <div class="chat__name p-text-regular p-text-left">
          {{ chat.type === "D" ? participants[0].nickname : chat.title }}
        </div>
        <div class="chat__last-message">
          <MessageText
            :messageText="
              chat.last_message.user.id === userId
                ? `You: ${chat.last_message.text}`
                : chat.last_message.text
            "
          />
        </div>
      </div>
      <Badge
        :value="chat.unreaded_messages"
        :fontSize="0.6"
        :size="15"
        :active="chat.unreaded_messages ? true : false"
      />
    </li>
  </router-link>
</template>

<script lang='ts'>
import MessageText from "./MessageText";
import Badge from "../Badge.vue";

import Avatar from "primevue/avatar";

import { defineComponent, PropType } from "vue";
import { IChatItem } from "@/store/interfaces/chat";
import { IUserData } from "@/store/interfaces/user";
export default defineComponent({
  components: { Avatar, Badge, MessageText },
  props: {
    chat: {
      type: Object as PropType<IChatItem>,
    },
    userId: {
      type: String,
    },
  },
  computed: {
    participants(): IUserData[] | undefined {
      return this.chat?.participants.filter((i) => i.id !== this.userId);
    },
  },
});
</script>

<style scoped lang='scss'>
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include list_item_mixin;

  .chat__info {
    width: 70%;
  }

  .chat__name {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    width: 90%;
    font-size: 0.9em;
  }

  .chat__last-message {
    text-align: left;
    font-size: 0.8em;

    p {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      color: $color_gray;
      width: 90%;
    }
  }
}
</style>