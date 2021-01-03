<template>
  <div class="message" :class="{ messageMe: isMe }">
    <div class="message__options" v-click-outside="hideMessageOptions">
      <!-- <vs-button
        icon
        shadow
        @click="activeMessageOptions = !activeMessageOptions"
        ><i class="bx bx-dots-horizontal-rounded"></i
      ></vs-button> -->
      <transition name="fade-bottom">
        <Modal
          v-if="activeMessageOptions"
          :style="[isMe ? { left: '-200px' } : { right: '-200px' }]"
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
        :style="messageData.attachments !== null ? `margin-bottom:10px` : ''"
        v-if="messageData.text"
      >
        <MessageText :messageText="messageData.text" />
      </div>
      <div class="message__attachments" v-if="messageData.attachments !== null">
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
      {{ createdAt }}
    </div>
    <div class="message__user-avatar">
      <Avatar label="A" class="p-avatar-circle" />
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
import { useStore } from "@/composition-api/useStore";

import { formatDistanceToNow, parseISO } from "date-fns";
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
    isMe: {
      type: Boolean,
      required: true,
      default: false,
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
    createdAt(): string {
      return formatDistanceToNow(new Date(this.messageData.created));
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
    margin: 0 5px 35px auto;
    flex-direction: row;

    .message__content {
      background: #fff;
      margin-left: 0;
      border-radius: 10px;
      border-bottom-right-radius: 0;
      box-shadow: 1px 1px 6px 0px #9e9e9e;
      .message__text {
        color: #131313;
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
    box-shadow: 1px 1px 6px 0px #9e9e9e;
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
    font-size: 0.8em;
    font-weight: 500;
    overflow-wrap: break-word;
  }
  &__time {
    font-size: 0.6em;
    font-weight: 500;
    color: #9e9e9e;
    bottom: -25px;
    position: absolute;
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


