<template>
  <div class="imgs-preview bg-blur" v-if="attachmentsUrl.length" >
    <div class="img-container" v-for="(imgUrl,idx) in attachmentsUrl"
         :key="imgUrl"
         @click="deleteFile(idx)">
      <img :src="imgUrl" alt="">
      <span>Remove</span>
    </div>
  </div>
  <div class="input-block" v-click-outside="hideEmojiPicker">
    <div class="upload">
      <input type="file" accept="image/*" multiple
             @change="setAttachments" ref="upload">
      <el-button icon="el-icon-upload" circle @click="chooseFiles"></el-button>
    </div>
    <textarea placeholder="Type your message here" v-model="message"
              ref="textarea"/>
    <button class="send" @click="send">
      <SendIcon/>
    </button>
  </div>
</template>

<script lang="ts">
import SendIcon from "../icons/SendIcon.vue";
import EmojiPicker from "./EmojiPicker.vue";
import Btn from "../common/Button.vue";

import {defineComponent, ref, watch} from "vue";
import {useChatInput} from "@/composable";

export default defineComponent({
  components: {Btn, EmojiPicker, SendIcon},
  setup() {
    const {
      sendTyping,
      setAttachments,
      message,
      attachmentsUrl,
      timeout,
      typing,
      activeEmojiPicker,
      setEmoji,
      sendMessage,
      textarea,
      attachments,
      deleteFile
    } = useChatInput();
    const upload = ref<any>()

    function chooseFiles() {
      upload.value.click()
    }

    function hideEmojiPicker() {
      activeEmojiPicker.value = false;
    }

    function send(e: any) {
      sendMessage(e).then(res => res)
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
      activeEmojiPicker,
      hideEmojiPicker,
      setEmoji,
      send,
      textarea,
      upload,
      chooseFiles,
      attachmentsUrl,
      attachments,
      deleteFile
    };
  },
  watch: {
    chatId: function () {
      this.message = null;
      this.attachments = [];
    }
  }
});
</script>

<style scoped lang="scss">
.imgs-preview {
  display: flex;
  position: absolute;
  bottom: 75px;
  width: fit-content;
  padding: 10px;

  .img-container {
    max-width: 100px;
    margin: 0 15px 0 0;
    position: relative;
    cursor: pointer;

    &:last-child {
      margin: 0;
    }

    img {
      width: 100%;
      display: flex;
    }

    span {
      opacity: 0;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      font-size: 14px;
      font-weight: 600;
      transition: $transition;
      background: #66b1ffb8;
      color: #fff;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &:hover {
      span {
        opacity: 1;

      }
    }

  }


}

.upload {
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;

  input {
    width: 0;
    height: 0;
    position: absolute;
  }
}

.input-block {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  border-top: 1px rgba(112, 124, 151, 0.15) solid;

  textarea {
    text-align: left;
    resize: none;
    width: 90%;
    height: 50px;
    border: none;
    padding: 10px 60px 10px 84px;
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
