<template>
  <div>
    <div class="chat__header">
      <div class="chat__header-left">
        <Avatar label="P" class="p-avatar-circle p-mr-2" />
        <div class="chat__info">
          <div class="chat__name">Super chat</div>
          <div class="chat__status">Online</div>
        </div>
      </div>
      <div class="chat__options"><Button icon="more-vertical-outline" /></div>
    </div>
    <div class="chat__messages">
      <Message
        v-for="message in messages"
        :key="message.id"
        :messageData="message"
      />
    </div>
    <ChatInput />
  </div>
</template>

<script lang='ts'>
import Message from "../components/chat/Message.vue";
import Button from "../components/Button.vue";
import ChatInput from "../components/chat/ChatInput.vue";

import { IMessage } from "../store/interfaces/message";

import Avatar from "primevue/avatar";

import { defineComponent } from "vue";
export default defineComponent({
  components: { ChatInput, Button, Avatar, Message },
  data: () => ({
    messages: [
      {
        id: "435345gdfgdfg",
        text: "bla lba lba",
        user: {
          id: "535345",
          nickname: "user",
          email: "gsgsdg@fsd.com",
          avatar: "dfsdfs",
        },
        attachments: null,
        chat: "fsdfd453",
        is_readed: false,
        created: new Date().toString(),
      },
      {
        id: "435345gdfgdfg",
        text: "bla lba lba",
        user: {
          id: "535345",
          nickname: "user",
          email: "gsgsdg@fsd.com",
          avatar: "dfsdfs",
        },
        attachments: null,
        chat: "fsdfd453",
        is_readed: false,
        created: new Date().toString(),
      },

      {
        id: "435345gdfgdfg",
        text: "bla lba lba",
        user: {
          id: "535345",
          nickname: "user",
          email: "gsgsdg@fsd.com",
          avatar: "dfsdfs",
        },
        attachments: null,
        chat: "fsdfd453",
        is_readed: false,
        created: new Date().toString(),
      },
    ] as Array<IMessage>,
  }),
});
</script>

<style scoped lang='scss'>
.chat__header {
  width: 100%;
  height: 50px;
  box-shadow: 0 0 4px 0px #b8b8b8;
  padding: 10px 20px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;

  &-left {
    display: flex;
    text-align: left;
  }
  .chat__name {
    font-size: 0.9em;
  }
  .chat__status {
    font-size: 0.7em;
  }

  .chat__options {
  }
}
</style>