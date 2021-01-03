<template>
  <div
    class="message"
    :class="{ messageMe: messageData.user.id === this.$store.state.user.id }"
  >
    <div class="message__options" v-click-outside="hideMessageOptions">
      <vs-button
        icon
        shadow
        @click="activeMessageOptions = !activeMessageOptions"
        ><i class="bx bx-dots-horizontal-rounded"></i
      ></vs-button>
      <transition name="fade-bottom">
        <Modal
          v-if="activeMessageOptions"
          :style="[
            messageData.user.id === this.$store.state.user.id
              ? { left: '-200px' }
              : { right: '-200px' },
          ]"
        >
          <ul class="options__list">
            <li @click="deleteMessage">delete</li>
          </ul>
        </Modal>
      </transition>
    </div>

    <div class="message__content">
      <div
        class="message__text"
        :style="messageData.attachments.length ? `margin-bottom:10px` : ''"
        v-if="messageData.text"
      >
        <MessageText :messageText="messageData.text" />
      </div>
      <div class="message__attachments" v-if="messageData.attachments.length">
        <ul>
          <li v-for="i in messageData.attachments" :key="i.id">
            <i class="bx bxs-file" v-if="i.type === 'File'"></i>

            <img :src="baseUrl + i.file" alt="" v-if="i.type === 'Image'" />
            <audio controls="controls" v-if="i.type === 'Audio'">
              <source :src="baseUrl + i.file" type="audio/webm" />
              Your browser doesn't support <code>audio</code>.
            </audio>
          </li>
        </ul>
      </div>
    </div>
    <div class="message__time">
      {{ time }}
    </div>
    <div class="message__user-avatar">
      <Avatar label="A" />
    </div>
    <div class="message__readed">
      <i
        class="bx bx-check-double"
        style="font-size: 20px"
        v-if="messageData.is_readed"
      ></i>

      <i class="bx bx-check" style="font-size: 20px" v-else></i>
    </div>
  </div>
</template>

<script lang='ts'>
import Modal from "../Modal.vue";
import MessageText from "./MessageText";

import Avatar from "primevue/avatar"; //@ts-ignore
import ClickOutside from "vue-click-outside";

import { defineComponent } from "vue";

export default defineComponent({
  components: { MessageText, Avatar, Modal },
  props: {
    messageData: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    activeMessageOptions: false,
  }),
  methods: {
    deleteMessage() {
      //   this.$store.dispatch("chats/sendSocketDeleteMessage", {
      //     id: this.messageData.id,
      //     chat: this.messageData.chat,
      //   });
    },
    hideMessageOptions() {
      this.activeMessageOptions = false;
    },
  },

  computed: {
    baseUrl() {
      return process.env.VUE_APP_BASE_URL;
    },
  },
  directives: {
    ClickOutside,
  },
});
</script>

<style scoped lang='scss'>
.message {
  margin: 0 auto 50px 0;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  width: fit-content;
  max-width: 80%;
  position: relative;

  &.messageMe {
    margin: 0 0 35px auto;
    flex-direction: row;

    .message__content {
      background: #fff;
      margin-left: 0;
      border-radius: 10px;
      border-bottom-right-radius: 0;
      box-shadow: 1px 1px 6px 0px #9e9e9e;
      .message__text {
        // color: $color1;
      }
    }
    .message__user-avatar {
      display: none;
    }
    .message__readed {
      left: 17px;
      right: auto;
    }
  }
  &__options {
    .options__list {
      li {
        cursor: pointer;
      }
    }
  }
  &__content {
    background: linear-gradient(to bottom right, #60a9f6, #2a8bf2);
    margin-left: 40px;
    padding: 10px;
    border-radius: 10px;
    border-bottom-left-radius: 0;
    color: #fff;
    // box-shadow: 1px 1px 6px 0px $color2;
    max-width: 90%;
    position: relative;
  }
  &__attachments {
    width: fit-content;
    position: relative;
    overflow: hidden;
    ul {
      display: flex;
      flex-wrap: wrap;
      width: fit-content;
      position: relative;

      li {
        width: 100%;
        max-width: 300px;

        audio {
          max-width: 300px;

          &:focus {
            outline: none;
          }
        }
        img {
          width: 100%;
          max-width: 250px;
        }
      }
    }
  }

  &__text {
    text-align: left;
    font-size: 16px;
    font-weight: 500;
    overflow-wrap: break-word;
  }
  &__time {
    font-size: 12px;
    font-weight: 500;
    // color: $color1;
    bottom: -25px;
    position: absolute;
    right: -40px;
    transform: translate(-50%, 0);
    min-width: fit-content;
  }

  &__user-avatar {
    position: absolute;
    bottom: -25px;
    left: 0;
  }

  &__readed {
    position: absolute;
    right: 17px;
    bottom: -10px;
  }
}
</style>


