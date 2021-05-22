<template>
  <div class="imgs-preview bg-blur" v-if="attachmentsUrl?.length">
    <div class="img-container" v-for="(imgUrl,idx) in attachmentsUrl"
         :key="imgUrl"
         @click="deleteFile(idx)">
      <img :src="imgUrl" alt="">
      <span>Remove</span>
    </div>
    <div class="img-container" :class="{'remove-all':attachmentsUrl.length>1}"
         v-if="attachmentsUrl.length>1"
         @click="deleteFile('all')"
    >
      <span>Remove all</span>
    </div>

  </div>
  <div class="input-block" v-click-outside="hideEmojiPicker">
    <div class="upload" v-if="!isEditMsgOpen">
      <input type="file" accept="image/*" multiple
             @change="setImages" ref="upload">
      <el-button icon="el-icon-upload" type="text" circle
                 @click="chooseFiles"></el-button>
    </div>
    <textarea placeholder="Type your message here"
              v-model="message"
              @keypress.enter.exact="send"
              ref="textarea"/>
    <template v-if="isEditMsgOpen">
      <el-button icon="el-icon-circle-check" circle type="primary"
                 @click="updateMessage"></el-button>
      <el-button icon="el-icon-circle-close" circle
                 @click="closeEditMsg"></el-button>
    </template>
    <template v-else>
      <el-button icon="el-icon-position" circle
                 type="primary" class="send"
                 @click="send"
                 v-if="message || attachments?.length">
      </el-button>
      <el-button icon="el-icon-microphone" circle type="primary" class="send"
                 @mousedown="activeAudioRecord = true"
                 v-else>
      </el-button>
      <AudioRecord v-if="activeAudioRecord"
                   @closeAudioRecord="canselAudiorecord"
                   @setAttachments="setAudio"
                   @sendMessage="send"/>
    </template>

  </div>

</template>

<script lang="ts">
import AudioRecord from "@/components/chat/AudioRecord.vue"
import SendIcon from "../icons/SendIcon.vue";
import EmojiPicker from "./EmojiPicker.vue";
import Btn from "../common/Button.vue";

import {defineComponent, ref, watch} from "vue";
import {useChatInput} from "@/composable";
import notificationService from "@/services/notificationService";

export default defineComponent({
  name: 'ChatInput',
  components: {Btn, EmojiPicker, SendIcon, AudioRecord},
  setup() {
    const {
      setAttachments,
      message,
      attachmentsUrl,
      activeEmojiPicker,
      setEmoji,
      sendMessage,
      textarea,
      attachments,
      deleteFile,
      activeAudioRecord,
      isEditMsgOpen,
      updateMessage,
      closeEditMsg,
      timeout,
      sendTyping, typing
    } = useChatInput();
    const upload = ref<any>()
    const isSending = ref(false)

    function chooseFiles() {
      upload.value.click()
    }

    function hideEmojiPicker() {
      activeEmojiPicker.value = false;
    }

    async function send(e: any) {
      isSending.value = true
      activeAudioRecord.value = false;
      sendMessage(e).then(res => {
        if (!res.status) notificationService.error("Can't send message")
        isSending.value = false
      })

    }

    function setImages(e: any) {
      setAttachments(e.target.files)
    }

    function setAudio(e: any) {
      setAttachments(e)
    }

    function canselAudiorecord() {
      activeAudioRecord.value = false;
      attachments.value = []
    }

    watch(message, () => {
      message.value === "" ? (message.value = null) : message.value;
      clearInterval(timeout.value);
      if (!typing.value) {
        sendTyping(true, false);
      }

      typing.value = true;
      timeout.value = setTimeout(() => {
        typing.value = false;
        sendTyping(false, false);
      }, 3000);
    });


    return {
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
      deleteFile, activeAudioRecord,
      setImages, setAudio, canselAudiorecord,
      isEditMsgOpen,
      updateMessage,
      closeEditMsg,
      isSending
    };
  },

});
</script>

<style scoped lang="scss">
.imgs-preview {
  display: flex;
  position: absolute;
  bottom: 70px;
  width: fit-content;
  padding: 10px;
  box-shadow: 0 2px 14px #00000014;
  border-radius: 10px;

  .img-container {
    max-width: 100px;
    margin: 0 15px 0 0;
    position: relative;
    cursor: pointer;

    &:last-child {
      margin: 0;


    }

    &.remove-all {
      span {
        opacity: 1;
        position: relative;

      }
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
  bottom: -5px;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  z-index: 1;

  &:after {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background: #fff;
    filter: blur(5px);
    left: 0;
    top: 0;
    z-index: -1;
    opacity: 0.9;
  }

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
    color: #303133;
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow: hidden;
    font-family: unset;
    background: transparent;

    ::-webkit-scrollbar {
      display: none !important;
    }

    &:active,
    &:focus {
      outline: none;
    }
  }

  .send {
  }
}
</style>
