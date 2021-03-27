<template>
  <div class="input-block" v-click-outside="hideEmojiPicker">
    <textarea placeholder="Type your message here" v-model="message" />
    <button class="send" @click="sendMessage"><SendIcon /></button>
  </div>
</template>

<script lang="ts">
import SendIcon from "../icons/SendIcon.vue";
import EmojiPicker from "./EmojiPicker.vue";
import Btn from "../common/Button.vue";

import {  defineComponent, inject, watch } from "vue";
import { useChat } from "@/composable";
import { useRoute } from "vue-router";
export default defineComponent({
  components: { Btn, EmojiPicker, SendIcon },
  setup() {
    const {
      sendTyping,
      setAttachments,
      message,
      attachments,
      timeout,
      typing,
      activeEmojiPicker,
      setEmoji,
      sendMessage
    } = useChat();

    function hideEmojiPicker() {
      console.log(11);
      activeEmojiPicker.value = false;
    }

    watch(message, () => {
      message.value === "" ? (message.value = null) : message.value;
      clearInterval(timeout.value);
      if (!typing.value) {
        sendTyping(true);
      }

      typing.value = true;
      timeout.value = setTimeout(() => {
        typing.value = false;
        sendTyping(false);
      }, 3000);
    });

    return {
      setAttachments,
      message,
      attachments,
      activeEmojiPicker,
      hideEmojiPicker,
      setEmoji,
      sendMessage
    };
  },
  watch: {
    chatId: function() {
      this.message = null;
      this.attachments = [];
    }
  }
});
</script>

<style scoped lang="scss">
.input-block {
  position: relative;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  border-top: 1px rgba(112, 124, 151, 0.15) solid;

  textarea {
    text-align: left;
    resize: none;
    width: 100%;
    height: 50px;
    border: none;
    padding: 10px 90px 10px 84px;
    border-radius: 5px;
    font-weight: 500;
    font-size: 14px;
    transition: 0.2s;
    color: rgba(112, 124, 151, 0.7);
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow: hidden;
    font-family: unset;

    ::-webkit-scrollbar {
      display: none !important;
    }
    &:active,
    &:focus {
      outline: none;
    }
  }
  .send {
    background: linear-gradient(325.78deg, #2a8bf2 14.76%, #7cb8f7 87.3%);
    /* Shadow Active Icon */

    box-shadow: 4px 4px 25px rgba(42, 139, 242, 0.15), 2px 2px 25px rgba(42, 139, 242, 0.05),
      4px 6px 10px rgba(42, 139, 242, 0.15);
    width: 43px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    svg {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
