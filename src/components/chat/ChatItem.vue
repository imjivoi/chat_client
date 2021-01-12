<template>
  <router-link :to="`/chats/${chat.id}`">
    <li class="p-mb-2 p-p-2">
      <Badge
        class="p-mr-2"
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
          <p v-if="chat.last_message">
            {{
              chat.last_message.user.id === userId
                ? `You: ${chat.last_message.text}`
                : chat.last_message.text
            }}
          </p>
        </div>
      </div>
      <Badge
        :value="unreadedMessages"
        :fontSize="0.6"
        :size="15"
        :active="unreadedMessages ? true : false"
        v-if="unreadedMessages > 0"
      />
    </li>
  </router-link>
</template>

<script lang='ts'>
import Badge from "../Badge.vue";

import Avatar from "primevue/avatar";

import { computed, defineComponent, PropType } from "vue";
import { IChatItem } from "@/store/interfaces/chat";
import { IUserData } from "@/store/interfaces/user";
export default defineComponent({
  components: { Avatar, Badge },
  props: {
    chat: {
      type: Object as PropType<IChatItem>,
    },
    userId: {
      type: String,
    },
  },
  setup(props, ctx) {
    const participants = computed(() =>
      props.chat?.participants.filter((i) => i.id !== props.userId)
    );
    const unreadedMessages = computed(() =>
      props.chat?.messages.length
        ? props.chat?.messages.filter(
            (i) => i.user?.id !== props.userId && !i.is_readed
          ).length
        : props.chat?.unreaded_messages
    );

    return {
      participants,
      unreadedMessages,
    };
  },
});
</script>

<style scoped lang='scss'>
li {
  display: flex;
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